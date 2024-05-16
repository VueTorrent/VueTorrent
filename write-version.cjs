const fs = require('fs')
const path = require('path')
const packageJson = require('./package.json')

let dirname
let version

if (process.argv[2] === '--demo') {
  dirname = 'vuetorrent-demo'
  version = packageJson.version + '-demo'
} else {
  dirname = 'vuetorrent'
  version = packageJson.version
}

const filePath = path.join(__dirname, dirname, 'version.txt')
fs.writeFileSync(filePath, version)
