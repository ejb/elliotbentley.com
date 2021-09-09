---
pubDate: 2015-10-10
layout: ../../layouts/post.astro
title: "How Google Accelerated Mobile Pages work: best practices and Google's might"
---

You may have read about ["Accelerated Mobile Pages"](https://www.ampproject.org), or AMP, an initiative by Google to speed up the mobile web. There are several writeups, including a particularly good [Nieman Lab one](http://www.niemanlab.org/2015/10/get-ampd-heres-what-publishers-need-to-know-about-googles-new-plan-to-speed-up-your-website/), but in an attempt to get my own head around the subject, wrote up this quick FAQ.

Before we start, worth noting that I have no insider knowledge; this is all gleaned from what Google have published, plus my own speculation.

**Why are Google doing this?**

The AMP project is in response to Facebook's Instant Articles (and to a lesser extent Apple News), in which publishers put their content on a closed platform in return for fast performance. Facebook's argument for Instant Articles is that the majority of article pages load far slower than they could (and should) do.

However, this locking-in of articles into Facebook's platform is disadvantageous to its competitors, especially Google, whose business model still primarily relies on web-based advertising. Their alternative, launched this week, is "Accelerated Mobile Pages", a new open source format designed to load as fast as possible.

**What does that entail?**

As the AMP Project's website correctly states, "many performance issues are caused by the integration of multiple JavaScript libraries, tools, embeds, etc. into a page". AMP's solution is to strip out almost everything and start from scratch.

AMP HTML is a highly restricted subset of HTML, giving up a lot of control for fast load time and high performance. ([Here's an example in action](https://www.ampproject.org/how-it-works).) Essentially, it's web performance best practices taken to a crazy extreme. A custom JavaScript app called the "AMP runtime" controls rendering of the page, and the page's content must stick to the [strict spec](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md).

**OK, so how restricted is it?**

Here's just a few highlights of the AMP HTML spec:

- No custom JavaScript: no libraries, no frameworks, not even a jQuery snippet
- Custom JS is allowed only in pre-approved components
- No iframes
- No forms elements, although buttons are allowed
- Images, audio and video tags are replaced with custom versions that can be controlled by the AMP runtime
- All CSS must be in a single `<style>` tag in the page head

The above may seem limiting (and it indeed it is), but AMP HTML is nowhere near as locked-down as Facebook Instant Articles or Apple News articles. AMP HTML can be hosted on your own site, and Google's David Besbris [claims](https://googleblog.blogspot.co.uk/2015/10/introducing-accelerated-mobile-pages.html?m=1) that AMP HTML will allow "a comprehensive range of ad formats, ad networks and technologies", and subscriptions and paywalls, too.

**How does that make it faster?**

There are countless optimisations built into AMP HTML's architecture, but the main things are:

- Very small number of initial server requests
- No risk of out-of-control external JS
- All JS and media is lazy-loaded
- "Above-the-fold" content (visible without scrolling) is prioritised
- Element dimensions are known by default, so there is no "jumping" when they load in

These are all good things, and most of AMP HTML's techniques (themselves not necessarily original) are applicable to your own website.

**What custom components are available?**

To provide anything beyond basic HTML and CSS, you must use pre-approved widgets (known as "AMP HTML Components"). Besbris says that "image carousels, maps, social plug-ins, data visualizations, and videos" and "ads and analytics" are the types of things that will be supported. For now, there are only [twelve approved components](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-components.md#components), including [amp-img](https://github.com/ampproject/amphtml/blob/master/builtins/amp-img.md) in place of `<img>` tags, [amp-anim](https://github.com/ampproject/amphtml/blob/master/extensions/amp-anim/amp-anim.md) for GIF-like media, [amp-pixel](https://github.com/ampproject/amphtml/blob/master/builtins/amp-pixel.md) for tracking pageviews and [amp-twitter](https://github.com/ampproject/amphtml/blob/master/extensions/amp-twitter/amp-twitter.md) for embedding tweets.

In theory, anyone can submit a new component to the official list, but they must be approved by "the creators of the AMP component project" (which includes Google and a few other organisations). The technical specifications are relatively strict: for example, loading of external resources is controlled by the AMP runtime and the component must have a fixed, known aspect ratio at initial page load. In addition, all insets must also be open sourced with an Apache 2 license.

**Why do I have to follow Google's rules? Couldn't I just do this all myself?**

Yes! You absolutely could. None of this is magic, just good ideas. However, Google has pledged to store AMP HTML content on their own high-performance cache, further speeding up load time. Even more attractive is the idea that Google may prioritise AMP HTML content above standard web pages -- something they have not announced, but is believable considering that Google search results [already rank "mobile friendly" sites higher](https://support.google.com/adsense/answer/6196932). Presumably breaking the AMP HTML standard (and failing the [AMP Validator](https://github.com/ampproject/amphtml#the-amp-validator)) will disqualify your pages from these bonuses.

**What do you think of all this?**

As with most commentators, I'm conflicted. It's great for readers, who get their articles delivered to their devices faster. But if it becomes the norm, AMP will restrict our ability to experiment with article design and interactive content.

If you ask me, the best defence against AMP and (Instant Articles, etc) is offence: turbocharging our own websites' performance so there's no need to go along with these locked-down technologies.
