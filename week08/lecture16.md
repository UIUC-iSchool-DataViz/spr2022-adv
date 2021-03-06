---
title: More Vega Lite
layout: lecture
tags: 
  - vega-lite
description: >-
  What else can we do with vega-lite?
---


## Today: vega-lite

 * vega-lite
    * transforming data
    * filtering data
 * types of marks
    * arc
    * trail
    * image
    * geoshape
 * annotations
    * tooltips
    * selecting nearest
 * Putting this together with our RPG

---


## Transforming

There are several `transform` options that we have not yet explored in detail.

 * `fold`
 * `flatten`
 * `lookup`
 * `window`

---

## Transform: `fold`

"`fold`"-ing a dataset transforms it by *expanding* to include additional keys,
to enable an additional parameter for selection.  For instance, if we have a
dataset of the form:

```
[ {'name': ..., 'prop1': ..., 'prop2': ...}, ... ]
```

we can apply a `fold` of `prop1` and `prop2` to obtain:

```
[ {'key': 'prop1', 'value': ..., 'name': ..., 'prop1': ..., 'prop2': ...},
  {'key': 'prop2', 'value': ..., 'name': ..., 'prop1': ..., 'prop2': ...} ]
```

---

## Transform: `flatten`

This operates similarly to `fold`, except that the inputs for `prop1` and
`prop2` are allowed to be arrays.  This produces a new set of rows in the
output data, one for each element in the corresponding arrays.

(This is less likely to be useful for input CSV data.)

---

## Transform: `lookup`

Occasionally we will want to use keys for lookup, based on other data rows.  We
can look up either in a named data source or in a fully-specified inline
datasource.

```json
{ "lookup": "primaryKey",
  "from": {
    "data": {"name": "referenceData"}
    "key": "keyInReference",
    "fields": ["prop1", "prop2"],
  }
}
```

---

## Transform: `window`

A `window` transform lets us perform an operation on a set of multiple rows in
our dataset.  *Crucially* we can also specify the *order* that they are
processed in.  It is defined like this:

```
  "window": [{
	  "op": ...,
	  "field": ...,
	  "param": ...,
	  "as": ...
  }],
  "sort": [
	{"field": ..., "order": ...}
  ],
  "ignorePeers": ...,
  "groupby": [
	"..."
  ],
  "frame": [...,...]
```

(We will demonstrate this!)

---

## Filtering

 * ranking
 * parameters

---

## View Composition

 * Layering
 * Faceting
 * Repeating

---

## Marks:

 * arc
 * trail
 * image
 * geoshape

---

## Encoding Channels

 * latitude / longitude
 * color
 * text / tooltip / href

---

## Putting this Together with our RPG

Recall our RPG vega-lite definitions:

 * [Static display](https://gist.githubusercontent.com/matthewturk/3cfe1286946fd23e9790d2abea1548a8/raw/eafb4fd05cc076dc7731d6523bbf6ec39aa3ba6e/rpg_2.json).
 * [Time varying](https://gist.githubusercontent.com/matthewturk/3cfe1286946fd23e9790d2abea1548a8/raw/eafb4fd05cc076dc7731d6523bbf6ec39aa3ba6e/rpg_3.json).

How can we modify this such that we have characters defined with timestamped hit points?

```json
{ ...
  hp: [10, 23, 53]
}
```

What set of operations would we need to conduct to make this viable for our
time-series display, coupled with the static display?
