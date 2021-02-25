---
title: Publishing and more d3
layout: lecture
tags:
  - publishing
  - d3
---

## Review

Last time, we worked with [d3](https://d3js.org/), specifically in [Iodide](https://iodide.io).

We learned about:

 * Basic transformations
 * Data binding
 * `enter` and `transition`
 * Drawing circles and rectangles

---

## Today

<ul>
<li class="fragment">Let's all talk about the assignment!</li>
<li class="fragment">We are not going to look at colors today!</li>
<li class="fragment">We'll do a little more d3!</li>
<li class="fragment">We will look at turning your visualizations into websites!</li>
</ul>

---

## The Assignment

I'd really like to see and hear about some of the things you came up with, and to get an idea of where you're at.

<p class="fragment">Can I have volunteers?</p>

---

## Publishing

Let's demonstrate using Github Pages, and how to sketch out a single HTML page with visualizations on it.

 * Create a "special" repo on Github: `your-username.github.io`
 * Anything pushed to this will appear!  With some caveats!
 * Additional repositories that have publishing enabled will appear as
   subdirectories.

---

## Styling

You might find yourself wanting to style your website, and to make it look ... like something.

If you want to stay with a simple, straightforward approach, I recommend either:

 * [Bootstrap](https://getbootstrap.com/)
 * [Bulma](https://bulma.io/)

These allow you to specify layouts that position objects on the page and
provide them with sizes, as well as rescalability.

---

## Including Libraries

You can build a website that bundles everything you need, but in general you
may find it more convenient to utilize CDNs like [cdnjs](https://cdnjs.com/) to
include items in your page without local copies.

For instance, on the course website, I use this snippet:

```
&lt;link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.0/css/bulma.min.css"&gt;
&lt;link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"&gt;
&lt;link href="https://fonts.googleapis.com/css?family=Questrial" rel="stylesheet"&gt;
```

This gets me bulma as well as a font I like.

<p class="fragment">Let's work through an example of converting from Iodide to a webpage.</p>

---

# Back to d3...

---

## Events

There are many events that we can "listen" for, and respond to.  For instance, the `click` event is a common event to manage.

The function receives the data (if any), the index of the node, and the nodelist.

```javascript
d3.selectAll("circle")
  .on("click", (d, i, n) => {
    d3.select(n[i]).attr("r", 100)
  });
```

---

## Transitions

We can also update items through transitions, which can accept both a `delay` and a `duration`, both specified in milliseconds.

```javascript
d3.selectAll("circle")
  .data(dataset)
  .transition()
  .duration(2000)
  .attr("x", d => d.x + 2)
```

Updating attributes utilizes "tween"-ing functions for interpolation.  Many are
built in, but you can choose to build your own.

---

## Transformations

SVG specifies a number of [possible transformations](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform).  These include rotation, translations, skews and scales.  We can set these through the `.attr` call, but note that this requires a bit of string manipulation.

```javascript
svg.selectAll("circle").attr("transform",
    (d, i) => "skewY(" + i*5 + ")");
```

Note that we're concatenating an integer to a string here, which casts the int
to a string.  This is a bit non-intuitive.

We can use this to reshape our objects in many different ways -- especially using the index of the data point!

---

## Scales

D3 provides a number of different [scaling types](https://github.com/d3/d3-scale).  We will be discussing, specifically, banded scales and color scales.

One thing to note is that d3 also provides handy functions for computing properties of [arrays](https://github.com/d3/d3-array).  For instance:

 * `d3.min`, `d3.max`, `d3.minIndex` and `d3.maxIndex`, all of which accept both an iterable *and* an "accessor" function.
 * `d3.extent`, which provides the format required by a scale.
 * `d3.sum`, `d3.mean`, `d3.median`, `d3.quantil`, `d3.variance`

---

## Banded Scales

Banded scales provide discrete categorization of values, often used for categorical data.


```javascript
var band = d3.scaleBand(["low", "medium", "high"], [0.0, 100.0]);
```

This takes an array of input values for the domain.  Additional changes can be made to the bandwidth, padding, etc. The d3 wiki has a [diagram](https://raw.githubusercontent.com/d3/d3-scale/master/img/band.png) describing this.

---

## Color Scales

We can use `d3.scaleSequential` to generate colormaps for continuous values.  These accept an interpolator function.  d3 provides interpolator functions for many common colormaps.  For instance:

```javascript
var csc = d3.scaleSequential(d3.interpolateViridis).domain([1.0, 100.0])
```

We can also use log versions of these, and quantized versions.

---

## Brushing

Brushing in d3 requires some build-it-yourself effort, but building a brush object itself is straightforward.  You create a brush object with extents, and you call that on your object.  Here, `brushed` is a function to be called when the brush selection changes.

```

function brushed() {
  console.log(d3.event.selection);
}

var brush = d3.brush()
              .extent([[0.0, 0.0], [512, 512]])
              .on("brush", brushed);
svg.append("g").attr("class", "brush").call(brush);
```

What could we do with this?

---

## Paths

d3 can also generate `path` objects.  Typically these are generated using curve
generators.

```javascript
var line = d3.line().curve(
            d3.curveCatmullRom.alpha(0.5));
var myPath = svg.append("path")
              .attr("d", line(myPoints))
              .attr("stroke", "black");

```

Interpolation of paths can be tricky, but it is possible.

---

## Exporting to a webpage

Now how do we export this to a webpage?

---

## Assignment

Your next assignment will be given on Tuesday, and will build on your current
assignment.  Feel free, but not obligated, to update your current assignment.
