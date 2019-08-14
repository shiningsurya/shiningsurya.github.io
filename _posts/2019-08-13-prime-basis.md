---
layout: post
title: Prime base
tags: [math]
---

# Prime base

Binary, octagonal, decimal, and hexadecimal are examples of base system. 

$$101010_2\ =\ 42_{10}\ =\ 2A_{16}$$

Now, let's have a prime-base system where a number, $$n$$, made up of digits $$..d_i..d_2d_1d_0$$ is expressed in decimal system as,

$$n = (...d_i...d_2d_1d_0)_p = \Pi_j p_j^{d_j}$$

For example,
```
10_{10} = (1, 0, 1, 0, ...)_p
           2, 3, 5, 7, 11, 13, ...
        = 2^1 * 3^0 * 5^1 * 7^0 * 11^0 * 13^0 * ....
```

##### Terminology

`prime-basis`: basis discussed here

`prime-basis-element`: These are prime numbers which build the `prime-basis` system.

`prime-basis-element-column`: These are numbers corresponding to a particular `prime-basis-element`.

##### Misnomer
In a typical base representation, place value is multiplied by the digit. And, the resultant is accumulated. For example, 

$$(abc)_{10} = 10^2 * a + 10^1 * b + 10^0 *c$$ 

However, in our prime-basis, 

$$(abc)_p = p_2 ^ a * p_1 ^ b * p_0 ^ c$$

where $$p_i$$ is the ith prime. 

Strictly speaking, calling this convention, base is incorrect. We differ from a typical basis in the following ways:

- Our radix keeps changing. 
- We raise $$p_i$$ to $$d_i$$ instead of product.
- We take product instead of summation.

We do all of this to ensure unique representation in the prime-basis.

##### Relation with prime-factorization
This `base` is closely related to prime factorization.

The uniqueness of the basis is guaranteed by the uniqueness of the prime-factorization. Hence, we employ different definitions.

Moreover, to express any number in the prime-basis we need to perform prime-factorization.

Such a thing is **ONLY** possible with prime numbers because only prime numbers guarantee uniqueness which is required for any basis representation. 


## Primes

Prime numbers in this representation become _fun_ to represent. 
$$p_m$$ becomes $$d_j = \delta_{jm}$$
Only one element is non-zero and is unity, and rest all are zero. 

## vis-a-vis with a typical decimal system

If we take a range of numbers and express them in `prime-basis` representation, and do harmonic analysis on a `prime-basis-element-column`. I wonder what we will find.

Before we do that, let's understand in a known radix representation, the decimal basis. In the decimal basis, let's look at ten's place digits on a range of numbers.

For a range from 1 to 100, 

`0....,1,.....,1,....,1,......,1,.....,1,....,1,......,1,.......,1,....,1,......,1,...0`

We note a pattern.

There are exactly $$9$$ ones equispaced forming the fundamental period. $$9$$ is not a coincidence, it is actually one less than the radix. It is also the maximum number that can
be represented by a single symbol in that radix system.

_There's a thing that goes like this: you need $$n$$ symbols for a $$n$$-radix base representation._


## The idea

If we blindly take all the `prime-basis-element-columns` and perform Fourier Transform and plot the magnitude spectrum, we see the following:

_For brevity sake, I am only showing few examples_

<img src="{{site.url}}/assets/img/primes_2.png" alt="Magnitude Spectrum of '2'"> Magnitude spectrum of 2

<img src="{{site.url}}/assets/img/primes_5.png" alt="Magnitude Spectrum of '5'">Magnitude spectrum of 5

<img src="{{site.url}}/assets/img/primes_13.png" alt="Magnitude Spectrum of '13'">Magnitude spectrum of 13 

<img src="{{site.url}}/assets/img/primes_89.png" alt="Magnitude Spectrum of '89'"> Magnitude spectrum of 89

<img src="{{site.url}}/assets/img/primes_2003.png" alt="Magnitude Spectrum of '2003'"> Magnitude spectrum of 2003

Clearly, we note a periodic structure in the magnitude spectrum. However, the phase spectrum is almost like Gaussian noise -- which doesn't make sense (plots aren't put here).

##### Observations:
- The peak magnitude goes on decreasing. Infact, when I plotted the peak-magnitude against the `prime-basis-elements`. I got a hyperbolic like plot.
- The plots _almost_ look like fractal. For the small primes, you can count the peaks which are always $$p_k -1$$. For larger primes, we can't count. 
Maybe if we do a fractal analysis, we would find something interesting.

The idea now is to estimate the periodicity for each `prime-basis-element`, account for any phase and find all the prime numbers.

Consider all the $$p_0$$ elements, meaning numbers corresponding to $$2$$. Contrary to any typical base representation, we see numbers corresponding to any $$p_k$$ be greater or less than $$p_k$$.

##### Magic of primes

There is one trick which prime numbers pull off which baffle me.
Before, we go to the star trick, let's make one point.

A number is prime iff it has **NO** factors upto itself not including one. This hints us that prime numbers are fully dependent on the past. So, they are causal. 
This is a big deal for me because it means (also in a signal processing setting) given all the prime numbers until a point, we can get find the next prime number and so on.

The trick which prime numbers pull off is this:

Think of every prime-basis-element as a wave with a certain period, **ONLY and ONLY when** all these waves vanish do we get a new prime. 

And, since, these primes are infinite, **ALL** of the ever-growing set of waves must vanish to get us never-ending primes.

Using this knowledge, given an exhaustive set of primes upto a certain point,
IF we can find the periodicities of each prime,
we can find the next prime by finding where all the *waves* vanish.

##### Bringing in rigour with the help of some math

Let $$p_0, p_1, p_2, ....$$ be the `prime-basis-elements` with corresponding digits $$d_0, d_1, d_2, ...$$.

Let $$\pi_0^m, \pi_1^m, \pi_2^m, ....$$ be the periodicities associated with the corresponding `prime-basis-elements`.
The superscript denotes different modes (as evident from the plots).

For an arbitrary `prime-basis-element`, $$p_k$$, we have $$\pi_k^m$$ where $$m$$ is ranging over finite subset of natural numbers.
For all of those modes, initial point being null (since unity is when all the primes are raised to zero), finding when the zero comes is easy, which is,
$$\frac{\eta}{2} * \pi_k^m$$, where $$\eta \in \mathcal{N}$$

Now, all that's left is, to find them periodicities. 

## Easier said than done.
