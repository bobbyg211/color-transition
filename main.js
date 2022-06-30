const colorTrans = (elemsArr, pointsArr, colorsArr, propsArr) => {
  function transition() {
    const elems = getElems(elemsArr, colorsArr);
    const props = propsArr;

    ["load", "scroll"].forEach((e) => {
      window.addEventListener(e, () => {
        const scrollPos = window.pageYOffset;
        const points = getPoints(pointsArr, scrollPos);

        elems.forEach((elem, i) => {
          points.forEach((point, j) => {
            if (point.top <= 0 && point.bottom >= 0 && j < points.length - 1) {
              const perc = -points[j].top / points[j].height;
              let color;

              if (!elem.color[j].length) {
                const diff = {
                  r: elem.color[j + 1].r - elem.color[j].r,
                  g: elem.color[j + 1].g - elem.color[j].g,
                  b: elem.color[j + 1].b - elem.color[j].b,
                };

                color = {
                  r: diff.r * perc + elem.color[j].r,
                  g: diff.g * perc + elem.color[j].g,
                  b: diff.b * perc + elem.color[j].b,
                };
              } else {
                const diff = [
                  {
                    r: elem.color[j + 1][0].r - elem.color[j][0].r,
                    g: elem.color[j + 1][0].g - elem.color[j][0].g,
                    b: elem.color[j + 1][0].b - elem.color[j][0].b,
                  },
                  {
                    r: elem.color[j + 1][1].r - elem.color[j][1].r,
                    g: elem.color[j + 1][1].g - elem.color[j][1].g,
                    b: elem.color[j + 1][1].b - elem.color[j][1].b,
                  },
                ];

                color = [
                  {
                    r: diff[0].r * perc + elem.color[j][0].r,
                    g: diff[0].g * perc + elem.color[j][0].g,
                    b: diff[0].b * perc + elem.color[j][0].b,
                  },
                  {
                    r: diff[1].r * perc + elem.color[j][1].r,
                    g: diff[1].g * perc + elem.color[j][1].g,
                    b: diff[1].b * perc + elem.color[j][1].b,
                  },
                ];
              }

              if (props.length === 1) i = 0;
              setProps(elem, props[i], color);
            }
          });
        });
      });
    });
  }

  function getElems(arr, colors) {
    let allElems = [];
    arr.forEach((elem, i) => {
      allElems = [...allElems, ...document.querySelectorAll(elem)];
    });

    let elemsWithColors = [];
    allElems.forEach((elem, i) => {
      if (colors.length === 1) i = 0;
      elemsWithColors = [...elemsWithColors, { el: elem, color: getColors(colors[i]) }];
    });

    return elemsWithColors;
  }

  function getPoints(arr, scrollPos) {
    let allElems = [];
    arr.forEach((elem) => {
      allElems = [...allElems, ...document.querySelectorAll(elem)];
    });

    let allPoints = [];
    allElems.reverse().forEach((point, i) => {
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

    return allPoints.reverse();
  }

  function getColors(arr) {
    let allColors = [];
    arr.forEach((color) => {
      allColors = [...allColors, hexToRgb(color)];
    });

    // console.log(allColors);

    return allColors;
  }

  function setProps(elem, props, color) {
    props.forEach((prop) => {
      if (!color.length) {
        elem.el.style[prop] = `rgb(${color.r}, ${color.g}, ${color.b})`;
      } else {
        elem.el.style[
          prop
        ] = `linear-gradient(90deg, rgb(${color[0].r}, ${color[0].g}, ${color[0].b}), rgb(${color[1].r}, ${color[1].g}, ${color[1].b}))`;
      }
    });
  }

  // Utilities
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
      const result1 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.color1);
      const result2 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.color2);

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
