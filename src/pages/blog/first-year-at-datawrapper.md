---
pubDate: 2023-10-31
layout: ../../layouts/post.astro
title: "Things I've learnt in my first year at Datawrapper"
author: elliotbentley
---

About a year ago, I left my job in The Wall Street Journal's graphics department for something a bit different: working as a full-time software developer at [Datawrapper](https://www.datawrapper.de/), a company of approximately twenty people.

As you might expect after eight years working in news, I've had to learn (and unlearn) a few key skills at a software company. Even with what I thought of as pretty decent programming chops, my first year in the tech industry proper has taught me plenty.

## Byline addiction is real

At risk of stating the obvious, the pace of life in a software company is considerably slower than a newsroom. No longer do I wake up, check the headlines, and immediately start considering if and how we might cover those stories visually. It's been a pleasant change, even if I sometimes feel that Fear Of Missing Out when really big news breaks. It gets weaker by the day, thankfully.

The other big, obvious change is that (aside from the occasional [Weekly Chart](https://blog.datawrapper.de/category/weekly-charts/)) my job no longer involves publishing work with my name attached, and all the cachet and stress that comes with it. The thrill of putting something out into the world and hoping that people like it is an addiction — with the highs of accomplishment often followed by a crash in mood as one tries to follow up with something even better.

## Software development is 75% tidying up

One of the things I was most excited for in a new job was building long-term software. Interactive news graphics might get worked on for a few weeks or months at most, and their half-life is rarely longer than twenty-four hours. On that kind of schedule, there’s no point in investing much time in high-quality code, architecture and testing.

With a codebase as mature as Datawrapper's, those things are high priorities. We have a huge swathe of existing features and options that we need to check with detailed test suites, which I expected; but even more than that, we spend a lot of time refactoring code to be less repetitive, and making things consistent between the chart types, for example. It's unglamorous but important work.

Come to think of it, this isn't so different from journalism: One has to pay close attention to getting the little details right, without losing sight of the broader narrative.

## Svelte.js is ready for the big leagues

I'm a big fan of [Rich Harris](https://github.com/Rich-Harris)' work in journalism and software. And, after using Svelte for a year, I'm pleased to say that it lives up to the hype, forming a robust backbone for Datawrapper's UI and, more recently, its SVG render code.

Sometimes I miss the efficiency of being able to define a new React component in a few lines, but Svelte's highly readable markup more than makes up for it. My only beef is that Svelte files stretching into a hundred or more lines of code can be difficult to read. Maybe [the syntax changes in Svelte 5](https://svelte.dev/blog/runes) will help.

## TypeScript is a blessing and a curse

We've been gradually introducing TypeScript into the Datawrapper codebase along with Svelte. Catching type-sensitive bugs is helpful, but it's the VSCode “Intellisense” integrate that makes it a huge productivity booster — autocomplete that you don't have to second-guess. The downside, of course, is having to occasionally twist your code into strange shapes to appease the type checker. And resist the temptation to suppress those errors by plonking `as any` everywhere.

## Git rebase isn't so scary

At Datawrapper, we keep our Git history clean using liberal use of the rebase feature — somewhat essential when you have a dozen or so people committing to the same repo. Git Rebase literally rewrites history to move older commits from one branch onto the top of newer ones.

Despite having used Git for over a decade, and being familiar with the typical pull request workflow, I'd never encountered this before! The process was a bit nerve-wracking at first, but I feel fairly confident messing with time after some coaching from my colleague Gregor and help from [Sublime Merge](https://www.sublimemerge.com/).

## It's important to make an effort to leave the home office occasionally

Software development is a much more solitary job than journalism, especially since I'm working fully remotely. Visiting Datawrapper's Berlin office and spending time with coworkers IRL is always rewarding, but it's a bit far to travel regularly.

So to get a little more human contact day-to-day, I've been trying to make an effort to attend events after work (particularly [Journocoders](https://journocoders.com/), which I am so pleased to see still going). My sofa does always look a lot more comfortable than a long commute on the Tube, mind you.
