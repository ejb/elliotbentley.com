---
layout: post
title:  "The 😃 and 😰 of a successful side project"
---

In autumn of 2013, I was working full-time as a reporter but also teaching myself to code. I found the best way to motivate myself was to attempt projects, little apps, most of which went nowhere. One was a web app to help me transcribe audio interviews called oTranscribe. I built it because I needed it in my day job, but also because I knew it might help to raise my own profile – my six-month search for a new job had not been going well.

I [launched oTranscribe in October 2013](https://ejb.github.io/2013/10/03/otranscribe.html) and shared it with friends and at local meetup groups, including [Hacks/Hackers London](https://www.meetup.com/HacksHackersLondon/events/151505172/). In a matter of months I had a new job developing interactive graphics for the Wall Street Journal, much of that thanks to oTranscribe.

I quickly got stuck into the new job. As far as I was concerned, I was done with oTranscribe. But oTranscribe wasn't quite done with me.

The app was built to be be resilient: it's open source, (still) hosted on GitHub pages, and has no server side components. And so, with relatively little involvement from me, oTranscribe continued to grow organically. Now it has over 90,000 monthly users.

The concept for [oTranscribe](http://otranscribe.com) sounds super basic without context. It's a text editor with a built-in audio player, and keyboard shortcuts for playback and time stamps. And yet, it turns out there is a huge market for that. I thought it might primarily be journalists, but a lot of people need to transcribe audio: academics, language students, podcasters, oral historians, secretaries, video caption writers... the list goes on.

At first it was exciting, to see page views grow and receive nice messages from people finding it useful. But there were bugs, and feature requests, and support emails, that I felt responsibility to act on. They began to pile up because I didn't want to work on oTranscribe anymore. I wanted to focus on other things. I didn't want to have to deal with its messy codebase. It was stressful.

Much of that feedback has come through a public email address, which has been a blessing and a curse. Of the 22 interface translations, about half have been sent by non-technical volunteers via that address. And I receive a surprising number of nice emails, saying how much they appreciate how it's free and open source. But at one point I became so stressed by bug reports and sad emails from people losing their work that I stopped checking the account for several months.

Speaking of lost work, let me tell you about [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) for a moment. It's a convenient browser feature providing persistent storage with a simple API, and it was perfect for oTranscribe – allowing me to store users' work privately and without servers. But as oTranscribe has grown, the limitations of this approach have become painfully obvious. If the user clears their cache, or switches computers, or if the cache becomes full because oTranscribe is saving a backup every five minutes (without any limit, oops): irretrievable data loss. And many, many sad users.

Sure, I could add servers and a login system. But then I’m storing sensitive user data and running servers. Or I could add integration with Dropbox and Google Drive APIs. That's a better idea, but some users like the fact that their data remains local. And I need to find the time to actually implement it.

I didn’t need to think about any of these things when I started oTranscribe. But now I have so many users, I feel the responsibility of patching, updating and enhancing the app.

Those responsibilities were made harder by the messy codebase, written by a very amateurish coder in 2013 (aka myself). I had heard that "globals are evil", so I decided to just use one big global object called `oT`.

    var oT = {};
    oT.init = function(){};
    oT.media = function(){};
    oT.lang = {};
    oT.lang.langs = [];
    oT.lang.applyLang = function(){};
    oT.export = {};
    oT.message = {};
    oT.timestamp = {};
    oT.timestamp.insert = function(){};
    oT.player = function(){};
    oT.import = {};
    oT.import.loadFile = function(){};
    oT.import.clean = function(){};
    // etc...

Clever, right? Nope. What I thought was one big global object was in fact dozens of smaller global objects. They may not have been in the global namespace, but they were still _globally available_. This anti-pattern was compounded by copious amounts of jQuery and application state being stored in the DOM.

My first attempt at tackling this technical debt was [oTranscribe2](https://github.com/oTranscribe/oT2/wiki/About-oTranscribe2), a complete rewrite of the underlying JavaScript written in ES6 with [Ractive.js](https://ractive.js.org) (not to be confused with the more-popular [React](https://facebook.github.io/react/)) complete with unit tests. But by the time I had implemented half of existing features, the code was even denser and buggier than the existing codebase! And, it turns out, unit testing is hard when it comes to browser-based audio players and text editors.

My _second_ attempt at tackling this technical debt was [Project Renovation](https://github.com/oTranscribe/oTranscribe/wiki/Project-Renovation), in which I moved existing code into a module-based ES6/Webpack environment and then refactored it piece by piece. This went far better.

After some informal beta testing, I pushed the new code to oTranscribe.com and crossed my fingers (but not before archiving the last build of the existing codebase [as "oTranscribe Classic"](http://otranscribe.com/classic/)).

So far, so good! Since this refactor, I've found it easier to fix bugs, easier to add new features, and best of all I've found more pull requests being submitted on GitHub.

If I can leave you with one final thought, dear reader, I would like to pose the question: what defines a “successful” side project? Is it one with a lot of users, like oTranscribe? Is it one that brings in revenue? One that you learn new skills from? Or is it one that, when you work on it, makes you happy?
