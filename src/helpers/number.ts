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

function expandScientificNotation(value: string): string {
  const match = value.match(/^(-?)(\d+)(?:\.(\d+))?e([+-]?\d+)$/i)
  if (!match) return value

  const [, sign, integerPart, fractionPart = '', exponentText] = match
  const digits = integerPart + fractionPart
  const decimalIndex = integerPart.length + Number(exponentText)

  if (decimalIndex <= 0) return `${sign}0.${'0'.repeat(-decimalIndex)}${digits}`
  if (decimalIndex >= digits.length) return `${sign}${digits}${'0'.repeat(decimalIndex - digits.length)}`

  return `${sign}${digits.slice(0, decimalIndex)}.${digits.slice(decimalIndex)}`
}

/** Formats a raw number using the provided thousands and decimal separators. */
export function formatRawNumber(value: number, thousandsSeparator: string, decimalSeparator: string): string {
  const [integerPart, decimalPart] = expandScientificNotation(value.toString()).split('.')
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator)

  return decimalPart ? `${formattedInteger}${decimalSeparator}${decimalPart}` : formattedInteger
}

/** Formats a percentage value between 0 and 1 */
export function formatPercent(progress: number): string {
  return `${toPrecision(progress * 100, 3)} %`
}

export function safeDiv(a: number, b: number): number {
  if (a === 0 || b === 0) return 0
  return a / b
}
