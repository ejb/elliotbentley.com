---
layout: post
title:  "What I learnt running a live election graphic"
---

[![Screenshot of live election graphic](/assets/election-2015.png)](http://graphics.wsj.com/uk-election-results-2015/)

For this year’s UK general election, I developed (with some help from Jason French) a fairly ambitious [live results page](http://graphics.wsj.com/uk-election-results-2015/) for the Wall Street Journal.

Although I’ve handled a live election page before, this was much more challenging due to both its scale and complexity, with data coming from several sources and being displayed in many different formats.

Before I crash out for twelve hours’ sleep (I've only slept three hours over the past 36) I wanted to jot down a few takeaways from the night.

## Plan, plan and plan some more

I have a bad habit of getting overly-excited about a new project and diving into coding it before I’ve had a chance to think it through.

For this interactive, I nailed down a few key aspects early, such as a modular structure allowing chart elements to be swapped in or out with ease — allowing the page to evolve through the night and providing a get-out clause when things went wrong.

However, I overlooked several important aspects: I didn’t consider how difficult it might be to generate a dataset of results over time, and I also completely forgot that the page would need to live-reload every few minutes, leading to buggy auto-refresh functionality that would, um, occasionally crash the tab.

Similarly, I should have planned the server-side aspect far in advance; I ended up running it on my laptop rather than a server due to leaving hosting to the last minute.

Next time I work on something this big, I’ll try to take stock of all big, obvious requirements in advance, rather than pushing them further down the to-do list.


## Get your timing right

I had a panic around 11pm over the interactive's dynamically-generated timestamps. It had suddenly dawned on me that the timestamps were based on the client time (ie, the time set on the reader’s computer). That meant that readers visiting from other timezones would see completely wrong timestamps — unacceptable, especially in a time-sensitive feature such as this one.

Complicating things was the multitude of formats I was working with: dates were coming in as UNIX timestamps, [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) strings or just as objects generated using `Date.now()`. They were then being output as specially-formatted strings (we have strict style guides on dates at WSJ), sometimes in the context of a Highchart.

Fixing all of this, especially in the middle of the night with a strict deadline, was difficult. Luckily, I got it all refactored in the nick of time. My key breakthrough was calculating the client timezone offset using:

    // the difference in hours between GMT time and client’s time
    var offset = new Date().getUTCHours() - new Date().getHours();
    
Of course, had I not been panicking I might have realised this already exists in native JavaScript:

    // the difference in minutes between GMT time and client’s time
    var offset = new Date().getTimezoneOffset();

Oh well. Really, I should have just saved myself the hassle and used a proper time-formatting JavaScript library like [moment.js](http://momentjs.com).


## Keep code in a clean structure

I originally organised my code into separate objects for each chart element on the page. Each of these contained several functions for building the chart. For example:

    var poundChart = {
        init: function(){ /* ... */ },
        processData: function(){ /* ... */ },
        update: function(){ /* ... */ },
        formatTime: function(){ /* ... */ }
    }

However, once I had written a couple of thousand lines of code (much of it lengthly Highcharts objects) this became a tangle of buggy, duplicative functions.

I refactored this mess into four discrete objects:

- **fetch**: functions that return datasets (by ajax or otherwise)
- **process**: functions that take data in one format, and return another
- **render**: shortcuts for Handlebars templates[^1], and functions that interact with the DOM
- **util**: general-purpose functions, like timestamp formatting

This structure worked well and I’ll definitely be reusing it in future projects.


## Hope for the best, expect the worst

Hours before the data began to roll in, my boss sent an email which concluded — and I’m paraphrasing here — something will always go wrong, so just be ready for it.

Indeed, many things went wrong, such as the timezones issue, last-minute changes to hosting plans, and strange bugs in the “seats over time chart" that delayed publishing for around 30 minutes. Having a backup plan for everything and being flexible about exactly how the interactive will look is essential.

As the main character in Angela Carter’s *Wise Children* says: “Hope for the best, expect the worst.” It’s a motto to live by when it comes to live interactives. And, well, election results too.



[^1]: After some truly awful debugging sessions during this project, and an embarassing error in an earlier election interactive, I have concluded that, no matter how tempting it may be, building HTML out of concatenated strings can only end in tears. Use [Mustache](https://github.com/janl/mustache.js/).

