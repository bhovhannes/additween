/* eslint-env es6, node */
const path = require('path')

function getBaseWebpackConfig() {
    return {
        context: __dirname,
        mode: 'development',
        output: {
            libraryTarget: 'umd',
            library: 'additween',
            path: path.join(__dirname, 'dist'),
            filename: '[name].js',
            globalObject: 'typeof self !== \'undefined\' ? self : this',
            devtoolModuleFilenameTemplate: 'additween:///[resource-path]'
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        'eslint-loader'
                    ]
                }
            ],
        },
        plugins: [
        ]
    }
}

module.exports = getBaseWebpackConfig
