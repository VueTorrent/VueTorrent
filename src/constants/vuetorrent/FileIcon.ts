import { TreeFile } from '@/types/vuetorrent'

enum FileIcon {
  PDF = 'mdi-file-pdf-box',
  IMAGE = 'mdi-file-image',
  DOCUMENT = 'mdi-file-document',
  INFORMATION = 'mdi-information-variant-box',
  MUSIC = 'mdi-music',
  VIDEO = 'mdi-movie',
  SUBTITLE = 'mdi-subtitles',
  ARCHIVE = 'mdi-folder-zip',
  EXECUTABLE = 'mdi-application'
}

export const typesMap: Record<string, FileIcon> = {
  pdf: FileIcon.PDF,

  png: FileIcon.IMAGE,
  jpg: FileIcon.IMAGE,
  jpeg: FileIcon.IMAGE,
  tiff: FileIcon.IMAGE,

  doc: FileIcon.DOCUMENT,
  docx: FileIcon.DOCUMENT,
  txt: FileIcon.DOCUMENT,

  nfo: FileIcon.INFORMATION,

  mp3: FileIcon.MUSIC,
  wav: FileIcon.MUSIC,
  flac: FileIcon.MUSIC,

  avi: FileIcon.VIDEO,
  mp4: FileIcon.VIDEO,
  mkv: FileIcon.VIDEO,
  mov: FileIcon.VIDEO,
  wmv: FileIcon.VIDEO,

  srt: FileIcon.SUBTITLE,
  idx: FileIcon.SUBTITLE,
  sub: FileIcon.SUBTITLE,

  rar: FileIcon.ARCHIVE,
  zip: FileIcon.ARCHIVE,
  gz: FileIcon.ARCHIVE,
  '7z': FileIcon.ARCHIVE,

  exe: FileIcon.EXECUTABLE,
  msi: FileIcon.EXECUTABLE,
  dmg: FileIcon.EXECUTABLE,
  deb: FileIcon.EXECUTABLE,
  iso: FileIcon.EXECUTABLE,
  jar: FileIcon.EXECUTABLE
}

export function getFileIcon(file: TreeFile) {
  const type = file.name.split('.').pop()?.toLowerCase() || ''
  return typesMap[type] || 'mdi-file'
}
