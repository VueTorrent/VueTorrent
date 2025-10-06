// noinspection HttpUrlsUsage

import { expect, test } from 'vitest'
import { capitalize, codeToFlag, extractHostname, getDomainBody, isValidUri, normalize, splitByUrl, titleCase } from './text'

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

describe('helpers/text/extractHostname', () => {
  test('URL with http', () => {
    expect(extractHostname('http://www.example.com')).toBe('example.com')
    expect(extractHostname('http://example.com')).toBe('example.com')
    expect(extractHostname('http://www.example.com/search?q=hello')).toBe('example.com')
  })

  test('URL with https', () => {
    expect(extractHostname('https://www.example.com')).toBe('example.com')
    expect(extractHostname('https://example.com')).toBe('example.com')
    expect(extractHostname('https://www.example.com/search?q=hello')).toBe('example.com')
    expect(extractHostname('https://tracker.domain-name.com:2053/announce/ydtrcuvubhlivycfrtdxe57654567Fgdsg')).toBe('domain-name.com')
  })

  test('URL with unknown protocol', () => {
    expect(extractHostname('proto://example.com/')).toBe('example.com')
    expect(extractHostname('proto://www.example.com/')).toBe('example.com')
    expect(extractHostname('proto://www.example.com/path_data')).toBe('example.com')
  })

  test('URL with subdomain', () => {
    expect(extractHostname('https://tracker.example.com')).toBe('example.com')
    expect(extractHostname('https://tracker.example.com/search')).toBe('example.com')
    expect(extractHostname('https://tracker.example.com/search?q=hello#title')).toBe('example.com')
  })

  test('IPv4 addresses', () => {
    expect(extractHostname('http://192.168.1.1')).toBe('192.168.1.1')
    expect(extractHostname('http://10.0.0.255:9000/announce')).toBe('10.0.0.255')

    expect(extractHostname('192.168.1.1')).toBe('192.168.1.1')
    expect(extractHostname('10.0.0.255:9000/announce')).toBe('10.0.0.255')
  })

  test('IPv6 addresses', () => {
    expect(extractHostname('http://[2001:db8::1]')).toBe('[2001:db8::1]')
    expect(extractHostname('http://[2001:0db8:85a3:0000:0000:8a2e:0370:7334]')).toBe('[2001:0db8:85a3:0000:0000:8a2e:0370:7334]')
    expect(extractHostname('http://[fe80::]')).toBe('[fe80::]')

    expect(extractHostname('[2001:db8::1]')).toBe('[2001:db8::1]')
    expect(extractHostname('[2001:0db8:85a3:0000:0000:8a2e:0370:7334]')).toBe('[2001:0db8:85a3:0000:0000:8a2e:0370:7334]')
    expect(extractHostname('[fe80::]')).toBe('[fe80::]')
  })

  test('No URLs', () => {
    expect(extractHostname('Lorem ipsum dolor sit amet consectetur')).toBe('')
    expect(extractHostname('')).toBe('')
  })
})

describe('helpers/text/getDomainBody', () => {
  test('http protocol', () => {
    expect(getDomainBody('http://www.example.com')).toBe('example')
    expect(getDomainBody('http://example.com')).toBe('example')
    expect(getDomainBody('http://www.example.com/search?q=hello')).toBe('example')
  })

  test('https protocol', () => {
    expect(getDomainBody('https://www.example.com')).toBe('example')
    expect(getDomainBody('https://example.com')).toBe('example')
    expect(getDomainBody('https://www.example.com/search?q=hello')).toBe('example')
    expect(getDomainBody('https://tracker.domain-name.com:2053/announce/ydtrcuvubhlivycfrtdxe57654567Fgdsg')).toBe('domain-name')
  })

  test('udp protocol', () => {
    expect(getDomainBody('udp://www.example.com')).toBe('example')
  })

  test('IPv4 with protocol', () => {
    expect(getDomainBody('http://192.168.1.1')).toBe('192.168.1.1')
    expect(getDomainBody('http://255.255.255.255')).toBe('255.255.255.255')
  })

  test('IPv4 without protocol', () => {
    expect(getDomainBody('192.168.1.1')).toBe('192.168.1.1')
    expect(getDomainBody('255.255.255.255')).toBe('255.255.255.255')
  })

  test('IPv6', () => {
    expect(getDomainBody('http://[2001:db8::1]')).toBe('[2001:db8::1]')
    expect(getDomainBody('http://[2001:0db8:85a3:0000:0000:8a2e:0370:7334]/announce')).toBe('[2001:0db8:85a3:0000:0000:8a2e:0370:7334]')
    expect(getDomainBody('http://[fe80::]:8080/ann?secret_key=cjy56vk23bh')).toBe('[fe80::]')
  })

  test('IPv6 without protocol', () => {
    expect(getDomainBody('[2001:db8::1]')).toBe('[2001:db8::1]')
    expect(getDomainBody('[2001:0db8:85a3:0000:0000:8a2e:0370:7334]/announce')).toBe('[2001:0db8:85a3:0000:0000:8a2e:0370:7334]')
    expect(getDomainBody('[fe80::]:8080/ann?secret_key=cjy56vk23bh')).toBe('[fe80::]')
  })

  test('no URL', () => {
    expect(getDomainBody('Lorem ipsum dolor sit amet consectetur')).toBe('')
    expect(getDomainBody('')).toBe('')
  })
})

