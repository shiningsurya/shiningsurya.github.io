---
layout: post
title: KD problem
tags: [math]
---

## Backstory

I started playing a mobile based FPS shooting game which among different modes of gameplay has the free-for-all deathmatch. A free-for-all(F4A) deathmatch is where every player fights against everyone else and the first player to reach a set point (_number of kills_) wins the match.


Let there be $$N$$ players in a F4A deathmatch, indexed by small latin indices ($$i,j$$). When the game ends, we can calculate what I call the **Kill-Death** (KD-) matrix. 


KD-matrix is an $$N\times N$$ matrix where $$k_{ij}$$ means number of times player $$i$$ kills player $$j$$. 
Then, total kills by player $$i$$ becomes, $$K_i = \sum_{j} k_{ij}$$ and total deaths by player $$i$$ becomes, $$D_i = \sum_{j} k_{ji}$$.
Naturally, $$k_{ii} = 0$$, when player kills himself or herself (usually happens when you fail to throw a grenade or use the grenade launcher too close) no one gets any point.

Problem started off as estimating $$D_i$$ given $$K_i$$ which soon proved to be impossible. But, straining my two braincells further got me pose the problem like this:

# Problem statement

> Given sum of rows and sum of columns of a square matrix with all diagonal elements as zero, give an estimate of square matrix.



I call this the KD problem.

## Degree of freedom

An $$N \times N$$ square matrix with all diagonal elements zero has $$^N P_2$$ Degrees of Freedom (DOF).


The rowsums and columnsums each contribute $$N$$ simutaneous linear equations. 


So, effective DOF is $$^NP_2 - 2N$$.

### Trivial case

$$N=2$$ is a trivial case.


$$
KD = \begin{bmatrix}
	0 & k_{12} \\
	k_{21} & 0
\end{bmatrix}
$$


Rowsum which is $$[k_{12}, k_{21}]$$ or columnsum which is $$[k_{21}, k_{12}]$$ directly gives us the answer. 

### Base case

$$N=3$$ proves to be an enlighting case as $$^3P_2 - 2\cdot3 = 0$$, meaning effective DOF is $$0$$.


Let us have $$KD$$-matrix as follows:

$$
KD = \begin{bmatrix}
 0 & a & b \\
 c & 0 & d \\
 e & f & 0
\end{bmatrix}
$$


Rowsum is $$ [  a+b, c+d, e+f]^T $$ and columnsum is $$[c+e, a+f, b+d]^T $$. Also, we can define $$B$$ vector as $$[a+b, c+d, e+f, c+e, a+f, b+d]^T $$, which is rowsum after columnsum concatenated.


Populating our $$X$$ vector as $$[a,b,c,d,e,f]^T$$. We can define/write $$A$$ matrix as 


$$
A = \begin{bmatrix}
	1 & 1 & 0 & 0 & 0 & 0 \\
	0 & 0 & 1 & 1 & 0 & 0 \\
	0 & 0 & 0 & 0 & 1 & 1 \\
	0 & 0 & 1 & 0 & 1 & 0 \\
	1 & 0 & 0 & 0 & 0 & 1 \\
	0 & 1 & 0 & 1 & 0 & 0
\end{bmatrix} 
$$


Now, we can write a system of equations as 
$$ AX = B $$


Unfortunately, it is not that simple. $$det(A)$$ vanishes. So, we have to apply a pseudoinverse technique.

### Pseudoinverse

These notes proved to be very helpful. [Pseudo-Inverse](https://www.math.ucla.edu/~laub/33a.2.12s/mppseudoinverse.pdf)


Any square matrix $$A$$ has an unique pseudoinverse $$A^+$$. 


General solution of $$Ax=b$$ is $$x = A^+ b + (I - A^+ A) y$$ where $$y$$ brings in the additional DOFs by being an arbitrary vector with suitable dimension ($$^NP_2$$).

### General case

In a general $$N$$ case, effective DOF is non zero and hence it is an underdetermined system of linear equations. All the more reason to use pseudoinverse.


$$A$$ matrix can be generated in chucks of $$N-1$$ vectors.


To deal with rowsums, we put $$N-1$$ ones mutually exclusively in a diagonal fashion. 


Dealing with columnsums is a bit tricky. The diagonal chunks are zeros to eliminate corresponding rows from summation.
In the upper triangle portion, we populate chunks starting from $$(10...0)$$ to $$(00..01)$$ moving $$1$$ from leftmost position to rightmost position everytime we come across a principle diagonal element.


Refer to this snippet of python code:

```python
import numpy as np
# handy variable
n1 = n - 1  
# N P 2 
p  = n * n1 
# twice of n, this is the number of equations
n2 = 2*n    
# this is the A matrix
ret = np.zeros ((n2,p), dtype=DTYPE)

# rows dealing with the rowsums section
# kill section
for i in range(n):
  j = i*n1
	ret[i,j:(j+n1)] = 1

# rows dealing with the columnsums section
# death section
def ones(n,k=-1):
	"""Creates a 1D onehot encoded array"""
	r = np.zeros (n, dtype=DTYPE)
	if k != -1:
			r[k] = 1
	return r
for i in range(n,n2):
	ii  = i - n
	in1 = ii*n1
	for j in range(0,p,n1):
		if in1 == j:
			# zeros
			ret[i,j:(j+n1)] = ones(n1)
		elif  j > in1:
			ret[i,j:(j+n1)] = ones(n1,ii)
		elif  j < in1:
			ret[i,j:(j+n1)] = ones(n1,ii-1)
```

## Test case

Imagine a test with given $$KD$$-matrix as 

$$
\begin{bmatrix}
0 & 4 & 0 & 1 & 6 \\
0 & 0 & 0 & 0 & 2 \\
1 & 0 & 0 & 1 & 1 \\
5 & 3 & 4 & 0 & 8 \\
0 & 4 & 1 & 0 & 0
\end{bmatrix}
$$


Then, rowsums (or Kills) is $$[10,2,3,20,5]^T$$ and columnsums (or Deaths) is $$[6,11,5,2,17]^T$$.


Using pseudoinverse and trivial $$y$$ vector, we get, 

$$\begin{bmatrix}
0.0    & 2.98  & 1.45 & 1.78 & 4.78 \\
0.19   & 0.0   & -0.61 & -0.28 & 2.71 \\
0.04   & 0.78 & 0.0  & -0.41 & 2.58 \\
4.38 & 5.11 & 3.58 & 0.0 & 6.91 \\
1.38 & 2.11 & 0.58 & 0.91 & 0.0
\end{bmatrix}$$


The MSE turns out to be $$0.998$$ which is pretty good.

# Future things to care

1. Smart way to use the arbitrary $$y$$ which better constraints the $$KD$$-matrix.
	0. Find MSE as a function of $$y$$ or $$\lVert y \rVert$$.

	1. Optimize the $$y$$ by treating it as an regularized problem.
	2. Understand the residual with $$y$$ as a parameter. 

2. Relax traceless condition. 

3. Generalized matrix and not just a square matrix. 
