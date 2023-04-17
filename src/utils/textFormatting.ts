export const capitalize = (str: string) => {
  if (str.length == 0) return str

  str = str.toLowerCase()

  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const titleCase = (str: string) => {
  return str.toLowerCase().replace(/\b(\w)/g, (s) => s.toUpperCase())
}
