'use strict'

function noop() {}

function AdditiveTweeningMock() {

    this.originalMethods = {
        scheduleAnimationFrame: undefined,
        now: undefined
    }
    this.reset()
}

AdditiveTweeningMock.prototype.tick = function(duration) {
    this.time += duration
    if (this.animationStepScheduled) {
        this.animationStep()
        this.animationStepScheduled = false
    }
}

AdditiveTweeningMock.prototype.reset = function() {
    this.time = 0
    this.animationStep = noop
    this.animationStepScheduled = false
}

AdditiveTweeningMock.prototype.stubs = {
    scheduleAnimationFrame: function(cb) {
        this.animationStep = cb
        this.animationStepScheduled = true
    },

    now: function() {
        return this.time
    }
}

AdditiveTweeningMock.prototype.install = function(additiveTweening) {
    for (var key in this.originalMethods) {
        this.originalMethods[key] = additiveTweening.prototype[key]
        additiveTweening.prototype[key] = this.stubs[key].bind(this)
    }
    this.reset()
}

AdditiveTweeningMock.prototype.uninstall = function(additiveTweening) {
    for (var key in this.originalMethods) {
        additiveTweening.prototype[key] = this.originalMethods[key]
    }
    this.reset()
}


module.exports = AdditiveTweeningMock
