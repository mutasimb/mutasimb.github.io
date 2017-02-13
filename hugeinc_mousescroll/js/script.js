var scrollUp = 0;
var scrollDn = 0;

var addClass = function(el, clsName) {el.classList.add(clsName);}
var rmvClass = function(el, clsName) {el.classList.remove(clsName);}
var containClass = function(el, clsName) {
  return el.classList.contains(clsName);
}

var whlFunc = function(e) {
  if(window.scrollY == 0) {
    if(e.deltaY > 0) {
      scrollUp = scrollUp + e.deltaY;
      if(scrollUp >= 500) {
        triggerSlideUp();
        scrollUp = 0; scrollDn = 0;
      }
    } else if (e.deltaY < 0) {
      scrollDn = scrollDn - e.deltaY;
      if(scrollDn >= 500 & !containClass(document.querySelector(".slide"), "active")) {
        triggerSlideDn();
        scrollUp = 0; scrollDn = 0;
      }
    }
  }
}

document.querySelector("body").addEventListener("wheel", whlFunc);

var triggerSlideUp = function() {
  document.querySelector("body").removeEventListener("wheel", whlFunc);
  addClass(document.querySelector(".active"), "inactive");
  setTimeout(function() {
    rmvClass(document.querySelector(".active"), "active");
    if(document.querySelector(".next")) {
      addClass(document.querySelector(".next"), "active");
      rmvClass(document.querySelector(".next"), "next");
    } else {
      rmvClass(document.querySelector("body"), "disable");
    }
    if(document.querySelector(".next.inactive")) {
      rmvClass(document.querySelector(".next.inactive"), "inactive");
    }
    document.querySelector("body").addEventListener("wheel", whlFunc);
  }, 1000); // css:17
}

var triggerSlideDn = function() {
  document.querySelector("body").removeEventListener("wheel", whlFunc);
  var sliderSecs = document.querySelectorAll(".slide");
  countInactive = 0;
  for(i = 0; i < sliderSecs.length; i++) {
    if(containClass(sliderSecs[i], "inactive")) {
      countInactive++;
    }
  }
  if(countInactive == sliderSecs.length) {
    addClass(document.querySelector("body"), "disable");
    addClass(sliderSecs[sliderSecs.length-1], "active");
    rmvClass(sliderSecs[sliderSecs.length-1], "inactive");
  } else {
    if(document.querySelector(".next")) {addClass(document.querySelector(".next"), "inactive");}
    addClass(document.querySelector(".active"), "next");
    addClass(document.querySelector(".next").previousElementSibling, "active");
    rmvClass(document.querySelector(".next"), "active");
    rmvClass(document.querySelector(".active"), "inactive");
  }
  setTimeout(function() {
    document.querySelector("body").addEventListener("wheel", whlFunc);
  }, 1000); // css:17
}
