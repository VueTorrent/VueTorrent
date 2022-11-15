import { isProduction } from './utils'

export function formatBytes(a, b) {
  if (a == 0) return '0 B'
  const c = 1024
  const d = b || 2
  const e = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const f = Math.floor(Math.log(a) / Math.log(c))

  return `${parseFloat((a / Math.pow(c, f)).toFixed(d))} ${e[f]}`
}

import { mdiLanguageHtml5, mdiFileDocumentOutline, mdiNodejs, mdiFilePdf, mdiFileExcel, mdiCodeJson, mdiFileImage, mdiMovie, mdiLanguageMarkdown, mdiFile } from '@mdi/js'

export function getIconForFileType(type) {
  const types = {
    html: mdiLanguageHtml5,
    js: mdiNodejs,
    json: mdiCodeJson,
    md: mdiLanguageMarkdown,
    pdf: mdiFilePdf,
    png: mdiFileImage,
    txt: mdiFileDocumentOutline,
    sub: mdiFileDocumentOutline,
    idx: mdiFileDocumentOutline,
    xls: mdiFileExcel,
    avi: mdiMovie,
    mp4: mdiMovie,
    mkv: mdiMovie
  }

  if (!types[type]) return mdiFile

  return types[type]
}

export const isWindows = navigator.userAgent.includes('Windows')

export function codeToFlag(code) {
  const magicNumber = 0x1f1a5

  // eslint-disable-next-line
  code = code.toUpperCase()
  const codePoints = [...code].map(c => magicNumber + c.charCodeAt(0))
  const char = String.fromCodePoint(...codePoints)
  const url = 'https://cdn.jsdelivr.net/npm/twemoji/2/svg/' + `${codePoints[0].toString(16)}-${codePoints[1].toString(16)}.svg`

  return {
    char,
    url
  }
}

export function treeify(paths) {
  let result = []
  const level = { result }

  paths.forEach(path => {
    path.name.split('/').reduce((r, name) => {
      if (!r[name]) {
        r[name] = { result: [] }
        r.result.push(createFile(path, name, r[name].result))
      }

      return r[name]
    }, level)
  })

  // parse folders
  result = result.map(el => parseFolder(el))

  function parseFolder(el) {
    if (el.children.length !== 0) {
      const folder = createFolder(el.name, el.children)
      folder.children = folder.children.map(el => parseFolder(el))

      return folder
    }

    return el
  }

  return result
}

function createFile(data, name, children) {
  return {
    id: data.id,
    name: name,
    fullName: data.name,
    progress: Math.round(data.progress * 100),
    size: formatBytes(data.size),
    icon: getIconForFileType(name.split('.').pop()),
    priority: data.priority,
    children: children
  }
}

function createFolder(name, children) {
  return {
    name: name,
    fullName: name,
    type: 'directory',
    children: children
  }
}

export function getHostName(url) {
  const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i)
  if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2]
  } else {
    return ''
  }
}

const urlRegExp = new RegExp(
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
)

export function splitByUrl(string) {
  const urls = string.match(urlRegExp)
  let resultArray = []

  if (urls) {
    urls.forEach(function (url) {
      let tmpResult
      if (resultArray.length === 0) {
        tmpResult = string.toString().split(url)
      } else {
        tmpResult = resultArray[resultArray.length - 1].toString().split(url)
        resultArray.pop()
      }

      tmpResult.splice(1, 0, url)
      resultArray = [...resultArray, ...tmpResult]
    })
  } else {
    resultArray[0] = string
  }

  resultArray = resultArray.filter(element => {
    return element !== ''
  })

  return resultArray
}

export function stringContainsUrl(string) {
  return urlRegExp.test(string)
}

export function getVersion() {
  if (isProduction()) {
    return 'import.meta.env.VITE_PACKAGE_VERSION'
  }

  return import.meta.env['VITE_PACKAGE_VERSION']
}

export function getBaseURL() {
  if (isProduction()) {
    return 'import.meta.env.BASE_URL'
  }

  return import.meta.env['BASE_URL']
}
