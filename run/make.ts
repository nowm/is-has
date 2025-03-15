/*
 * Copyright 2025 nowm
 */

import {type BuildConfig, Glob, type PathLike} from 'bun';
import packageInfo from '../package.json';
import * as process from 'node:process';
import {rm} from 'node:fs/promises';
import {parse} from 'node:path';

const defaultBuildConfig: BuildConfig = {
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  minify: process.env.NODE_ENV !== 'development',
};

type PackageJson = Partial<Omit<typeof packageInfo, 'type' | 'types'> & {
  type: 'module' | 'commonjs';
  types: PathLike;
}>;

const distInfo: PackageJson = {
  name: packageInfo.name,
  version: packageInfo.version,
  description: packageInfo.description,
  keywords: packageInfo.keywords,
  homepage: packageInfo.homepage,
  bugs: packageInfo.bugs,
  license: packageInfo.license,
  author: packageInfo.author,
  exports: {
    'types': './index.d.ts',
    'import': './index.js',
    'require': './index.cjs',
  },
  repository: packageInfo.repository,
  type: 'module',
  types: './index.d.ts',
};

const currentYear = new Date().getFullYear();
let year: number|string = 2025;
if (year !== currentYear) {
  year = `${year}-${currentYear}`;
}

const licenseInfo = `/*
 * is-has
 *
 * Copyright ${year} nowm
 */
`;

async function buildJs() {
  await Promise.all([
    Bun.build({
      ...defaultBuildConfig,
      format: 'esm',
      naming: '[dir]/[name].js',
    }),
    Bun.build({
      ...defaultBuildConfig,
      format: 'cjs',
      naming: '[dir]/[name].cjs',
    }),
  ]);

  const files = [
    './dist/index.js',
    './dist/index.cjs',
  ];

  for (const path of files) {
    const content = await Bun.file(path).text();
    await Bun.write(path, licenseInfo + content);
  }
}

async function buildTypes() {
  let result = licenseInfo + '\n';

  const glob = new Glob('*.md');
  for (const filename of glob.scanSync('./doc')) {
    const content = await Bun.file(`./doc/${filename}`).text();
    const lines = content.split('\n');

    if (!lines.length || lines[0] !== '```typescript') {
      continue;
    }

    let inDefinition = true;
    const definitionLines = [];
    const docLines = [];

    for (let index = 0; index < lines.length; index++) {
      const line = lines[index].trimEnd();

      if (inDefinition) {
        if (line === '```typescript') {
          continue;
        }

        if (line === '```') {
          inDefinition = false;

          if (lines[index + 1] === '') {
            // eslint-disable-next-line no-plusplus
            index++;
          }

          continue;
        }

        if (!line) {
          continue;
        }

        definitionLines.push(line);

        continue;
      }

      docLines.push(line);
    }

    if (!definitionLines.length) {
      continue;
    }

    if (docLines.length) {
      result += '/**\n';
      result += docLines.join('\n').trimEnd().split('\n').map((line) => ' * ' + line).join('\n');
      result += '\n */\n';
    }

    result += definitionLines.join('\n').trimEnd() + '\n\n';
  }

  result = result.trimEnd() + '\n';

  await Bun.write('./src/index.d.ts', result);
  await Bun.write('./dist/index.d.ts', result);
}

async function buildReadme() {
  let result = (await Bun.file('./readme-intro.md').text()).trimEnd() + '\n\n';

  const links: {name: string, href: string}[] = [];

  let functions = '';

  const glob = new Glob('*.md');
  for (const filename of Array.from(glob.scanSync('./doc')).toSorted()) {
    const parsedName = parse(filename).name;

    functions += '### ' + parsedName + '\n\n';
    links.push({
      name: parsedName,
      href: '#' + parsedName.toLowerCase().split(' ').join('-'),
    });

    const content = (await Bun.file(`./doc/${filename}`).text()).trimEnd();

    let inDefinition = content.indexOf('```typescript') === 0;

    functions += content.split('\n').map((line) => {
      if (inDefinition) {
        if (
          line.indexOf('export declare function') === 0
          || line.indexOf('export type') === 0
        ) {
          return line.substring(7);
        }

        if (line === '```') {
          inDefinition = false;
        }
      }

      return line;
    }).join('\n').trimEnd() + '\n\n';
  }

  if (links.length) {
    result += links.map(({name, href}) => `* [${name}](${href})`).join('\n') + '\n\n';
  }

  result += functions.trimEnd() + '\n';

  await Bun.write('./README.md', result);
  await Bun.write('./dist/README.md', result);
}

await rm('./dist', {recursive: true, force: true});

await Promise.all([
  buildJs(),
  buildTypes(),
  buildReadme(),
  Bun.write('./dist/LICENSE', Bun.file('./LICENSE')),
  Bun.write('./dist/package.json', JSON.stringify(distInfo, null, 2)),
]);
