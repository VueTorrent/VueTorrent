import { basename, splitExt } from './path'

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
