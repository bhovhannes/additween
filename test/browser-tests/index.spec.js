/* eslint-env mocha, browser */
'use strict'

var expect = require('expect.js')

var AdditiveTweening = require('../../index').AdditiveTweening


describe('additween', function() {
    it('should export AdditiveTweening class', function() {
        expect(AdditiveTweening).to.be.a(Function)
    })

    it('should return final state on finish', function(done) {
        var animation = new AdditiveTweening({
            onFinish: function (finalState) {
                expect(finalState.x).to.be(100)
                expect(finalState.y).to.be(200)
                done()
            }
        })

        animation.tween({ x: 0, y: 0 }, { x: 100, y: 200 }, 200)
    })

    it('should cancels animation', function(done) {
        var animation = new AdditiveTweening({
            onRender: function (currentState) {
                expect(currentState.x).not.to.be(100)
                expect(currentState.y).not.to.be(200)
            },
            onCancel: done
        })

        animation.tween({ x: 0, y: 0 }, { x: 100, y: 200 }, 400)

        setTimeout(function () {
            animation.cancel()
        }, 200)
    })

    it('returns last animation final state on finish', function(done) {
        var animation = new AdditiveTweening({
            onFinish: function (finalState) {
                expect(finalState.x).to.be(300)
                expect(finalState.y).to.be(400)
                done()
            }
        })

        animation.tween({ x: 0, y: 0 }, { x: 100, y: 200 }, 400)
        setTimeout(function () {
            animation.tween({ x: 100, y: 200 }, { x: 300, y: 400 }, 400)
        }, 200)
    })
})
