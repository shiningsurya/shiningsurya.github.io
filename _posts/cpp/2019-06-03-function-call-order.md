---
layout: post
title: Function call argument order of evaluation
tags: [cpp]
category: cpp
---


# How does arguments of a function call are evaluated?

Program logic goes into the function iff all the arguments are evaluated. However, the order of the evaluation is tad-bit ambigious.

This ambiguity presents itself when we're using order dependent stuff in our function call arguments.

To display this, I am making use of prefix/postfix operators.

I remember seeing a SO answer which I didn't bookmark so.....

```c++
void foo3(int first, int second, int third);
void foo2(int first, int second);
void foo1(int first);
```
are the functions we will using. `foo?` just prints out the arguments.

`vector<int> v{1,2,3,4,5,6}` is the main data element which we will play with.

## Post-increment 
```c++
int id = 0;
foo3(v[id++], v[id++], v[id++]);
foo2(v[id++], v[id++]);
foo1(v[id++]);
```
Running this yields:
```
IN FOO3
 First: 3	 Second: 2	 Third: 1
IN FOO2
 First: 5	 Second: 4	
IN FOO1
 First: 6	
```
Seems like the function arguments are evaluated in the reverse order. But, I wouldn't bet on it.

## Pre-increment 
```c++
id = 0;
foo3(v[++id], v[++id], v[++id]);
foo2(v[++id], v[++id]);
foo1(v[++id]);
```
Running this yields:
```
IN FOO3
 First: 4	 Second: 3	 Third: 2
IN FOO2
 First: 6	 Second: 5	
IN FOO1
 First: 4113	
```

Just like in the previous case, function arguments are evaluated in the reverse order.

It seems like in `F001` function call, we get a garbage value and not a **SIGSEGV** because of how
the vector works. 
Vector reserves space for number of elements of powers of two.


## Trivial but guilty
This is a trivial point but the author is guilty of wasting some good amount of time in debugging why the filterbank writing logic wasn't working as intended.
The author is guilty of using arrays and postfix operators as arguments to the relevant function.




