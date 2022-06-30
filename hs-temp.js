const nav = document.querySelector("header#header .main-ribbon nav#navigation");
const openClose = document.querySelector("header#header .main-ribbon nav#navigation .open-close");
const menu = document.querySelector("header#header .main-ribbon nav#navigation .hs-menu-wrapper");

$("header#header .main-ribbon nav#navigation .hs-menu-wrapper > ul > li:nth-child(4)").addClass(
  "active"
);

$(openClose).click(function () {
  if (!$(nav).hasClass("active")) {
    $(menu).css("display", "flex").hide().fadeIn();
  } else {
    $(menu).fadeOut();
  }

  if ($(window).width() <= 768) {
    if (!$("header#header .sub-ribbon").hasClass("active")) {
      $("header#header .sub-ribbon").css("display", "flex").hide().fadeIn();
    } else {
      $("header#header .sub-ribbon").fadeOut();
    }
  }

  $(nav).toggleClass("active");
  $("header#header .sub-ribbon").toggleClass("active");
  $("body").toggleClass("no-scroll");
});

$("header#header .main-ribbon nav#navigation .hs-menu-wrapper > ul > li a").hover(function () {
  $("header#header .main-ribbon nav#navigation .hs-menu-wrapper > ul > li").removeClass("active");

  $(this).parent().addClass("active");
});

const orgName = document.querySelector("#header .name");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    orgName.classList.add("active");
  } else {
    orgName.classList.remove("active");
  }
});

// Utility Functions
const scrollBgColorTrans = (bgElem, borderElem, startElem, endElem, startColorObj, endColorObj) => {
  const bgArea = document.querySelectorAll(`${bgElem}`);
  const borderArea = document.querySelectorAll(`${borderElem}`);
  const start = document.querySelector(`${startElem}`);
  const end = document.querySelector(`${endElem}`);
  const startPosY = start.getBoundingClientRect().top;
  const endPosY = end.getBoundingClientRect().top;
  const rDist = endColorObj.r - startColorObj.r;
  const gDist = endColorObj.g - startColorObj.g;
  const bDist = endColorObj.b - startColorObj.b;

  window.addEventListener("scroll", () => {
    const currStartPosY = start.getBoundingClientRect().top;
    const progressPerc = -currStartPosY / (endPosY - startPosY);

    if (progressPerc <= 1 && progressPerc >= 0) {
      const rVal = Math.round(rDist * progressPerc + startColorObj.r);
      const gVal = Math.round(gDist * progressPerc + startColorObj.g);
      const bVal = Math.round(bDist * progressPerc + startColorObj.b);

      const areaColor = { r: rVal, g: gVal, b: bVal };

      if (bgArea) {
        for (let i = 0; i < bgArea.length; i++) {
          bgArea[i].style.backgroundColor = `rgb(${areaColor.r}, ${areaColor.g}, ${areaColor.b})`;
        }
      }

      if (borderArea) {
        for (let i = 0; i < borderArea.length; i++) {
          borderArea[i].style.borderColor = `rgb(${areaColor.r}, ${areaColor.g}, ${areaColor.b})`;
        }
      }
    }
  });
};

const scrollSvgColorTrans = (
  svgFillElem,
  svgStrokeElem,
  svgStopColorElem,
  startElem,
  endElem,
  startColorObj,
  endColorObj
) => {
  const svgFill = document.querySelectorAll(`${svgFillElem}`);
  const svgStroke = document.querySelectorAll(`${svgStrokeElem}`);
  const svgStopColor = document.querySelectorAll(`${svgStopColorElem}`);
  const start = document.querySelector(`${startElem}`);
  const end = document.querySelector(`${endElem}`);
  const startPosY = start.getBoundingClientRect().top;
  const endPosY = end.getBoundingClientRect().top;
  const rDist = endColorObj.r - startColorObj.r;
  const gDist = endColorObj.g - startColorObj.g;
  const bDist = endColorObj.b - startColorObj.b;

  window.addEventListener("scroll", () => {
    const currStartPosY = start.getBoundingClientRect().top;
    const progressPerc = -currStartPosY / (endPosY - startPosY);

    if (progressPerc <= 1 && progressPerc >= 0) {
      const rVal = Math.round(rDist * progressPerc + startColorObj.r);
      const gVal = Math.round(gDist * progressPerc + startColorObj.g);
      const bVal = Math.round(bDist * progressPerc + startColorObj.b);

      const svgColor = { r: rVal, g: gVal, b: bVal };

      if (svgFill) {
        for (let i = 0; i < svgFill.length; i++) {
          svgFill[i].style.fill = `rgb(${svgColor.r}, ${svgColor.g}, ${svgColor.b})`;
        }
      }

      if (svgStroke) {
        for (let i = 0; i < svgStroke.length; i++) {
          svgStroke[i].style.stroke = `rgb(${svgColor.r}, ${svgColor.g}, ${svgColor.b})`;
        }
      }

      if (svgStopColor) {
        for (let i = 0; i < svgStopColor.length; i++) {
          svgStopColor[i].style.stopColor = `rgb(${svgColor.r}, ${svgColor.g}, ${svgColor.b})`;
        }
      }
    }
  });
};

