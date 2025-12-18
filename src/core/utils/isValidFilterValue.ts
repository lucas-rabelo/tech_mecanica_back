export function isValidFilterValue(value: unknown): boolean {
  if (value === undefined) return false;
  if (value === null) return false;
  if (typeof value === 'string' && value.trim() === '') return false;

  return true;
}