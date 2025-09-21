export function titleCase(str: string): string {
  if (str.length == 0) return str

  return str
    .split(' ')
    .map(w => w[0] && w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(' ')
}

export function capitalize(str: string): string {
  if (str.length == 0) return str

  str = str.toLowerCase()

  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function extractHostname(url: string): string {
  const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i)
  if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2]
  } else {
    return ''
  }
}

export function getDomainBody(string: string): string {
  const match = string.match(/:\/\/([^/]+\.)?([^/.]+)\.[^/.:]+/i)
  if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2]
  } else {
    return ''
  }
}

/**
 * Protocol (Optional): http, https, udp
 *
 * Hostname (Required): should match any valid hostname or IP address
 *
 * Example:
 * www.example.com
 * 192.168.1.1:8080
 * [2001:db8::1]
 *
 * Port (Optional): should match any port number
 *
 * Path (Optional): should match any string appended to the URL
 */
function getUrlRegExp() {
  return new RegExp(/(?<protocol>(?:https?|udp):\/\/)?(?<host>[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\d{1,3}(?:\.\d{1,3}){3}|\[[a-fA-F0-9:]+])(?<port>:\d+)?(?<path>\/\S*)?/gi)
}

export function splitByUrl(data: string) {
  const splitted = data.split(getUrlRegExp())
  const result = []

  for (let i = 0; i < splitted.length; i++) {
    if (i % 5 === 0) {
      result.push({ raw: splitted[i], isUrl: false })
      continue
    }

    const protocol = splitted[i]
    const host = splitted[i + 1]
    const port = splitted[i + 2]
    const path = splitted[i + 3]

    result.push({
      protocol,
      host,
      port,
      path,
      raw: (protocol ?? '') + (host ?? '') + (port ?? '') + (path ?? ''),
      isUrl: true,
    })

    i += 3
  }

  return result.filter(part => part.raw && part.raw != '')
}

export function containsUrl(data: string) {
  return getUrlRegExp().test(data)
}

export function isValidUri(data: string, allowedProtocols: string[] = ['http:', 'https:', 'udp:']) {
  try {
    const parsedURL = new URL(data)
    return allowedProtocols.includes(parsedURL.protocol)
  } catch (_) {
    return false
  }
}

export function codeToFlag(code: string) {
  const magicNumber = 0x1f1a5

  code = code.toUpperCase()
  const codePoints = [...code].map(c => magicNumber + c.charCodeAt(0))
  const char = String.fromCodePoint(...codePoints)
  const url = 'https://cdn.jsdelivr.net/npm/twemoji/2/svg/' + `${codePoints[0].toString(16)}-${codePoints[1].toString(16)}.svg`

  return {
    char,
    url,
  }
}

export function normalize(data: string | undefined) {
  return (
    data
      ?.toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '') ?? ''
  )
}
