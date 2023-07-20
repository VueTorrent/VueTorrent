import * as _ from 'lodash'
import { isProduction } from './utils'

export const isWindows = navigator.userAgent.includes('Windows')

/**
 * Convert code to flag
 * @param code {string}
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

/**
 * Generates a file tree from a list of files
 * @param files {TorrentFile[]}
 * @return {TreeRoot}
 */
export function genFileTree(files) {
  /** @type {TreeRoot} */
  const rootNode = {
    type: 'root',
    name: '',
    fullName: '',
    id: '',
    children: []
  }

  for (const file of files) {
    /** @type {TreeRoot | TreeFolder} */
    let cursor = rootNode
    file.name
      .replace('\\', '/')
      .split('/')
      .reduce((parentPath, nodeName) => {
        const nextPath = parentPath === '' ? nodeName : parentPath + '/' + nodeName

        if (file.name.endsWith(nodeName)) {
          /** @type {TreeFile} */
          const newFile = {
            type: 'file',
            name: nodeName,
            fullName: nextPath,
            id: file.index,
            availability: file.availability,
            index: file.index,
            is_seed: file.is_seed,
            priority: file.priority,
            progress: file.progress,
            size: file.size
          }
          cursor.children.push(newFile)
        } else {
          /** @type {TreeFolder | undefined} */
          const folder = cursor.children.find(el => el.name === nodeName)
          if (folder) {
            cursor = folder
          } else {
            // if not found, create folder and set cursor to folder
            /** @type {TreeFolder} */
            const newFolder = {
              type: 'folder',
              name: nodeName,
              fullName: nextPath,
              id: nextPath,
              children: []
            }
            cursor.children.push(newFolder)
            cursor = newFolder
          }
        }

        return nextPath
      }, '')
  }

  return rootNode
}

const urlRegExp = new RegExp(
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.\S{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.\S{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.\S{2,}|www\.[a-zA-Z0-9]+\.\S{2,})/gi
)

/**
 * Split string by separating urls
 * @param string
 * @return {string[]}
 */
export function splitByUrl(string) {
  const urls = string.match(urlRegExp)
  /** @type {string[]} */
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

/**
 * Check if string contains url
 * @param string {string}
 * @return {boolean}
 */
export function stringContainsUrl(string) {
  return urlRegExp.test(string)
}

/**
 * Get version from import.meta
 * @return {string}
 */
export function getVersion() {
  if (isProduction()) {
    return 'import.meta.env.VITE_PACKAGE_VERSION'
  }

  // return `${import.meta.env['VITE_PACKAGE_VERSION']}`
  return 'undefined'
}

/**
 * Get base url from import.meta
 * @return {string}
 */
export function getBaseURL() {
  if (isProduction()) {
    return 'import.meta.env.BASE_URL'
  }

  // return import.meta.env['BASE_URL']
  return 'undefined'
}

/**
 * Get domain from url
 * @param string {string}
 * @return {string}
 */
export function getDomainBody(string) {
  const match = string.match(/:\/\/([^\/]+\.)?([^\/.]+)\.[^\/.:]+/i)
  if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2]
  } else {
    return ''
  }
}

export class ArrayHelper {
  /**
   * Remove item from array
   * @typedef T
   * @param array {T[]}
   * @param item {T | T[]} Item or array of items to remove
   * @return {T[]}
   */
  static remove(array, item) {
    const toRemove = Array.isArray(item) ? item : [item]
    _.remove(array, item => toRemove.indexOf(item) > -1)

    return array
  }

  /**
   * Concatenate two arrays together
   * @typedef T
   * @param a {T[]} First array
   * @param b {T[]} Second array
   * @return {T[]}
   */
  static concat(a, b) {
    return _.concat(a, b)
  }
}

export class Hostname {
  /**
   * Get hostname from url
   * @param url {string}
   * @return {string}
   */
  static get(url) {
    const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i)
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
      return match[2]
    } else {
      return ''
    }
  }
}

/**
 * Check if user is on mac
 * @return {boolean}
 */
export function isMac() {
  return window.navigator.userAgent.toUpperCase().indexOf('MAC') >= 0
}

/**
 * Check ctrl/cmd key
 * @param e {KeyboardEvent}
 * @return {boolean}
 */
export function doesCommand(e) {
  return isMac() ? e.metaKey : e.ctrlKey
}
