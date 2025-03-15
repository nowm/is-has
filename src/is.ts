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

export function isNumber(variable?: unknown): variable is number {
  try {
    return Number.isFinite(variable);
  } catch (e) {
    return false;
  }
}
