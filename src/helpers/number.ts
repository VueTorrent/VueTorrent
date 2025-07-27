export function toPrecision(value: number, precision: number): string {
  if (value >= 10 ** precision) {
    return Math.floor(value).toString()
  }

  const strValue = value.toFixed(precision)
  if (strValue.length < Math.floor(Math.log10(value)) + 1) {
    return strValue
  } else {
    const result = strValue.substring(0, precision + 1)
    if (result.endsWith('.')) {
      return result.slice(0, -1)
    }
    return result
  }
}

/** Formats a percentage value between 0 and 1 */
export function formatPercent(progress: number): string {
  return `${toPrecision(progress * 100, 3)} %`
}

export function safeDiv(a: number, b: number): number {
  if (a === 0 || b === 0) return 0
  return a / b
}
