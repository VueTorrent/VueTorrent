const fs = require('fs')
const path = require('path')

const packageJson = require('./package.json')
const version = packageJson.version

const filePath = path.join(__dirname, 'vuetorrent', 'version.txt')
fs.writeFileSync(filePath, version)