const dotSwitch = () => {
  // Section detection logic
  let allIDs = [];
  let links = document.querySelectorAll(".dot-nav a");
  links.forEach((link) => allIDs.push(link.hash));

  idCheck(false);

  function idCheck(limitDetectionArea) {
    allIDs.forEach((id) => {
      if (id.length > 0) {
        const currTier = document.querySelector(id);
        const currTierTopOffset = currTier.getBoundingClientRect().top;
        const currTierBottomOffset = currTier.getBoundingClientRect().bottom;

        if (limitDetectionArea) {
          if (
            (currTierTopOffset < 1 && currTierTopOffset >= -100) ||
            (currTierBottomOffset > 1 && currTierBottomOffset <= 100)
          ) {
            const dots = document.querySelectorAll(".dot-nav a");
            const currDot = document.querySelector(`.dot-nav a[href="${id}"]`);

            dots.forEach((link) => link.classList.remove("active"));
            currDot.classList.add("active");
          }
        } else {
          if (currTierTopOffset <= 1) {
            const dots = document.querySelectorAll(".dot-nav a");
            const currDot = document.querySelector(`.dot-nav a[href="${id}"]`);

            dots.forEach((link) => link.classList.remove("active"));
            currDot.classList.add("active");
          }
        }
      }
    });
  }

  window.addEventListener("scroll", () => {
    idCheck(true);
  });
};

if ($("#main-content").hasClass("home")) {
  dotSwitch();

  // Banner Transition
  const bannerColor = { r: 0, g: 37, b: 108 };
  const skillsColor = { r: 30, g: 0, b: 129 };
  const projectsColor = { r: 0, g: 105, b: 124 };

  scrollBgColorTrans(
    ".home",
    null,
    ".home .color-transition-tier:nth-child(1)",
    ".home .color-transition-tier:nth-child(2)",
    bannerColor,
    skillsColor
  );

  scrollBgColorTrans(
    ".home",
    null,
    ".home .color-transition-tier:nth-child(2)",
    ".home .color-transition-tier:nth-child(3)",
    skillsColor,
    projectsColor
  );

  scrollBgColorTrans(
    ".home",
    null,
    ".home .color-transition-tier:nth-child(3)",
    ".home .color-transition-tier:nth-child(4)",
    projectsColor,
    bannerColor
  );

  // Logo Transition
  const lightBlue = { r: 0, g: 157, b: 255 };
  const middleBlue = { r: 19, g: 69, b: 181 };
  const lightPurple = { r: 197, g: 160, b: 255 };
  const purple = { r: 158, g: 41, b: 221 };
  const cyan = { r: 0, g: 174, b: 181 };
  const darkCyan = { r: 0, g: 117, b: 160 };

  scrollSvgColorTrans(
    null,
    null,
    "#header .main-ribbon .logo svg defs linearGradient stop:first-child",
    ".home .color-transition-tier:nth-child(1)",
    ".home .color-transition-tier:nth-child(2)",
    lightBlue,
    lightPurple
  );

  scrollSvgColorTrans(
    null,
    null,
    "#header .main-ribbon .logo svg defs linearGradient stop:last-child",
    ".home .color-transition-tier:nth-child(1)",
    ".home .color-transition-tier:nth-child(2)",
    middleBlue,
    purple
  );

  scrollSvgColorTrans(
    null,
    null,
    "#header .main-ribbon .logo svg defs linearGradient stop:first-child",
    ".home .color-transition-tier:nth-child(2)",
    ".home .color-transition-tier:nth-child(3)",
    lightPurple,
    cyan
  );

  scrollSvgColorTrans(
    null,
    null,
    "#header .main-ribbon .logo svg defs linearGradient stop:last-child",
    ".home .color-transition-tier:nth-child(2)",
    ".home .color-transition-tier:nth-child(3)",
    purple,
    darkCyan
  );

  scrollSvgColorTrans(
    null,
    null,
    "#header .main-ribbon .logo svg defs linearGradient stop:first-child",
    ".home .color-transition-tier:nth-child(3)",
    ".home .color-transition-tier:nth-child(4)",
    cyan,
    lightBlue
  );

  scrollSvgColorTrans(
    null,
    null,
    "#header .main-ribbon .logo svg defs linearGradient stop:last-child",
    ".home .color-transition-tier:nth-child(3)",
    ".home .color-transition-tier:nth-child(4)",
    darkCyan,
    middleBlue
  );

  // Open/Close Menu Transitions
  const bannerSvgColor = { r: 103, g: 208, b: 255 };
  const skillsSvgColor = { r: 197, g: 160, b: 255 };
  const projectsSvgColor = { r: 21, g: 255, b: 237 };

  scrollBgColorTrans(
    "#navigation .open-close span",
    "#navigation .open-close",
    ".home .color-transition-tier:nth-child(1)",
    ".home .color-transition-tier:nth-child(2)",
    bannerSvgColor,
    skillsSvgColor
  );

  scrollBgColorTrans(
    "#navigation .open-close span",
    "#navigation .open-close",
    ".home .color-transition-tier:nth-child(2)",
    ".home .color-transition-tier:nth-child(3)",
    skillsSvgColor,
    projectsSvgColor
  );

  scrollBgColorTrans(
    "#navigation .open-close span",
    "#navigation .open-close",
    ".home .color-transition-tier:nth-child(3)",
    ".home .color-transition-tier:nth-child(4)",
    projectsSvgColor,
    bannerSvgColor
  );

  // Social Icons transition

  scrollSvgColorTrans(
    "#header .sub-ribbon .social svg path",
    "#header .sub-ribbon .social svg > g > g > rect:last-child",
    null,
    ".home .color-transition-tier:nth-child(1)",
    ".home .color-transition-tier:nth-child(2)",
    bannerSvgColor,
    skillsSvgColor
  );

  scrollSvgColorTrans(
    "#header .sub-ribbon .social svg path",
    "#header .sub-ribbon .social svg > g > g > rect:last-child",
    null,
    ".home .color-transition-tier:nth-child(2)",
    ".home .color-transition-tier:nth-child(3)",
    skillsSvgColor,
    projectsSvgColor
  );

  scrollSvgColorTrans(
    "#header .sub-ribbon .social svg path",
    "#header .sub-ribbon .social svg > g > g > rect:last-child",
    null,
    ".home .color-transition-tier:nth-child(3)",
    ".home .color-transition-tier:nth-child(4)",
    projectsSvgColor,
    bannerSvgColor
  );
}

