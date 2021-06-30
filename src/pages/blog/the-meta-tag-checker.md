---
date: 2015-03-24
layout: ../../layouts/post.astro
title:  "Open sourcing The Meta Tag Checker from WSJ"
---

I’ve always been surprised by the lack of a good independent validator for meta tags. Facebook has a [debugger](https://developers.facebook.com/tools/debug/) for Open Graph tags, Google has a [Structured Data testing tool](http://www.google.com/webmasters/tools/richsnippets), and Twitter has its [card validator](https://cards-dev.twitter.com/validator). However, there is no one-stop shop for all of these services, nor one that includes 'vanilla' meta tags such as the `description` or `image_src`.

**Today, The Wall Street Journal is open-sourcing [The Meta Tag Checker](https://github.com/dowjones/the-meta-tag-checker), an internal tool designed to solve this pain point.** This is a small PHP/AngularJS app which does what it says on the tin: it checks the meta tags of any web page, presenting them in an easily-scanned dashboard and flagging up any issues.

[![Screenshot of The Meta Tag Checker](/assets/the-meta-tag-checker.png)](https://the-meta-tag-checker.herokuapp.com/?url=http:%2F%2Fgraphics.wsj.com%2Fgreece-debt-timeline%2F)

The Meta Tag Checker was developed within The Wall Street Journal’s graphics department to ensure the necessary meta tags were filled out in everything we hand-coded. These little details are easy to overlook at the end of a project, but can make the difference between whether or not a reader might decide to click through from another site.

The app is controlled using a [JSON schema](https://github.com/dowjones/the-meta-tag-checker/blob/master/config/schema.json) which makes it easy to customise which tags are checked and the rules for validation. For example, you may want to ensure that the meta tag `<meta name="twitter:site" contents="..">` always contains your twitter handle. For full instructions, check out the [Readme on GitHub](https://github.com/dowjones/meta-tag-checker).

As well as an AngularJS-based frontend, The Meta Tag Checker exposes [an API](https://meta-tag-checker.herokuapp.com/api/?url=http://graphics.wsj.com/how-london-outpaces-the-rest-of-the-uk/) which can be used to check pages programmatically. In the WSJ news graphics department, we plan to use this feature to screen everything that goes through our deployment process.

There is a [live demo of The Meta Tag Checker here](https://the-meta-tag-checker.herokuapp.com) (plus an [example check](https://the-meta-tag-checker.herokuapp.com/?url=http://graphics.wsj.com/how-london-outpaces-the-rest-of-the-uk/)) which checks the most important tags out of [hundreds of potential ones](https://gist.github.com/kevinSuttle/1997924). To roll your own version of The Meta Tag Checker tailored to your needs, you can find the [MIT-licensed source code on GitHub](https://github.com/dowjones/the-meta-tag-checker). Happy checking!







