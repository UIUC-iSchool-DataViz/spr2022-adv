---
title: More with p5js
layout: lecture
tags:
  - overview
  - concepts
  - p5js
description: >-
  We dig a little bit deeper into p5js, showing how to rotate, translate, and
  push/pop matrix transformations.  We'll also take a look at getting input
  from a webcam and from input elements.
date: 2021-01-28
---

## Paper Review

Today I will be reviewing "Crameri, Fabio, Grace E. Shephard, and Philip J. Heron. 2020. “The Misuse of Colour in Science Communication.” Nature Communications 11 (1): 5444. https://doi.org/10.1038/s41467-020-19160-7."

Paper review assignments will be issued soon.

---

## More P5JS

Did anyone experiment with p5js during the intervening time?

Topics for today:

 * [p5js reference](https://p5js.org/reference/)
 * iterating over variables
 * Input elements
 * `rotate` and `translate`
 * `push` and `pop`
 * Camera input

---

## Iterating over variables

We can define an `Array` in p5js, and then we can iterate over it.

```javascript

let myObjects = [];

function draw() {
  for (let i = 0; i < myObjects.length; i++) {
    // do something with myObjects[i]
  }
}
```

Note: there are other methods of iterating over arrays in javascript, some that
are more intuitive, but this is the one we will utilize for now.

---

## Scaling

We'll discuss scaling in more depth at a later time, but this function will be extremely handy for us:

`map(value, currentStart, currentStop, desiredStart, desiredStop)`

This will take a value that currently ranges from `currentStart` to `currentStop` and scale it to instead reside between `desiredStart` and `desiredStop`.

(What can we use this for?)

---

## Input Elements

Input (and other HTML) elements can be added to the sketch by calling one of the family of `create` functions:

 * `createSlider()`
 * `createButton()`
 * `createCheckbox()`
 * `createSelect()`
 * `createRadio()`
 * `createColorPicker()`
 * `createInput()`
 * `createFileInput()`

---

## Input Element Attributes

Each of these will have multiple different methods that can be called on it to define the options, the behavior, and the appearance.  In common, they will mostly share these sets of attributes to modify:

```javascript
let slider;
function setup() {
  slider = createSlider(0, 255, 100);
  slider.position(10, 10);
  slider.style('width', '80px');
}

function draw() {
  let val = slider.value();
  background(val);
}
```

Typically, calling `.value()` will return the value, and you are able to set the position and style.

---

## Experiments: Part 1

 * Add a color picker that determines the background color.
 * Add a second color picker that changes the color of a circle drawn at the mouse position.
 * Add a slider that changes the circle radius.

---

## Experiments: Part 2

 * Draw a line between the center of the canvas and where the mouse is.
 * Draw a set of lines, connected at vertices defined by double-clicks
 * Turn this from a line to a curve, based on input selector

---

## Matrices, Rotations and Translations

p5js allows you to specify rotations and translations, which will then be applied to all drawn items until the rotation/translation matrix is reset or removed.

These can be accomplished either through using `applyMatrix()` and `resetMatrix()`, or by calling `rotate()` and `translate()` directly.

You can `push()` and `pop()` onto a virtual stack of matrices.

---

## Experiments: Part 3

 * Rotate a square based on the X and Y position of the mouse
 * Rotate multiple squares based on where the mouse is clicked, and the translation
 * Create a function that draws, and try using `push()` and `pop()` recursively to create a spirograph.

---

## Camera

We can create a camera capture by calling `createCapture(VIDEO)`.  This can return to us an image; we can access the raw pixels by looking at the `pixels` array after calling `loadPixels()` on the capture object.

```javascript
let capture;

function setup() {
  createCanvas(320, 240);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();
}

function draw() {
  image(capture, 0, 0, 320, 240);
}
```

---

## Experiments: Part 4

 * Make an image of your webcam rotate with time
 * Change the colors of your webcam image based on mouse position.
 * Scale your webcam image based on mouse position
 * Display a cutout of your webcam based on mouse position.

---

## Experiments: Part 5

Let's bring this together with drawing a histogram next to our webcam image, and then experimenting with representing this.
