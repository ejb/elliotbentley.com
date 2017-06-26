---
layout: post
title:  "Designing an algorithmic trading simulator"
---

Early this year, we began planning a series of articles for WSJ around the subject of quantitative trading, which eventually became [_The Quants_](https://www.wsj.com/articles/the-quants-meet-the-new-kings-of-wall-street-1495389163) (requires WSJ subscription). One part of that plan was an algorithmic trading game, which after several months of work was published as [_Build Your Own Trading Bot_](https://www.wsj.com/graphics/build-your-own-trading-bot/) (again, requires subscription).

![](/assets/trading-bot/final.png)

The concept behind _Build Your Own Trading Bot_ was an algorithmic trading simulator that was simple enough to be accessible and easily communicate the basic concepts, while still providing enough variety in trading strategies to be fun.

One inspiration was [Quantopian](https://www.quantopian.com), a website that allows anyone with a bit of programming knowledge to write their own trading bots in Python, simulate them on historical and live data, and compete to have them trade with real money. But to create a user-friendly way to build these algorithms, I looked to [If This Then That](https://ifttt.com/), which provides a simple two-step interface to combine APIs of various web services.

My earliest sketches were already envisioning this "if X then Y" pattern:

![](/assets/trading-bot/sketch1.jpg)

I began coding a prototype, focusing initially on the underlying simulation – (which I wrote myself, and which is as a result fairly simplistic).

![](/assets/trading-bot/html1.png)

The rules are represented internally as JavaScript objects:

    {
        "action": "Buy",
        "comparison": "lessThan",
        "values": [
            {
                "type": "figure",
                "instrument": "SPX",
                "measure": "value"
            },
            {
                "type": "figure",
                "instrument": "SPX",
                "measure": "mean_month"
            }
        ],
        "sessions": 1,
        "then": ["BUY", "SPX", 10],
        "instances": 999999999999
    }

Within the simulation, these simple objects are then converted into functions for testing whether the conditions are matched. If so, the `"then"` option is executed. This allowed me to completely separate the interface from the underlying simulation, which came in handy later.

As you can see from the object, the simulation actually has more features than were eventually surfaced in the game's interface – it's possible to buy different quantities of a certain stock, to buy stocks _other_ than the S&P 500, and to have the action run a limited number of times.

Some of these were hidden behind "advanced" checkbox:

![](/assets/trading-bot/html2.png)

But let's be honest, that's an unapproachable mess. "Remove to improve" became the name of the game, and the interface was reduced to a smaller number of form inputs.

![](/assets/trading-bot/html3.png)

The preset rules at the bottom were a crutch, which eventually we removed because they felt unnecessary and antithetical to the principle of explaining the core concepts of algorithmic trading.

Another challenge was what to show once the simulation begun. Early versions had the bot announcing and explaining its decision on every tick, but this was boring when slow and unreadable when fast.

![](/assets/trading-bot/chat1.png)

I tried making it a chatbot-style scrolling feed, but that didn't solve the problem either.

![](/assets/trading-bot/chat2.png)

Eventually we moved to a more standard dashboard view, which has less personality but, I think, provides a better view of the simulation's inner workings. It took longer to decide whether the "performance over time" chart should appear during the simulation, or the "rule" charts.

![](/assets/trading-bot/html4.png)

Eventually the interface for the rules was boiled down to two dropdowns per rule (plus number inputs if needed).

![](/assets/trading-bot/final-rules.png)

The contents of the second dropdown in each rule are dynamic and only include relevant comparisons, to prevent the reader from being overwhelmed with options:

![](/assets/trading-bot/dropdown1.png)

![](/assets/trading-bot/dropdown2.png)

![](/assets/trading-bot/dropdown3.png)

This took a lot of time to debug, but learning React to write the interface helped a lot.

