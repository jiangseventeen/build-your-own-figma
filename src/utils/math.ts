// Rounded to the nearest integer
export function roundTo(value: number, precision: number): number {
  return Math.round(value / precision) * precision;
}
