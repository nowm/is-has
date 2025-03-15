# is-has

[![Release](https://github.com/nowm/is-has/actions/workflows/release.yml/badge.svg)](https://github.com/nowm/is-has/actions/workflows/release.yml)

Set of checking functions. No deps! Never throws errors!

## Installation

```shell
npm i is-has
```

## Functions

* [hasOwnProperty](#hasownproperty)
* [isNumber](#isnumber)
* [isString](#isstring)

### hasOwnProperty

```typescript
declare function hasOwnProperty<T = object>(obj: T, key: keyof T): key is keyof T;
declare function hasOwnProperty(obj: any, key: any): key is keyof obj;
```

`hasOwnProperty` checks if `obj` has its own property. The result is fully compatible with `Object.hasOwn`.

```typescript
import {hasOwnProperty} from 'is-has';

class Class1 {
  propA: string = 'propA';
  static propB: string = 'static propB';
  #propC: string = '#propC';
  static #propD: string = 'static #propD';

  get propC() {
    return this.#propC;
  }

  static get propD() {
    return this.#propD;
  }

  functionA() {
    return 'functionA';
  }

  static functionB() {
    return 'functionB';
  }
}

hasOwnProperty(Class1, 'propA');     // false
hasOwnProperty(Class1, 'propB');     // true
hasOwnProperty(Class1, 'propC');     // false
hasOwnProperty(Class1, 'propD');     // true
hasOwnProperty(Class1, 'functionA'); // false
hasOwnProperty(Class1, 'functionB'); // true

const classInstance = new Class1();

hasOwnProperty(classInstance, 'propA');     // true
hasOwnProperty(classInstance, 'propB');     // false
hasOwnProperty(classInstance, 'propC');     // false
hasOwnProperty(classInstance, 'propD');     // false
hasOwnProperty(classInstance, 'functionA'); // false
hasOwnProperty(classInstance, 'functionB'); // false

const obj = {
  propA: 'propA',
  get propB() {
    return 'propB';
  },
};

hasOwnProperty(obj, 'propA'); // true
hasOwnProperty(obj, 'propB'); // true
hasOwnProperty(obj, 'propC'); // false
hasOwnProperty(obj, null);    // false

const arr = [1, '2', 3, 'aaa'];

hasOwnProperty(arr, 0);         // true
hasOwnProperty(arr, 4);         // false
hasOwnProperty(arr, 'length');  // true
hasOwnProperty(arr, 'aaa');     // false
hasOwnProperty(arr, null);      // false
hasOwnProperty(arr, undefined); // false

hasOwnProperty('obj', 'propA');       // false
hasOwnProperty(123, 'propC');         // false
hasOwnProperty(null, null);           // false
hasOwnProperty(undefined, undefined); // false
```

### isNumber

```typescript
declare function isNumber(variable?: unknown): variable is number;
```

`isNumber` checks if a variable is a number. 

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

`isString` checks if `variable` is a string.

```typescript
import {isString} from 'is-has';

isString(123);      // false
isString('Hello!'); // true
```
