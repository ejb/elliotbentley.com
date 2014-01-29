---
layout: post
title:  "oTranscribe, twelve weeks in"
---

It's been around three months since [I launched oTranscribe](http://ejb.github.io/2013/10/03/otranscribe.html), my first major side project. Having developed an ’MVP’ over the course of around a month, I spent a weekend on branding and officially launched the app on November 2, 2013.

Bolstered by positive feedback on the [journalism subreddit](http://www.reddit.com/r/Journalism/comments/1qb5dx/im_developing_a_web_app_to_make_transcribing/), I signed up to do a talk at [Hacks/Hackers London](http://www.meetup.com/HacksHackersLondon/). I was incredibly nervous, and was almost thrown off halfway when I heard giggling - but this turned out to be in response to someone in the audience gasping: "this is amazing!"

@oTranscribe's twitter followers doubled during the course of the presentation, and the next day, Sarah Marshall of Journalism.co.uk wrote a [short piece](http://www.journalism.co.uk/news/journalist-creates-web-app-for-audio-transcription/s2/a555258/) on oTranscribe. The two combined effectively kickstarted oTranscribe, bringing in hundreds of users and spreading the word.

Subsequently, oTranscribe has been featured on [The Next Web](http://thenextweb.com/apps/2014/01/08/otranscribe-simple-useful-free-web-app-transcription), [Lifehacker](http://lifehacker.com/otranscribe-is-a-free-keyboard-friendly-transcription-1498812713) and [The Guardian](http://www.theguardian.com/media/2014/jan/22/ten-tools-for-digital-and-citizen-journalists-on-the-go), though my favourite article is probably the one that [Wannabe Hacks](http://wannabehacks.co.uk/2013/12/19/otranscribe-a-new-tool-to-help-make-transcribing-audio-easier/) published.

Beyond the English language media, oTranscribe has gained a large international audience thanks to articles written in [Spanish](http://wwwhatsnew.com/2014/01/08/otranscribe-excelente-opcion-para-pasar-de-audio-a-texto/), [French](http://korben.info/transcrire-rapidement-un-fichier-audio.html), [Swedish](http://feber.se/webb/art/291231/smidigare_transkribering_med_o/), [Dutch](http://www.manssen.nl/2014/01/28/otranscribe-handig-hulpje-bij-het-uittypen-van-een-opgenomen-gesprek/) [Korean](http://olpost.com/v/10501631), [Japanese](http://www.100shiki.com/archives/2014/01/otranscribe.html), [Chinese](http://www.lupaworld.com/article-235060-1.html) and [Russian](http://lifehacker.ru/2014/01/27/otranscribe-luchshee-reshenie-dlya-transkribirovaniya/). For reasons I don't quite understand, Japanese has become the second-most used language on oTranscribe.

More surprising to me is the wide appeal of transcription software. Journalists were the obvious target market, but it turns out that historians, language teachers, anthropologists, podcasters and even Biblical scholars also need to transcribe audio regularly. Who knew?

I've been able to quickly solve most of the support queries via Twitter and email, and even when I haven't, everyone has been incredibly polite. Occasionally users will even email or tweet at me just to say thank you - including a couple of reporters from large international newspapers.

Traffic to oTranscribe.com has fluctuated wildly, peaking whenever a big article comes out. There is, however, a core userbase emerging as the number of returning visitors grows every week. (Out of respect to users’ privacy, I don't have any data on how people are using oTranscribe beyond having Google Analytics installed.)

## Changes since launch

Besides the talk at Hacks/Hackers, occasional tweets and a well-timed email to The Next Web, I've put next to no effort into marketing oTranscribe. Luckily, happy users appear to be recommending it to friends and colleagues, letting me get on with making it even better.

Since the official christening, I've made a large number of additions:

* A text formatting panel on the right-hand side
* Word count indicator
* Export to .txt, .md and Google Docs
* Help page with FAQ
* Auto-rewind when resuming playback
* Alternative controls for Chromebooks
* A tweaked colour scheme
* Keyboard shortcuts for speed up / slow down
* On the dev side, I split the source code into multiple files and made a Gruntfile to compile it with

Some of these were based off user feedback, while others were things I'd planed but didn't feel essential for the first iteration. The biggest job of the lot was creating the export panel and the related file-generating functions.

## Future plans

When I started oTranscribe, I imagined greater interest in the source code from fellow developers. [The repo](https://github.com/otranscribe/otranscribe) now has over 30 stars on GitHub, but no pull requests and just a single issue filed. I consider this a failure on my part, and hope to make the project more accessible by cleaning up the codebase and improving internal documentation.

Next on my personal to-do list is video support and additional export features. The absence of .docx (Microsoft Word format) export support has been a major criticism in most press coverage, but unfortunately I haven't had any luck with existing JavaScript libraries. Hopefully planned support for the Word-compatible .rtf format will suffice.

Video support, meanwhile, was surprisingly easy to implement - with the notable exception of the progress bar, which I had to [write from scratch](http://GitHub.com/ejb/progressor.js). This is still being tested, but will be rolled out to the main site fairly soon.

Following the app's international growth, I also hope to have the interface translated. Watch this space. 

Even without these additions, I think oTranscribe has already proven to be incredibly useful to a large number of people; I've been blown away by the positive feedback the app has received. And for myself personally, It's been a truly fantastic twelve weeks.