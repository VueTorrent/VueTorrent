import { FileType } from '@/constants/vuetorrent'
import { basename, splitExt, getExtType, getFileIcon } from './path'

describe('helpers/path/basename', () => {
  test('*NIX :: should return basename on files', () => {
    expect(basename('/dir1/file1.txt')).toEqual('file1.txt')
  })

  test('*NIX :: should return basename on folders', () => {
    expect(basename('/dir1/dir2')).toEqual('dir2')
  })

  test('*NIX :: should return empty string on trailing separator', () => {
    expect(basename('/dir1/dir2/')).toEqual('')
  })

  test('DOS :: should return basename on files', () => {
    expect(basename('C:\\dir1\\file1.txt')).toEqual('file1.txt')
  })

  test('DOS :: should return basename on folders', () => {
    expect(basename('C:\\dir1\\dir2')).toEqual('dir2')
  })

  test('DOS :: should return empty string on trailing separator', () => {
    expect(basename('C:\\dir1\\dir2\\')).toEqual('')
  })

  test('should return empty string on invalid path', () => {
    expect(basename('')).toEqual('')
    expect(basename(null)).toEqual('')
    expect(basename(undefined)).toEqual('')
  })
})

describe('helpers/path/splitExt', () => {
  it('should return filename and extension for a simple file', () => {
    expect(splitExt('file.txt')).toEqual(['file', 'txt'])
  })

  it('should return filename and empty string for file without extension', () => {
    expect(splitExt('file')).toEqual(['file', ''])
  })

  it('should handle files with multiple dots correctly', () => {
    expect(splitExt('my.file.name.txt')).toEqual(['my.file.name', 'txt'])
  })

  it('should return empty strings for empty input', () => {
    expect(splitExt('')).toEqual(['', ''])
  })

  it('should return empty strings for null input', () => {
    expect(splitExt(null)).toEqual(['', ''])
  })

  it('should return empty strings for undefined input', () => {
    expect(splitExt(undefined)).toEqual(['', ''])
  })

  it('should handle paths with directories correctly', () => {
    expect(splitExt('/path/to/file.txt')).toEqual(['/path/to/file', 'txt'])
  })

  it('should handle Windows-style paths correctly', () => {
    expect(splitExt('C:\\path\\to\\file.txt')).toEqual(['C:/path/to/file', 'txt'])
  })

  it('should handle files starting with a dot', () => {
    expect(splitExt('.hiddenfile')).toEqual(['.hiddenfile', ''])
  })

  it('should treat files with only extension as hidden', () => {
    expect(splitExt('.txt')).toEqual(['.txt', ''])
  })
})

describe('helpers/path/getExtType', () => {
  it('should return the correct type for a known extension', () => {
    expect(getExtType('txt')).toEqual(FileType.DOCUMENT)
  })

  it('should return unknown for an unknown extension', () => {
    expect(getExtType('unknown')).toBe(FileType.UNKNOWN)
  })

  it('should return unknown for files without extension', () => {
    expect(getExtType('file')).toBe(FileType.UNKNOWN)
  })

  it('should handle files starting with a dot', () => {
    expect(getExtType('.hiddenfile')).toBe(FileType.UNKNOWN)
  })
})

describe('helpers/path/getFileIcon', () => {
  it('should return the correct icon for a known file type', () => {
    expect(getFileIcon('file.txt')).toEqual('mdi-file-document')
  })

  it('should return the default icon for an unknown file type', () => {
    expect(getFileIcon('file.unknown')).toEqual('mdi-file')
  })

  it('should handle filenames with multiple dots correctly', () => {
    expect(getFileIcon('my.file.name.txt')).toEqual('mdi-file-document')
  })

  it('should return the default icon for files without extension', () => {
    expect(getFileIcon('file')).toEqual('mdi-file')
  })

  it('should handle files starting with a dot', () => {
    expect(getFileIcon('.hiddenfile')).toEqual('mdi-file')
  })

  it('should treat files with only extension as hidden', () => {
    expect(getFileIcon('.txt')).toEqual('mdi-file')
  })
})
