export function basename(path: string | null | undefined) {
  if (!path) return ''

  const uniPath = path.replace(/\\/g, '/')
  if (uniPath.indexOf('/') === -1) return ''

  return uniPath.split('/').reverse()[0]
}

export function splitExt(path: string | null | undefined): [string, string] {
  if (!path) return ['', '']

  const uniPath = path.replace(/\\/g, '/')
  if (!uniPath.includes('.', 1)) return [uniPath, '']

  const groups = uniPath.split('.')
  const ext = groups.pop()!
  return [groups.join('.'), ext]
}
