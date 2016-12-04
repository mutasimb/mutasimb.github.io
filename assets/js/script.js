window.addEventListener("load", function() {

  var prelSec = document.getElementById("preloader");
  prelSec.classList.remove("visible");

  setTimeout(function() {
    
    prelSec.parentNode.removeChild(prelSec);

  }, 500);

});
