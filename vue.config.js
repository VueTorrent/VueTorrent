const webpack = require('webpack')

const qBittorrentPort = process.env['QBITTORRENT_PORT'] ?? 8080
const vueTorrentPort = process.env['VUETORRENT_PORT'] ?? 8000
const proxyTarget = process.env['QBITTORRENT_TARGET'] ?? 'http://localhost'

module.exports = {
  pwa: {
    name: 'VueTorrent', //PWApp name
    themeColor: '#597566', //PWA title bar color ( windows 10 PWA, android web browser and PWA address bar color )
    manifestOptions: {
      background_color: '#eeeeee' //background color for android PWA splash page
    },
    workboxOptions: {
      skipWaiting: true
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'VueTorrent'

        return args
      })
  },
  outputDir: 'vuetorrent/public',
  publicPath: './',
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        APPLICATION_VERSION: JSON.stringify(
          require('./package.json').version
        )
      })
    ]
  },
  devServer: {
    watchOptions: {
      poll: true
    },
    host: '0.0.0.0',
    port: `${vueTorrentPort}`,
    disableHostCheck: true, //allows https proxy for dev server
    proxy: {
      '/api': {
        target: `${proxyTarget}:${qBittorrentPort}`
      }
    }
  }
}
