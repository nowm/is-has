import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylisticJs from '@stylistic/eslint-plugin-js';

/**
 * @type {import('eslint').Linter.RulesRecord}
 */
const customRules = {
  'quotes': ['error', 'single'],
  'no-plusplus': ['error', {
    allowForLoopAfterthoughts: true,
  }],
  'no-unused-private-class-members': 'warn',
  'object-curly-spacing': ['error', 'never'],
  'quote-props': 'off',
  '@stylistic/js/comma-dangle': ['error', 'always-multiline'],
  '@stylistic/js/semi': ['error', 'always', {
    // `omitLastInOneLineBlock: true` disallows the last semicolon in a block in which its braces
    // (and therefore the content of the block) are in the same line
    omitLastInOneLineBlock: false,
    // `omitLastInOneLineClassBody: true` disallows the last semicolon in a class body in which its braces
    // (and therefore the content of the class body) are in the same line
    omitLastInOneLineClassBody: false,
  }],
  '@typescript-eslint/no-unused-vars': ['warn', {
    caughtErrors: 'none',
  }],
  '@typescript-eslint/ban-ts-comment': 'off',
};

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: [
      '**/*.{js,mjs,cjs,ts,jsx,tsx}',
    ],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        __PATH_PREFIX__: true,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {
          // always try to resolve types under `<root>@types` directory even it doesn't
          // contain any source code, like `@types/unist`
          alwaysTryTypes: true,

          // Choose from one of the "project" configs below or omit to use <root>/tsconfig.json
          // by default
          project: './tsconfig.json',
        },
      },
      react: {
        version: 'detect',
      },
    },
    rules: customRules,
  },
];
