/* globals window */
'use strict'

function now() {
    if (window.performance && window.performance.now) {
        return window.performance.now()
    }

    if (Date.now) {
        return Date.now()
    }

    return new Date().getTime()
}

module.exports = now
