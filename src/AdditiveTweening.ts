import { getCurrentTime } from './getCurrentTime'
import { PlainObjectReducer } from './PlainObjectReducer'
import type { IStateReducer } from './PlainObjectReducer'

function noop() {}

function identity(t: number): number {
  return t
}

export type EasingFunction = (t: number) => number

type TAnimationStackEntry<T> = {
  duration: number
  end: number
  fromState: T
  toState: T
  easing: EasingFunction
}

export type TAdditiveTweeningOptions<T extends Record<string, number>> = {
  onRender: (state: T) => void
  onFinish?: (finalState: T) => void
  onCancel?: () => void
  stateReducer?: IStateReducer<T>
}

export class AdditiveTweening<T extends Record<string, number>> {
  tween: (fromState: T, toState: T, duration: number, easing?: EasingFunction) => void

  isTweening: () => boolean

  finish: () => void

  cancel: () => void

  constructor(options: TAdditiveTweeningOptions<T>) {
    let frame = 0,
      lastTargetState: T | null = null,
      currentState = null,
      animationStack: Array<TAnimationStackEntry<T>> = []

    const onRender = options.onRender || noop
    const stateReducer: IStateReducer<T> = options.stateReducer || PlainObjectReducer
    const onFinish = options.onFinish || noop
    const onCancel = options.onCancel || noop

    function filterOutdatedTargetsFromStack(time: number) {
      const filteredStack = []
      for (let i = animationStack.length - 1; i >= 0; i--) {
        if (animationStack[i].end > time) {
          filteredStack.push(animationStack[i])
        }
      }

      animationStack = filteredStack
    }

    function getCurrentState(time: number) {
      let animation, remain

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      let target = stateReducer.clone(lastTargetState!)

      for (let i = animationStack.length - 1; i >= 0; i--) {
        animation = animationStack[i]
        if (animation.end < time) {
          continue
        }
        remain = (animation.end - time) / animation.duration
        target = stateReducer.reduce(
          target,
          animation.toState,
          animation.fromState,
          animation.easing(remain)
        )
      }

      return target
    }

    function hasActiveAnimation(time: number): boolean {
      for (let i = animationStack.length - 1; i >= 0; i--) {
        const animation = animationStack[i]
        if (animation.end >= time) {
          return true
        }
      }
      return false
    }

    const animationStep = () => {
      if (lastTargetState === null) {
        return
      }

      const time = this.now()

      currentState = getCurrentState(time)

      onRender(currentState)

      if (hasActiveAnimation(time)) {
        frame = this.scheduleAnimationFrame(animationStep)
      } else {
        this.finish()
      }
    }

    /**
     * Returns true if any tweening is in process
     * @returns {boolean}
     */
    this.isTweening = function () {
      return !!lastTargetState
    }

    /**
     * Immediately sets tweening to its final state.
     */
    this.finish = function () {
      if (lastTargetState !== null) {
        onFinish(lastTargetState)

        lastTargetState = null
        currentState = null
      }
    }

    /**
     * Cancels all active tweening processes
     */
    this.cancel = function () {
      if (lastTargetState !== null) {
        if (window.cancelAnimationFrame) {
          window.cancelAnimationFrame(frame)
          frame = 0
        }
        onCancel()

        lastTargetState = null
        currentState = null
      }
    }

    /**
     * Starts new tweening process
     * @param fromState
     * @param toState
     * @param {Number} duration   Duration in ms
     * @param {Function} easing    An easing function. It should take a number from [0,1] range and return a number from [0,1] range.
     */
    this.tween = function (fromState, toState, duration, easing) {
      const time = this.now()

      const animation = {
        duration: duration,
        end: time + duration,
        fromState: lastTargetState === null ? fromState : lastTargetState,
        toState: toState,
        easing: easing || identity
      }

      filterOutdatedTargetsFromStack(time)

      animationStack.push(animation)

      lastTargetState = toState

      frame = this.scheduleAnimationFrame(animationStep)
    }
  }

  scheduleAnimationFrame(cb: () => void): number {
    return window.requestAnimationFrame(cb)
  }

  now(): number {
    return getCurrentTime()
  }
}
