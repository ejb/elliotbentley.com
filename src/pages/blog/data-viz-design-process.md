---
pubDate: 2016-10-05
layout: ../../layouts/post.astro
title: "Designing an interactive data visualisation, from first sketch to final product"
---

![](/assets/oilpoll/oilpoll-in-situ.png)

I recently published [How Oil’s Fall Has Flummoxed Forecasters](http://www.wsj.com/graphics/oil-forecasts-flummoxed-forecasters/) (requires a subscription to _The Wall Street Journal_), an interactive graphic that explores two-and-a-half years' worth of forecasts of the price of oil. Before reaching the final design, I first crash-tested early designs on fellow graphics staffers, and later refined the design with the help of Maryanne Murray and other editors.

_Please note that the data presented in the following sketches are incomplete and, in places, inaccurate. They are presented here only to illustrate the design process._

My first sketches, made using D3, were an attempt at recreating my colleague Pat Minczeski's [original static design](https://twitter.com/georgikantchev/status/600709372126302208).

![](/assets/oilpoll/v1-dots.png)

I then began to experiment with other ways of presenting the same data.

![](/assets/oilpoll/v2-lines.png)

One idea was a 'fan' design, as used by Andrew Van Dam to chart [Fed forecasts of the interest-rate target](https://twitter.com/andrewvandam/status/578293196523991040).

![](/assets/oilpoll/v3-fan.png)

Early in the project, I was interested in displaying more than one forecast at one time. But even as fans, two became difficult to distinguish — and all at once was an unreadable mess.

![](/assets/oilpoll/v4-many-fans.png)

Rectangular fans didn't help much, either.

![](/assets/oilpoll/v5-square-fans.png)

At the Wall Street Journal, we're now beginning to favour narrative-based graphics which lead the reader through the data, as opposed to traditional 'tools' and 'dashboards', which (though useful) task the reader with finding interesting patterns on their own. My original designs used a 'stepper' design, but I was quickly convinced by others on the graphics team to adopt a scroll-based system instead, inspired in particular by [this Bloomberg graphic](http://www.bloomberg.com/graphics/2015-auto-sales/).

![](/assets/oilpoll/sketch.png)

We settled on representing the forecasts as horizontal lines, so that they became yardsticks by which to measure the actual price of oil.

![](/assets/oilpoll/v6-horizontal-lines.png)

The standard Y-axis was replaced with a minimal version to prevent visual conflict with the forecasts.

![](/assets/oilpoll/v7-horizontal-lines-lines-with-text.png)

They later gained a background fill, which had the additional bonus of providing a clear hover target for tooltips.

![](/assets/oilpoll/v8-horizontal-lines-shaded.png)

The final design includes a different colour scheme and small improvements to the axes.

![](/assets/oilpoll/v9-final.png)

If you have a WSJ subscription, you can view the completed graphic [here](http://www.wsj.com/graphics/oil-forecasts-flummoxed-forecasters/). If you don't have a subscription… why not? 😜