// ================================================

if ($("#main-content").hasClass("skills-services")) {
  $("#header .main-ribbon .logo svg defs linearGradient stop:first-child").css(
    "stop-color",
    "#c5a0ff"
  );
  $("#header .main-ribbon .logo svg defs linearGradient stop:last-child").css(
    "stop-color",
    "#9e29dd"
  );
  $(
    "header#header .sub-ribbon .social .github .b, header#header .sub-ribbon .social .twitter .a, header#header .sub-ribbon .social .linkedin .b"
  ).css("stroke", "#c5a0ff");
  $(
    "header#header .sub-ribbon .social .twitter .c, header#header .sub-ribbon .social .github .d,header#header .sub-ribbon .social .linkedin g .a"
  ).css("fill", "#c5a0ff");
  $("header#header .main-ribbon nav#navigation .open-close").css("border-color", "#c5a0ff");
  $("header#header .main-ribbon nav#navigation .open-close span").css("background", "#c5a0ff");

  // Banner Transition
  const bannerColor = { r: 0, g: 37, b: 108 };
  const skillsColor = { r: 30, g: 0, b: 129 };
  const projectsColor = { r: 0, g: 105, b: 124 };

  scrollBgColorTrans(
    ".skills-services",
    null,
    ".skills-services .color-transition-tier:nth-child(5)",
    ".skills-services .color-transition-tier:nth-child(6)",
    skillsColor,
    projectsColor
  );

  scrollBgColorTrans(
    ".skills-services",
    null,
    ".skills-services .color-transition-tier:nth-child(6)",
    ".skills-services .color-transition-tier:nth-child(7)",
    projectsColor,
    bannerColor
  );

  // Logo Transition
  const lightPurple = { r: 197, g: 160, b: 255 };
  const purple = { r: 158, g: 41, b: 221 };
  const cyan = { r: 0, g: 174, b: 181 };
  const darkCyan = { r: 0, g: 117, b: 160 };
  const lightBlue = { r: 0, g: 157, b: 255 };
  const middleBlue = { r: 19, g: 69, b: 181 };

  scrollSvgColorTrans(
    null,
    null,
    "#header .main-ribbon .logo svg defs linearGradient stop:first-child",
    ".skills-services .color-transition-tier:nth-child(5)",
    ".skills-services .color-transition-tier:nth-child(6)",
    lightPurple,
    cyan
  );

  scrollSvgColorTrans(
    null,
    null,
    "#header .main-ribbon .logo svg defs linearGradient stop:last-child",
    ".skills-services .color-transition-tier:nth-child(5)",
    ".skills-services .color-transition-tier:nth-child(6)",
    purple,
    darkCyan
  );

  scrollSvgColorTrans(
    null,
    null,
    "#header .main-ribbon .logo svg defs linearGradient stop:first-child",
    ".skills-services .color-transition-tier:nth-child(6)",
    ".skills-services .color-transition-tier:nth-child(7)",
    cyan,
    lightBlue
  );

  scrollSvgColorTrans(
    null,
    null,
    "#header .main-ribbon .logo svg defs linearGradient stop:last-child",
    ".skills-services .color-transition-tier:nth-child(6)",
    ".skills-services .color-transition-tier:nth-child(7)",
    darkCyan,
    middleBlue
  );

  // Open/Close Menu Transitions
  const bannerSvgColor = { r: 103, g: 208, b: 255 };
  const skillsSvgColor = { r: 197, g: 160, b: 255 };
  const projectsSvgColor = { r: 21, g: 255, b: 237 };

  scrollBgColorTrans(
    "#navigation .open-close span",
    "#navigation .open-close",
    ".skills-services .color-transition-tier:nth-child(5)",
    ".skills-services .color-transition-tier:nth-child(6)",
    skillsSvgColor,
    projectsSvgColor
  );

  scrollBgColorTrans(
    "#navigation .open-close span",
    "#navigation .open-close",
    ".skills-services .color-transition-tier:nth-child(6)",
    ".skills-services .color-transition-tier:nth-child(7)",
    projectsSvgColor,
    bannerSvgColor
  );

  // Social Icons transition

  scrollSvgColorTrans(
    "#header .sub-ribbon .social svg path",
    "#header .sub-ribbon .social svg > g > g > rect:last-child",
    null,
    ".skills-services .color-transition-tier:nth-child(5)",
    ".skills-services .color-transition-tier:nth-child(6)",
    skillsSvgColor,
    projectsSvgColor
  );

  scrollSvgColorTrans(
    "#header .sub-ribbon .social svg path",
    "#header .sub-ribbon .social svg > g > g > rect:last-child",
    null,
    ".skills-services .color-transition-tier:nth-child(6)",
    ".skills-services .color-transition-tier:nth-child(7)",
    projectsSvgColor,
    bannerSvgColor
  );
}

