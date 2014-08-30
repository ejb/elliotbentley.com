---
layout: post
title:  "An alternative take on immersive storytelling"
---

![Screenshot of WW1 feature](/assets/ww1/screen.png)

A trend among larger publications these days is the "immersive" story, usually a long, media-rich scrolling narrative. With the Wall Street Journal's [WWI feature](http://wsj.com/ww1), a collection of 100 legacies of the First World War, we wanted to explore an alternative way to immerse readers in the subject.

At 44,000 words, the WWI feature is far longer than the average "immersive". In fact, it's longer than some novels.

![word counts of various novels compared to the WW1 feature](/assets/ww1/wordcounts.png)

*Sources: [here](http://indefeasible.wordpress.com/2008/05/03/great-novels-and-word-count/) and [here](https://web.archive.org/web/20130525112600/http://nicolehumphrey.net/word-count-for-famous-novels), neither of which are necessarily reliable.*

Despite its length, the feature has [proved to be far "stickier" than the average article](http://blog.wan-ifra.org/2014/08/01/wsj-bowled-over-by-audience-engagement-with-ww1-interactive). Readers are on average reading for around 10 minutes at a time with a bounce rate of 30%.

So how did we make something so large without intimidating readers with a wall of text?

In contrast to the current trend of stitching together photos, text, video and interactives into a single narrative, the WWI feature is split into 100 discrete chunks.

This decision was made in part due to the subject matter. To write a coherent narrative out of WWI legacies that include [chemical weapons](http://online.wsj.com/ww1/chemical-weapons), [Baltic independence](http://online.wsj.com/ww1/baltics) and [cake in Japan](http://online.wsj.com/ww1/cake-in-japan) would have been a challenge.

Instead, each is a concise 350 words, a prime position in the [Quartz Curve](http://www.journalism.co.uk/-smartden-why-quartz-does-not-publish-500-to-800-word-articles/s234/a554444/). Each is rewarding alone, but for those readers that stick around, jumping between items is a painless, disruption-free reading experience.

We wrote a custom JavaScript app to route between pages, with some PHP behind to stream data and provide static pages for SEO purposes. This technique, frequently used by modern news sites like ReadWrite and Quartz (and for years by the likes of Facebook and Twitter) provides faster loading times, helping retain impatient users.

The takeaway from this? ‘Immersives’ should be built with cutting-edge tech. But they don’t necessarily need gimmicks like parallax scrolling in order to immerse readers.

Well, except for maybe those sorting animations. Couldn't resist those.

<img src="/assets/ww1/rearrange.gif" style="width: 100%;max-width: 400px">

