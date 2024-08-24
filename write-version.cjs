const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const version = execSync('git describe --tags --exclude nightly_release').toString().trim()

const filePath = path.join(__dirname, 'vuetorrent', 'version.txt')
fs.writeFileSync(filePath, version)
