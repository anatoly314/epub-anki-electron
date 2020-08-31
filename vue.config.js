module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },
    pluginOptions: {
        electronBuilder: {
            preload: 'src/preload.js',
            nodeIntegration: true,
            mainProcessFile: 'src_main/background.js',
            mainProcessWatch: ['src_main/**/*']
        }
    }
}
