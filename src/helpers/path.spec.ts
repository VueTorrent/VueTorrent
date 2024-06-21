import { basename } from './path'

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