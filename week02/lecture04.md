---
title: Canvases and Drawings
layout: lecture
tags:
  - matplotlib
  - lowlevel
description: >-
  Digging into matplotlib as a canvas
date: 2021-02-04
---

## Matplotlib, bit-by-bit

We're going to dig into [matplotlib](https://matplotlib.org/), starting with
the high-level `pyplot` interface and quickly moving on to the object-oriented
approach that lets us manage every aspect.

We will discuss:

 * Figures and canvases
 * Axes objects
 * Patches
 * Collections
 * Mapping and Mappables
 * Transforms

---

## Matplotlib Help

There are some extremely helpful matplotlib "cheat sheets" out there!

https://github.com/matplotlib/cheatsheets

Specifically:

 * [Page 1](https://github.com/matplotlib/cheatsheets/blob/master/cheatsheets-1.png)
 * [Page 2](https://github.com/matplotlib/cheatsheets/blob/master/cheatsheets-2.png)
 * [Beginner](https://github.com/matplotlib/cheatsheets/blob/master/handout-beginner.png)
 * [Intermediate](https://github.com/matplotlib/cheatsheets/blob/master/handout-intermediate.png)
 * [Tips](https://github.com/matplotlib/cheatsheets/blob/master/handout-tips.png)

---

## Options

There are three ways I encourage you to utilize matplotlib for this portion:

 1. **Using your local machine**.  Having a fully-working jupyterlab would be my preference for this portion of the class.
 2. **Using jupyterlab lite**.  This is a webassembly version of jupyterlab
    that can run most packages we will need, but which we can't quite use for
    large datasets.  I have built one at
    [uiuc-ischool-dataviz.github.io/classwork/](https://uiuc-ischool-dataviz.github.io/classwork/)
    that you can utilize.
 3. **Using Whole Tale**.  [Whole Tale](https://wholetale.org/) is a hosted,
    data-rich instance of analysis tools and visualization platforms.  We may
    use it later in the semester to make data distribution more convenient.

---

## Let's go!
