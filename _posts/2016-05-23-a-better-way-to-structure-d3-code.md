---
layout: post
title: "A better way to structure D3 code"
---

_Note: This blog post is aimed at beginner-to-intermediate users of the [D3 JavaScript library](https://d3js.org). If you want to skip straight to the good stuff, check out the [accompanying example on bl.ocks.org](https://bl.ocks.org/ejb/79698ac221dbcff637b1930a387a9416)._

Code written using D3 is difficult to manage. Even in a simple line chart, there will be almost a dozen important variables such as (deep breath): width, height, margins, SVG, x-scale, x-axis generator function, x-axis SVG group, x-scale, y-axis generator function, y-axis SVG group, line generator function, path element and (most important of all) a data array/object. And that's just the bare minimum.

Because most of these need to be accessible at several points in a script, the temptation is to structure the entire thing in one giant function. Many examples on [bl.ocks.org](http://bl.ocks.org) are essentially unstructured, which makes the concepts nice and clear but in real-world code can lead to an unmanageable mess.

Credit where credit is due: I was introduced to this idea by my colleague [Jason French](https://twitter.com/jasonleefrench/). I've since adopted it and use it regularly. This is my attempt at formalising it.

## A solution: object-oriented programming

Think of a D3 chart or visualisation as a ‘widget’ on the page. This provides a number of benefits:

- All of the chart’s related properties and functions are kept in a single place, both in script files and during execution.
- Multiple instances of the chart can exist on the same page without conflicting.
- External controls (buttons, sliders, etc) can easily modify the chart without risking breaking anything.

Here's what we're aiming for: being able to create the chart as if it were a Highcharts/C3-style thing.

```js
var chart = new Chart({
    element: document.querySelector('.chart-container'),
    data: [
        [new Date(2016,0,1), 10],
        [new Date(2016,1,1), 70],
        [new Date(2016,2,1), 30],
        [new Date(2016,3,1), 10],
        [new Date(2016,4,1), 40]
    ]
});
```

Which we could then modify like so:

```js
// load in new data
chart.setData( newData );

// change line colour
chart.setColor( 'blue' );

// redraw chart, perhaps on window resize
chart.redraw();
```

## A quick introduction to constructor functions

Before we move onto the D3-specific stuff, it's worth learning how to use constructor functions. This is a useful general-purpose pattern for JavaScript code used frequently in both JavaScript's native functions and in third-party libraries.

You may already be familiar with:

```js
var d = new Date(2016,0,1);
```

This creates a new object stored in `d`, which is based on (but does not replace) the original `Date` object. `Date` is a constructor, and `d` is an _instance_ of `Date`.

We can make our own constructor functions like so:

```js
var Cat = function() {
    // nothing here yet
};
Cat.prototype.cry = function() {
    return 'meoww';
}
```

The `.prototype` bit defines an _instance method_, which will be available to each instance of the `Cat` constructor. We would call it like so:

```js
var bob = new Cat();
bob.cry(); // => 'meoww'
```

Inside of the constructor function, there is a special variable called `this` which refers to the current instance. We can use it to share variables between instance methods.

```js
var Cat = function(crySound) {
    this.crySound = crySound;
};
Cat.prototype.cry = function() {
    return this.crySound;
}
```

In this case, we are customising the new cat's `crySound`.

```js
var bob = new Cat('meoww');
var noodle = new Cat('miaow');
bob.cry(); // => 'meoww'
noodle.cry(); // => 'miaow'
```

Because each instance is a new object, this style of coding is called _object-oriented programming_.

There's a lot more to constructor functions, and if you want to learn more I recommend reading CSS Tricks' *[Understanding JavaScript Constructors](https://css-tricks.com/understanding-javascript-constructors/)* and Douglas Crockford's more hardcore *[Classical Inheritance in JavaScript](http://www.crockford.com/javascript/inheritance.html)*. 

## A chart as a constructor function

Instead of `Cat` -- which is obviously a fairly useless constructor -- we could instead make a constructor for a D3 chart:

```js
var Chart = function(opts) {
    // stuff
}
Chart.prototype.setColor = function() {
    // more stuff
}
Chart.prototype.setData = function() {
    // even more stuff
}
```

Here's a live example of a chart made using a `Chart` constructor. Try clicking the buttons below and resizing the window.

<!--

The following code is duplicated from the accompanying bl.ocks.org instance
https://bl.ocks.org/ejb/79698ac221dbcff637b1930a387a9416

-->

<p>
    <!-- load in D3 and Chart constructor scripts -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js"></script>
    <script type="text/javascript" src="https://cdn.rawgit.com/ejb/79698ac221dbcff637b1930a387a9416/raw/71a460fca822dfec93fbdd0fa5d4d43fe090a147/chart.js"></script>

    <style>
    /* a little bit of CSS to make the chart readable */
    .line {
        fill: none;
        stroke-width: 4px;
    }
    .axis path, .tick line {
        fill: none;
        stroke: #333;
    }
    </style>

    <!-- here's the div our chart will be injected into -->
    <div class="chart-container" style="max-width: 1000px;"></div>

    <!-- these will be made useful in the script below -->
    <button class="color" data-color="red">red line</button>
    <button class="color" data-color="green">green line</button>
    <button class="color" data-color="blue">blue line</button>
    <button class="data">change data</button>

    <script>
    // create new chart using Chart constructor
    var chart = new Chart({
    	element: document.querySelector('.chart-container'),
        data: [
            [new Date(2016,0,1), 10],
            [new Date(2016,1,1), 70],
            [new Date(2016,2,1), 30],
            [new Date(2016,3,1), 10],
            [new Date(2016,4,1), 40]
        ]
    });

    // change line colour on click
    d3.selectAll('button.color').on('click', function(){
        var color = d3.select(this).text().split(' ')[0];
        chart.setColor( color );
    });

    // change data on click to something randomly-generated
    d3.selectAll('button.data').on('click', function(){
        chart.setData([
            [new Date(2016,0,1), Math.random()*100],
            [new Date(2016,1,1), Math.random()*100],
            [new Date(2016,2,1), Math.random()*100],
            [new Date(2016,3,1), Math.random()*100],
            [new Date(2016,4,1), Math.random()*100]
        ]);
    });

    // redraw chart on each resize
    // in a real-world example, it might be worth ‘throttling’ this
    // more info: http://sampsonblog.com/749/simple-throttle-function
    d3.select(window).on('resize', function(){
        chart.draw(); 
    });

    </script>
</p>
    
And here's the corresponding JavaScript for the chart. To see how it's being used, [read the full code on bl.ocks.org](https://bl.ocks.org/ejb/79698ac221dbcff637b1930a387a9416).

<p>
    <script src="https://gist.github.com/ejb/79698ac221dbcff637b1930a387a9416.js?file=chart.js"></script>
</p>

A few things worth emphasising here:

- Each instance method fulfils a specific purpose. Only some of them are ‘public’ and are meant to be called externally.[^1]
- Some public methods (in this case, `setColor`) don't require redrawing the entire chart. Others, like `setData`, do.
- Only variables used in other instance methods are added to `this`.
- `draw` needs to be able to work both on initial load and on updates.
- If you wanted to have method instances which trigged animations (for example, [transitioning axes](https://bl.ocks.org/mbostock/1166403)), you would need to make `draw` more complex and not simple wipe the element clean each time.

_Update 30 May 2016:_ Here's an example of [a more complicated chart using the constructor pattern](http://bl.ocks.org/nstrayer/37a503dd1db369a8f7e3ce21757e19ee), courtesy of Nick Strayer.

## Watch out for anonymous functions

The only catch with using constructor functions is that the value of `this` will change inside of anonymous functions -- which, in D3, are everywhere.

What do I mean by that? Inside of `Chart` or a `Chart.prototype` method, `this` refers to the `Chart` instance, as expected.

```js
var Chart = function(opts) {
    // here, `this` is the chart
}
Chart.prototype.setColor = function() {
    // here, `this` is still the chart
}
```

However, the value of `this` can change when inside an anonymous function:

```js
Chart.prototype.example = function() {
    // here, `this` is the chart
    var line = d3.svg.line()
        .x(function(d) {
            // but in here, `this` is the SVG line element
        });
}
```

There's a simple solution, which is to load `this` into a variable called `_this`:

```js
Chart.prototype.example = function() {
    var _this = this;
    var line = d3.svg.line()
        .x(function(d) {
            // in here, `this` is the SVG line element
            // but `_this` (with an underscore) is the chart
        });
}
```

Hardly difficult to get around, then, but worth keeping in mind. Some people prefer to use `that` instead of `_this`, which is just as good.[^2]

## Rules to live by

To keep the `Chart` function's responsibilities from spiralling out of control, I try to stick by these rules:

- A chart's appearance should not change if you call its `draw()` function without changing anything else. Or, to put it in programmer jargon: they must maintain state.
- A chart does not load its own data. Data is passed _to_ it. Ideally already formatted as nice friendly arrays.
- A chart does not affect anything outside of its parent element. Pass in callback functions as arguments, if necessary.
- A chart’s internal functions should each be kept short. A good length is “not taller than your screen”. (Alas, this rule is easily broken.)
- Make a new constructor for a different type of chart (`LineChart`, `BarChart`, etc), rather than relying on "if" statements.[^3]

## It works, honest

I've used this pattern several times now in graphics published on WSJ.com, including [ECB Meets, Euro Reacts](http://graphics.wsj.com/ecb-meeting-euro-reaction/) and [The World’s Safest Bonds Are Actually Wild Risks](http://graphics.wsj.com/government-bond-duration-calculator/). In both cases, the constructor pattern made managing these dynamically-updating charts a breeze. The rest of the code, on the other hand...

Ps. If you enjoyed this, you might like my previous blog post on [how my JavaScript coding style has changed since 2014](http://ejb.github.io/2016/05/09/how-my-code-has-changed-since-2014.html).

_Thanks to [Amelia Bellamy-Royds](https://twitter.com/ameliasbrain) for providing feedback on a draft of this post._

[^1]: In this case, there is no practical difference between the object’s ‘private’ and ‘public’ methods -- they are all accessible from outside of the object. For a list of ways to make pseudo-private or actual private methods, see [this article](https://developer.mozilla.org/en-US/Add-ons/SDK/Guides/Contributor_s_Guide/Private_Properties).

[^2]: `_this` and `that` are both fine, but `self` is not a good option because it may conflict with [`window.self`](https://developer.mozilla.org/en/docs/Web/API/Window/self). Another option, if you're using ES6 (the newest version of JavaScript, which is only supported in the very latest browsers), is ["fat arrow functions"](http://www-db.deis.unibo.it/courses/TW/DOCS/JS/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions.html), which always inherit the value of `this`.

[^3]: If you're feeling especially brave, they could [inherit from a parent object](https://davidwalsh.name/javascript-objects). I’ve never tried this myself.