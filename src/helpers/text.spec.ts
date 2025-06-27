import { capitalize, codeToFlag, extractHostname, getDomainBody, splitByUrl, containsUrl, titleCase, isValidUri, normalize } from './text'
import { expect, test } from 'vitest'

test('helpers/text/titleCase', () => {
  expect(titleCase('hello world')).toBe('Hello World')
  expect(titleCase('HELLO WORLD')).toBe('Hello World')
  expect(titleCase('hello WORLD')).toBe('Hello World')
  expect(titleCase('HELLO world')).toBe('Hello World')
  expect(titleCase('hELLO wORLD')).toBe('Hello World')
})

test('helpers/text/capitalize', () => {
  expect(capitalize('hello world')).toBe('Hello world')
  expect(capitalize('HELLO WORLD')).toBe('Hello world')
  expect(capitalize('hello WORLD')).toBe('Hello world')
  expect(capitalize('HELLO world')).toBe('Hello world')
  expect(capitalize('hELLO wORLD')).toBe('Hello world')
})

test('helpers/text/extractHostname', () => {
  expect(extractHostname('http://www.example.com')).toBe('example.com')
  expect(extractHostname('http://example.com')).toBe('example.com')
  expect(extractHostname('http://www.example.com/search?q=hello')).toBe('example.com')

  expect(extractHostname('https://www.example.com')).toBe('example.com')
  expect(extractHostname('https://example.com')).toBe('example.com')
  expect(extractHostname('https://www.example.com/search?q=hello')).toBe('example.com')
})

test('helpers/text/getDomainBody', () => {
  expect(getDomainBody('http://www.example.com')).toBe('example')
  expect(getDomainBody('http://example.com')).toBe('example')
  expect(getDomainBody('http://www.example.com/search?q=hello')).toBe('example')

  expect(getDomainBody('https://www.example.com')).toBe('example')
  expect(getDomainBody('https://example.com')).toBe('example')
  expect(getDomainBody('https://www.example.com/search?q=hello')).toBe('example')

  expect(getDomainBody('udp://www.example.com')).toBe('example')
})

test('helpers/text/splitByUrl', () => {
  expect(splitByUrl('Description available at http://www.example.com')).toEqual(['Description available at ', 'http://www.example.com'])
  expect(splitByUrl('Downloaded from example.com')).toEqual(['Downloaded from ', 'example.com'])
})

describe('helpers/text/containsUrl', () => {
  test('substring matches', () => {
    expect(containsUrl('Downloaded from example.com')).toBe(true)
  })

  test('valid with protocol', () => {
    expect(containsUrl('http://www.example.com')).toBe(true)
    expect(containsUrl('https://www.example.com')).toBe(true)
    expect(containsUrl('udp://www.example.com')).toBe(true)
  })

  test('valid with IP', () => {
    expect(containsUrl('http://192.168.0.1')).toBe(true)
    expect(containsUrl('https://192.168.0.1:8080')).toBe(true)
    expect(containsUrl('udp://192.168.0.1:5555')).toBe(true)
  })

  test('valid without protocol', () => {
    expect(containsUrl('www.example.com')).toBe(true)
    expect(containsUrl('example.com')).toBe(true)
    expect(containsUrl('example.co.uk')).toBe(true)
  })

  test('malformed URIs', () => {
    expect(containsUrl('invalid-url')).toBe(false)
  })
})

describe('helpers/text/isValidUri', () => {
  test('valid with protocol', () => {
    expect(isValidUri('http://www.example.com')).toBe(true)
    expect(isValidUri('https://www.example.com')).toBe(true)
    expect(isValidUri('udp://www.example.com')).toBe(true)
  })

  test('valid with IP', () => {
    expect(isValidUri('http://192.168.0.1')).toBe(true)
    expect(isValidUri('https://192.168.0.1:8080')).toBe(true)
    expect(isValidUri('udp://192.168.0.1:5555')).toBe(true)
  })

  test('not allowed protocol', () => {
    expect(isValidUri('ftp://ftp.example.com/path')).toBe(false)
    expect(isValidUri('file:///C:/path/to/file')).toBe(false)
    expect(isValidUri('mailto:user@example.com')).toBe(false)
  })

  test('invalid without protocol', () => {
    expect(isValidUri('www.example.com')).toBe(false)
    expect(isValidUri('example.com')).toBe(false)
  })

  test('malformed URIs', () => {
    expect(isValidUri('invalid-url')).toBe(false)
  })
})

test('helpers/text/codeToFlag', () => {
  expect(codeToFlag('us').char).toBe('🇺🇸')
  expect(codeToFlag('us').url).toBe('https://cdn.jsdelivr.net/npm/twemoji/2/svg/1f1fa-1f1f8.svg')

  expect(codeToFlag('gb').char).toBe('🇬🇧')
  expect(codeToFlag('gb').url).toBe('https://cdn.jsdelivr.net/npm/twemoji/2/svg/1f1ec-1f1e7.svg')

  expect(codeToFlag('de').char).toBe('🇩🇪')
  expect(codeToFlag('de').url).toBe('https://cdn.jsdelivr.net/npm/twemoji/2/svg/1f1e9-1f1ea.svg')

  expect(codeToFlag('fr').char).toBe('🇫🇷')
  expect(codeToFlag('fr').url).toBe('https://cdn.jsdelivr.net/npm/twemoji/2/svg/1f1eb-1f1f7.svg')

  expect(codeToFlag('es').char).toBe('🇪🇸')
  expect(codeToFlag('es').url).toBe('https://cdn.jsdelivr.net/npm/twemoji/2/svg/1f1ea-1f1f8.svg')

  expect(codeToFlag('it').char).toBe('🇮🇹')
  expect(codeToFlag('it').url).toBe('https://cdn.jsdelivr.net/npm/twemoji/2/svg/1f1ee-1f1f9.svg')
})

test('helpers/text/normalize', () => {
  expect(normalize('crème brûlée')).toBe('creme brulee')
  expect(normalize('ąśćńżóźćęç')).toBe('ascnzozcec')
  expect(normalize('áéíóú ÁÉÍÓÚ üÜ')).toBe('aeiou aeiou uu')
})
