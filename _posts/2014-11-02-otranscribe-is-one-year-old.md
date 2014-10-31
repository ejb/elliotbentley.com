---
layout: post
title:  "oTranscribe's first birthday"
---

It was a year ago today that I [launched oTranscribe](http://ejb.github.io/2013/10/03/otranscribe.html): a small web app designed to ease manual transcription of audio recordings.

oTranscribe had already been online for a couple of weeks at that point (the [first commit](https://github.com/oTranscribe/oTranscribe/commit/73c2ec1353be41b838887bb2e93e830cd4b2aa4c) was on October 5), but with the working title ’Transcriber’ and barely any promotion[^1]. Since then, repeat users (the number of visitors to oTranscribe.com who have visited at least once already) has risen from zero to almost 3,000 per week[^2].

![weekly visitors](/assets/otranscribe-1/pageviews.png)

oTranscribe is being used in over 100 countries around the world. Here’s a random sample of visits from between May and August this year visualised using CartoDB:

![selection of users around the world](/assets/otranscribe-1/map.png)

This growth is almost entirely viral; there hasn’t been any major press coverage of oTranscribe since February.

Growing far slower is oTranscribe’s feature list. However, I’ve added since January:

- Spanish, French, Dutch, Japanese and Polish translations[^3]
- Support for YouTube videos
- A backup/history feature
- [Progressor.js](https://github.com/ejb/progressor.js) in place of AudioJS

It may not seem like much compared to the splurge of features added in the [first three months](http://ejb.github.io/2014/01/29/otranscribe-twelve-weeks.html). It's partly because I've been busy with an exciting new job, but also because getting the interface translated is surprisingly time-consuming. (Did you know, for example, that the Polish word for 'words' has more than one plural form? I do now.) Mind you, it would have been twenty times as difficult without help from oTranscribe's [generous translators](https://github.com/oTranscribe/oTranscribe#translations).


## Year Two

Today, I’m rolling out a new import/export file feature. Transcripts are no longer locked in a single browser: they can be downloaded as a [.OTR file](LINK TO SPECIFICATION), sent to a friend, and opened on another computer.

With this, I _think_ I’ve implemented the majority of “must-have” features. My to-do list for the second year of oTranscribe is:

- Add more translations, and expand existing translations
- Add self-hosting instructions
- Try to make the whole thing a bit less buggy
- Export transcript to subtitle format feature
- Integrate a cloud-based sync (perhaps with Google Drive or Dropbox)

If you have any suggestions for additions, or have spotted something needing fixed, I recommend [opening an issue on GitHub](https://github.com/otranscribe/otranscribe/issues) or [emailing me](mailto:otranscribe@elliotbentley.com).

Here's to many more years of oTranscribe.

[^1]: The first ever user, as far as I’m aware, was my friend Graham Matthews. (Congrats, Graham.)
[^2]: That bump in January was mostly due to [a post on Lifehacker](http://lifehacker.com/otranscribe-is-a-free-keyboard-friendly-transcription-1498812713) and [another on Japanese blog 100shiki](http://www.100shiki.com/archives/2014/01/otranscribe.html).
[^3]: In addition, Hebrew, Chinese, Italian and German translations have been submitted but not reviewed — if you’re fluent in any of these languages, please [get in touch](mailto:otranscribe@elliotbentley.com)!