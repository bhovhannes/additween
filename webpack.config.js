/* eslint-env es6, node */
const getBaseWebpackConfig = require('./getBaseWebpackConfig')

const minifiedConfig = getBaseWebpackConfig()
minifiedConfig.entry = {
    'additween.min': './index'
}
minifiedConfig.mode = 'production'

const unminifiedConfig = getBaseWebpackConfig()
unminifiedConfig.entry = {
    'additween': './index'
}
unminifiedConfig.mode = 'development'

module.exports = [
    minifiedConfig,
    unminifiedConfig
]
