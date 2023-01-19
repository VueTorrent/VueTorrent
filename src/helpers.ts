import { isProduction } from './utils'
import { mdiLanguageHtml5, mdiFileDocumentOutline, mdiNodejs, mdiFilePdfBox, mdiFileExcel, mdiCodeJson, mdiFileImage, mdiMovie, mdiLanguageMarkdown, mdiFile } from '@mdi/js'
import * as _ from 'lodash'
import {TreeFile, TreeFolder, TreeNode} from "@/types/vuetorrent";
import {TorrentFile} from "@/types/qbit/models";

/**
 * @param data - byte count to format
 * @param precision - floating point precision to use (default: 2)
 * @return formatted byte count with its unit
 */
export function formatBytes(data: number, precision: number = 2): string {
  if (data === 0) return '0 B'
  const unitBase = 1024
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const unitIndex = Math.floor(Math.log(data) / Math.log(unitBase))

  return `${parseFloat((data / Math.pow(unitBase, unitIndex)).toFixed(precision))} ${units[unitIndex]}`
}

export function getIconForFileType(type: string = ""): string {
  const types: Record<string, string> = {
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

  return types[type] || mdiFile
}

export const isWindows = navigator.userAgent.includes('Windows')

export function codeToFlag(code: string) {
  const magicNumber = 0x1f1a5

  code = code.toUpperCase()
  const codePoints = [...code].map(c => magicNumber + c.charCodeAt(0))
  const char = String.fromCodePoint(...codePoints)
  const url = 'https://cdn.jsdelivr.net/npm/twemoji/2/svg/' + `${codePoints[0].toString(16)}-${codePoints[1].toString(16)}.svg`

  return { char, url }
}

interface ResultSet {
  result: TreeFile[]
  items: Record<string, ResultSet>
}

export function treeify(paths: TorrentFile[]) {
  let finalTorrentContent: TreeNode[] = []
  const level: ResultSet = { result: finalTorrentContent as TreeFile[], items: {} }

  paths.forEach(path => {
    path.name.split('/').reduce((r, name) => {
      if (!r.items[name]) {
        r.items[name] = { result: [], items: {} }
        r.result.push(createFile(path, name, r.items[name].result))
      }

      return r.items[name]
    }, level)
  })

  // parse folders
  finalTorrentContent = finalTorrentContent.map(el => parseFolder(el))

  function parseFolder(el: TreeNode, parent?: TreeFolder) {
    if (el.children.length !== 0) {
      const folder = createFolder(el.name, el.children, parent)
      folder.children = folder.children.map(child => parseFolder(child, folder))

      return folder
    }

    return el
  }

  return finalTorrentContent
}

function createFile(data: TorrentFile, name: string, children: TreeNode[]): TreeFile {
  return {
    id: data.index,
    name: name,
    fullName: data.name,
    progress: Math.round(data.progress * 100),
    size: formatBytes(data.size),
    icon: getIconForFileType(name.split('.').pop()),
    priority: data.priority,
    children: children
  }
}

function createFolder(name: string, children: any[], parent?: TreeFolder): TreeFolder {
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

export function splitByUrl(data: string): string[] {
  const urls = data.match(urlRegExp)
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

export function stringContainsUrl(data: string): boolean {
  return urlRegExp.test(data)
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

export class ArrayHelper {
  static remove<T>(array: T[], ...toRemove: T[]): T[] {
    _.remove(array, item => toRemove.indexOf(item) > -1)

    return array
  }

  static concat<T>(a: T[], b: T[]): T[] {
    return _.concat(a, b)
  }
}

export class Hostname {
  static get(url: string) {
    const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i)
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
      return match[2]
    } else {
      return ''
    }
  }
}
