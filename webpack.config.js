/* eslint-env es6, node */
const webpack = require('webpack')

const getBaseWebpackConfig = require('./getBaseWebpackConfig')

const minifiedConfig = getBaseWebpackConfig()
minifiedConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    sourceMap: true
}))
minifiedConfig.entry = {
    'additween.min': './index'
}

const unminifiedConfig = getBaseWebpackConfig()
unminifiedConfig.entry = {
    'additween': './index'
}

module.exports = [
    minifiedConfig,
    unminifiedConfig
]
