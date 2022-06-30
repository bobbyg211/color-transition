# Color Scroll Transition

Library to help facilitate easy, smooth color transitions.

## Definitions

### Elements Array

This is an array of individual CSS selector strings. These will be used to determine which elements will be specifically acted upon by the function.

### Points Array

This is an array of individual CSS selector strings. These will be used to determine the places on the page between which all of the elements wil transition.

### Colors Array

This is an array of individual hex codes and an alpha value as a string and value between 0-1 respectively. Sets of colors can be placed within an object to indicate gradients. These are the actual colors that will be used for the transition. The first color will be applied automatically upon page load and the rest will transition, one to the next, according to their corresponding point index.

### CSS Props Array

This is an array of individual CSS property strings. These will be used to determine which CSS properties the colors should act upon. Props must be in camel case JS format.

## NOTES

### Possible elements

- HTML Element
- SVG

### CSS Props

- Background
- Border
- Color
- Fill
- Stroke

### Color Options

- Solid color
- Color gradient

### Things to consider

- What if number of points doesn't match the number of colors
  - Code failsafe to handle this
- Maybe try the increasing the transition step at the same rate for all colors capping themselves out at each colors max value. the rate is set by the largest color difference.
