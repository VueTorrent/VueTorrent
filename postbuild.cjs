const fs = require('fs')
const path = require('path')

function createVersionFile() {
  const packageJson = require('./package.json')
  const version = packageJson.version

  const filePath = path.join(__dirname, 'vuetorrent', 'version.txt')
  fs.writeFileSync(filePath, version)
}

function updatePrecacheList() {
  const assetsDir = path.join(__dirname, 'vuetorrent', 'public', 'assets')
  const serviceWorkerPath = path.join(__dirname, 'vuetorrent', 'public', 'sw.js')
  const template = '/* REPLACE BY GENERATED ASSET LIST */'
  
  if (!fs.existsSync(assetsDir)) {
    console.warn('Assets directory not found, skipping precache list generation')
    return
  }

  try {
    const urls = fs.readdirSync(assetsDir)
      .map(file => {
        return 'assets/' + file.replace(/\\/g, '/')
      })
      .sort()

    const assetList = urls.map(url => `'${url}'`).join(', ')

    const swContent = fs.readFileSync(serviceWorkerPath, 'utf-8').replace(template, assetList)
    fs.writeFileSync(serviceWorkerPath, swContent, 'utf-8')

    console.log(`✓ Updated precache list with ${urls.length} assets`)
  } catch (error) {
    console.error('Error updating precache list:', error.message)
  }
}

createVersionFile()
updatePrecacheList()