// ================================================

if ($("#main-content").hasClass("portfolio")) {
  $("#header .main-ribbon .logo svg defs linearGradient stop:first-child").css(
    "stop-color",
    "#00AEB5"
  );
  $("#header .main-ribbon .logo svg defs linearGradient stop:last-child").css(
    "stop-color",
    "#0075A0"
  );
  $(
    "header#header .sub-ribbon .social .github .b, header#header .sub-ribbon .social .twitter .a, header#header .sub-ribbon .social .linkedin .b"
  ).css("stroke", "#15FFED");
  $(
    "header#header .sub-ribbon .social .twitter .c, header#header .sub-ribbon .social .github .d,header#header .sub-ribbon .social .linkedin g .a"
  ).css("fill", "#15FFED");
  $("header#header .main-ribbon nav#navigation .open-close").css("border-color", "#15FFED");
  $("header#header .main-ribbon nav#navigation .open-close span").css("background", "#15FFED");

  // Banner Transition
  const bannerColor = { r: 0, g: 37, b: 108 };
  const projectsColor = { r: 0, g: 105, b: 124 };

  scrollBgColorTrans(
    ".portfolio",
    null,
    ".portfolio .color-transition-tier:nth-child(2)",
    ".portfolio .color-transition-tier:nth-child(3)",
    projectsColor,
    bannerColor
  );

  // Logo Transition
  const cyan = { r: 0, g: 174, b: 181 };
  const darkCyan = { r: 0, g: 117, b: 160 };
  const lightBlue = { r: 0, g: 157, b: 255 };
  const middleBlue = { r: 19, g: 69, b: 181 };

  scrollSvgColorTrans(
    null,
    null,
    "#header .main-ribbon .logo svg defs linearGradient stop:first-child",
    ".portfolio .color-transition-tier:nth-child(2)",
    ".portfolio .color-transition-tier:nth-child(3)",
    cyan,
    lightBlue
  );

  scrollSvgColorTrans(
    null,
    null,
    "#header .main-ribbon .logo svg defs linearGradient stop:last-child",
    ".portfolio .color-transition-tier:nth-child(2)",
    ".portfolio .color-transition-tier:nth-child(3)",
    darkCyan,
    middleBlue
  );

  // Open/Close Menu Transitions
  const bannerSvgColor = { r: 103, g: 208, b: 255 };
  const projectsSvgColor = { r: 21, g: 255, b: 237 };

  scrollBgColorTrans(
    "#navigation .open-close span",
    "#navigation .open-close",
    ".portfolio .color-transition-tier:nth-child(2)",
    ".portfolio .color-transition-tier:nth-child(3)",
    projectsSvgColor,
    bannerSvgColor
  );

  // Social Icons transition

  scrollSvgColorTrans(
    "#header .sub-ribbon .social svg path",
    "#header .sub-ribbon .social svg > g > g > rect:last-child",
    null,
    ".portfolio .color-transition-tier:nth-child(2)",
    ".portfolio .color-transition-tier:nth-child(3)",
    projectsSvgColor,
    bannerSvgColor
  );
}

