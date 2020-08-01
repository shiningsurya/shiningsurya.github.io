---
layout: post
title: Perceived randomness
tags: [drunk, math]
---

Humans perception of randomness is flawed. Atleast mine.

If we are asked to populate a list of natural numbers, we would not _want_ to repeat any natural number one after the other in its immediate vicinity.

We do this automatically out of our belief of randomness that same things can't repeat in case of randomness.

Two Google results and skimming through a [science-direct](https://www.sciencedirect.com/science/article/pii/019688589190029I) article later. 
I stumbled upon this **clumping theory**.
[Book here](https://www.stat.berkeley.edu/~aldous/Book2/book.pdf). 

I only read a paragraph in the preface, though. Someday, I will read the book. 
I think I remember making a post about this crippling weakness of mine that I can't complete things.
I hope it's OK. Anywayyyyy,

So, let's wear our combinatorics hat and compute the number of ways to have perceived randomness.

## Perceived randomness

I believe that our wrong perception of randomness comes from trying to live in a finite discrete world.

In all the examples where we show that wrong bias is when we are asked to choose a strings of elements from an alphabet.
This is exactly the case of finite discrete.

SO, we define perceived randomness in an finite discrete setting.

Given an alphabet $$\mathcal{S}$$ with cardinality $$S$$, we are asked to choose $$L$$ elements in an ordered fashion. 

True randomness would mean choosing truly randomly. But, perceived randomness will add an constraint that, 
$$i^{\rm th}$$ element is not repeated when looking $$r$$ elements back.

This constraint ensures and makes us think that it's truly random since there is no clumpiness.

Naturally, $$0 \lt r \lt S$$. Otherwise, we can't satisfy the constraint or the constraint isn't a constraint.

By symmetry argument, if we don't allow any repetition when looking back $$r$$ elements, we would also not expect to see any repetitions when looking $$r$$ element ahead.
This observation is not used anywhere but it's kind of cool.

### Combinatorial

To repeat and formulate the problem:

Given an alphabet $$\mathcal{S}$$ with cardinality $$S$$, find the number of ways to populate an ordered list of $$L$$ elements taken from $$\mathcal{S}$$ with repetiton such that any element of of any list is not repeated in any of the $$r$$ digits preceding it in that list.

Assuming $$r \lt L$$ otherwise it is trivial and not discussed here.

$$0 \lt r \lt S$$ so that constraint is always valid.

For the first $$r$$ elements, it is a simple, $${}^SP_r$$. We are pretty chill since our constraint ensures for us.

At $$r+1$$ element, we can choose $$S-r$$ elements. This is why we have that constraint.

At $$r+2$$ element, in case we were doing *no repetition*, we would have $$S-r-1$$. But, we are doing this, we can in principle reuse the element in the first element, so the total allowed elements are $$S-r$$, same as above.

This continues, until we reach $$L$$. At every element, we lose one element which was used as it's predecessor but we gain one new element which was now $$r+1$$ digits before.

So the total number of ways, denoted by $$N(r)$$ marked as a function of $$r$$ is 

$$ N(r) = {}^SP_r (S-r)^{L-r}$$

Which if we simplify, 

$$ N(r) = \frac{S!}{(S-r)!} (S-r)^{L-r}$$

### Simplifying

Seeing so many factorials and powers, to makes these numbers managable, 
let's just take log and apply Stirling approximation.

Therefore,

$$ {\rm log}(N(r)) = {\rm log}(S!) -{\rm log}((S-r)!) + (L-r){\rm log}(S-r) $$

Applying Stirling approx., 

$$ {\rm log}(n!) = n{\rm log}(n) - n$$

We get,

$$ {\rm log}(N(r)) = (L-S){\rm log}(S-r) + S{\rm log}(S) - r $$

### Probablity

Let's compute the derivative of the log expression w.r.t to $$r$$ for fun.

(ellipsis to denote the derivative, I am just lazy to latex it)
$$ ... = \frac{S-L}{S-r} - 1$$

This is thankfully a linear expression in $$r$$, so we can quickly find where derivative is positive and where it is negative.

For $$L \gt r$$, the derivative is negative, and the $${\rm log}(N(r))$$ is decreasing. And otherwise.

$$L \gt r$$ is a natural thing. Otherwise, for $$r \gt L$$, it is trivial problem.

So, we showed that for our interests, the function is strictly decreasing.

Hence, the sum of function values at all $$r$$ should converge, meaning the function can be normalized.

This means, the function can have a probability sense if we can just normalize it.

Given these log probabilities, to normalize it, we just use `softmax` to make our lives easy and not suffer from any overflows.
[See this](https://timvieira.github.io/blog/post/2014/02/11/exp-normalize-trick/).

At this point, it becomes kind of clear to me that it's better to proceed further numerically.

Implementing a purely analytical softmax seems laborious process.

### Numerical example

So, let's have $$L = 100$$ taking from $$S = 10$$ with $$r \in [1, S)$$.

The probablity (after softmaxing) looks like:

<img src="{{site.url}}/assets/img/perprob.png">

The entropy is $$\sim 1e-4$$ logits.

I don't know how to interpret this since what do we even mean by probability here?
We were so obsessed with whether we could or not, that we didn't stop and ask ourselves whether we should.
Lol.

So, to just to give an idea:
with no constraint whatsoever, there are $$S^L$$ possibilities which for the above setting is about $$10^{100}$$ or the log of which is $$230.25$$.
The $${\rm log} (N(r = 1)) = 219.77$$.

So, like there is like $$4.5%$$ change when we add just a "single-no-repeat"" constraint.

### Ending notes

This is in $$1D$$. We don't know how this would look in multiple dimensions.


It would be interesting to see this in an actual survey with real participants.


Maybe this is why it is hard for humans to say like $$L = 20$$ random digits (base-10 $$S$$) because we would want $$r$$ to be as high as possible, since that's what randomness is for us.
And, if we compute how many combinations are for maximum $$r$$, i.e., $$r = 9$$, we get $$10^{14}$$ which is $$69.54%$$ less than the unconstrained number.

So, we struggle a bit. Or maybe we are just dumb.

