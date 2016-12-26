# additween
[![NPM version][npm-version-image]][npm-url] [![NPM downloads][npm-downloads-image]][npm-url] [![Dependencies][deps-image]][deps-url] [![Dev. Dependencies][dev-deps-image]][dev-deps-url] [![MIT License][license-image]][license-url] [![Build Status][travis-image]][travis-url] [![Coverage][codecov-image]][codecov-url]

Additive tweening implementation for smooth animations.
  
It combines concurrent animations of the same object into one smooth continuous animation.


## Why the name?

In short, **additween** = **Addi**tive + **tween**ing.

Speaking about animation, inbetweening or **tweening** is the process of generating intermediate frames between two states to give the appearance that the first state evolves smoothly into the second state.

**Additive** algorithm ensures that if some animation process starts while there are some processes still in progress, all these process will be combined to produce a single animation process.

Additive animation algorithm is described [here](http://iosoteric.com/additive-animations-animatewithduration-in-ios-8/) or in [this video](https://developer.apple.com/videos/wwdc/2014/#236).  


## Usage Example

Let's move the span smooth vertically. Create animation object and provide the options. You need to provide at least **onRender** callback:

```javascript
var additween = require('additween');

var mySpan = document.getElementById('mySpan');

function onRender(state) {
  mySpan.style.top = state.top;
}

var anim = new additween.AdditiveTweening({
  onRender: onRender
});
```

Now call **tween** method to start animation:

```javascript
var fromState = { top: 0 };
var toState = { top: 1000 };
var duration = 1000;

anim.tween(fromState, toState, duration);
```

To add new animation with another final state, just call it again:

```javascript
fromState = { top: parseInt(mySpan.style.top) };
toState = { top: 2000 };

anim.tween(fromState, toState, duration);
```

## API


#### anim = new AdditiveTweening(options)

Creates animation object. Possible options:


Name | Signature | Description
:---------|:--------|:--------
**onRender** | `function(state)` | (**required**) a callback for rendering current animation state.
**onFinish** | `function(finalState)` | Fires after the last animation is completed.
**onCancel** | `function()` | Fires if animation is canceled.
**stateReducer** | `IStateReducer` | An object, which provides `clone()` and `reduce()` methods thus implementing `IStateReducer` interface.

##### State reducers

State reducer is an object, which provides `clone()` and `reduce()` methods thus implementing `IStateReducer` interface.

```typescript
interface IStateReducer<T> {
    clone: (state: T) => T,
    reduce: (targetState: T, toState: T, fromState: T, pos: number) => T
}
```

`clone()` method is called once per each animation frame in order to get full clone of the target animation state.

`reduce()` method is called at least once per each animation frame in order to get animation state for the given tweening position `pos` - a number from [0,1] interval.  `targetState` - is the current animation state.

If there are more than one tweening processes in progress, `reduce()` will be called once for each tweening process during single animation frame.

The default state reducer is called and exported as `PlainObjectReducer`. Its implementation is below:

```javascript
var PlainObjectReducer = {
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
```

It can be used to animate states which are plain JavaScript objects with numeric values, such as `{ width: 10, height: 20 }`.



#### anim.tween(fromState, toState, duration, easing)

Animates object state. `fromState` and `toState` are expected to be the objects with number values, e.g. `{ x: 100, y: 200 }`. `duration` is animation duration in milliseconds.

`easing` is a function used for easing. It could be one of functions described here: https://gist.github.com/gre/1650294) or your own function (assuming it's input and output values are in range `[0, 1]`). Linear easing is the default.

#### anim.isTweening()

Returns `true` if animation process is currently in progress.

#### anim.cancel()

Cancels current animation.

#### anim.finish()

Puts animation into the last state.
 
 
## Mock

`additween` package provides a separate library which can be used to test animated behavior in a synchronous manner.

That library is included in `additween-mocks.js` which exports a `AdditiveTweeningMock` constructor. It can be used with any testing framework (in the usage example below we use jasmine).
 
```javascript
import {AdditiveTweening} from 'additween'
import {AdditiveTweeningMock} from 'additween/dist/additween-mocks'
 
describe('my great app', function() {
    let additiveTweeningMock = new AdditiveTweeningMock()
    beforeEach(function () {
    	additiveTweeningMock = new AdditiveTweeningMock()
        additiveTweeningMock.install(AdditiveTweening)
    })

    afterEach(function () {
        additiveTweeningMock.uninstall(AdditiveTweening)
    })
    
    it('should animate perfectly', function() {
    	// let's say clicking a button 
    	// will cause an animation with 2000ms duration
    	// we assume there is a triggerClick method defined somewhere
    	let btn = document.getElementById('byButton')
    	triggerClick(btn)
    	
    	// let time go forward by 1000ms
    	additiveTweeningMock.tick(1000)
    	
    	//now we can make assertions about animation state after half of time
    	//expect(...)
    	
    	// let time go forward by another 1000ms
    	additiveTweeningMock.tick(1000)
    	
    	//now we can make assertions about animation final state
    	//expect(...)
    })
})
```

### Mock API

#### mock = new AdditiveTweeningMock()

Creates a new instance of mocking library.

#### mock.install(AdditiveTweening)

Pass an `AdditiveTweening` constructor in order to let mock patch its animation-related methods.
 
#### mock.uninstall(AdditiveTweening)

Restores original implementation of passed in `AdditiveTweening`.
 
#### mock.tick(duration)

Moves animation clock forward by `duration` msecs. Animation `onRender` callback will be called once after that. If duration is greater or equal than total animation duration, `onFinish` callback also will be called.

#### mock.reset()

Reset animation clock to its initial state.


 
## Browser support

This will work for all browsers with `requestAnimationFrame` support (see [here](http://caniuse.com#search=requestAnimationFrame)).

For the other browsers you will need to polyfill `requestAnimationFrame`. [`raf`](https://www.npmjs.com/package/raf) package provides a good one.

 

## Thanks
Thanks to @alexkuz for the [original implementation](https://github.com/alexkuz/additive-animation).


## License

MIT (http://www.opensource.org/licenses/mit-license.php)

[deps-image]: https://img.shields.io/david/bhovhannes/additween.svg
[deps-url]: https://david-dm.org/bhovhannes/additween

[dev-deps-image]: https://img.shields.io/david/dev/bhovhannes/additween.svg
[dev-deps-url]: https://david-dm.org/bhovhannes/additween#info=devDependencies

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[npm-url]: https://www.npmjs.org/package/additween
[npm-version-image]: https://img.shields.io/npm/v/additween.svg?style=flat
[npm-downloads-image]: https://img.shields.io/npm/dm/additween.svg?style=flat

[travis-url]: https://travis-ci.org/bhovhannes/additween
[travis-image]: https://img.shields.io/travis/bhovhannes/additween.svg?style=flat

[codecov-url]: https://codecov.io/gh/bhovhannes/additween
[codecov-image]: https://img.shields.io/codecov/c/github/bhovhannes/additween.svg
