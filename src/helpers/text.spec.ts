import { capitalize, codeToFlag, extractHostname, getDomainBody, splitByUrl, stringContainsUrl, titleCase } from './text'
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
})

test('helpers/text/stringContainsUrl', () => {
  expect(stringContainsUrl('Description available at http://www.example.com')).toBe(true)
  expect(stringContainsUrl('Description available at https://www.example.com')).toBe(true)
  expect(stringContainsUrl('Description available at udp://www.example.com')).toBe(true)
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