describe('helpers/text/splitByUrl', () => {
  test('match URL with protocol', () => {
    expect(splitByUrl('Description available at http://www.example.com')).toEqual([
      { raw: 'Description available at ', isUrl: false },
      { protocol: 'http://', host: 'www.example.com', port: undefined, path: undefined, raw: 'http://www.example.com', isUrl: true },
    ])
  })

  test('match only host', () => {
    expect(splitByUrl('Downloaded from example.com')).toEqual([
      { raw: 'Downloaded from ', isUrl: false },
      { protocol: undefined, host: 'example.com', port: undefined, path: undefined, raw: 'example.com', isUrl: true },
    ])
  })

  test('match several URLs', () => {
    expect(splitByUrl('This torrent was downloaded from tracker.com. https://tracker.com/torrents/12345678')).toEqual([
      { raw: 'This torrent was downloaded from ', isUrl: false },
      { protocol: undefined, host: 'tracker.com', port: undefined, path: undefined, raw: 'tracker.com', isUrl: true },
      { raw: '. ', isUrl: false },
      { protocol: 'https://', host: 'tracker.com', port: undefined, path: '/torrents/12345678', raw: 'https://tracker.com/torrents/12345678', isUrl: true },
    ])
  })

  test('match port', () => {
    expect(splitByUrl('Downloaded from https://example.com:8080')).toEqual([
      { raw: 'Downloaded from ', isUrl: false },
      { protocol: 'https://', host: 'example.com', port: ':8080', path: undefined, raw: 'https://example.com:8080', isUrl: true },
    ])
  })

  test('match URLs with query parameters', () => {
    expect(splitByUrl('Search at https://example.com/search?q=torrent&type=movie')).toEqual([
      { raw: 'Search at ', isUrl: false },
      { protocol: 'https://', host: 'example.com', port: undefined, path: '/search?q=torrent&type=movie', raw: 'https://example.com/search?q=torrent&type=movie', isUrl: true },
    ])
  })

  test('match URLs with hash fragments', () => {
    expect(splitByUrl('Navigate to https://example.com/page#section1')).toEqual([
      { raw: 'Navigate to ', isUrl: false },
      { protocol: 'https://', host: 'example.com', port: undefined, path: '/page#section1', raw: 'https://example.com/page#section1', isUrl: true },
    ])
  })

  test('match URLs with both query params and hash', () => {
    expect(splitByUrl('Visit https://example.com/search?q=test&limit=10#results')).toEqual([
      { raw: 'Visit ', isUrl: false },
      {
        protocol: 'https://',
        host: 'example.com',
        port: undefined,
        path: '/search?q=test&limit=10#results',
        raw: 'https://example.com/search?q=test&limit=10#results',
        isUrl: true,
      },
    ])
  })

  test('match complex URLs with special characters', () => {
    expect(splitByUrl('Download from https://tracker.example.com:8080/announce?info_hash=abc123&peer_id=xyz789')).toEqual([
      { raw: 'Download from ', isUrl: false },
      {
        protocol: 'https://',
        host: 'tracker.example.com',
        port: ':8080',
        path: '/announce?info_hash=abc123&peer_id=xyz789',
        raw: 'https://tracker.example.com:8080/announce?info_hash=abc123&peer_id=xyz789',
        isUrl: true,
      },
    ])
  })

  test('match IPv6 URLs', () => {
    expect(splitByUrl('Connect to https://[2001:db8::1]:8080/path')).toEqual([
      { raw: 'Connect to ', isUrl: false },
      {
        protocol: 'https://',
        host: '[2001:db8::1]',
        port: ':8080',
        path: '/path',
        raw: 'https://[2001:db8::1]:8080/path',
        isUrl: true,
      },
    ])
  })

  test('URLs followed by punctuation', () => {
    expect(splitByUrl('Visit https://example.com/page. Happy torrenting!')).toEqual([
      { raw: 'Visit ', isUrl: false },
      {
        protocol: 'https://',
        host: 'example.com',
        port: undefined,
        path: '/page',
        raw: 'https://example.com/page',
        isUrl: true,
      },
      { raw: '. Happy torrenting!', isUrl: false },
    ])
  })

  test('match only URL', () => {
    expect(splitByUrl('https://redacted.sh/torrents.php?torrentid=5767192')).toEqual([
      {
        protocol: 'https://',
        host: 'redacted.sh',
        port: undefined,
        path: '/torrents.php?torrentid=5767192',
        raw: 'https://redacted.sh/torrents.php?torrentid=5767192',
        isUrl: true,
      },
    ])
  })

  test('path with filename', () => {
    expect(splitByUrl('https://redacted.sh/torrents.php')).toEqual([
      {
        protocol: 'https://',
        host: 'redacted.sh',
        port: undefined,
        path: '/torrents.php',
        raw: 'https://redacted.sh/torrents.php',
        isUrl: true,
      },
    ])
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

describe('helpers/text/normalize', () => {
  test('sample words', () => {
    expect(normalize('crème brûlée')).toBe('creme brulee')
  })

  test('accents', () => {
    expect(normalize('ąśćńżóźćęç')).toBe('ascnzozcec')
  })

  test('accents + uppercase', () => {
    expect(normalize('áéíóú ÁÉÍÓÚ üÜ')).toBe('aeiou aeiou uu')
  })

  test('undefined values', () => {
    expect(normalize(undefined)).toBe('')
  })
})
