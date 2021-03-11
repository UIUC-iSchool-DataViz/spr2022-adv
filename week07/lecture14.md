---
title: Brushing, Responsivity and More
layout: lecture
tags:
  - d3
  - javascript
  - python
  - bigish-data
description: >-
  Today we start adding more interactivity to our trees and talk about some speed strategies
---

## Today

 * Quick review
 * Panning and zooming
 * Brushing
 * Brushing and finding

---

## Last Time

In our last class, we had a bit of a whirlwind:

 * Using Observable
 * Using array operations in d3
 * Scaling for 

---

## Groups in d3

SVG objects can contain `g` elements.  These are "groups" and they allow for very rapid transformation of our elements.

We saw this briefly last time, but today we will use them much more, in order to apply sweeping classes of transformations.

---

## Multiple Selection

We can also utilize a brushing selector to collect points.  We will start
experimenting with this today.

You use the `d3.brush` function to create a new brush, which we then supply to
a `call` function on our containing group.  This then has an event it can
listen to, `"brush"`, which accepts a function.

This stage is where we start to see our approach break down, as we start really
hitting performance issues.  Fixing that will be next time.

---

## How do we actually select things?

When we click, how do we know what we click on?

When we brush, how do we know if we have included a particular point?

---

## Play a game

I need a volunteer!  <span class="fragment">(That's right, it's another contrived, ham-fisted demonstration you will hate!)</span>

<p class="fragment">I have thought of a number between 1 and 100, inclusive of the end points.</p>

<p class="fragment">Guess what it is.  I will tell you if you are too low or too high.</p>

<p class="fragment">It was 73!  How many guesses did it take you?  How did you do it?</p>

<p class="fragment">So, can we do something like this for finding points?</p>

---

## Play another game

I need a *different* volunteer!

<p class="fragment" data-markdown=true>

I want *you* to think of *two* numbers between 1 and 100, inclusive of the end points.

</p>

<p class="fragment">Now I will try to guess them both, and you have to tell me if I'm above or below for each.</p>

---

## We can do this

<div class="fig-container" data-style="width: 300px;" data-file="figures/quadtree.html" data-markdown=true>

We can do this in d3 using a `quadtree` object.

<p class = "fragment" data-markdown=true>

Given a set of data objects, we can create a quadtree to contain them.

</p>

<p class="fragment" data-markdown=true>

This lets us `visit` and `find` things *very* efficiently.

</p>

---

## Applying this to our trees