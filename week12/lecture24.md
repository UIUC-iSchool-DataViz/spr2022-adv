---
title: Server Applications
layout: lecture
tags:
  - servers
  - flask
  - streamlit
  - dash
description: >-
  Today we discussed streamlit and explored how to use it to connect the data visualizations we have been building this semester.
---

## Timelapse

http://goo.gle/timelapse

(I just saw this this morning and I thought we could explore it a bit together.)

---

## Streamlit

We'll take a look at [streamlit](https://streamlit.io/) for how to set up easy
plot interactions.  Streamlit is *very* different from how we've written Flask
code, but it's also much more focused on straightforward visualization apps!

Install streamlit using `pip` and we'll run the "Hello World" (included) streamlit application:

```bash
pip install streamlit
streamlit hello
```

---

## Streamlit: Basic App Templates

Streamlit works by providing methods for sending plots, updating plots, and so
forth.  We'll experiment with it a bit today, but here are some of the most
important API things you'll want to know.

```python
import streamlit as st

st.text("Well, hello there.")
```

Streamlit also has the ability to output things "just right" if you use `st.write`.  For instance, let's do our building inventory:

```python
import streamlit as st
import pandas as pd
df = pd.read_csv("building_inventory.csv")
st.write(df)
```

---

## Streamlit: Basic interactivity

If you call one of the "widget" functions in streamlit, you can react to its result.

```python
import streamlit as st
import pandas as pd
df = pd.read_csv("building_inventory.csv")
show_buildings = st.checkbox("Show the buildings?")
if show_buildings:
    st.write(df)
```

There are lots of widgets

---

## Streamlit: Plots

Streamlit is built for plots!  We can start out by using `st.pyplot`:

```python
import streamlit as st
import numpy as np
import matplotlib.pyplot as plt

nx = st.slider("Number of Points", 100, 1000, value=100, step=10)

x = np.random.random(nx)
y = np.random.random(nx)
fig, ax = plt.subplots()
ax.scatter(x, y)
st.pyplot(fig)
```

There are also options to make `map` plots, `deck` plots, and so forth.

---

## Final Project

Your final project will be due our last full week of class.  It is to be a
webpage, built on top of RevealJS, that includes both pre-generated and dynamic
visualizations.

You will be allowed to choose your dataset, but you must verify it with me
first **by next Thursday**.  By next Thursday, you must have submitted to me
(email is fine) your proposed dataset:

 * Where you will obtain the data
 * What form the data takes
 * The license of the data

This does not have to be a CSV file -- in fact, if you are able to identify a
broad *class* of data, or *topic* of data combined with one or more sources,
that is probably best as it is the most flexible.

The only thing you need to do right now is find a dataset, verify it, and start
exploring it.

---

## Remainder of Class

Your choice!

 * Use streamlit to build a Ticket to Ride visualization (including using DeckGL)
 * Learn the basics of RevealJS and see how to prototype visualizations in it
