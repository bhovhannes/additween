# additween
Additive tweening implementation for smooth animations.
  
It combines concurrent animations of the same object into one smooth continuous animation.


## Why the name?

In short, **additween** = **Addi**tive + **tween**ing.

Speaking about animation, inbetweening or **tweening** is the process of generating intermediate frames between two states to give the appearance that the first state evolves smoothly into the second state.

**Additive** algorithm ensures that if some animation process starts while there are some processes still in progress, all these process will be combined to produce a single animation process.

Additive animation algorithm is described [here](http://iosoteric.com/additive-animations-animatewithduration-in-ios-8/) or in [this video](https://developer.apple.com/videos/wwdc/2014/#236).  


## Usage Example

Let's move the span smooth vertically. Create animation object and provide the options. You need to provide at least **onRender** callback:

```
var additween = require('additween');

var mySpan = document.getElementById('mySpan');

function onRender(state) {
  mySpan.style.top = state.top;
};

var anim = new additween.AdditiveTweening({
  onRender: onRender
});
```

Now call **tween** method to start animation:

```
var fromState = { top: 0 };
var toState = { top: 1000 };
var duration = 1000;

anim.tween(fromState, toState, duration);
```

To add new animation with another final state, just call it again:

```
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

#### anim.tween(fromState, toState, duration, easing)

Animates object state. `fromState` and `toState` are expected to be the objects with number values, e.g. `{ x: 100, y: 200 }`. `duration` is animation duration in milliseconds.

`easing` is a function used for easing. It could be one of functions described here: https://gist.github.com/gre/1650294) or your own function (assuming it's input and output values are in range `[0, 1]`). Linear easing is the default.

#### anim.isTweening()

Returns `true` if animation process is currently in progress.

#### anim.cancel()

Cancels current animation.

#### anim.finish()

Puts animation into the last state.
 
 
## Browser support

This will work for all browsers with `requestAnimationFrame` support (see [here](http://caniuse.com#search=requestAnimationFrame)).

For the other browsers you will need to polyfill `requestAnimationFrame`. [`raf`](https://www.npmjs.com/package/raf) package provides a good one.

 

## Thanks
Thanks to @alexkuz for the [original implementation](https://github.com/alexkuz/additive-animation).
