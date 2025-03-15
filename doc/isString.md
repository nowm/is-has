```typescript
export declare function isString(variable?: unknown): variable is string;
```

Checks if `variable` is a string.

```typescript
import {isString} from 'is-has';

isString(123);      // false
isString('Hello!'); // true
```
