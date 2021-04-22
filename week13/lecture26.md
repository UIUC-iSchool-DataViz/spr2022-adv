---
title: Scientific Visualization
layout: lecture
tags:
  - sciviz
  - yt
description: >-
  We briefly cover some concepts in scientific visualization, and why they're different from the other types of visualization we've discussed.
---

## Final Project

Requirements:

1. Website, standalone, with "finalized" visualizations
2. Separate notebook or notebooks demonstrating your exploration of the data
3. In-class presentation (work in progress is OK)

It is to be a webpage, that includes both pre-generated and dynamic
visualizations.

Last time we introduced RevealJS, and next week we will discuss (briefly) Idyll.

---

## Scientific Visualization

What characterizes "scientific" visualization?

 * Spatial organization - distance metrics
 * Dimensionality reduction or mapping
 * Multiple overlapping quantities with implicit or explicit extent

---

## Scientific Visualization - Data Representations

<div class="multiCol">
<div class="col">
<div class="fig-container" data-style="height: 600px;" data-file="figures/blank_axes.html" data-markdown=true>
</div>
</div>
<div class="col" data-markdown=true>

Commonly, data will be represented in "scientific visualization" through one of a few mechanisms:

 * Discrete points
 * Volume-filling information
 * Meshed values

</div>
</div>

---

## Discrete Points: Data

<div class="multiCol">
<div class="col">
<div class="fig-container" data-style="height: 600px;" data-file="figures/scatter.html" data-markdown=true>
</div>
</div>
<div class="col" data-markdown=true>

 * Associated field values
 * May have extent
 * Values can be either
   * Locally defined
   * Integrated over neighbors
</div>
</div> 

---

## Discrete Points: Techniques


<div class="multiCol">
<div class="col">
<div class="fig-container" data-style="height: 600px;" data-file="figures/discrete_tech.html" data-markdown=true>
</div>
</div>
<div class="col" data-markdown=true>

 * Associated field values
 * May have extent
 * Values can be either
   * Locally defined
   * Integrated over neighbors
</div>
</div> 

---

## Discrete Points: Density Estimates

 * Searching
   * Quadtree
   * kD-tree
 * Integration
   * Kernels
   * Nearest-neighbor

---

## Volume data: strategies

To analyze volume data, typically we conduct one or more of these operations:

 * Select data based on spatial or non-spatial criteria
 * Reduce the dimensionality of that data either along spatial or other axes
 * Aggregate data

This can include operations such as volume rendering, axial projection, histogramming/binning and resampling.

---

## Big-ish Data

How do we deal with data that is too large to fit into memory?

 * Can we cycle our operations?
 * Can we use tools to cycle operations?

(I have some in-progress reference figures for this!)

---

## Operations

Some operations we can manually cycle through, storing only reductions in
memory rather than the full dataset.

Clear candidates:

 * Mean
 * Extrema
 * Histograms and "binning"

Is this the same as incremental updates to a dataset?

(What about the median?)

---

## Explore Together

We'll now take a moment to explore some data together.  We'll do this using
*just* the packages we've already used, and if there is time, we will move on
to using `yt`.

We will start by looking at data from a sample dataset used in `yt`, and we'll
build our own reader and visualization for it, discussing the different methods
we might go about visualizing it.

 * How do we "register" the data in a frame of reference?
 * How can we construct individual fields?
 * What selection operations can we apply?
 * What reduction operations can we apply?

---

## yt with volume-filling data

For this, we will be using Python to collaboratively explore what volume-filling data is.

Install yt and ipyvolume.

```
!pip install install cython sympy unyt pooch
```

```
!pip install git+https://github.com/yt-project/yt.git
```

---

## data for yt

We will acquire a bit of data.

```python
import yt
ds = yt.load_sample("IsolatedGalaxy")

ds.r[:].max("density", axis="z")

```

