/// <reference path="../../index.d.ts" />

let fakeEasing: additween.EasingFunction

fakeEasing = function(a) {
    return a
}

export {fakeEasing}
