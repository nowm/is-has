/*
 * Copyright 2025 nowm
 */

type HasOwnProperty = <T = unknown>(obj: T, key: keyof T | PropertyKey) => key is keyof T;

export const hasOwnProperty = typeof Object !== 'undefined' && typeof Object?.hasOwn === 'function'
  ? function(obj, key) {
    try {
      return Object.hasOwn(obj as object, key);
    } catch (e) {
      return false;
    }
  } as HasOwnProperty
  : function(obj, key) {
    try {
      // eslint-disable-next-line no-prototype-builtins
      return obj?.hasOwnProperty(key) || false;
    } catch (e) {
      return false;
    }
  } as HasOwnProperty;
