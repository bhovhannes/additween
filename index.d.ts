// Type definitions for additween [1.0.0]
// Project: additween
// Definitions by: Hovhannes Babayan <bhovhannes@gmail.com>

export = additween;

export as namespace additween;

declare namespace additween {

    export type EasingFunction = (t: number) => number

    export class AdditiveTweening<T> {

        constructor(options: {
            onRender: (state: T) => void,
            onFinish?: (finalState: T) => void,
            onCancel?: () => void
        })

        tween(fromState: T, toState: T, duration?: number, easing?: EasingFunction): number

        isTweening(): boolean

        finish(): void

        cancel(): void
    }
}

