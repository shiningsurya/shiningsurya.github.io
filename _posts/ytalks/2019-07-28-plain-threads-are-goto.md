---
layout: post
title: Plain threads are the GOTO of today's computing
tags: [cpp, hpc, ytalks]
category: ytalks
---

_These are my notes after watching Hartmut Kaiser's keynote talk in C++14 con. [youtube link](https://www.youtube.com/watch?v=4OCUEgSNIAY&t=4051s)_


## Thread
Although seems like there is no textbook definition of a thread, the talk mentions that thread has four properties:

Four properties:
- A single flow of control
- A program counter marking what's currently being executed
- An associated execution context. (stack, register set, static and dynamic memory local vars)
- A state (initialized, pending suspended terminated)

The talk also divulges into `std::thread` and `execution agent` but I felt they were only included for complete-ness sake and I just give these bullet points as is:

_all references are from N4231: Torvald Riegel: Terms and definitions related to threads_

- Thread of execution: "single flow of control within a program" (S1.10p1)
- std::thread "that can be used to create and manage threads"
- Execution agent: In (S30.2.5.1p1) "an entity such as a thread that may perform work in parallel with other execution agents."

## Parallelism v/s concurrency
Taking from this [SO Answer](https://stackoverflow.com/questions/1050222/what-is-the-difference-between-concurrency-and-parallelism):
- Concurrency: When two or more tasks can start, run, and complete in overlapping time periods. It doesn't necessarily mean they'll ever both be running at the same instant.
- Parallelism: When tasks _literally_ run at the same time.

- So these two points kind of make draw out this analogy:
		Parallelism is like SIMD,SPMD
		Concurrency is like MPMD

- The talk delves into this by saying:
				- Parallelism is independent
				- Concurrency relates to the same global state.

Which I feel seems like a more contrived way of saying things, but, it captures the essense in whole.

_captial for emphasis and not shouting_

**WE SHOULD MAKE CONCURRENCY HIDDEN AWAY UNDER THE HOOD**

**LIKE, WE DON'T USE GOTO STATEMENTS ANYWHERE BUT COMPILER STILL USES AND IT'S STASHED AWAY UNDER THE HOOD**

**WE HAVE TO DO THE SAME WITH THREADS**

It seems like Parallelism is better. I don't get this. And, the speaker advocates that parallelism is much much better than concurrency.
		

## Threads are harmful
Edward E. Lee's paper (2006) 'The problem with threads'
-	Threads are not composable

_Are you multi-threaded? Only one way to find out._ It's like how __device__ kernel can't launch another __device__ kernel. That luxury is missing here. 
What if I launch a team of threads and if each of the thread launches other threads. _ayy lmao, we just over-subscribed_.

OpenMP offers a modicum of luxury here. We can set the max number of threads we want to spawn, but that's super super local. 
Library itself has to offer a way to set the number of threads which for the miniscule amount of time my brain thought about it, seems like it'll be pain.

- Can you disable or control the parallelism? 

_I want to have 0/2/4/8 threads_. 

OpenMP lets you control this. 

- Guaranteed load balancing

This is a problem everywhere, _hpx, omp, ompi_. 

This is in the hands of the problem statement or the algorithm.

- Minor issues:
		- No 'standard' way of 'returning' values from threads.
				- _pointer, pointer, pointer_ 
				- requires explicit synchronization _bc we don't know when our thread is ready_.
		- Threads make concurrency explicit. 
				- Parallelism > concurrency.
		- THREADS ARE SLOW
				- _1 thread, 10 ms overhead_


## The 4 Horsemen of the Apocalypse: SLOW
- Starvation:
		- Insufficient concurrent work to maintain high utilization of resources
- Latencies:
		- Time-distance delay of remote resources access and services
- Overhead:
		- Work for management of parallel actions and resources on critical path which are not necessary in sequential variant
- Waiting for contention resolution
		- _Things are hella busy so you gotta wait lassy_

## Cue the Amdahl's Law (strong scaling)
Avoid serial part like it's plague.

## That overhead graph OMG

_I so want to replicate the graph T - T_

Overheads are the most dangerous. Let's do a gedanken experiment.
		If we have a work for 10seconds, and we vary number of threads, what's the speed-up we get for a fixed overhead of threads?

		work = 10 seconds = work_per_thread * num_threads

		Graph x-axis is num_threads: 10mil to 1. The graph is convex.

		_When we are the left end of the graph, we have ~ 10mil threads, the overhead to maintaining, book-keeping easily overpowers the speedup._

		_When we are the on the right end of the graph, we have ~ 1 threads, the talks says the contention kicks me_, which is actually puzzling. 
		Since, the performance should be almost identical to sequential execution.

[Screen grab from here](https://youtu.be/4OCUEgSNIAY?t=1573)

<img src="/assets/img/ytalks/plain_threads_overheads.png" width="1100" height="500"  alt="Overheads">

## HPX 
- A general purpose runtime system for applications of any scale
- A well defined, new execution model (ParalleX)
- HPX is wow.

## Execution tree.
- Writing HPX code becomes like drawing flowchart, where `std::future` is the argument and it also is the result.
- I am not going to post more about it but actually, will be using HPX to do 1D/2D FDTD Maxwell's equation simulation. 
- In a later blogpost, _lmaaaaooo_


