```typescript
export declare function hasOwnProperty<T = object>(obj: T, key: keyof T): key is keyof T;
export declare function hasOwnProperty(obj: any, key: any): key is keyof obj;
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

const classInstance = new Class1();

const obj = {
  propA: 'propA',
  get propB() {
    return 'propB';
  },
};

const arr = [1, '2', 3, 'aaa'];

hasOwnProperty(Class1, 'propA');     // false
hasOwnProperty(Class1, 'propB');     // true
hasOwnProperty(Class1, 'propC');     // false
hasOwnProperty(Class1, 'propD');     // true
hasOwnProperty(Class1, 'functionA'); // false
hasOwnProperty(Class1, 'functionB'); // true

hasOwnProperty(classInstance, 'propA');     // true
hasOwnProperty(classInstance, 'propB');     // false
hasOwnProperty(classInstance, 'propC');     // false
hasOwnProperty(classInstance, 'propD');     // false
hasOwnProperty(classInstance, 'functionA'); // false
hasOwnProperty(classInstance, 'functionB'); // false

hasOwnProperty(obj, 'propA'); // true
hasOwnProperty(obj, 'propB'); // true
hasOwnProperty(obj, 'propC'); // false
hasOwnProperty(obj, null);    // false

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
