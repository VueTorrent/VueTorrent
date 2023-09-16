export function toPrecision(value: number, precision: number): string {
  if (value >= 10 ** precision) {
    return value.toString()
  }
  if (value >= 1) {
    return value.toPrecision(precision)
  }

  return value.toFixed(precision - 1)
}

export function formatPercent(progress: number): string {
  return `${toPrecision(progress * 100, 3)} %`
}
