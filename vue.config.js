const webpack = require('webpack')
module.exports = {
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
        port: 8000,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080'
            }
        }
    }
}
