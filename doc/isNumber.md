```typescript
export declare function isNumber(variable?: unknown): variable is number;
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
