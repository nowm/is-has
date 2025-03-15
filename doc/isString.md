```typescript
export declare function isString(variable?: unknown): variable is string;
```

`isString` checks if `variable` is a string.

```typescript
import {isString} from 'is-has';

isString(123);      // false
isString('Hello!'); // true
```
