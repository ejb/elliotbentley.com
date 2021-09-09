---
pubDate: 2019-10-30
layout: ../../layouts/post.astro
title: "Designing a unique dataviz for ‘Women’s Work’"
author: elliotbentley
---

For the story [_What ‘Women’s Work’ Looks Like Now_](https://www.wsj.com/graphics/what-womens-work-looks-like/), Soo Oh and I explored Labor Department data to show the changes (or lack thereof) in the workforce.

The lead visual was this dataviz. I had a lot of fun designing it and wanted to document my process.

![Final dataviz on wsj.com](/assets/womens-work-dataviz/final-dataviz.png)

Early on in the process, I set out to design a graphic that summarised the trends in a single, eye-catching design. Plotting all 329 occupations as a fever chart was an unreadable mess.

![Plotting all occupations resulted in a mess](/assets/womens-work-dataviz/mess.png)

I started in [Observable](https://observablehq.com), exploring a ‘floating bars’ idea to show the change from 1970 through to 2018. Although pretty, it didn’t seem to tell the reader much.

![Floating bars concept](/assets/womens-work-dataviz/floating-bars.png)

At that point, I went back to paper and sketched out some ideas — keeping in mind that I couldn’t be sure of the final shape of the data.

![Random sketches](/assets/womens-work-dataviz/random-sketches.jpg)

It occurred to me there were multiple trends worth calling out: occupations where women had become the majority, where the reverse was true, and where the ratio between men and women had stayed static; and more broadly the shift towards a more integrated workforce. I wanted to check the size of these groups to inform my pencil sketches. Switching back to d3, I started collecting the messy lines into buckets.

![Buckets in d3](/assets/womens-work-dataviz/buckets-in-d3.png)

Getting closer, but not very pretty. I switched to paper again and stumbled on the idea of a ranked, grouped slope chart.

![Slope chart pencil sketch](/assets/womens-work-dataviz/slope-chart-sketch.jpg)
![A more developed slope chart pencil sketch](/assets/womens-work-dataviz/slope-chart-sketch-2.jpg)

I then tried to recreate the design with actual data. The code for this is a mess, but it works! My original thought was it could be super tall to incorporate as many labels as possible.

![Slope chart early version](/assets/womens-work-dataviz/slope-chart-early.png)

Ultimately, Soo and I decided to chart only the high-level occupation groups due to sizeable gaps in the data. Luckily the chart design was flexible enough to accommodate that.

![Final dataviz on wsj.com](/assets/womens-work-dataviz/final-dataviz.png)

[The full piece](https://www.wsj.com/graphics/what-womens-work-looks-like/) goes into a lot more detail and includes a lookup tool.
