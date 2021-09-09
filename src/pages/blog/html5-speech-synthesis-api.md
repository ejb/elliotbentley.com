---
pubDate: 2015-06-07
layout: ../../layouts/post.astro
title: "The HTML5 SpeechSynthesis API is rubbish"
---

At [BBC newsHACK VIII](http://www.bbcnewslabs.co.uk/2015/06/04/newshack-viii-news-industry-accelerator-wrapup/) last week, I was part of a WSJ team that put together [Autocast](https://github.com/ejb/Autocast), a small hands-free app that reads out the latest news. The idea was that those commuting by car could press play and have a stream of the latest articles read out to them, potentially ordered by their personal interests.

For our proof-of-concept ([demo](http://autocast.nfshost.com) and [source](https://github.com/ejb/Autocast)), we used the Factiva API[^1] to grab a selection of articles and read them out using the [HTML5 SpeechSynthesis API](https://developers.google.com/web/updates/2014/01/Web-apps-that-talk---Introduction-to-the-Speech-Synthesis-API?hl=en).

![Autocast running on Jack's iPhone 6](/assets/autocast.jpg)

The HTML5 SpeechSynthesis API is a relatively new standard which does what it says on the tin: it allows text to be converted to (robotic) speech in-browser. It's part of the [Speech API](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html), an open standard which also includes a SpeechRecognition API[^2].

The API is, in theory, pretty straightforward: create a new instance of `SpeechSynthesisUtterance` and then read it out with `speechSynthesis.speak()`:

    var msg = new SpeechSynthesisUtterance( "Hello I am browser" );
    window.speechSynthesis.speak( msg );

Unfortunately, even in the process of putting together our simple app at newsHACK I encountered a host of annoyances:

- The API is currently [only supported in Chrome and Safari](http://caniuse.com/#feat=speech-synthesis).
- Each browser/OS combo has a [different set of available voices](http://output.jsbin.com/dadusu/3/?output), and each has a different default voice.
- On iOS Safari, speech playback must be triggered by a user action (e.g. button press). This is presumably a feature rather than a bug.

Then there are inexplicable cross-browser bugs:

- On iOS Safari the speech rate is much faster than any other browser.
- `speechSynthesis.cancel()` should clear any currently-playing or queued speech. However, on Safari v8.0.6 (OS X) it sometimes flat-out doesn't work. (For example, try skipping forward and then pausing [in the Autocast demo](http://autocast.nfshost.com).)
- On Chrome on OS X, running `speechSynthesis.cancel()` _before_ running `speechSynthesis.speak()` causes the new speech instance to be skipped. [In Autocast](http://autocast.nfshost.com), it means skipping to the next item skips through almost everything in the queue (~100 articles).

Combined, these problems are a nightmare that cost me hours of valuable time during the hackathon and could easily scupper a production-level app. The SpeechSynthesis API is a neat idea, but until these issues are addressed it isn't much more than that.

[^1]: Factiva is a Dow Jones product that provides access to articles from thousands of different publications. I'm not sure if the API is publicly available.
[^2]: A while back, I used the SpeechRecognition API in [Kanji Voice Quiz](https://kanjivoice.s3.amazonaws.com/index.htm). It worked OK with recognising set phrases -- so could work well for voice commands -- but I certainly wouldn't attempt to use it for transcribing arbitrary speech.

<script src="https://code.jquery.com/jquery-latest.min.js"></script>
<script>
$(function(){
  if (window.speechSynthesis)
    var $post = $('#post');
    var button = '<div class="play-article">▶︎ Play this article using the SpeechSynthesis API (hopefully)</div>';
    $post.prepend( button );
    $('.play-article').click(function(){
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        $(this).text('Pause playback');
      } else if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        $(this).text('▶︎ Resume playback');
      } else {        
        var msg = new SpeechSynthesisUtterance( $post.find('p, li').text() );
        window.speechSynthesis.speak( msg );        
        $(this).text('Pause playback (assuming it actually worked)');
      }
    });
});
</script>

<style type="text/css" media="screen">
/* GitHub style button */
.play-article {
  position: relative;
  display: block;
  width: 80%;
  margin: 0 auto;
  text-align: center;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: bold;
  line-height: 20px;
  color: #333;
  vertical-align: middle;
  cursor: pointer;
  background-color: #eee;
  background-image: -webkit-linear-gradient(#fcfcfc, #eee);
  background-image: linear-gradient(#fcfcfc, #eee);
  border: 1px solid #d5d5d5;
  border-radius: 3px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-appearance: none;
  margin-top: 10px;
  font-family: sans-serif;
}
.play-article:hover {
  text-decoration: none;
  background-color: #ddd;
  background-image: -webkit-linear-gradient(#eee, #ddd);
  background-image: linear-gradient(#eee, #ddd);
  border-color: #ccc;
}
.play-article:active {
  background-color: #dcdcdc;
  background-image: none;
  border-color: #b5b5b5;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);
}
</style>
