/*
 * Copyright 2025 nowm
 */

export function isString(variable?: unknown): variable is string {
  try {
    return typeof variable === 'string';
  } catch (e) {
    return false;
  }
}
