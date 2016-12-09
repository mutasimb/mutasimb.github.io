var addClass = function(elem, strClass) {
  elem.classList.add(strClass);
}

var removeClass = function(elem, strClass) {
  elem.classList.remove(strClass);
}

window.addEventListener("load", function() {

  var initDelay = 500;
  var prelSec = document.getElementById("preloader");
  var socialBtns = document.querySelectorAll("header .social .fa");
  var navBtns = document.querySelectorAll("header .navigation li:not(#under-construction)");
  var underConstruction = document.getElementById("under-construction");

  removeClass(prelSec, "visible");

  setTimeout(function() {

    addClass(document.querySelector("header h1.animate"), "fadeInRight");
    addClass(document.querySelector("header h4.animate"), "fadeInRight");

  }, initDelay);

  setTimeout(function() {

    prelSec.parentNode.removeChild(prelSec);

  }, 250);

  setTimeout(function() {

    for(i = 0; i < socialBtns.length; i++) {
      addClass(socialBtns[i], "fadeInUp");
    }

  }, initDelay + 500);

  setTimeout(function() {

    for(i = 0; i < navBtns.length; i++) {
      addClass(navBtns[i], "fadeInUp");
      navBtns[i].addEventListener("click", function() {
        if(underConstruction.classList.length == 0) {
          addClass(underConstruction, "fadeInUp");
          setTimeout(function() {
            addClass(underConstruction, "fadeOutUp");
            setTimeout(function() {
              removeClass(underConstruction, "fadeInUp");
              removeClass(underConstruction, "fadeOutUp");
            }, 500);
          }, 3000);
        }
      });
    }

  }, initDelay + 1000);

});
