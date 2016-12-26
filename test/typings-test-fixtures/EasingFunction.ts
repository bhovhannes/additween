/// <reference path="../../index.d.ts" />

import {EasingFunction} from '../../index'

let fakeEasing: EasingFunction

fakeEasing = function(a) {
    return a
}

export {fakeEasing}
