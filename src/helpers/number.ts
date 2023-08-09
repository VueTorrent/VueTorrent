export function toPrecision(value: number, precision: number): string {
  if (value >= 10 ** precision) {
    return value.toString()
  }
  if (value >= 1) {
    return value.toPrecision(precision)
  }

  return value.toFixed(precision - 1)
}

export function formatProgress(progress: number): string {
  return `${toPrecision(progress, 3)} %`
}

