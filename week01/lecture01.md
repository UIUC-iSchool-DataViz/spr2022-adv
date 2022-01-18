---
title: Welcome!
layout: lecture
tags:
  - overview
  - concepts
  - p5js
description: >-
  The syllabus for the course, what we're going to talk about,
  and some intro to p5js.
date: 2022-01-18
include_p5js: true
---

# Basics

 * Tuesday and Thursday, 9:30-10:50AM
 * Room 156 of Henry Administration Building
 * Matthew Turk - `mjturk@illinois.edu`
 * Office Hours: Please make an appointment

http://github.com/UIUC-iSchool-DataViz/spr2022-adv/

[spring2021-adv](uiuc-ischool-dataviz.github.io/spring2022-adv/)

---

## Land Acknowledgment

Please see the Land Acknowledgment in the Syllabus.

[More information can be found on the Chancellor's
Website.](https://chancellor.illinois.edu/land_acknowledgement.html)

---

# CampusWire

We will use CampusWire for chat, as well as for some office hours and live
sessions.  You have to be "invited" to the course, and I have posted the invite
link in our Zoom chat today.

Let's all take a moment to get set up in CampusWire.

---

# Introductions

 * What experience do you have with visualization?
 * Do you have any programming experience?
 * What types of data are you really interested in?
 * Bonus: do you do any data collection yourself?

---

## "Advanced Topics" in Visualization

In this class we will:

 * Conduct some light literature review
 * Explore new software frameworks
 * Draw and prototype stuff
 * Talk through design decisions
 * Come up against really hard problems
 * Seek out and find data

---

## Adversaries

You and I [are not adversaries](https://jeffreymoro.com/blog/2020-02-13-against-cop-shit/).

We are not set up to struggle, to fight for grades and for points.

This is meant to be a collaborative environment, where we can choose to be vulnerable, to ask questions, to admit when we need help *and* to share when we are excited or proud.

---

## Syllabus

<div class="multiCol">
    <div class="col">
      <ul>
      <li>Comparisons</li>
      <li>Interactivity and Animation</li>
      <li>Colors and Colormapping</li>
      <li>The Web and the DOM</li>
      <li>WebGL</li>
      <li>Scientific Viz I</li>
      <li>Deploying Websites</li>
      </ul>
    </div>
    <div class="col">
      <ul>
      <li>Streaming Data</li>
      <li>Spatial Visualizations</li>
      <li>Server-based Frameworks</li>
      <li>Really big data</li>
      <li>Scientific Viz II</li>
      <li>Putting it together</li>
      <li>Final Presentations</li>
      </ul>
    </div>
</div>

---

## Accessibility

One topic that I have (to my great shame) not covered in sufficient depth in past iterations of this class has been the accessibility of data visualizations.

This course will not (necessarily) have a dedicated *week* for discussing accessibility.  However, we will endeavor to weave it in to our discussions of visualization topics, and attempt to learn about the best practices and the availability of accessible visualizations.

I want to stress this is not exclusively related to color vision deficiency (CVD); this is an aspect of accessibility, but focusing on CVD at the exclusion of all other forms of accessibility is inappropriate.

---

## Grades

There will be three components to your grades:

 * Assignments: 50% of your grade.  These will consist of some combination of coding, prose and prototyping.  This will also include a paper review you will present to the class.
 * Final Project: 40% of your grade.  Your final project will be presented and described in detail in the coming weeks.
 * Class Participation: 10% of your grade.

---

## Course Format

Classes will include a mixture of:

 * Paper presentations
 * Slides covering concepts and technical foundations
 * Work-a-long together projects, where we develop code for visualizations
 * Group or individual work
 * Group discussions

---

## Paper Discussions

We will have a demonstration of this on Thursday!

But the basic principle will be this: each of you will be assigned a class during which you will present a paper.
You will be allowed to choose that paper from, for instance, the most recent papers from IEEE Viz, or journals.
In special circumstances, you can also choose papers from the past -- distant or recent.

You'll give an overview of the paper, the methods, and the results.  This does not necessarily require slides; you can just walk us through the paper in PDF if you like.

On Thursday, I'll go through this in more detail, with a paper presentation of my own.

---

## Class Materials

Class materials will be made available online at https://uiuc-ischool-dataviz.github.io/spr2022-adv/ .

Lecture recordings will be available on the Canvas page, along with assignment submissions.

Discussions, including general chit-chat, will happen on our Campuswire instance.

---

## Technical Setup: Javascript

For the most part we will be utilizing online visualization editors and systems.  Specifically:

 * [ObservableHQ](https://observablehq.com/)
 * [Glitch](https://glitch.com/)

However!  We will at some point begin to use *local* development environments as well.

---

## Technical Setup: Python

We will also utilize (and develop for) Jupyter and Python, and for that you
will need a local installation of a python distribution.  I recommend using
Python 3.9 or 3.10, and installing from Anaconda or conda-forge.

You will need to have Jupyterlab installed locally, or have access to an
installation you are able to modify, to install extensions and so forth.

---

## Technical Setup: Development Environment

We will at times be developing locally.  While I will not mandate a particular
technology stack, I recommend these items; I **strongly** encourage you to
follow online instructions on getting set up with a local development
environment on the Visual Studio Code website.

 * VS Code
 * A nodejs and npm installation accessible within VS Code
 * Extensions:
    * Python extension (by Microsoft)
    * Github extension (by Github)
    * Github Classroom extension (by Github)

We will not be using this for a few weeks.

---

## Technologies Covered

Roughly speaking, we'll cover these technologies, and maybe a few others:

 * P5JS
 * Matplotlib
 * Vega-lite and ecosystem
 * D3
 * Glitch
 * OpenGL / WebGL and GLSL
 * ThreeJS
 * Plotly
 * Bokeh
 * yt

During the course of the semester we may change this list, add or remove, and this will be open for discussion.

---

## Conceptual Framework

How should we evaluate the visualizations we develop and utilize?

 * Degree of Reduction
 * Interpretability
 * "Neutrality"
 * Aesthetics

---

## Prototyping

During this course you will be expected to prototype visualizations quickly,
often utilizing drawing or design tools.

You will be tasked with utilizing several different types of tools for this:

 * Your physical environment
 * A physical drawing system (markers, pens, crayons, pencils)
 * An online drawing or prototyping system

---

## Prototyping with p5js

We're going to start out today using a framework called [p5js](https://p5js.org/).
If you have used Processing before, this will be familiar to you.

p5js is a framework for creating interactive "Sketches" in the browser.  It supports both 2D and 3D, and has some pretty fun extension libraries.

You can test it out yourself by going to [editor.p5js.org](https://editor.p5js.org/).

---

## Structure of p5js

If you have written javascript before, p5js will be somewhat familiar to you.
We will construct functions, store variables in between calls to those functions, and most everything will be handled through one of a few "events" that we respond to.

To start out, let's write this set of functions:

```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
```

---

## Special Methods and Variables

 * `setup()` is a function called with no arguments when the sketch is initialized.  You can use this to set up persistent variables.  You can define this function.
 * `draw()` is called every frame.  This is where you will do most of your drawing -- or at least, where you'll call the functions that do your drawing.  You can define this function.
 * `doubleClicked()` is called when the mouse is double-clicked in the Sketch output area.  You can define this function.
 * `mouseWheel(event)` is called when the scroll wheel is adjusted.  You can define this function.
 * `loop()` and `noLoop()` start and stop the animation loop.
 * `push()` and `pop()` control the reference frame for drawing.
 * `mouseX` and `mouseY` contain the current position of the mouse on the canvas.
 * `print()` displays text on a console in the p5js editor.  This is very useful for debugging.

---

## Variables and Scope

Variables in p5js are either defined *locally* within a function or *globally* at the top scale.  They are defined either using `let` or `const`, depending on whether they will change over the course of your sketch or not.

If you need to define variables that are shared between `setup()` and `draw()`, for instance, you can do this using a `let` statement at the top level of scope:

```javascript
let myVariable = 0;

function setup() {
  myVariable = 1;
}

function draw() {
  if (myVariable == 0) {
    print("It's zero, somehow!");
  }
}
```

We'll use this for things like tracking the state of a sketch, data, and so on. 

---

## Drawing Simple Shapes

There are a number of shape primitives that we can draw in 2D:

 * `arc(x, y, w, h, start, stop, [mode])`
 * `ellipse(x, y, w, [h])` 
 * `circle(x, y, d)` (note that it's `d`, not `r`!)
 * `line(x1, y1, x2, y2)`
 * `point(x, y)`
 * `quad(x1, y1, x2, y2, x3, y3, x4, y4)`
 * `rect(x, y, w, [h], [tl], [tr], [br], [bl])` (here note that we can adjust each corner's radius individually!)
 * `square(x, y, s, [tl], [tr], [br], [bl])` (again, each corner's radius individually!)
 * `triangle(x1, y1, x2, y2, x3, y3)`

The way these primitives are drawn can be controlled, as well, using the characteristics related to the *stroke* and the *fill* of the shapes.

**Experiment**: Draw a circle with diameter of 10, centered at `mouseX` and `mouseY`.

---

## Colors

Before we talk about the fill and stroke, let's briefly touch on colors.  Colors are defined typically in one of three ways:

 * A single number, from 0-255, representing the "grayness" of the color.  Lower is closer to black and higher is closer to white.
 * Three numbers, where the three numbers are red, green and blue.  (The `colorMode` function can change this to HSB.)
 * String, where the value is the "name" of the color in a [web-friendly form](https://www.w3schools.com/colors/colors_names.asp).

So, when we call `background(220)`, it clears the sketch's output area and fills with a value with a "grayness" of 220.

**Experiment**: Let's set the refresh to be equal to `mouseX` in blue and `mouseY` in green.

---

## Controlling Stroke

To control the way the "pen" makes marks on the canvas, you can call these functions:

 * `stroke( ... )` where the arguments are a color specification as described previously; this turns the stroke on if it is off.
 * `noStroke()` turns the stroke off
 * `strokeWeight( weight )` this is the thickness of the pen stroke
 * `strokeJoin( type )` where type is one of `MITER`, `BEVEL` or `ROUND`, controls how the stroke looks when it reaches a vertex and continues on.
 * `strokeCap( type )` where type is one of `ROUND`, `SQUARE` or `PROJECT` controls how a stroke is drawn upon its termination.

**Experiment**: Draw three squares, each with a different join type.

---

## Controlling Fill

Fill is somewhat simpler than Stroke, in that you can (easily) control only the color and whether a fill is there or not.

 * `fill( ... )` where the arguments are a color specification as described previously; this turns fill on if it is off.
 * `noFill()` turns off filling the next shape.

For more complicated fills, we'll need to use textures and texture mapping with a WebGL canvas.

**Experiment**: Let's draw a big circle and turn fill on and off based on the double clicking of the mouse.

---

## Final Experiment

We'll now put these things together to control a sketch for drawing lots of circles, following the mouse, and changing their attributes.

---

## Next Time

Next time, we'll continue on with p5js and we'll talk about how to use it for prototyping interaction.
