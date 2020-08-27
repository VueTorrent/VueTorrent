module.exports = {
    outputDir: 'vuetorrent/public',
    publicPath: './',
    transpileDependencies: ['vuetify'],
    configureWebpack: {
        devtool: 'source-map'
    },
    devServer: {
        watchOptions: {
            poll: true
        },
        host: 'localhost',
        port: 8000,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080'
            }
        }
    }
}
