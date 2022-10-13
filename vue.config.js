const webpack = require('webpack')

const iconVersion = 22

const qBittorrentPort = process.env['QBITTORRENT_PORT'] ?? 8080
const vueTorrentPort = process.env['VUETORRENT_PORT'] ?? 8000
const proxyTarget = process.env['QBITTORRENT_TARGET'] ?? 'http://localhost'

module.exports = {
  pwa: {
    manifestPath: 'manifest.json',
    manifestCrossorigin: 'use-credentials',
    name: 'VueTorrent',
    themeColor: '#597566', //PWA title bar color ( windows 10 PWA, android web browser and PWA address bar color )
    manifestOptions: {
      icons: [
        {
          src: './icons/android-chrome-192x192.png?s=' + iconVersion,
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: './icons/android-chrome-512x512.png?s=' + iconVersion,
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: './icons/android-chrome-maskable-192x192.png?s=' + iconVersion,
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: './icons/android-chrome-maskable-512x512.png?s=' + iconVersion,
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        },

        {
          src: './icons/apple-touch-icon.png?s=' + iconVersion,
          sizes: '180x180',
          type: 'image/png'
        },
        {
          src: './icons/safari-pinned-tab.svg?s=' + iconVersion,
          sizes: '683x683',
          type: 'image/svg+xml'
        },
        {
          src: './icons/msapplication-icon-144x144.png?s=' + iconVersion,
          sizes: '144x144',
          type: 'image/png'
        }

      ],
      background_color: '#eeeeee' //background color for android PWA splash page
    },
    iconPaths: {
      favicon: './favicon.ico?s=' + iconVersion,
      favicon32: './icons/favicon-32x32.png?s=' + iconVersion,
      favicon16: './icons/favicon-16x16.png?s=' + iconVersion,
      appleTouchIcon: './icons/apple-touch-icon.png?s=' + iconVersion,
      maskIcon: './icons/safari-pinned-tab.svg?s=' + iconVersion
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
        args[0].meta = [
          {
            name: 'description',
            content: 'The sleekest looking WEBUI for qBittorrent made with Vuejs!'
          },
          {
            property: 'og:image',
            content: './icons/android-chrome-maskable-512x512.png?s=' + iconVersion
          },
          {
            property: 'og:description',
            content: 'torrent universal server for remote download.'
          },
          {
            property: 'og:title',
            content: 'WELCOME :: VUE TORRENT'
          }
        ]

        return args
      })
  },
  outputDir: 'vuetorrent/public',
  publicPath: './',
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      new webpack.EnvironmentPlugin({
        APPLICATION_VERSION: process.env['npm_package_version']
      })
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: `${vueTorrentPort}`,
    proxy: {
      '/api': {
        target: `${proxyTarget}:${qBittorrentPort}`
      }
    }
  }
}
