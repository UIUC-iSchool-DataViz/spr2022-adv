---
title: Explorable Explanations
layout: lecture
tags:
  - javascript
  - paperjs
  - idyll
  - glitch
description: >-
  We briefly cover some concepts with Explorable Explanations and platforms for them.
setup_script: setup_script.js
---

## Final Week of Lectures

 * Thanks!
 * Three things I didn't get to:
    * PaperJS
    * Glitch
    * Idyll
    * Svelte
 * Collecting it all together

We're going to talk about these in the context of [Explorable Explanations](https://explorabl.es/).

---

## PaperJS and simple vector graphics

Sometimes we will need to draw things that don't quite fit the model of D3 or
vega-lite.  PaperJS is a lightweight mechanism for drawing.

You can experiment online at [sketch.paperjs.org](http://sketch.paperjs.org/).

---

## PaperJS

<!-- .slide: class="fullHeight" -->

<div class="multiCol" data-markdown=true>
  <div class="col fullHeight">
    <canvas data-paper-resize="true" data-paper-script="figure_cell_spin"></canvas>
  </div>
<div class="col fullHeight" style="vertical-align: baseline;" data-markdown=true>

[PaperJS](http://paperjs.org/) is a library for vector graphics.  It has
lots of nice features, and it's pretty fast!

</div>
</div>

---

## PaperJS Primitives

We will discuss three main classes of object:

 * Geometric primitives
 * Path primitives
 * Style primitives

---

## PaperJS Primitives: Geometry

Geometric primitives describe positions, sizes, and regions.  The most common you will utilize:

 * `Point` -- 2D position, with `x` and `y` attributes.
 * `Rectangle` -- this is a region, defined by two corners.
 * `Size` -- 2D specification with `width` and `height` attributes.

All of these objects can be created in different ways and can be accessed in
different ways.  These are not in-and-of-themselves graphics!  They are used as
input to graphics primitives.

---

## PaperJS Primitives: Paths

Paths are the main method by which we draw in PaperJS.  In general, there are "paths" and there are predefined shapes.

 * Line segment paths
 * Shapes such as rects, circles, stars, ellipses
 * Curves generated from paths

---

## Making a path

http://paperjs.org/tutorials/paths/working-with-path-items/

```
var path = new Path();
path.strokeColor = 'black';
path.add(new Point(30, 75)); 
path.add(new Point(30, 25)); 
path.add(new Point(80, 25));
path.add(new Point(80, 75));
path.closed = true;

// Select the path, so we can see its handles:
path.fullySelected = true;

// Create a copy of the path and move it 100pt to the right:
var copy = path.clone();
copy.fullySelected = true;
copy.position.x += 100;

// Smooth the segments of the copy:
copy.smooth();
```
<!-- .element: style="font-size: 50%;" -->

<canvas data-paper-resize="true" data-paper-script="figure_cloned_square"></canvas>

---

## PaperJS: Events

You can connect events to functions by either assigning them to elements or defining them globally.  For example:

```javascript
var path;
function onMouseDown(event) {
	// Create a path:
	path = new Path();
	path.strokeColor = 'black';
	// Add the mouse down position:
	path.add(event.point);
}

function onMouseUp(event) {
	// Add the mouse up position:
	path.add(event.point);
}
```

---

## Glitch

We've spent a considerable amount of time discussing *static*, client-side webpages.

This will not work in all situations, though!  Sometimes you need some
server-side processing, or you need to do things that would really just be
pushing the boundaries of what's easy on the client.

[Glitch](https://glitch.com/) is designed for this!

---

## Idyll

Idyll is a [ReactJS](https://reactjs.org/) runtime/compiler that is designed
for building explorable web pages with data-binding, writeable (mostly) in
simple markdown.

You can find the Idyll "playground" at [idyll-lang.org](https://idyll-lang.org/).

Installing it locally will enable you to build and upload to github pages
*easily*.  (Unfortunately installing can be tricky!)

---

## Next Tuesday

On Tuesday we'll be presenting.  Plan to spend about ten minutes on your data and where you are at, along with your visualizations.

They do not need to be final.
