# Color Scroll Transition

Library to help facilitate easy, smooth color transitions when the user scrolls.

## Main Function

```
scrollTrans(elemsArr, pointsArr, colorsArr, propsArr).init();
```

<br>

## Definitions

### Elements Array

This is an array of individual CSS selector strings. These will be used to determine which elements will be specifically acted upon by the function. If any selector identifies multiple elements, all said elements will be acted upon.

### Points Array

This is an array of individual CSS selector strings. These will be used to determine the points on the page between which all of the elements will transition. If any selector identifies multiple elements, all said elements will be used as transition points.

### Colors Array

This is an array of individual hex codes as a string. Pairs of colors can be placed within an object to indicate gradients in the following format:

```
{ c1: "#000000", c2: "#ffffff" }
```

These are the actual colors that will be used for the transition. The first color will be applied automatically upon page load and the rest will transition, one to the next, according to their corresponding point index.

### CSS Props Array

This is an array of individual CSS property strings. These will be used to determine which CSS properties the colors should act upon. Props must be in camel case JS format.

<br>

## Syntax Examples

Parameters in the main function generally come in two standard formats...

1. Array of strings
2. Array of arrays (also containing strings or sometimes objects)

_Note: The points array parameter is the only parameter that is exclusively limited to an array of strings. No sub-arrays or objects are allowed._

The goal of this syntax is to allow the user the ability to be both very specific or very general in how they want all of the parameters to relate to one another.

Take the situation where you want to simply want to transition the background color of the page. It might look something like this:

```
colorTrans(
  ["html", "body"],
  [".tier"],
  ["#00256c", "#1e0081", "#00697c"],
  ["backgroundColor"]
);
```

Each parameter here is simply an array of one or more strings. Since there are no sub-arrays, the colors and properties are applied to all elements between each transition point.

Here is a more complex example where we want to transition the color of several SVG icons:

```
colorTrans(
  [
    ["svg rect.f", "svg rect.b", "svg rect.e"],
    ["svg path"],
  ],
  [".tier"],
  ["#67d0ff", "#c3a1ff", "#1afcee"],
  [
    ["stroke"],
    ["fill"]
  ]
);
```

Here you can see that both the elements & properties parameters have sub-arrays while the rest do not. By doing this, we are creating several groups of items that will be separately color transitioned. The first set of elements will have their 'stroke' property affected and the second set of elements will have their 'fill' property affected. The colors, since they are not contained in a sub-array, apply to all elements and all properties.

Let's take one final example. In this situation, we want to transition the colors of an SVG logo:

```
colorTrans(
  [".logo svg rect"],
  [".tier"],
  [
    ["#009DFF", "#C5A0FF", "#00AEB5"],
    ["#1345B5", "#9E29DD", "#0075A0"],
  ],
  ["stroke"]
);
```

As you can see, only the colors parameter has sub-arrays here. In this situation, instead of the colors applying to all elements, the first set of colors will apply to the first instance of the "rect" element and the second set of colors will apply to the second instance. Any additional instances will simply remain unchanged.

_Note: This only applies to the colors parameter. If you were to, for example, add multiple sets of properties, then only the first set will be used in this situation._

<hr><br>

## NOTES

- Add ability to set color opacity
- Maybe change the behavior of multiple property sets to be similar to the behavior of multiple color sets when the elements parameter contains no sub-arrays.
