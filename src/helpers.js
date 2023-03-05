import * as _ from 'lodash'
import { isProduction } from './utils'
import { mdiLanguageHtml5, mdiFileDocumentOutline, mdiNodejs, mdiFilePdfBox, mdiFileExcel, mdiCodeJson, mdiFileImage, mdiMovie, mdiLanguageMarkdown, mdiFile } from '@mdi/js'

export function formatBytes(a, b) {
  if (a === 0) return '0 B'
  const c = 1024
  const d = b || 2
  const e = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const f = Math.floor(Math.log(a) / Math.log(c))

  return `${parseFloat((a / Math.pow(c, f)).toFixed(d))} ${e[f]}`
}

export function getIconForFileType(type) {
  const types = {
    html: mdiLanguageHtml5,
    js: mdiNodejs,
    json: mdiCodeJson,
    md: mdiLanguageMarkdown,
    pdf: mdiFilePdfBox,
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

/**
 * @param {string} code
 * @return {{char: string, url: string}}
 */
export function codeToFlag(code) {
  const magicNumber = 0x1f1a5

  code = code.toUpperCase()
  /** @type {number[]} */
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
    path.name
      .split('\\')
      .join('/')
      .split('/')
      .reduce((r, name) => {
        if (!r[name]) {
          r[name] = { result: [] }
          r.result.push(createFile(path, name, r[name].result))
        }

        return r[name]
      }, level)
  })

  // parse folders
  result = result.map(el => parseFolder(el))

  function parseFolder(el, parent) {
    if (el.children.length !== 0) {
      const folder = createFolder(parent, el.name, el.children)
      folder.children = folder.children.map(child => parseFolder(child, folder))

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

function createFolder(parent, name, children) {
  return {
    name: name,
    fullName: parent === undefined ? name : `${parent.fullName}/${name}`,
    type: 'directory',
    children: children
  }
}

const urlRegExp = new RegExp(
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.\S{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.\S{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.\S{2,}|www\.[a-zA-Z0-9]+\.\S{2,})/gi
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

export function getDomainBody(string) {
  const match = string.match(/:\/\/([^\/]+\.)?([^\/.]+)\.[^\/.:]+/i)
  if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2]
  } else {
    return ''
  }
}

export class ArrayHelper {
  static remove(array, item) {
    const toRemove = Array.isArray(item) ? item : [item]
    _.remove(array, item => toRemove.indexOf(item) > -1)

    return array
  }

  static concat(a, b) {
    return _.concat(a, b)
  }
}

export class Hostname {
  static get(url) {
    const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i)
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
      return match[2]
    } else {
      return ''
    }
  }
}

export function isMac() {
  return window.navigator.userAgent.toUpperCase().indexOf('MAC') >= 0
}

export function doesCommand(e) {
  return isMac ? e.metaKey : e.ctrlKey
}
