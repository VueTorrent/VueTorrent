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
  const match = string.match(/:\/\/([^\/]+\.)?([^\/.]+)\.[^\/.:]+/i)
  if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2]
  } else {
    return ''
  }
}

const getUrlRegExp = () =>
  new RegExp(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.\S{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.\S{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.\S{2,}|www\.[a-zA-Z0-9]+\.\S{2,})/gi
  )

export function splitByUrl(data: string) {
  const urls = data.match(getUrlRegExp())
  let resultArray: string[] = []

  if (urls) {
    urls.forEach(function (url) {
      let tmpResult
      if (resultArray.length === 0) {
        tmpResult = data.toString().split(url)
      } else {
        tmpResult = resultArray[resultArray.length - 1].toString().split(url)
        resultArray.pop()
      }

      tmpResult.splice(1, 0, url)
      resultArray = [...resultArray, ...tmpResult]
    })
  } else {
    resultArray[0] = data
  }

  resultArray = resultArray.filter(element => {
    return element !== ''
  })

  return resultArray
}

export function stringContainsUrl(data: string) {
  return getUrlRegExp().test(data)
}

export function codeToFlag(code: string) {
  const magicNumber = 0x1f1a5

  code = code.toUpperCase()
  const codePoints = [...code].map(c => magicNumber + c.charCodeAt(0))
  const char = String.fromCodePoint(...codePoints)
  const url = 'https://cdn.jsdelivr.net/npm/twemoji/2/svg/' + `${codePoints[0].toString(16)}-${codePoints[1].toString(16)}.svg`

  return {
    char,
    url
  }
}
