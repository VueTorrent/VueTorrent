/* eslint-disable no-unused-vars */
export function formatBytes(a, b) {
    if (a == 0) return '0 Bytes'
    const c = 1024
    const d = b || 2
    const e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const f = Math.floor(Math.log(a) / Math.log(c))
    return `${parseFloat((a / Math.pow(c, f)).toFixed(d))} ${e[f]}`
}

export function getIconForFileType(type) {
    let types = {
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
    let level = { result }

    paths.forEach(path => {
        path.name.split('/').reduce((r, name, i, a) => {
            if (!r[name]) {
                r[name] = { result: [] }
                r.result.push(createFile(path, name, r[name].result))
            }

            return r[name]
        }, level)
    })

    //parse folders
    result = result.map(el => parseFolder(el))

    function parseFolder(el) {
        if (el.children.length !== 0) {
            let folder = createFolder(el.name, el.children)
            folder.children = folder.children.map(el => parseFolder(el))
            return folder
        }
        return el
    }

    return result
}

function createFile(data, name, children) {
    return {
        name: name,
        progress: Math.round(data.progress * 100),
        size: formatBytes(data.size),
        icon: getIconForFileType(name.split('.').pop()),
        children: children
    }
}

function createFolder(name, children) {
    return {
        name: name,
        type: 'directory',
        children: children
    }
}

export function getPropName(prop) {
    switch (prop) {
        case 'title':
        case 'name':
        case 'Name':
        case 'Title':
            return 'name'
        case 'size':
        case 'Size':
            return 'size'
        case 'dlspeed':
        case 'Dlspeed':
        case 'Download':
        case 'download':
        case 'downloadspeed':
            return 'dlspeed'
        case 'upspeed':
        case 'upload':
        case 'Upload':
        case 'Upspeed':
        case 'uploadspeed':
            return 'upspeed'
        case 'leechs':
        case 'leechers':
        case 'leech':
        case 'peers':
        case 'Leechs':
        case 'Leechers':
        case 'Leech':
        case 'Peers':
            return 'num_leechs'
        case 'seeds':
        case 'seeders':
        case 'Seeds':
        case 'Seeders':
            return 'num_seeds'
        case 'remaining':
        case 'time':
        case 'Time':
        case 'ETA':
        case 'eta':
            return 'eta'
        case 'done':
        case 'downloaded':
        case 'dloaded':
        case 'Done':
        case 'Downloaded':
        case 'Dloaded':
            return 'progress'
        case 'state':
        case 'status':
        case 'State':
        case 'Status':
            return 'state'
        default:
            return 'name'
    }
}

export function sortOrFilter(word) {
    switch (word) {
        case 'sort':
        case 's':
        case 'srt':
            return 'sort'
        case 'f':
        case 'filter':
        case 'filtr':
        case 'fltr':
        case 'filt':
            return 'filter'
        default:
            return 'sort'
    }
}

export function filterOption(word) {
    switch (word) {
        case 'Done':
        case 'done':
        case 'completed':
        case 'complete':
            return 'completed'
        case 'Busy':
        case 'busy':
        case 'downl':
        case 'download':
        case 'downloading':
        case 'act':
        case 'active':
        case 'resumed':
            return 'active'
        case 'fail':
        case 'failed':
        case 'faild':
        case 'stalled':
        case 'stalld':
        case 'stall':
            return 'stalled'
        case 'pause':
        case 'paused':
            return 'paused'
        default:
            return null
    }
}
