# is-has

[![Publish to NPM](https://github.com/nowm/is-has/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/nowm/is-has/actions/workflows/npm-publish.yml)

Set of checking functions. No deps! Never throws errors!

## Installation

```shell
npm i is-has
```

## Functions

### isString

```typescript
declare function isString(variable?: unknown): variable is string;
```

Checks if `variable` is a string.

```typescript
import {isString} from 'is-has';

isString(123); // false
isString('Hello!'); // true
```
