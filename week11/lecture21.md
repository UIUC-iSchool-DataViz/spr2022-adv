---
title: Server-side Visualizations
layout: lecture
tags:
  - getting-help
  - assignment-follow-up
  - servers
  - jupyter-extensions
description: >-
  We'll talk about how you can "get help" from online sources, and then move on to server-side visualizations.
include_mermaid: true
---

## Getting Help

 * [Mozilla Developer Network](https://developer.mozilla.org/en-US/) -- and searching for "SVG" is a good place to find attributes of individual objects we manipulate in d3
 * [d3 github pages](https://github.com/d3) -- the README files for individual sub-packages of D3 have detailed API references, along with links to ObservableHQ notebooks.  For instance, [d3-scale](https://github.com/d3/d3-scale).  One thing to keep in mind is that many of the google results for d3 will show previous versions (often v4, in my experience) of the library, which are not necessarily applicable, as the syntax and structure of d3 has changed a bit over time.
 * [Stackoverflow](https://stackoverflow.com/) -- generally you'll find your way here through organic searches.
 * [vega-lite docs](https://vega.github.io/) -- the documentation for vega-lite is *very* extensively cross-referenced

When I'm looking for a piece of information I'll often use particular "destination" keywords in google.  For instance, searing ``svg circle mdn`` will bring me to the exact right MDN page for the properties of an SVG circle.  Or, searching ``d3 scalelinear`` will get me to the page for linear scales.

---

## Server-side Visualization

We have spent a fair bit of time focused on what basically amounts to
client-side visualization in this class -- either in jupyterlab (and
"client-side" is only *kinda-not-really* accurate here) or using javascript
frameworks like vega-lite or d3.

Today we're going to talk about server-side visualization and we're going to
build out a simple web-app.

---

## Server-side Visualization: Why?

Why might we want to have a server-side visualization framework?

<ul>
    <li class="fragment">Access really, really big data</li>
    <li class="fragment">Access sensitive data through some kind of proxy</li>
    <li class="fragment">Perform complex reductions or queries before passing down</li>
    <li class="fragment">Reduce client-side requirements or take advantage of fancy hardware</li>
    <li class="fragment">Coordinate multiple viewers</li>
    <li class="fragment">Store persistent state</li>
</ul>

<p class="fragment">(There are, of course, other reasons you might want to do this!)</p>

---

## What do we mean by Client-side?

<p class="fragment">Conversely, when we're just accessing a static site, in <i>general</i> it will look something like this:</p>

<div class="mermaid centered fragment">
sequenceDiagram
    Participant User
    Participant Browser
    Participant Server
    par UI and Data Serving
    Server->>Browser: Initial State and Data
    and Interaction
    User->>Browser: Interact
    Browser->>User: New UI State
    end
</div>

---

## What do we mean by kinda Client-side?

<p class="fragment">The typical interaction you have with a Jupyterlab interface roughly looks like this:</p>

<div class="mermaid centered fragment">
sequenceDiagram
    par Interaction
    User->>Jupyter Lab UI: Interact
    Jupyter Lab UI->>User: New UI State
    and Code Execution
    Jupyter Lab UI->>Jupyter Server: Execute Code
    Jupyter Server->>Jupyter Lab UI: Results
    end
</div>

<p class="fragment">I say this is "sorta-kinda" client-side because <i>usually</i> we've been executing the client interactions on the same system as the jupyter kernel is running.  But this is kind of a cop-out -- all of the data and responses still get transmitted as though we were remote!</p>

---

## What will our server-side rendering look like?

<p class="fragment">Today we're going to explore writing our *own* server-side rendering system!</p>

<div class="mermaid centered fragment">
sequenceDiagram
    Participant User
    Participant Browser
    Participant Server
    Server->>Browser: Initial Rendered Viz
    Browser->>User: Initial UI State
    User->>Browser: Interaction
    Browser->>Server: Render Update Request
    Server->>Browser: New Rendered Viz
    Browser->>User: New UI State
</div>

---

## Server-side Visualization Frameworks

We'll talk about some server-side visualization frameworks next time.  These will often manage things like state communication, common patterns for visualizations, and in some cases they will maintain a coordinated state between sessions and users.

Next time, we'll touch on a few of these:

 * Flask
 * Dash
 * Bokeh
 * idom

---

## Let's Make Our Own

Let's take a moment to build a very simple project.

```python

import http.server

class MyHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/index.html":
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(open("index.html").read())
        else:
            self.send_response(404)

def run(host, port):
    httpd = http.server.HTTPServer((host, port), MyHandler)
    httpd.serve_forever()

if __name__ == "__main__":
    run("localhost", 8000)
```

What next?

---

## Passing Visualizations

How do we pass a visualization back?

```python

import io
import matplotlib.pyplot as plt
d = io.BytesIO()

plt.plot([1,2,3], [4,5,6])
plt.savefig(d)
```

We now have what we *would* have had saved to a file in the object `d`.  `d`
here acts like a file pointer and can be read from and supplied back to the
server.  (But, just like a file pointer, it's currently pointed at the *end* of
what it's written.)

**Note**: This isn't really that safe!  You probably shouldn't implement this
stuff on your own, and instead rely on frameworks.  But for our purposes, it's
okay for just now.  Plus, the `BaseHTTPRequestHandler` has a `wfile` for just
this purpose.

---

## Passing Visualizations

How do we get this back?

```python

import http.server
import io
import matplotlib.pyplot as plt

class MyHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/index.html":
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(open("index.html").read())
        elif self.path == "/hi.png":
            self.send_response(200)
            self.send_header("Content-type", "image/png")
            self.end_headers()
            plt.plot([1,2,3], [4,5,6])
            plt.savefig(self.wfile)
        else:
            self.send_response(404)

def run(host, port):
    httpd = http.server.HTTPServer((host, port), MyHandler)
    httpd.serve_forever()

if __name__ == "__main__":
    run("localhost", 8000)
```
