---
title: Graphics Languages
layout: lecture
tags:
  - opengl
  - regl
description: >-
  This lecture starts the process of exploring OpenGL-type concepts for rendering, why we might be interested in using them, and how we can apply them to visualizations.
---

## d3 Topics

 * Thinking in OpenGL
 * Vertices, Fragments and GLSL
 * Getting started with regl

---

## Descent

As we've moved through our classwork, we have been descending deeper and deeper into the depths of how graphics are displayed.

<p class="fragment">We started very high-level, with `vega-lite`, where you could visualize data without writing any code.</p>

<p class="fragment">Next up was digging deeper, using different web platforms to combine python and javascript.</p>

<p class="fragment">Lately, we've been working with d3, where we bind and control our data directly.</p>

---

## OpenGL

Today we're going to introduce a set of concepts I'll likely struggle to call
anything other than "OpenGL."

It's best to think of these concepts as mechanisms for rendering graphics, from
which we will build our visualizations.

---

## Deployments of "-GL"

We're going to primarily use WebGL for our display.  WebGL is a subset (?) of
OpenGL that can be displayed through your web browser.  It's a very *capable*
subset, and can do just about everything you'd normally expect from native
OpenGL, but it comes shipped in your browser.

Alternate approaches to using WebGL include native applications -- I've built
applications using `PyOpenGL` in the past and have found it to be very
successful.  One advantage of WenGL is that it includes a great deal of overlap
with OpenGL ES, which is used in "embedded systems."

---

## Thinking in OpenGL - I

OpenGL has a slightly different mindset than what we have seen before.  It's
designed around the way graphics are displayed.

With d3, we are used to doing data binding, and generating graphics from that:

```javascript
data = [ {'attr1': ..., 'attr2': ...},
         {'attr1': ..., 'attr2': ...} ]

svg.selectAll("circle").data(data)
   .enter().append("circle")
   .attr("cx", d => ...)...
```

With OpenGL, we will find a number of things in common with what we had seen
before, but a much greater set of requirements for transforming those
attributes into display values.

---

## Thinking in OpenGL - II

We have *five* different coordinate systems in OpenGL.

 * **Local** space: centered on an object
 * **World** space: the coordinate system that describes our ensemble of objects
 * **View** space: the coordinate system from the perspective of the camera
 * **Clip** space: a set of normalized coordinates between -1 and 1, centered in the center of the camera's viewport
 * **Screen** space: the viewport onto your screen, where things get rasterized

Kinda seems like a lot, right?  It'll be okay.  We're going to sidestep a lot of this for now.

---

## Thinking in OpenGL - III

OpenGL objects are typically drawn using some form of triangles.  There are a
number of different types of "primitives" we can use to draw objects; today,
we're going to focus exclusively on using "points" rather than triangles, and
we may return to others later.

We want to think of our data similarly to how we did in d3, as a set of data
objects, but without any of the hetereogeneity we allowed for in d3 and other
javascript libraries.  Our data points must have a uniform set of attributes of
the same type.

---

## Vertices, Fragments and GLSL - I

When we render using OpenGL, we supply a number of "vertex" objects that each
compose a "primitive."  For our purposes, we're going to be using point
primitives, so each and every vertex is its own objects, rendered by itself.

Associated with each vertex can be a number of different attributes, unique to
each vertex.

Associated with each "draw" of an object can be a number of different
parameters (uniforms) that are not unique to each vertex.

Vertices map to one or more fragments, which then get rasterized.

---

## Vertices, Fragments and GLSL - II

---

## Getting started with Regl

We're going to explore some of this using `regl`, which is a stateless
javascript framework for WebGL.  It reduces the complexity of many of the
operations required to get WebGL visualizations up and running.
