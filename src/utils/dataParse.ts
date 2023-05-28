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

export const formatBytes = (a: number, b?: number): string => {
  if (a === 0) return '0 B'
  const c = 1024
  const d = b || 2
  const e = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const f = Math.floor(Math.log(a) / Math.log(c))

  return `${parseFloat((a / Math.pow(c, f)).toFixed(d))} ${e[f]}`
}

export const getDomain = (url: string) => {
  const match = url.match(/:\/\/([^/]+\.)?([^/.]+)\.[^/.:]+/i)
  if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2]
  } else {
    return ''
  }
}
