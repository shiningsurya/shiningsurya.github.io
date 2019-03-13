---
layout: post
title: Four Two Zero
tags: [me]
---

<!--# Four Two Zero-->

This post is about me doing shit stuff.

Not wasting any time in explaining the reason of `420`, instead, we will treat `420` as just a time of day as our interesting phenomenon and do soe analysis based on it. 

## Four

_Inspiration_ : [Check out this link](http://next420.apphb.com/) 

Green parts are lit.

<img src="{{site.url}}/assets/img/four_/20.png" id="fourtwozero">
<script src="{{site.url}}/assets/js/fourtwozero.js">
</script>

## Two

Every country has it's own timezone or timezones. Although, the definition of the timezones, meaning the Longitude a country may choose which in turn sets the time for the whole country need not be unique to the country. This would mean that geopolitical boundaries are not unique in the sense that two boundaries can have same time but different timezones. 

An example (which I wasn't aware of):
-	Timezones `Asia/Kolkata` and `Asia/Colombo` have the same time but for all timezones purposes they're considered different. Hence, for the purpose of this _study_ we have to merge all such regions together.

<img src="{{site.url}}/assets/img/paint1.png">

#### How do I do it?

I make use of `pytz` and `datetime` to handle all my `datetime` conversions across all timezones. _This part was easy._
I had to prepare a lot of sacrifices to actually plot. I'll be frank, it was a big pain in the ass. 
Firstly, I didn't know shit how to do that. I couldn't take country boundaries. So, I searched online and found this 
[timezone-boundary-builder](https://github.com/evansiroky/timezone-boundary-builder)
and then I got hold of the shapefiles and many Googles later, I came across `Shapely` `GeoPandas` and `Cartopy`. And, the result is the plot.

I will put the scripts in my [`randomshit`](https://github.com/shiningsurya/randomshit) repo on my Github. Look out for `420` commit. 

#### Per minute analysis


<img src="{{site.url}}/assets/img/paint2_2.png">

In an ideal setting, there should be a `lit` timezone every minute, meaning the `lit` timezones should be distributed uniformly and completely across the day. 

We note that it is not the case. 

### dank facts

-	There are $$432$$ timezones considered in this study. 
		-	Of the $$432$$ timezones, _theoretical_ lits that can happen in a single day is $$864$$, which is nothing but twice the number of timezones.
-	Max. number of simultaneous lits is $$57$$.
-	Min. duration between lits is 15 minutes.


## Zero

The effect of Daylight Savings.

At the end of the previous section, we noted a fun fact that max. number of _simultaneous lit_ timezones is $$57$$. 

Now, something I learnt which will be duly investigated in this section is: Daylight Savings end in `US/Central` one week before it ends in Mexico. So, this means, there is at least one more `420` happening. 
Sooooooooooooooooo, I re-did the script to do something like this:

{% highlight python %}
for every day:
    for every minute:
        checkFourTwoZero(day,minute)
{% endhighlight %}


_It takes a lot of time and the result is._

<img src="{{site.url}}/assets/img/paint2.png">

We note the following after observing the above plot:

|-------------|--------|--------|-------|
| Day of year | # lits `-864` | Nature | MM/DD |
|-------------|--------|--------|-------|
| 68          | +8     | Max.   | 03/10 |
| 79          | +1     | Max.   | 03/21 |
| 263         | -1     | Min.   | 09/21 |
| 306         | -8     | Min.   | 11/03 |
|-------------|--------|--------|-------|


The # lits is symmetric with $$+8,+1,-1,-8$$. But, day of year is not symmetric, 
$$79 - 68 != 306-263$$.

Timezones get more lit. They having party.


