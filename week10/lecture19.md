---
title: Deeper into Matplotlib
layout: lecture
tags:
  - python
  - matplotlib
  - packaging
description: >-
  We're going to dig much deeper into matplotlib, starting with styles, moving on to how patches are placed on an image, and then start talking about how we can package up our custom routines for reuse.
---

## Back in Matplotlib

 * Styles
 * Patches
 * Custom Plots
 * Packaging

---

## Why back to Matplotlib?

<p class="fragment">It's is highly-extensible.</p>
<p class="fragment">It's reasonably ubiquitous</p>
<p class="fragment"></p>
<p class="fragment"></p>
<p class="fragment"></p>

---

## Matplotlib: Modules

Broadly speaking, we'll be digging deeper into these submodules of `matplotlib`:

<div class="multiCol">
    <div class="col">
    <ul>
    <li class="fragment" data-fragment-index="1"><code>style</code></li>
    <li class="fragment" data-fragment-index="1"><code>font_manager</code></li>
    <li class="fragment" data-fragment-index="2"><code>cm</code></li>
    <li class="fragment" data-fragment-index="2"><code>colors</code></li>
    <li class="fragment" data-fragment-index="2"><code>image</code></li>
    <li class="fragment" data-fragment-index="3"><code>patches</code></li>
    <li class="fragment" data-fragment-index="3"><code>collections</code></li>
    <li class="fragment" data-fragment-index="3"><code>markers</code></li>
    <li class="fragment" data-fragment-index="3"><code>text</code></li>
    </div>
    <div class="col">
    <li class="fragment" data-fragment-index="4"><code>path</code></li>
    <li class="fragment" data-fragment-index="4"><code>spines</code></li>
    <li class="fragment" data-fragment-index="4"><code>textpath</code></li>
    <li class="fragment" data-fragment-index="5"><code>transforms</code></li>
    <li class="fragment" data-fragment-index="5"><code>scale</code></li>
    <li class="fragment" data-fragment-index="6"><code>widgets</code></li>
    </div>
</div>

<h5 class="fragment step-fade-in-then-out" data-fragment-index="1">Appearance</h5>
<p class="fragment step-fade-in-then-out" data-fragment-index="1">These modules controls the way that specific elements appear on screen, and some aspects of how they are drawn.  We can also use them to determine the specific choices being made about our viz on our behalf.</p>

<h5 class="fragment step-fade-in-then-out" data-fragment-index="2">Colors and Images</h5>
<p class="fragment step-fade-in-then-out" data-fragment-index="2">These modules are able to modify and set colors, color maps, and display images (either bitmapped or scaled) on our screen in a variety of ways.</p>

<h5 class="fragment step-fade-in-then-out" data-fragment-index="3">Drawing Stuff</h5>
<p class="fragment step-fade-in-then-out" data-fragment-index="3">With these modules, we control placement of specific entities on the screen, which make up the majority of our viz.</p>

<h5 class="fragment step-fade-in-then-out" data-fragment-index="4">Directions and Shapes</h5>
<p class="fragment step-fade-in-then-out" data-fragment-index="4">We can choose the direction, shape, and path of objects on our screen according to our own prescriptions.</p>

<h5 class="fragment step-fade-in-then-out" data-fragment-index="5">Mappings and Scales</h5>
<p class="fragment step-fade-in-then-out" data-fragment-index="5">These modules control the translation from "data" values into "display" values.</p>

<h5 class="fragment step-fade-in-then-out" data-fragment-index="6">User Interface</h5>
<p class="fragment step-fade-in-then-out" data-fragment-index="6">These widgets work with multiple different user interface engines, and provide opportunities to create rich interaction.</p>

