---
layout: post
title: ostream made me fall in love with C++!
tags: [cpp]
category: cpp
---

```c++
#include <iostream> // header
std::cout << "Hello world!" << std::endl;
```

Works so because `std::cout` is an `std::ostream` type object managing console output. 

And, thankfully, somewhere in the `C++` standard, we have something defined like this:

```c++
std::ostream& operator<< (std::ostream&, const char * );
```

The first argument and the return type of the function is `std::ostream`. 

This makes it possible to have something like:
```c++
std::cout << "Hello world!" << " How you doing?" << " Bye" << std::endl;
```

This is no biggie and seems pretty basic. But, what made me fell in love with C++ all over again is this:

What if we have a function like:
```c++
void Print (std::ostream& os);
```
either as a member function or a standalone function. 

Then, of course, 
```c++
Print (std::cout);
Print (std::cerr);
Print (std::cout << "Haha -- ");
Print (std::cout << "Answer to everything=" <<  42);
```
All are valid, working calls. 
Which for some probably insignificant reason, I find extremely amazing. 
