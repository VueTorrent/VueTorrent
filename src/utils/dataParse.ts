export const getDataUnit = (input: number | string) => {
  const data = Number(input)
  if (data === -1) return ''
  if (!data) return 'B'
  const c = 1024
  const f = Math.floor(Math.log(data) / Math.log(c))

  return ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][f]
}

export const getDataValue = (data: number, precision: number = 2) => {
  if (data === -1) return 'None'
  if (!data) return '0'
  const c = 1024
  const f = Math.floor(Math.log(data) / Math.log(c))

  return `${parseFloat((data / Math.pow(c, f)).toFixed(precision))}`
}

export const titleCase = (str: string) => {
  return str.toLowerCase().replace(/\b(\w)/g, (s) => s.toUpperCase())
}
