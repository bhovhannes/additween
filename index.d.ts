// Type definitions for additween [1.0.0]
// Project: additween
// Definitions by: Hovhannes Babayan <bhovhannes@gmail.com>

export type EasingFunction = (t: number) => number

export interface IStateReducer<T> {
    clone: (state: T) => T,
    reduce: (targetState: T, toState: T, fromState: T, pos: number) => T
}

export const PlainObjectReducer: IStateReducer<Object>

export class AdditiveTweening<T> {

    constructor(options: {
        onRender: (state: T) => void,
        onFinish?: (finalState: T) => void,
        onCancel?: () => void,
        stateReducer?: IStateReducer<T>
    })

    tween(fromState: T, toState: T, duration?: number, easing?: EasingFunction): number

    isTweening(): boolean

    finish(): void

    cancel(): void
}

