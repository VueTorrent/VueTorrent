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
  return [groups.join('.'), ext.toLocaleLowerCase()]
}

export function getExtType(ext: string): FileType {
  if (ext.startsWith('.')) {
    ext = ext.slice(1)
  }
  return extMap[ext.toLocaleLowerCase()] || FileType.UNKNOWN
}

export function getTypeIcon(type: FileType | null | undefined): string {
  return typesMap[type || FileType.UNKNOWN]
}

export function getFileIcon(filename: string): string {
  return getTypeIcon(getExtType(splitExt(filename.toLocaleLowerCase())[1]))
}
