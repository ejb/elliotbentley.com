---
layout: post
title:  "My first ever JavaScript library, Progressor.js"
---

For its progress bar, oTranscribe currently uses a neat little library called [Audio.js](http://kolber.github.io/audiojs/). However - as the name implies - this only supports audio files, and comes with a bunch of features not used in oTranscribe.

So as part of adding video support to oTranscribe, I wrote my own JavaScript library, **[Progressor.js](https://github.com/ejb/progressor.js)**. I'm rather proud of it.

MIT-licensed and just 2.87kb minified, Progressor.js can be used to create lightweight, stylable, scrubbable progress bar for `<audio>` and `<video>` tags. [Demos](https://github.com/ejb/progressor.js#demos) and [usage instructions](https://github.com/ejb/progressor.js#how-to-use) can be found [on GitHub](https://github.com/ejb/progressor.js).

As of v0.2.1, I consider it production-worthy and will be rolling it out to oTranscribe (along with video support) soonish. If you happen to use it in your own project, I'd [love to know](mailto:mail@elliotbentley.com).