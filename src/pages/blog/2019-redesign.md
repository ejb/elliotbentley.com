---
date: 2019-01-30
layout: ../../layouts/post.astro
title: "New year, new look for this site"
author: elliotbentley
---

Welcome to the new elliotbentley.com! This 2019 redesign combines my portfolio site (elliotbentley.com) and blog (ejb.github.io) into a one-stop shop for all of your Elliot needs. I tried not to overthink the design, taking inspiration from the clean look of mobile news apps.

[![Screenshot of homepage](/assets/2019-redesign/homepage.png)](/)

Speaking of apps, my updated [portfolio](/portfolio.html) is inspired by the way the iOS app store treats screenshots. I wanted to give the reader a good sense of each featured piece, which on mobile rarely fit on one screen, using autoplaying video and a series of screenshots. For a native-like feel, I used [CSS scroll snapping](https://css-tricks.com/practical-css-scroll-snapping/).

[![Screenshot of portfolio page](/assets/2019-redesign/portfolio.png)](/portfolio.html)

The header animation on the homepage is a bit silly, but I do love playing around with the limitless potential of graphics with HTML5 Canvas. I couldn’t think of a photo that would fill the spot, and a gradient or felt too vibrant. If interested, you can [read the source code](https://github.com/ejb/ejb.github.io/blob/e4f0f1741b65be5e2282c3c34ef534dea574a6e2/js/header-splash.js).

Under the hood: I considered moving the entire site’s architecture to a trendy isomorphic JavaScript app. But Jekyll still works great as a blogging platform and can render [JSON data files](https://jekyllrb.com/docs/datafiles/) in its templates. The pages are so light (most clocking at under 100kb) that client-side routing feels unnecessary. Best of all, it's all hosted on GitHub Pages for free. Which means the [source code](https://github.com/ejb/ejb.github.io/) is on GitHub too!