[Module documentation](https://matplotlib.org/stable/api/index.html)

---

## Matplotlib: Styles

 * [`matplotlib.style`](https://matplotlib.org/stable/api/style_api.html)
 * [`matplotlib.font_manager`](https://matplotlib.org/stable/api/font_manager_api.html)

The `style` module provides some useful methods, the highest-profile of which are `context` and `use`.  The former provides a "[contextmanager](https://book.pythontips.com/en/latest/context_managers.html)" that will reset-to-default when it's exited.  The other sets a set of global defaults used in all subsequent plots.

These draw from a library of built-in styles (`available`) which can be extended.

 * [Reference of all built-in styles](https://matplotlib.org/stable/gallery/style_sheets/style_sheets_reference.html)
 * [Customizing matplotlib styles](https://matplotlib.org/stable/tutorials/introductory/customizing.html)

**Exercise**: Let's build a style that uses a different font.  We can see which fonts are available using `font_manager.findfont` and `font_manager.findSystemFonts`.

---

## Matplotlib: Images and Colors

 * [`matplotlib.cm`](https://matplotlib.org/stable/api/cm_api.html)
 * [`matplotlib.colors`](https://matplotlib.org/stable/api/colors_api.html)
 * [`matplotlib.image`](https://matplotlib.org/stable/api/image_api.html)

Matplotlib provides functions to operate on colors, converting to/from RGBA and different specifications, as well as HSV.  You can also create your own listed color maps, normalizers, and different norms.

**Exercise**: Create a colormap based on a bunch of funny color names!

---

## Matplotlib: Drawing Stuff

 * [`matplotlib.patches`](https://matplotlib.org/stable/api/patches_api.html)
 * [`matplotlib.collections`](https://matplotlib.org/stable/api/collections_api.html)
 * [`matplotlib.markers`](https://matplotlib.org/stable/api/markers_api.html)
 * [`matplotlib.text`](https://matplotlib.org/stable/api/text_api.html)

These are the base classes of individual drawing elements in matplotlib.  This is where we get instances of paths (for lines), polygons, boxes, wedges, and so on.  The collections module has a set of "collection" objects which are higher-performance than a set of individual patch elements; for instance lines, quadmeshes, trimeshes, circle collections, and so forth.

We have a number of options for drawing and positioning text, as well as its bounding boxes.

**Exercise**: Draw a couple different patches.  Look at the API for creating a collection of 1000 lines versus creating 1000 individual lines, and compare performance.  Then, change the linestyle to something custom for these lines.

**Exercise**: Make a new marker from the [STIX font table](https://github.com/stipub/stixfonts/blob/master/docs/STIXTwoMath-Regular.pdf), and use it in a scatter plot.  Then, try out some Unicode characters.

The [path effects](https://matplotlib.org/stable/tutorials/advanced/patheffects_guide.html) tutorial has some ideas for what you *could* do with path effects, although ... you may not be advised to!

---

## Matplotlib: Paths and Directions

 * [`matplotlib.path`](https://matplotlib.org/stable/api/path_api.html)
 * [`matplotlib.spines`](https://matplotlib.org/stable/api/spines_api.html)
 * [`matplotlib.textpath`](https://matplotlib.org/stable/api/textpath_api.html)

Path objects take a set of vertices, codes for drawing those vertices (essentially, a set of "pen" commands) and use this for vector operations.  You will rarely create these *directly*, but you may have occasion to use them as input to other functions.

Typically, you will also not create spines on your plots directly, but they can be accessed via `ax.spines.left`, `.right`, `.top` and `.bottom`.  (In earlier matplotlib versions these were available via dict-like access.)

**Exercise**: Try to create a new spine from a `Path` object you created using `textpath`.

---

## Matplotlib: Transforms and Scales

 * [`matplotlib.transforms`](https://matplotlib.org/stable/api/transformations.html)
 * [`matplotlib.scale`](https://matplotlib.org/stable/api/scale_api.html)

Transforms and scales are some of the most complex operations that you can define in matplotlib, primarily because they enable *so much* data manipulation.  You can also create new "scale" objects that map between data and display coordinates, beyond the standard log/linear.

**Exercise**: Make an affine transformation that rotates.  Use this to display an image.  Then, try making a non-affine transformation.

**Exercise**: Create a scale that maps to $x^2$ and set an axis to use this.

You can find a fair bit of detail at the [transformations tutorial](https://matplotlib.org/stable/tutorials/advanced/transforms_tutorial.html).

---

## Matplotlib: Built-in Widgets

 * [`matplotlib.widgets`](https://matplotlib.org/stable/api/widgets_api.html)

We have primarily utilized the Jupyter environment for visualization with matplotlib, but it has many other backends for interaction.  (We also haven't really used [`ipympl`](https://github.com/matplotlib/ipympl) which is pretty awesome!)

The `widgets` module provides GUI-neutral widgets for interaction with matplotlib plots.  In addition to the types of widgets we have seen before, this module *also* provides objects like `LassoSelector`, `RectangleSelector`, `EllipseSelector` and other objects for interactign with matplotlib properties.

**Exercise**: Use a `LassoSelector` on a collection of points, and then on an image.

---

## Ticket to Ride

We're going to build a rendering library for [Ticket to Ride](https://www.daysofwonder.com/tickettoride/en/usa/).  This will utilize potentially *all* of the modules we've talked about here today!

We can use [this dataset](https://data.world/mattgawarecki/ticket-to-ride/) to start with.  Next time, we will work on how to "package up" your matplotlib customizations and custom rendering engines.
