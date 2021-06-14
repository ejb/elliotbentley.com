---
date: 2015-03-30
layout: ../../layouts/post.astro
title:  "Dynamic promo image meta tags in Labour's 'voting record' app"
---

I noticed a link on Facebook today to [web app from the Labour Party](http://www.labour.org.uk/w/tory-libdem-voting-record/) which dishes up unflattering information about your nearest Tory or Lib Dem MP. Aside from the data capture / propaganda aspect, it’s intriguing because of the customised promo image that appears when you share your result.

![Screenshot of Facebook post with customised promo image](/assets/labour-promos/fb.png)

Without any extra URL parameters, [the page has a generic promo image](http://the-meta-tag-checker.herokuapp.com/?url=http:%2F%2Fwww.labour.org.uk%2Fw%2Ftory-libdem-voting-record%2F). When the URL has an extra string on the end, eg `graphic/tory-against-01vat-02tuit-03nhs-04bed-11nmw-12jobs-13ener-14sure-15gps.png/`, [the page then has a special promo image](http://the-meta-tag-checker.herokuapp.com/?url=http:%2F%2Fwww.labour.org.uk%2Fw%2Ftory-libdem-voting-record%2Fgraphic%2Ftory-against-01vat-02tuit-03nhs-04bed-11nmw-12jobs-13ener-14sure-15gps.png%2F) as specified by the URL. The page contents appear the same to the user, but the images that appear on Facebook and Twitter are customised.

The server-side code, if written in PHP, presumably works something like this:

    <?php
    $url = $_SERVER['REQUEST_URI'];
    $url_components = explode( 'graphic/', $url );
    if ($url_components[1]) {
        $image_url = 'http://storage.googleapis.com/voting-record/'+$url_components[0];
    } else {
        $image_url = 'http://action.labour.org.uk/page/-/Images/votingrecordgeneric.png';
    }
    ?>
    <meta property="og:image" content="<?php echo($image_url); ?>">

Indeed, if we try to load up the page `http://www.labour.org.uk/w/tory-libdem-voting-record/graphic/blah-blah-blah.png/`, the [meta image URL](http://the-meta-tag-checker.herokuapp.com/?url=http:%2F%2Fwww.labour.org.uk%2Fw%2Ftory-libdem-voting-record%2Fgraphic%2Fblah-blah-blah.png%2F) becomes `http://storage.googleapis.com/voting-record/blah-blah-blah.png` (a 404).

It's a simple approach, but one I might try for myself in future interactives with a 'customised result' aspect. Could also be useful for A/B testing.