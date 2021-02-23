---
title: Transformations and colors
layout: lecture
tags:
  - scaling
  - d3
  - transformations
  - colors
---

# Today

 * Review of affine transformations
 * Demonstrating transformations with d3
 * Starting with colors

---

## Transformations

We will need to transform data in order to apply consistent visual encoding.
There are many reasons we may need to accomplish this, including color mapping,
applying units, and co-registration or normalization of data.

One of the most important transformations we will have is that of an [Affine transformation](https://en.wikipedia.org/wiki/Affine_transformation).  This is a transformation that preserves:

 * Collinearity
 * Parallellism
 * Convexity
 * Ratios of parallel lines
 * Barycenters of point sets

---

## Transformations

Affine transformations satisfy:

$ \vec{y} = A\vec{x} + \vec{b} $

<!-- .slide: data-background-image="images/affine_1.svg" data-background-size="30% auto" data-background-position="right 20% bottom 50%" -->

---

## Transformations

Affine transformations satisfy:

$ \vec{y} = A\vec{x} + \vec{b} $

We can use these to accomplish:

 * Shifts

<!-- .slide: data-background-image="images/affine_2.svg" data-background-size="30% auto" data-background-position="right 20% bottom 50%" -->

---

## Transformations

Affine transformations satisfy:

$ \vec{y} = A\vec{x} + \vec{b} $

We can use these to accomplish:

 * Shifts
 * Rotations

<!-- .slide: data-background-image="images/affine_3.svg" data-background-size="30% auto" data-background-position="right 20% bottom 50%" -->

---

## Transformations

Affine transformations satisfy:

$ \vec{y} = A\vec{x} + \vec{b} $

We can use these to accomplish:

 * Shifts
 * Rotations
 * Scaling

<!-- .slide: data-background-image="images/affine_4.svg" data-background-size="30% auto" data-background-position="right 20% bottom 50%" -->

---

## Transformations

<div class="col" data-markdown=true>

In this figure, we can adjust the mixing vectors and the offset.  What do you notice about colinear points and parallel lines?

<div class="fig-container" data-style="height: 600px;" data-file="figures/affine_transformation.html" data-markdown=true>
</div>

---

## Scaling Data: Normalization

Last week, we began to address the notion of mapping between different numerical values, for the purposes of scaling between our "data" space and our "plot" space.

$f(v) \rightarrow (R, G, B)$

When we map to colorspace, we can also re-map:

$g(v') \rightarrow (R, G, B)$

$v' = f(v)$

This can be done using a linear mapping, or we can *stretch* or *distort* the mapping by using logarithms or square roots.

Are these affine transformations?

---

## Scaling Data: Linear Normalization

We map from a range of values to (0, 1):

$ v' = (v - v_0)/(v_1 - v_0) $

If we set $v_0$ and $v_1$ to be defined by the minimum and maximum values in our dataset, this will result in a map that is (inclusively) bound by 0.0 and 1.0.

We will call our output values our *range* and our input values our *domain*.

---

## A Little Bit of D3

We're going to learn a bit of [d3.js](https://d3js.org/) to get started, and to think about transformations.

In iodide, you can fetch d3 with:

```
%% fetch
js: https://d3js.org/d3.v6.min.js
```

although it is straightforward to include the necessary code in an HTML page:

<code>
&lt;script src="https://d3js.org/d3.v6.min.js"&gt;&lt;/script&gt;
</code>

---

## Concepts in d3: outline

The basic concepts here we will convey, focusing on *static* visualizations:

 * `.select()` and `.selectAll()`
 * `.enter()`
 * `.attr()` and `.style()`
 * `d3.scaleLinear()`

---

## Concepts in d3: data and elements

When we manipulate items in d3, we connect the concept of a data item to an
element in a document.

Typically, this will be an element in an SVG -- for instance, a `line`,
`circle`, `rect` or `text` element.

Our typical workflow:

 1. Select all items of a specific criteria
 2. Bind these items to a set of data
 3. Update, append or remove items based on their corresponding item.

---

## Concepts in d3: accessors and setters

We will very frequently run into the case where we call something, and supply a
*function* to it, rather than supplying a value.  For instance, *both* of these
calls to `attr` are valid in a typical d3 workflow:

```javascript
.attr("cx", 1.0)

// or

.attr("cx", d => d.x)
```

In one, we are setting the value static; in the other, we base the value on the datapoint supplied.

---

## Concepts in d3: Let's make circles

For our first exploration, let's just make some circles.  I will demonstrate this in observable, but here is the key snippet of code:

```
var dataset = [ {'x': 100, 'y': 200, 'radius': 15},
                {'x': 150, 'y': 300, 'radius': 30} ];
svg.selectAll("circle").data(dataset).enter()
   .append("circle")
   .attr("cx", d => d.x)
   .attr("cy", d => d.y)
   .attr("r", d => d.radius)
   .style("fill", "black");
```

What does this do?

---

## Concepts in d3: Objects

We will mostly use the objects

 * [`rect`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect) -- which has `x`, `y`, `width` and `height` 
 * [`circle`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle) -- which has `cx`, `cy`, and `r`
 * [`line`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/line) -- which has `x1`, `x2`, `y1` and `y2`.

Each of these objects can be controlled in style, appearance, position, etc, according to standard SVG and CSS rules.

Let's experiment!

---

## Concepts in d3: Scaling

To map from a given range to a different range in a linear fashion, we can construct a linear scale:

```javascript
var xScale = d3.scaleLinear().range([0, 100]).domain([0.0, 1.0]);
```

This is now an object we can use to map the values 0 .. 1 to 0 .. 100.  This is useful for, among other things, computing the position of a given value:

```javascript
.attr("cx", d => xScale(d.x))
```

---

## Additional Basic Topics

`d3.axisBottom(xScale)` can be used to create ticks and axes; however, it
requires manual translation using the `transform` attribute, using something
like `.attr("transform", "translate(0, 30)")`.  This then brings up our concept
of margins, width, height, and the like!  How can we manage these?

Let's try it out!

---

## Creating an SVG canvas

We can create one programmatically:

```javascript
const svg = d3.create("svg")
  .attr("id", "my_svg")
  .attr("width", 300)
  .attr("height", 300);
```

or, in Iodide, we can create one through standard HTML:

```
<svg id="my_svg">
```

---

# Selecting and binding data

```javascript

var dataset = [
  {x1: 1.0, y1: 3.0, x2: 3.5, y2: 2.0, radius: 10},
  {x1: 2.5, y1: 2.0, x2: 0.75, y2: 3.5, radius: 5},
  {x1: 3.1, y1: 0.6, x2: 4.1, y2: 3.4, radius: 25}
];

svg.selectAll("circle")
   .data(dataset)
   .enter()
   .attr("cx", d => xScale(d.x1))
   .attr("cy", d => yScale(d.y1))
   .attr("r", d => d.radius)
   .style("fill", "black");
```

---

## Scaling

```javascript
var xScale = d3.scaleLinear().range([0, 100]).domain([0.0, 1.0]);
```

We will cover other scales later today.

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

## Next Time

Next time, we will learn just a little bit more D3, and we'll talk about
colors.  Then we'll start to bring this all together with how we think about
representations.
