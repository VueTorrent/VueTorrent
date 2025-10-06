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

/**
 * (25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.  # IPv4 octet 1
 * (25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.  # IPv4 octet 2
 * (25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.  # IPv4 octet 3
 * (25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])    # IPv4 octet 4
 *
 * source: https://www.ditig.com/validating-ipv4-and-ipv6-addresses-with-regexp#combined-ipv4-and-ipv6-validation
 */
function getIpv4RegExp() {
  return /(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])/gi
}

/**
 * (?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|               # full address
 * (?:[0-9A-Fa-f]{1,4}:){1,7}:|                            # :: suffix
 * :(?::[0-9A-Fa-f]{1,4}){1,7}|                            # :: prefix
 * (?:[0-9A-Fa-f]{1,4}:){1,6}:[0-9A-Fa-f]{1,4}|            # compressed
 * (?:[0-9A-Fa-f]{1,4}:){1,5}(?::[0-9A-Fa-f]{1,4}){1,2}|
 * (?:[0-9A-Fa-f]{1,4}:){1,4}(?::[0-9A-Fa-f]{1,4}){1,3}|
 * (?:[0-9A-Fa-f]{1,4}:){1,3}(?::[0-9A-Fa-f]{1,4}){1,4}|
 * (?:[0-9A-Fa-f]{1,4}:){1,2}(?::[0-9A-Fa-f]{1,4}){1,5}|
 * [0-9A-Fa-f]{1,4}:(?:(?::[0-9A-Fa-f]{1,4}){1,6})|
 * :(?:(?::[0-9A-Fa-f]{1,4}){1,6})
 *
 * source: https://www.ditig.com/validating-ipv4-and-ipv6-addresses-with-regexp#combined-ipv4-and-ipv6-validation
 */
function getIpv6RegExp() {
  return /((?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){1,7}:|:(?::[0-9A-Fa-f]{1,4}){1,7}|(?:[0-9A-Fa-f]{1,4}:){1,6}:[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){1,5}(?::[0-9A-Fa-f]{1,4}){1,2}|(?:[0-9A-Fa-f]{1,4}:){1,4}(?::[0-9A-Fa-f]{1,4}){1,3}|(?:[0-9A-Fa-f]{1,4}:){1,3}(?::[0-9A-Fa-f]{1,4}){1,4}|(?:[0-9A-Fa-f]{1,4}:){1,2}(?::[0-9A-Fa-f]{1,4}){1,5}|[0-9A-Fa-f]{1,4}:(?:(?::[0-9A-Fa-f]{1,4}){1,6})|:(?:(?::[0-9A-Fa-f]{1,4}){1,6}))/gi
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
 * Path (Optional): should match any string appended to the URL, excluding trailing punctuation like dots and commas
 */
function getUrlRegExp() {
  return /(?<protocol>(?:https?|udp):\/\/)?(?<host>[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\d{1,3}(?:\.\d{1,3}){3}|\[[a-fA-F0-9:]+])(?<port>:\d+)?(?<path>\/(?:\S*[^\s.,:;!?])?)?/gi
}

export function extractHostname(url: string): string {
  // Handle IPv6 addresses (with or without protocol)
  const ipv6Match = url.match(/(?::\/\/\[|^\[)([^\]]+)\]/)
  if (ipv6Match) {
    // Validate using proper IPv6 regex
    const ipv6Content = ipv6Match[1]
    if (getIpv6RegExp().test(ipv6Content)) {
      return `[${ipv6Content}]`
    }
  }

  // Handle IPv4 addresses and domain names with protocol
  const matchWithProtocol = url.match(/:\/\/(?:www[0-9]?\.)?([^/:]+)/i)
  if (matchWithProtocol) {
    const hostname = matchWithProtocol[1]

    // Check if it's an IPv4 address
    if (getIpv4RegExp().test(hostname)) {
      return hostname
    }

    // For domain names, extract the main domain (last two parts)
    const parts = hostname.split('.')
    if (parts.length >= 2) {
      return parts.slice(-2).join('.')
    }
    return hostname
  }

  // Handle IPv4 addresses without protocol
  const ipv4Match = url.match(/^([^/:]+)(?::\d+)?(?:\/.*)?$/)
  if (ipv4Match && getIpv4RegExp().test(ipv4Match[1])) {
    return ipv4Match[1]
  }

  return ''
}

export function getDomainBody(string: string): string {
  // Handle IPv6 addresses (with or without protocol) - return the full IPv6 address with brackets
  const ipv6Match = string.match(/(?::\/\/(\[[^\]]+\])|^(\[[^\]]+\])(?::\d+)?(?:\/.*)?$)/)
  if (ipv6Match) {
    const ipv6WithBrackets = ipv6Match[1] || ipv6Match[2]
    const ipv6Content = ipv6WithBrackets.slice(1, -1) // Remove brackets for validation
    if (getIpv6RegExp().test(ipv6Content)) {
      return ipv6WithBrackets // Return with brackets
    }
  }

  // Handle IPv4 addresses (with or without protocol) - return the full IPv4 address
  const ipv4Match = string.match(/^(?:.*:\/\/)?([^/:]+)(?::\d+)?(?:\/.*)?$/)
  if (ipv4Match && getIpv4RegExp().test(ipv4Match[1])) {
    return ipv4Match[1]
  }

  // Handle domain names (with or without protocol) - extract the main domain name (before the TLD)
  const domainMatch = string.match(/^(?:.*:\/\/)?(?:[^/]+\.)?([^/.]+)\.[^:/]+(?:[:/].*)?$/i)
  if (domainMatch) {
    return domainMatch[1]
  }

  return ''
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
