export const getDataUnit = (data: number) => {
  if (data === -1) return null
  if (!data) return 'B'
  const c = 1024
  const e = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const f = Math.floor(Math.log(data) / Math.log(c))

  return `${e[f]}`
}

export const getDataValue = (data: number, precision: number = 2) => {
  if (data === -1) return 'None'
  if (!data) return '0'
  const c = 1024
  const f = Math.floor(Math.log(data) / Math.log(c))

  return `${parseFloat((data / Math.pow(c, f)).toFixed(precision))}`
}
