'use strict'

module.exports = {
    clone: function (obj) {
        var target = {},
            key
        for (key in obj) {
            target[key] = obj[key]
        }
        return target
    },

    reduce: function (targetState, toState, fromState, pos) {
        var key
        for (key in targetState) {
            targetState[key] -= (toState[key] - fromState[key]) * pos
        }
        return targetState
    }
}
