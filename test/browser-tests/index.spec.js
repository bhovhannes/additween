/* eslint-env mocha */
'use strict'

var expect = require('expect.js')
var additweenModule = require('../../index')

describe('additween', function() {
    it('should export AdditiveTweening class', function() {
        expect(additweenModule.AdditiveTweening).to.be.a(Function)
    })
})
