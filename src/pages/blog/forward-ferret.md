---
pubDate: 2016-10-03
layout: ../../layouts/post.astro
title: "Forward Ferret, an open source tool for UK election data"
---

If you want live election data in the UK, the main source is the [Press Association](http://election.pressassociation.com/index.php), which provides it as XML files accessible by FTP. As you might imagine, turning this into something easily used by a client-side interactive graphic (say, flat JSON files) requires a significant server-side setup, one which each newsroom in the UK must individually implement each time election season rolls around.

So when [Ændrew Rininsland](https://twitter.com/aendrew), who at the time was working at The Times of London, proposed working on a long-term, cross-industry solution in the vein of [Elex](https://github.com/newsdev/elex) (an unofficial wrapper for the U.S. Associated Press Election API), I jumped at the chance to collaborate.

The result of our work is **[Forward Ferret](https://github.com/OpenNewsLabs/forward-ferret)**, a modular command-line application written in Node.js. It has already been used in production for processing live results of the ‘Brexit’ referendum in June, and since then we’ve spent time preparing it for an open-source release.

Although we built Forward Ferret with the Press Association’s XML/FTP setup in mind, its flexible plugin architecture makes it useful for any scenario involving fetching, transforming and exporting data feeds.

The ISC-licensed code is hosted on the [Knight-Mozilla OpenNews GitHub organisation](https://github.com/OpenNewsLabs), which we hope will encourage news orgs from across the UK (nay, the world) to make use of it and contribute improvements.

Other reasons to get excited by Forward Ferret:

- It’s fully tested and documented
- It can be used programmatically in a Node.js script
- It’s written in ES6
- It has a funny name

## How to get started with Forward Ferret

First of all, you will need a UNIX-based system with Node.js v6.2.0 or higher installed. Then run this to install:

    npm install forward-ferret -g

If you get an error message, try the above line with `sudo`.

Forward Ferret’s plugins are specified and controlled using command-line arguments. To download XML files from an FTP server, convert it into JSON, and log the output to the command line, you would enter this:

    ferret \
      --acquire-ftp \
      --ftp-user "YOUR_USERNAME" \
      --ftp-password "YOUR_PASSWORD" \
      --ftp-hostname "FTP_SERVER_ADDRESS" \
      --parse-xml2js \
      --transform-clean-xml \
      --output-stdout

You could then use the UNIX utility [cron](https://help.ubuntu.com/community/CronHowto) to schedule that command to run every few minutes.

How about if your XML is in a local folder? No problemo. Forward Ferret’s plugin system allows you to switch out the method of acquiring files without modifying the rest of the chain. Here we’re using the `acquire-local` plugin in place of `acquire-ftp`:

    ferret.js \
      --acquire-local \
      --local-path "results/*.xml" \
      --parse-xml2js \
      --transform-clean-xml \
      --output-stdout

For a listing of all built-in plugins (and much more), check out the full [Readme](https://github.com/OpenNewsLabs/forward-ferret).
