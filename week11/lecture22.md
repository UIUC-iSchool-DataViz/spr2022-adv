---
title: Server Applications
layout: lecture
tags:
  - servers
  - flask
  - streamlit
  - dash
description: >-
  First we'll go through some basics of how web applications work, and write our own Hello World flask app.  Then we'll look at two frameworks for server-side visualizations.
---

## Ticket to Ride Pre-Viz

(Not to be confused with [Pre Vizsla](https://starwars.fandom.com/wiki/Pre_Vizsla))

---

## Flask

Flask is a "micro-framework" that provides routing (i.e., mapping between URLs
and handlers), sessions, and utilizes templates to server web requests.

(Fun fact: Flask started as an April Fool joke, as a single-file framework.
It's a bit bigger now.)

```
pip install flask
```

---

## Flask: Hello World

Our simplest flask application is one that just responds to a request.

Create a new repository -- `git init` and everything! -- and put this in a file
called `app.py`.

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'
```

Now, we'll set the environment variable `FLASK_APP` to `app.py` and run:

```
flask run
```

---

## Flask: Auto-Reload

It can be pretty cumbersome to edit-stop-restart over and over, so now let's
take advantage of Flask's development mode to have it watch for file changes
and automatically reload.

Set the environment variable `FLASK_ENV` to `development` and run again.

```
export FLASK_ENV=development
export FLASK_APP=app.py
flask run
```

Now, make a change and watch it automatically reload.

---

## Flask: Routing I

We saw here, and last time, that we can set up different "handlers" for
different URLs.  Last time, we were building these all manually, and trying to
figure out the paths, grab marker types, etc.

We set up the handler in our "Hello World" app by using `@app.route('/')`,
which means, this "function handles all requests for `/`."  But, Flask gives us
a more capable means of providing URL recipes, too.  You can name a variable
that gets supplied to the function by putting it inside brackets:

```python
@app.route('/plot/&ltplot_id>/marker_type/&ltmarker_type>')
def make_plot(plot_id, marker_type):
    return 'You asked for plot id {} with marker_type {}'.format(plot_id, marker_type)
```

---

## Flask: Routing II

Sometimes we'll want to convert parameter types.  For instance, maybe we want
`plot_id` to always be an integer.  By prefixing the variable name inside the
brackets with a converter, we can do so!

```
@app.route('/plot/&ltint:plot_id>/marker_type/&ltmarker_type>')
def make_plot(plot_id, marker_type):
    return 'You asked for plot id {} with marker_type {}'.format(plot_id, marker_type)
```

(What happens if you can't convert it to an int?)

---

## Flask: Routing III

Sometimes we'll also want to provide default values.  For instance, maybe we
always want to default to a marker type of circle.

```
@app.route('/plot/&ltint:plot_id>/', defaults = {'marker_type': 'o'})
@app.route('/plot/&ltint:plot_id>/marker_type/&ltmarker_type>')
def make_plot(plot_id, marker_type):
    return 'You asked for plot id {} with marker_type {}'.format(plot_id, marker_type)
```

(What if you just go to `plot/1/marker_type/`?)

---

## Flask: Returning Images

Flask by default returns non-binary content.  But, we can use the `send_file`
function to provide binary contents.

Let's make a simple random plotter, and return the image from matplotlib.

```python
import matplotlib.pyplot as plt
import numpy as np
import io
from flask import send_file

@app.route('/plot/&ltint:plot_id>/', defaults = {'marker_type': 'o'})
@app.route('/plot/&ltint:plot_id>/marker_type/&ltmarker_type>')
def make_plot(plot_id, marker_type):
    x = np.random.random(plot_id * 100)
    y = np.random.random(plot_id * 100)
    plt.scatter(x, y, marker = marker_type)
    b = io.BytesIO()
    plt.savefig(b, format='png')
    b.seek(0)
    return send_file(b, 'image/png')
```

(Why are we using `BytesIO`?)

---

## Flask: Templates I

Important Caveat: For all template examples, to make sure this renders on
Github Pages, I've changed the double curly brackets to single, and for the
curly bracket with a percent, it's just a percent.  Adjust that accordingly!

Flask uses Jinja2 for template rendering.  Jinja is a rather capable
templating engine that accepts variables, allows for conditional
execution, and also allows template composition.


Most simply, you can `render_template` in Flask and supply a couple variables.  For instance, your template might look like:

```
Hello, there!  It's good to meet you, {name}.
```

Inside your Flask app, you can render this template:

```python
from flask import render_template

@app.route('/say_hello/&ltstring:name>')
def say_hello(name):
    return render_template('say_hello.html', name=name)
```

Because of how we have structured our files, flask will look for
`say_hello.html` in the directory `templates/` next to our `app.py` file.

---

## Flask: Templates II

Not only can you include variables, but you can also do conditionals and basic flow control.

```
Why, hello there, {name}!

% if name == 'Matt' %
(It's good to see you again, Matt.
% endif %
```

You can iterate using `% for item in collection %`, terminated by `% endfor %`, and you can apply "filters" to variables with the `|` operator inside your bracket pair.

---

## Flask: Templates III

Typically, your web app will be composed of some hierarchy of jinja templates:

```
templates/
  head.html
  header.html
  base_body.html
  gallery_body.html
  footer.html
```

You can include these by using combinations of `%include 'header.html'%`,
defining `%block myblockname%` / `%endblock%` setups and composing them.  These
need to be inside bracket-percent blocks.

---

## Flask: Sessions

We aren't going to cover sessions!  But if you wanted to, [you could learn
about
them](https://flask.palletsprojects.com/en/1.1.x/quickstart/#sessions).

Basically, they're ways of storing info about a particular "session" of
someone looking at the webapp.  So you could, for instance, make
progressive changes to a visualization if you wanted to.

---

## Flask: Returning JSON I

First off: why might you want to return JSON?  <span class="fragment">My answer: to combine client-side and server-side data viz!</span>

You can return JSON-ified values by using `flask.jsonify`.  For example, to turn a dict into a JSON response:

```python
from flask import jsonify

@app.route('/jsondict/')
def make_json_dict():
    return jsonify({'a':1, 'b':[1,2,3]})
```

---

## Flask: Returning JSON II

You can also set the response type to `application/json`.  This is useful
if you want to (for instance) return a pandas dataframe:

```python
from flask import Response
import pandas as pd

@app.route('/json/')
def make_json_dict():
    df = pd.read_csv("building_inventory.csv")
    return Response(df.to_json(), mimetype="application/json")
```

---

## Flask: Making an Image Gallery

So how do we put this all together?

Let's make a base website that takes as a parameter the *number* of plots,
and returns a set of images.  We can't do this with just a single
template, or a single request handler, so how do we do it?

---

## Flask: In Summary

Flask can be a very rapid, nice way of sharing results -- and it's really
easy to deploy on lots of different cloud providers!

But as you can tell, it's not *really* built specifically for
visualization.  And if you want to add some interaction that fiddles with
plots or something, it's going to require both *frontend* and *backend*
programming.

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

Let's see if we can make a Ticket to Ride visualization using DeckGL and
Matplotlib in Streamlit.
