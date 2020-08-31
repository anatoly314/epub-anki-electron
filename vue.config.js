module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },
    pluginOptions: {
        electronBuilder: {
            preload: 'src/preload.js',
            nodeIntegration: true,
            mainProcessFile: 'src_main/main.js',
            mainProcessWatch: ['src_main/**/*']
        }
    }
}
