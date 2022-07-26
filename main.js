const colorTrans = (elemsArr, pointsArr, colorsArr, propsArr) => {
  function transition() {
    const elemsInit = getElems(elemsArr, colorsArr);
    const pointsInit = getPoints(pointsArr, elemsInit);
    const colorsInit = getColors(colorsArr, elemsInit);
    const propsInit = getProps(propsArr, elemsInit);
    const groups = createGroups(elemsInit, pointsInit, colorsInit, propsInit);

    window.addEventListener("load", () => {
      if (groups[0].points[0].top > 0) {
        groups.forEach((group) => {
          const { elems, colors, props } = group;

          elems.forEach((elem, i) => {
            let color;

            if (!Array.isArray(colors[0])) {
              color = {
                r: colors[0].r,
                g: colors[0].g,
                b: colors[0].b,
              };
            } else {
              color = [
                {
                  r: colors[0][0].r,
                  g: colors[0][0].g,
                  b: colors[0][0].b,
                },
                {
                  r: colors[0][1].r,
                  g: colors[0][1].g,
                  b: colors[0][1].b,
                },
              ];
            }

            setProps(elem, props, color);
          });
        });
      }
    });

    ["load", "scroll"].forEach((e) => {
      window.addEventListener(e, () => {
        const scrollPos = window.pageYOffset;

        groups.forEach((group) => {
          group.points = getPoints(pointsArr, elemsInit, scrollPos)[0];
          const { elems, points, colors, props } = group;

          elems.forEach((elem, i) => {
            points.forEach((point, j) => {
              if (point.top <= 0 && point.bottom >= 0 && j < points.length - 1) {
                const perc = -points[j].top / points[j].height;
                let color;

                if (!Array.isArray(colors[j])) {
                  const diff = {
                    r: colors[j + 1].r - colors[j].r,
                    g: colors[j + 1].g - colors[j].g,
                    b: colors[j + 1].b - colors[j].b,
                  };

                  color = {
                    r: diff.r * perc + colors[j].r,
                    g: diff.g * perc + colors[j].g,
                    b: diff.b * perc + colors[j].b,
                  };
                } else {
                  const diff = [
                    {
                      r: colors[j + 1][0].r - colors[j][0].r,
                      g: colors[j + 1][0].g - colors[j][0].g,
                      b: colors[j + 1][0].b - colors[j][0].b,
                    },
                    {
                      r: colors[j + 1][1].r - colors[j][1].r,
                      g: colors[j + 1][1].g - colors[j][1].g,
                      b: colors[j + 1][1].b - colors[j][1].b,
                    },
                  ];

                  color = [
                    {
                      r: diff[0].r * perc + colors[j][0].r,
                      g: diff[0].g * perc + colors[j][0].g,
                      b: diff[0].b * perc + colors[j][0].b,
                    },
                    {
                      r: diff[1].r * perc + colors[j][1].r,
                      g: diff[1].g * perc + colors[j][1].g,
                      b: diff[1].b * perc + colors[j][1].b,
                    },
                  ];
                }

                setProps(elem, props, color);
              }
            });
          });
        });
      });
    });
  }

  function getElems(arr, colors) {
    if (!Array.isArray(arr[0]) && Array.isArray(colors[0])) {
      let elems = [...document.querySelectorAll(arr)];
      let newArr = [];

      elems.forEach((elem, i) => {
        newArr = [...newArr, [arr[0] + `:nth-child(${i + 1})`]];
      });

      arr = newArr;
    } else if (!Array.isArray(arr[0])) {
      arr = [arr];
    }

    let allElems = [];
    arr.forEach((group) => {
      let currElems = [];
      group.forEach((elem) => {
        currElems = [...currElems, ...document.querySelectorAll(elem)];
      });

      allElems = [...allElems, currElems];
    });

    return allElems;
  }

  function getPoints(arr, elems, scrollPos) {
    if (!Array.isArray(arr[0])) {
      arr = elems.map(() => arr);
    }
    scrollPos = scrollPos !== undefined ? scrollPos : 0;

    let allElems = [];
    arr.forEach((group) => {
      let currElems = [];
      group.forEach((elem) => {
        let allPoints = [];
        let currPoints = [...document.querySelectorAll(elem)];

        currPoints.forEach((point) => {
          const rect = point.getBoundingClientRect();
          allPoints = [
            ...allPoints,
            {
              el: point,
              top: rect.top,
              bottom: rect.bottom,
              height: rect.height,
              offsetTop: rect.top + scrollPos,
              offsetBottom: rect.bottom + scrollPos,
            },
          ];
        });

        currElems = [...currElems, ...allPoints];
      });

      allElems = [...allElems, currElems];
    });

    return allElems;
  }

  function getColors(arr, elems) {
    if (!Array.isArray(arr[0])) {
      arr = elems.map(() => arr);
    }

    let allColors = [];
    arr.forEach((group) => {
      let currColors = [];
      group.forEach((color) => {
        currColors = [...currColors, hexToRgb(color)];
      });

      allColors = [...allColors, currColors];
    });

    return allColors;
  }

  function getProps(arr, elems) {
    if (!Array.isArray(arr[0])) {
      arr = elems.map(() => arr);
    }

    let allProps = [];
    arr.forEach((group) => {
      let currProps = [];
      group.forEach((prop) => {
        currProps = [...currProps, prop];
      });

      allProps = [...allProps, currProps];
    });

    return allProps;
  }

  function createGroups(elems, points, colors, props) {
    let allGroups = [];

    elems.forEach((arr, i) => {
      if (!points[i] || !colors[i] || !props[i]) {
        const err = new Error(
          `The number of 'point', 'color', and 'prop' sets must me greater than or equal to the number of 'element' sets.`
        );

        err.name = "Set Count Error";
        throw err;
      }

      allGroups = [
        ...allGroups,
        { elems: arr, points: points[i], colors: colors[i], props: props[i] },
      ];
    });

    return allGroups;
  }

  // Utilities
  function setProps(elem, props, color) {
    props.forEach((prop) => {
      if (!color.length) {
        elem.style[prop] = `rgb(${color.r}, ${color.g}, ${color.b})`;
      } else {
        elem.style[
          prop
        ] = `linear-gradient(90deg, rgb(${color[0].r}, ${color[0].g}, ${color[0].b}), rgb(${color[1].r}, ${color[1].g}, ${color[1].b}))`;
      }
    });
  }

  function hexToRgb(hex) {
    if (typeof hex === "string") {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    } else if (typeof hex === "object") {
      const result1 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.c1);
      const result2 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.c2);

      return result1 && result2
        ? [
            {
              r: parseInt(result1[1], 16),
              g: parseInt(result1[2], 16),
              b: parseInt(result1[3], 16),
            },
            {
              r: parseInt(result2[1], 16),
              g: parseInt(result2[2], 16),
              b: parseInt(result2[3], 16),
            },
          ]
        : null;
    }
  }

  // Initialize
  function init() {
    transition();
  }

  return {
    init: init,
  };
};
