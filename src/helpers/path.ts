export function basename(path: string | null | undefined) {
  if (!path) return ''

  const uniPath = path.replace(/\\/g, '/')
  if (uniPath.indexOf('/') === -1) return ''

  return uniPath.split('/').reverse()[0]
}
