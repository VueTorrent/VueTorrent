/* eslint-disable no-unused-vars */
export function formatBytes(a, b) {
    if (a == 0) return '0 B'
    const c = 1024
    const d = b || 2
    const e = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const f = Math.floor(Math.log(a) / Math.log(c))
    return `${parseFloat((a / Math.pow(c, f)).toFixed(d))} ${e[f]}`
}

export function getIconForFileType(type) {
    const types = {
        html: 'mdi-language-html5',
        js: 'mdi-nodejs',
        json: 'mdi-json',
        md: 'mdi-markdown',
        pdf: 'mdi-file-pdf',
        png: 'mdi-file-image',
        txt: 'mdi-file-document-outline',
        sub: 'mdi-file-document-outline',
        idx: 'mdi-file-document-outline',
        xls: 'mdi-file-excel',
        avi: 'movie',
        mp4: 'movie',
        mkv: 'movie'
    }

    if (!types[type]) return 'insert_drive_file'

    return types[type]
}

export const isWindows = navigator.userAgent.includes('Windows')

export function codeToFlag(code) {
    const magicNumber = 0x1f1a5

    // eslint-disable-next-line
    code = code.toUpperCase()
    const codePoints = [...code].map(c => magicNumber + c.charCodeAt(0))
    const char = String.fromCodePoint(...codePoints)
    const url =
        'https://cdn.jsdelivr.net/npm/twemoji/2/svg/' +
        `${codePoints[0].toString(16)}-${codePoints[1].toString(16)}.svg`

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
    if (match != null &&
        match.length > 2 &&
        typeof match[2] === 'string' &&
        match[2].length > 0) {
        return match[2]
    } else {
        return ''
    }
}
