---
layout: post
title: Hear pulsars
tags: [me, astronomy]
---

# Hear pulsars

Pulsars have characteristic integrated pulse profile which you'd get after folding _many_ pulses. 

I got inspired by this tweet and thought "hey, can we hear integrated pulse profiles?"

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">SOUND UP! 🔊<br><br>If your ears can hear what <a href="https://twitter.com/NASAHubble?ref_src=twsrc%5Etfw">@NASAHubble</a> sees it might sound something like this from <a href="https://twitter.com/system_sounds?ref_src=twsrc%5Etfw">@system_sounds</a>: <a href="https://t.co/0yV0599Akg">pic.twitter.com/0yV0599Akg</a></p>&mdash; NASA Goddard (@NASAGoddard) <a href="https://twitter.com/NASAGoddard/status/1103113024284561410?ref_src=twsrc%5Etfw">March 6, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


# Hear them there

### J1713+0747
<audio controls>
		<source src="{{site.url}}/assets/wav/j1713_1.wav" type="audio/wav">
		Your browser doesn't support the audio element.
</audio>
This is like shot noise. `J1713+0747` pulse profile is like that of a delta function. So, shot noise makes sense. 
<img src="{{site.url}}/assets/img/j1713.png" >J1713+0747 pulsar profile
### J2145-0750
<audio controls>
		<source src="{{site.url}}/assets/wav/j2145_1.wav" type="audio/wav">
		Your browser doesn't support the audio element.
</audio>
It sounds like a two stroke engine. There are auto rickshaws in India (that's where I am from) and this sound resembles that. 
Well, in all fairness, `J2145-0750` has two peaks, so I am not suprised that it sounds like 2T engine.
<img src="{{site.url}}/assets/img/j2145.png" >J2145-0750 pulsar profile
### J1939+2134
<audio controls>
		<source src="{{site.url}}/assets/wav/j1939_1.wav" type="audio/wav">
		Your browser doesn't support the audio element.
</audio>
This legit sounds like my trimmer. I am not kidding. 
<img src="{{site.url}}/assets/img/j1939.png" >J1939+2134 pulsar profile

## How did I do that?

I took data from the CSIRO Data portal which hosts _millions_ of Pulsar observations. I took Frequency, Time crunched profiles of three pulsars:

- J1713+0747
- J2145-0750
- J1939+2134

An integrated pulse profile which is usually shown on a $$[0,2\pi]$$ axis and which can be linearly mapped to $$[0, P]$$ where $$P$$ is period of the pulsar. 

Human ear can hear sounds with frequencies ranging from `20 Hz` to `20,000 Hz`. So, I map $$[0,Nbin]$$ to $$[20, 20000]$$ linearly.

In other words, I map ever every bin to a frequency and use the intensity value at that frequency as weight. 

Mathematically,

$$p(t) = \sum_{i=0}^{N_{bin}  P[i] * cos(2\pi t freq[i]) $$

### caveats

- I use cosine which makes this kind of like Discrete Cosine Transform. My reasoning is that since integrated pulse profile is purely real. Sine terms don't come in.

- I initially thought of using Fourier Transform and the property of Inverse Fourier Transform of real signal (in frequency domain) is real and even. But, then I would have to take care of the appropriate frequency scaling and do many many manipulations since integrated profile isn't actually `frequency domain` stuff anyway. So, I did something which is called _Extended Fourier Transform__ and manually did the transform.

- To define a fudicial point in the integrated pulse profile, and to make the `result` same across all the pulsars. I rotate the profile so that maximum intensity exactly lies in the middle of the pulsar. 

- To also standardize, I hardcoded the length of the sound from pulsar to be 2 seconds. I couldn't think of any other method to make the length sensible and charactistic to each pulsar. 

#### Crux of code
{% highlight python %}
# ip is integrated profile
rip = np.roll(ip, ip.size//2 - ip.argmax())
freq = np.linspace(20, 20e3, rip.size)
for i, f in enumerate(freq):
    ret = ret + rip[i] * np.cos(2*np.pi*f*t)
{% endhighlight %}

## twas fun
