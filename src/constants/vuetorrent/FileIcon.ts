export enum FileType {
  ARCHIVE = 'archive',
  AUDIO = 'audio',
  BOOK = 'book',
  DOCUMENT = 'document',
  EXECUTABLE = 'executable',
  IMAGE = 'image',
  INFORMATION = 'information',
  SCRIPT = 'script',
  SUBTITLE = 'subtitle',
  VIDEO = 'video',

  UNKNOWN = 'unknown'
}

export const typesMap: Record<FileType, string> = {
  [FileType.ARCHIVE]: 'mdi-zip-box-outline',
  [FileType.AUDIO]: 'mdi-audio',
  [FileType.BOOK]: 'mdi-book-open-blank-variant',
  [FileType.DOCUMENT]: 'mdi-file-document',
  [FileType.EXECUTABLE]: 'mdi-application-brackets',
  [FileType.IMAGE]: 'mdi-file-image',
  [FileType.INFORMATION]: 'mdi-information-variant-box',
  [FileType.SCRIPT]: 'mdi-script-text',
  [FileType.SUBTITLE]: 'mdi-subtitles',
  [FileType.VIDEO]: 'mdi-movie',

  [FileType.UNKNOWN]: 'mdi-file'
}

export const extMap: Record<string, FileType> = {
  '7z': FileType.ARCHIVE,
  bz2: FileType.ARCHIVE,
  cab: FileType.ARCHIVE,
  gz: FileType.ARCHIVE,
  iso: FileType.ARCHIVE,
  rar: FileType.ARCHIVE,
  sfx: FileType.ARCHIVE,
  tar: FileType.ARCHIVE,
  tgz: FileType.ARCHIVE,
  xz: FileType.ARCHIVE,
  zip: FileType.ARCHIVE,

  alac: FileType.AUDIO,
  flac: FileType.AUDIO,
  mp3: FileType.AUDIO,
  ogg: FileType.AUDIO,
  wav: FileType.AUDIO,
  wma: FileType.AUDIO,

  cb7: FileType.BOOK,
  cbr: FileType.BOOK,
  cbt: FileType.BOOK,
  cbz: FileType.BOOK,
  epub: FileType.BOOK,
  mobi: FileType.BOOK,

  doc: FileType.DOCUMENT,
  docx: FileType.DOCUMENT,
  htm: FileType.DOCUMENT,
  html: FileType.DOCUMENT,
  pdf: FileType.DOCUMENT,
  rtf: FileType.DOCUMENT,
  txt: FileType.DOCUMENT,
  xhtml: FileType.DOCUMENT,

  apk: FileType.EXECUTABLE,
  app: FileType.EXECUTABLE,
  bin: FileType.EXECUTABLE,
  deb: FileType.EXECUTABLE,
  dmg: FileType.EXECUTABLE,
  exe: FileType.EXECUTABLE,
  jar: FileType.EXECUTABLE,
  msi: FileType.EXECUTABLE,

  avif: FileType.IMAGE,
  bmp: FileType.IMAGE,
  gif: FileType.IMAGE,
  heif: FileType.IMAGE,
  jfif: FileType.IMAGE,
  jpeg: FileType.IMAGE,
  jpg: FileType.IMAGE,
  png: FileType.IMAGE,
  svg: FileType.IMAGE,
  tiff: FileType.IMAGE,
  webp: FileType.IMAGE,

  nfo: FileType.INFORMATION,

  bat: FileType.SCRIPT,
  c: FileType.SCRIPT,
  cmd: FileType.SCRIPT,
  com: FileType.SCRIPT,
  cpp: FileType.SCRIPT,
  cs: FileType.SCRIPT,
  css: FileType.SCRIPT,
  h: FileType.SCRIPT,
  hpp: FileType.SCRIPT,
  java: FileType.SCRIPT,
  js: FileType.SCRIPT,
  py: FileType.SCRIPT,
  vbs: FileType.SCRIPT,

  idx: FileType.SUBTITLE,
  srt: FileType.SUBTITLE,
  sub: FileType.SUBTITLE,

  '3gp': FileType.VIDEO,
  avi: FileType.VIDEO,
  flv: FileType.VIDEO,
  gifv: FileType.VIDEO,
  m2ts: FileType.VIDEO,
  m4v: FileType.VIDEO,
  mkv: FileType.VIDEO,
  mov: FileType.VIDEO,
  mp4: FileType.VIDEO,
  mpeg: FileType.VIDEO,
  mpg: FileType.VIDEO,
  mts: FileType.VIDEO,
  ts: FileType.VIDEO,
  wmv: FileType.VIDEO
}