if ($("#main-content").hasClass("project")) {
  $("#header .main-ribbon .logo svg defs linearGradient stop:first-child").css(
    "stop-color",
    "#00AEB5"
  );
  $("#header .main-ribbon .logo svg defs linearGradient stop:last-child").css(
    "stop-color",
    "#0075A0"
  );
  $(
    "header#header .sub-ribbon .social .github .b, header#header .sub-ribbon .social .twitter .a, header#header .sub-ribbon .social .linkedin .b"
  ).css("stroke", "#15FFED");
  $(
    "header#header .sub-ribbon .social .twitter .c, header#header .sub-ribbon .social .github .d,header#header .sub-ribbon .social .linkedin g .a"
  ).css("fill", "#15FFED");
  $("header#header .main-ribbon nav#navigation .open-close").css("border-color", "#15FFED");
  $("header#header .main-ribbon nav#navigation .open-close span").css("background", "#15FFED");

  //   // Banner Transition
  //   const bannerColor = { r: 0, g: 37, b: 108 };
  // 	const projectsColor = { r: 0, g: 105, b: 124 };

  // 	scrollBgColorTrans(
  // 		".portfolio",
  // 		null,
  // 		".portfolio .color-transition-tier:nth-child(2)",
  // 		".portfolio .color-transition-tier:nth-child(3)",
  // 		projectsColor,
  // 		bannerColor,
  // 	);

  //   // Logo Transition
  //     const cyan = { r: 0, g: 174, b: 181 };
  //     const darkCyan = { r: 0, g: 117, b: 160 };
  // 	  const lightBlue = { r: 0, g: 157, b: 255 };
  //     const middleBlue = { r: 19, g: 69, b: 181 };

  //     scrollSvgColorTrans(
  //       null,
  //       null,
  //       "#header .main-ribbon .logo svg defs linearGradient stop:first-child",
  //       ".portfolio .color-transition-tier:nth-child(2)",
  //       ".portfolio .color-transition-tier:nth-child(3)",
  //       cyan,
  //       lightBlue
  //     );

  //     scrollSvgColorTrans(
  //       null,
  //       null,
  //       "#header .main-ribbon .logo svg defs linearGradient stop:last-child",
  //       ".portfolio .color-transition-tier:nth-child(2)",
  //       ".portfolio .color-transition-tier:nth-child(3)",
  //       darkCyan,
  //       middleBlue
  //     );

  //  // Open/Close Menu Transitions
  //   const bannerSvgColor = { r: 103, g: 208, b: 255 };
  //   const projectsSvgColor = { r: 21, g: 255, b: 237 };

  //     scrollBgColorTrans(
  //       "#navigation .open-close span",
  //       "#navigation .open-close",
  //       ".portfolio .color-transition-tier:nth-child(2)",
  //       ".portfolio .color-transition-tier:nth-child(3)",
  //       projectsSvgColor,
  //       bannerSvgColor
  //     );

  // // Social Icons transition

  //     scrollSvgColorTrans(
  //       "#header .sub-ribbon .social svg path",
  //       "#header .sub-ribbon .social svg > g > g > rect:last-child",
  //       null,
  //       ".portfolio .color-transition-tier:nth-child(2)",
  //       ".portfolio .color-transition-tier:nth-child(3)",
  //       projectsSvgColor,
  //       bannerSvgColor
  //     );
}
