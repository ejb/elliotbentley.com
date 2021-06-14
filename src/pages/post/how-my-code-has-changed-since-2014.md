---
date: 2016-05-09
layout: ../../layouts/post.astro
title: "How my JavaScript has changed after two years at the Wall Street Journal"
---

_This blog post was previously titled ‘2014’s JavaScript versus today’s (or: How my old code holds up today)’, but three weeks later I decided I didn't like that name._

It's been over two years now since I started at the Wall Street Journal -- back when I went from an amateur enthusiast programmer to a 'professional'.

One of the most tangible results of these two years is that my code is cleaner and clearer than ever before. Most of my projects have been bespoke client-side apps with short shelf lives, which have provided opportunities to experiment and quickly learn what works (and what doesn't!).

Here's how the code I wrote for interactive graphics in early 2014 compares to the code I write now.

## Overall structure

As my projects have grown in scope and ambition, so too has the corresponding code and, in turn, the difficulty of keeping it under control. Learning how to structure my code in a clean, logical and modifiable-on-a-tight-deadline manner has been a long process.

**Then:** I would typically have one big function called on `window.ready`, which would itself contain smaller functions. There would still tend to be plenty of globals lying about the place, especially for configuration.

**Now:** I try to keep primary functionality in an object called `App`, and then separate any substantial code related to specific functionality. For example, I typically move code for charts written with D3 -- which tend to consist of at least several hundred lines -- into constructor objects (a nice clean design pattern I picked up from my colleague Jason French).

Here's an abstracted version:

```js
var App = {};
App.config = {
    // keep config variables up top
};
App.start = function() {
    // do stuff
}
App.createCharts = function(data) {
    var chart = new Chart({
        data: data
    });
    // etc
}

var Chart = function(opts) {
    this.data = opts.data;
    this.createSVG();
    // etc
}
Chart.prototype.createSVG = function() {
    // d3 stuff goes here
}
```

_Update: By popular request, I've since written a [full blog post on using the D3 constructor pattern](http://ejb.github.io/2016/05/23/a-better-way-to-structure-d3-code.html)._

**Next:** We've yet to universally adopt a build system for interactive graphics at WSJ, but I've been experimenting with module-loading systems such as [RequireJS](http://requirejs.org) and [Webpack](https://webpack.github.io) in my own time. They both allow one to split out JS code into smaller files and then `require` them inline -- as one can in PHP, Python or basically any other halfway-sane language -- and encourages cleaner, self-contained code.

## Functions

As a beginner, I assumed there's only one way to write functions. They're just blocks of code, innit? Over the past two years I've started to learn more specialised patterns.

**Then:** My functions would often serve many purposes at once, such as processing data (typically with huge and/or multiple `for` loops) and appending HTML in one go.

Occasionally they would take long lists of arguments, which can then be confusing to modify later. For example, if I wanted provide a height when running `makeArc` in this one case, which argument would I change?

```js
// Taken from: http://graphics.wsj.com/european-elections-2014/
makeArc('current-poll-arc', eudata, "Tot", (1.65));
```

Trick question! `height` is actually controlled by a fifth argument, which is absent in this case.

**Now:** I try to give each function a clear purpose. Sometimes it can be a 'pure function', which takes an input and returns an output without modifying anything else (a good model for 'data wrangling' functions). Or a function might return a [closure](https://developer.mozilla.org/en/docs/Web/JavaScript/Closures), which allows me to keep all related variables inside of the original function. Other times I will avoid writing functions altogether and rely on battle-tested libraries such as [Moment](http://momentjs.com), which handles date interpretation, querying, modification and formatting.

For functions that take more than a couple of arguments, I pass in objects, which make it far clearer what each argument is:

```js
// Example from https://github.com/WSJ/scroll-watcher
scrollWatcher({
    parent: '.outer',
    onUpdate: function( scrollPercent, parentElement ){
        $('.inner').text('Scrolled '+scrollPercent+'% through the parent.');
    }
});
```

**Next:** ES6, the next version of JavaScript, provides a few nice features such as [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), a better way of writing constructor objects. The downside is that, since most browsers don't yet suppose these cutting-edge features, it's necessary to ‘transpile’ (‘convert’ in awful tech-jargon) the code into older language using an automated tool.

## Loading data

**Then:** I would keep frequently-changing data in JSON files (loaded in using `jQuery.getJSON`), and historical and config data inline in script files. I'd often paste spreadsheets into [Mr Data Converter](https://shancarter.github.io/mr-data-converter/) to turn them into JSON format.

**Now:** I prefer to keep everything in JSON files, and use [`jQuery.when`](https://api.jquery.com/jquery.when/) to determine when each `jQuery.getJSON` has finished. Instead of using Mr Data Converter, I often write a Node script to convert from CSV to JSON, which has the added benefit of moving data processing out of the browser.

**Next:** I've considered using the reporter-friendly [ArchieML](http://archieml.org/) data format for projects with large amounts of copy, but I've found it a pain to set up with Google Docs and the syntax isn't as straightforward as I'd like. I would love to be convinced it's worth using. (Actually, in the process of writing this article, I just came across Quartz's [aml-gdoc-server](https://github.com/Quartz/aml-gdoc-server), which could be the exactly what I need.)

## Processing data

Aka 'data wrangling', this is the bit of the code that turns an imported JSON or CSV file into a sane data format compatible with Highcharts, Mustache or whatever one's code needs to work with.

**Then:** As mentioned earlier, I would process data using great big `for` loops, pushing the results into a new array or object (and sometimes appending HTML on the fly!).

Here's a particularly nasty example. With code like this, it'd be easy to introduce a correction-worthy mistake.

```js
// Taken from: http://graphics.wsj.com/european-elections-2014/
$('.curr-party').each(function() {
    $this = $(this);
    var party = $this.find('.curr-party-shortname').text();
    for (var i = 0; i < eudata.length; i++) {
        if (eudata[i].Group === party) {
            $this.find('.seats').text(eudata[i].Tot);
            var change = eudata[i].Tot - eudata[i].current;
            if (change > 0) {
                change = '+' + change;
            }
            $this.find('.change').text(change);
        }
    }
});
```

The data would sometimes be stored within [HTML data attributes](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes), rather than an in-memory JS object; which in retrospect is utter madness.

**Now:** I've recently started using [ES5 array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Iteration_methods) such as `forEach`, `filter` and `map`, now [supported in all current browsers](http://caniuse.com/#feat=es5).

```js
// Taken from http://graphics.wsj.com/ecb-meeting-euro-reaction/
data.forEach(function(row,i){
    row.date = moment(row.date,'DD/MM/YY HH:mm');
    row.values = row.values.sort(function(a,b){
        return a.time - b.time;
    });
});
data = data.filter(function(r){
    return (r.date.isAfter(showMeetingsSince));
});
```

These are initially a little harder to get one's head around, but eventually result in much clearer code than huge `for` loops with tonnes of `if` statements. Only once these operations are finished do I begin to start generating HTML.

**Next:** If I were to start using ES6, I could make use of ['fat arrow functions'](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#Arrow_functions) in my anonymous functions (of which there are many when using said array methods). Fat arrow functions not only save a few characters, but also maintain the scope of their parent, which is very handy when using object-oriented programming involving [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this).



## Rendering HTML

**Then:** In a [2014 blog post](http://ejb.github.io/2014/10/05/news-app-process-2014.html), I wrote that "Handlebars, a dynamic templating library, can be useful on larger projects".

Much of the time, however, I would concatenate strings and use jQuery very liberally. Here's a relatively benign chunk of concatenation code -- but if it required an `if` statement, this would get hairy fast:

```js
// Taken from http://graphics.wsj.com/scotland-referendum-results/
var data = d.overall;
var ryes = Math.round(data.yesPercent*10)/10;
var rno = Math.round((data.noPercent)*10)/10;
html = '<div class="inner-bar" style="width: '+data.yesPercent+'%;"></div>';
html += '<div class="inner-bar-two" style="width: '+data.unknownPercent+'%;"></div>';
html += '<div class="yes-text">Yes: <b>'+ryes+'%</b> <div class="vnumber">'+data.yesVotes+' votes</div></div>';
html += '<div class="no-text">No: <b>'+rno+'%</b> <div class="vnumber">'+data.noVotes+'</div></div>';
$('.nationwide-results .outer-bar').html(html);
```

**Now:** I've since learnt the error of my ways: concatenating more than a short string is a recipe for disaster and should be avoided at all costs. Instead, I use the [Mustache](https://github.com/janl/mustache.js/) library with abandon, introducing it early in the project before the temptation to start concatenating becomes too strong. 

Here's a Mustache template from [Barrel Breakdown](http://graphics.wsj.com/oil-barrel-breakdown/):

```handlebars
<p class="country-name">{{country}}</p>
<p class="country-fact">{{factType}}: {{fact}}</p>
<p class="article-text">{{plainText}}</p>
<p class="more-info">Show full breakdown</p>
<div class="more-info-chart" style="display: none;"></div>
```

And the corresponding JavaScript:

```js
var template = $('#country-item-template').html();
var model = {
    country: country,
    text: newText,
    plainText: originalText,
    factType: factType,
    fact: fact.toFixed(1)+'% of barrel cost'
};
$t.html( Mustache.render(template, model) );
```

I've gotten into the habit of using Mustache over Handlebars because (a) it has a smaller page-weight, (b) the templates can be rendered server-side using the Mustache PHP library if necessary and (c) I don't need most of Handlebars' fancy features.

**Next:** Everyone and their mum has been going mad for [React](http://reactjs.com/), a JavaScript library developed by Facebook which is difficult to learn but supposedly reduces complexity in much larger components. Personally, I'm more interested in the similarly-named [Ractive](http://www.ractivejs.org/) library, which is essentially Handlebars with two-way data binding, although I've yet to find a project to use it with.

## Libraries

**Then:** I used to keep libraries to a an absolute minimum, worrying about their impact on page weight. At most, I would use the CartoDB JavaScript library (lazy-loaded in), Handlebars and/or D3 if necessary.

**Now:** For better or worse, I now worry less about page weight (much of which is ad scripts and web fonts anyway) and more about saving time and reducing the risk of bugs: hence, more liberal use of libraries. Moment.js and Mustache are essentials.

**Next:** If I were to use a module loader such as Webpack, it might make sense to use a package manager such as npm; but with so few dependencies for each project, it's still more practical to keep them within the repository.


## Charts

My early projects tended to be big on maps, whereas nowadays my projects tend to be focused around charts. My general approach has evolved from trying to do as much as possible with just HTML & CSS, to [Highcharts](http://www.highcharts.com/) (and sometimes awkward hacks) to actually getting to grips with [D3](https://d3js.org/).

**Then:** Mostly relying on HTML & CSS, with some slightly-wobbly D3. Looking back, it's almost as if I was intentionally avoiding traditional bar and line charts -- perhaps because I had no idea how to code them.

**Now:** A mix of tools: HTML & CSS for basic horizontal bars, Highcharts for simple charts and D3 for complex designs. Now that I feel comfortable with all three approaches, it's just a matter of choosing the one most appropriate for the project.

**Next:** Even with D3's useful scale, axis and line generators, I still end up rewriting similar code for each project in order to match our style guide. I've been thinking about writing some sort of D3 boilerplate for myself.

## Maps

**Then:** When I joined WSJ, we had just taken out a [CartoDB](https://cartodb.com/) subscription. It had a slick interface and worked on mobile; what's not to like? Let's use it everywhere!

**Now:** After some struggles with the CartoDB JS API, I realised that it used [Leaflet](http://leafletjs.com/) as a base -- and so *that* library has since become my go-to when I'm in need of an interactive map (indeed, it's the basis of [Pinpoint](http://dowjones.github.io/pinpoint/)). For [choropleth maps](https://en.wikipedia.org/wiki/Choropleth_map), shapefiles rendered standalone using D3 often look better than on a CartoDB basemap.

**Next:** We've been making heavy use of [ai2html](http://ai2html.org/) over the past year, especially for maps. Unless they're showing live results or a particularly dense dataset, most maps don't really need to be interactive. Using a custom version of ai2html, our in-house cartographers can apply their existing expertise to produce maps far better-looking and easier to read than those made with Leaflet or otherwise.

## Hat-tip to basically everyone

I didn't discover this stuff in a vacuum. Many of these tips I picked up from colleagues (or from reading their code). Some are inspired by books like [Eloquent JavaScript](http://eloquentjavascript.net) and [JavaScript: The Good Parts](http://shop.oreilly.com/product/9780596517748.do); some from sites like [CSS Tricks](https://css-tricks.com), [A List Apart](http://alistapart.com) and [the webdev subreddit](https://www.reddit.com/r/webdev); and also newsletters such as [HTML5 Weekly](http://html5weekly.com). For more resources, [Front-end Rescue](https://uptodate.frontendrescue.org) is a great list.

## So that's me...

How about your code? Do you follow similar patterns, or something radically different? Am I missing out on some good tricks? If so, please do [tweet at](http://twitter.com/elliot_bentley) or [email](mailto:mail@elliotbentley.com) me.
