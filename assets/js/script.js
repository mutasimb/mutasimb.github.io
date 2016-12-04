var addClass = function(elem, strClass) {
  elem.classList.add(strClass);
}

var removeClass = function(elem, strClass) {
  elem.classList.remove(strClass);
}

window.addEventListener("load", function() {

  var prelSec = document.getElementById("preloader");
  var socialBtns = document.querySelectorAll("header .social .fa");

  removeClass(prelSec, "visible");

  setTimeout(function() {

    addClass(document.querySelector("header h1.animate"), "fadeInRight");
    addClass(document.querySelector("header h4.animate"), "fadeInRight");

  }, 250);

  setTimeout(function() {

    prelSec.parentNode.removeChild(prelSec);

  }, 500);

  setTimeout(function() {

    for(i = 0; i < socialBtns.length; i++) {
      addClass(socialBtns[i], "fadeInUp");
    }

  }, 750);

});
