import { extMap, FileType, typesMap } from '@/constants/vuetorrent'

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

export function getExtType(ext: string) {
  return extMap[ext] || FileType.UNKNOWN
}

export function getFileIcon(filename: string) {
  return typesMap[getExtType(splitExt(filename)[1])]
}
