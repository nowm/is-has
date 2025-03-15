# is-has

[![Release](https://github.com/nowm/is-has/actions/workflows/release.yml/badge.svg)](https://github.com/nowm/is-has/actions/workflows/release.yml)

Set of checking functions. No deps! Never throws errors!

## Installation

```shell
npm i is-has
```

## Functions

### isNumber

```typescript
declare function isNumber(variable?: unknown): variable is number;
```

Checks if a variable is a number. 

- Both `Infinity` and `NaN` are treated as non-numbers.
- `BigInt` is a separate story in JS, so it's not treated as a number as well.

```typescript
import {isNumber} from 'is-has';

isNumber(0);     // true
isNumber('0');   // false
isNumber('hi');  // false
isNumber(0 / 0); // false
isNumber(1 / 0); // false
isNumber(123n);  // false
```

### isString

```typescript
declare function isString(variable?: unknown): variable is string;
```

Checks if `variable` is a string.

```typescript
import {isString} from 'is-has';

isString(123);      // false
isString('Hello!'); // true
```
