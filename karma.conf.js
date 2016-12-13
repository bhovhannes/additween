'use strict'

var getBaseWebpackConfig = require('./getBaseWebpackConfig')

var webpackConfig = getBaseWebpackConfig()
webpackConfig.devtool = 'inline-source-map'
webpackConfig.module.postLoaders.push({
    test: /\.[tj]sx?$/,
    loader: 'istanbul-instrumenter',
    exclude: /(browser-test-bundle\.js|\.spec|node_modules|mock|\.mock|\.stub)/
})

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha'],

        // list of files / patterns to load in the browser
        files: [
            require.resolve('expect.js'),
            'test/browser-test-bundle.js'
        ],

        preprocessors: {
            'test/browser-test-bundle.js': ['webpack', 'sourcemap']
        },

        webpack: webpackConfig,
        webpackMiddleware: {
            stats: {
                chunkModules: false,
                colors: true
            }
        },

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        reporters: ['progress', 'coverage'],

        coverageReporter: {
            dir: 'coverage/',
            // subdir: function (browser) {
            //     return browser.toLowerCase().split(/[ /-]/)[0] + '-mocha'
            // },
            reporters: [
                {type: 'text-summary'},
                {type: 'lcov'}
            ]
        },

        port: 9876,
        colors: true,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true
    })
}
