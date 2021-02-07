const webpack = require('webpack')

const qBittorrentPort = process.env['QBITTORRENT_PORT'] ?? 8080
const vueTorrentPort = process.env['VUETORRENT_PORT'] ?? 8000

module.exports = {
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
    proxy: {
      '/api': {
        target: `http://localhost:${qBittorrentPort}`
      }
    }
  }
}
