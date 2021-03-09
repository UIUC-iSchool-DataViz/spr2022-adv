---
title: Interaction and Views
layout: lecture
tags:
  - d3
  - javascript
  - python
  - bigish-data
description: >-
  This week, we're going to start bringing together everything we've covered so far, and talk about what to do when we bump against the boundaries of these techniques.
---

## Updates

 * Assignment grades will be ready no more than a week from now
 * New assignment coming Thursday
 * VS Code updates <span class="fragment">(not great news)</span>

---

## d3 Topics

 * Built-in array operations
 * Exploring Trees
 * Selection

---

## ObservableHQ

We're going to use [ObservableHQ](https://observablehq.com/) to prototype our
next set of visualizations.

<p class="fragment">I'm sure you're sick of new platforms.</p>
<p class="fragment">This one is worth it, I promise.</p>
<p class="fragment">Once we have prototyped in Observable, we will move them to VS Code for publishing.</p>

---

## ObservableHQ - `require`

ObservableHQ makes a number of operations much simpler, but it also presents a slightly different interface to how we think about coding.

We'll start by adding a cell at the bottom that imports our library:

```
d3 = require("d3@6");
```

The way Observable works, we can place this cell *anywhere*.  It will detect
dependencies and re-execute only as necessary.  We can use `require` at the top
level to load external libraries, like (in this case) d3.

---

## ObservableHQ - rendering

You can write text using this construction:

```
md`#Some Markdown`
```

There are other cell types, but markdown and javascript are the ones we are the most interested in.

---

## ObservableHQ - Executing Javascript

You can define variables at the top-level of your notebook, in a cell:

```
value = {'some': 'set', 'of': ['v','a','l','u','e','s']};
```

You can also enclose this inside a set of curly brackets for multi-line statements:

```
{
  for (const v of d3.range(10)) {
    yield v;
    await Promises.delay(1000);
  };
  return 100;
}
```

The value you `return` or `yield` will be displayed.

---

## ObservableHQ - Making an SVG

We're going to get set up with an SVG on which we can operate, by using 

---

## Built-in Array Operations

When dealing with objects in d3, it's very useful to be able to succinctly
operate on them.  Each of these functions allows you to provide an "accessor"
function, so they will work with arrays of objects.

[d3-array reference](https://github.com/d3/d3-array)

 * `d3.min`, `d3.minIndex` - compute the minimum value or its index
 * `d3.max`, `d3.maxIndex` - compute the maximum value or its index
 * `d3.extent` - min and max (in a form ready to supply to `.domain()`
 * `d3.sum`, `d3.mean`, `d3.median`, `d3.quantile`

---

## Built-in Array Operations

d3 also has the ability to group and collect objects based on characteristics.
One really fun thing about this is that we can then use this for a *nested
data-binding*.  `d3.group` accepts a key to group on and then returns a
collection of arrays we can use.

For today, we will use `d3.group` but it's good to be aware of `d3.rollup` and
`d3.index` as well.

---

## Let's get our Dataset

We're going to grab a dataset which will provide us with lots of fun, and we'll use it for the next few classes.

[City of Champaign Trees](https://gis-cityofchampaign.opendata.arcgis.com/datasets/979bbeefffea408e8f1cb7a397196c64_22.csv?outSR=%7B%22latestWkid%22%3A3857%2C%22wkid%22%3A102100%7D)

We can insert this into our Observable notebook using this cell: `trees = d3.csv(URL, d3.autoType);`

---

## Single Selection

We know how to do an on-click selection.  Let's expand this to update a
secondary panel with information about the object we selected.

We will use javascript [template
literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
to do this.

```
.on("click", (e, d) => { ... });
```

Inside our function, we'll update our various different "span" elements.  How can we do this?

---

## Multiple Selection

We can also utilize a brushing selector to collect points.  We will start
experimenting with this today.

You use the `d3.brush` function to create a new brush, which we then supply to
a `call` function on our containing group.  This then has an event it can
listen to, `"brush"`, which accepts a function.

This stage is where we start to see our approach break down, as we start really
hitting performance issues.  Fixing that will be next time.
