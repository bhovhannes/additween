/// <reference path="../../index.d.ts" />

import { AdditiveTweening } from '../../index'

interface FakeAnimState {
}

let anim: additween.AdditiveTweening<FakeAnimState> = new AdditiveTweening({
    onRender: function(s) {
        return s
    }
})

export {anim}
