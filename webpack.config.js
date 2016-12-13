/* eslint-env node */
var webpack = require('webpack')
var path = require('path')

function getBaseConfig() {
    return {
        context: __dirname,
        output: {
            libraryTarget: 'umd',
            library: 'additween',
            path: path.join(__dirname, 'dist'),
            filename: '[name].js',
            devtoolModuleFilenameTemplate: 'additween:///[resource-path]'
        },
        devtool: 'source-map',
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'eslint-loader',
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin()
        ]
    }
}

var minifiedConfig = getBaseConfig()
minifiedConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true
}))
minifiedConfig.entry = {
    'additween.min': './index'
}

var unminifiedConfig = getBaseConfig()
unminifiedConfig.entry = {
    'additween': './index'
}

module.exports = [
    minifiedConfig,
    unminifiedConfig
]
