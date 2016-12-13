/* eslint-env node */
var webpack = require('webpack')

var getBaseWebpackConfig = require('./getBaseWebpackConfig')

var minifiedConfig = getBaseWebpackConfig()
minifiedConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true
}))
minifiedConfig.entry = {
    'additween.min': './index'
}

var unminifiedConfig = getBaseWebpackConfig()
unminifiedConfig.entry = {
    'additween': './index'
}

module.exports = [
    minifiedConfig,
    unminifiedConfig
]
