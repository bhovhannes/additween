/* eslint-env node, mocha */
'use strict'

var path = require('path')
var tt = require('typescript-definition-tester')

describe('additween typings', function() {
    it('should compile examples successfully against additween.d.ts', function(done) {
        this.timeout(10000)
        tt.compileDirectory(
            path.join(__dirname, '/typings-test-fixtures'),
            function(fileName) {
                return fileName.indexOf('.ts') > -1
            },
            done
        )
    })
})
