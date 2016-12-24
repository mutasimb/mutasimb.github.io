var addClass = function(elem, strClass) {
  elem.classList.add(strClass);
}
var removeClass = function(elem, strClass) {
  elem.classList.remove(strClass);
}
var hasClass = function(elem, strClass) {
  return elem.classList.contains(strClass);
}

var enterBodyGrey = function() {
  if(!hasClass(document.body, "grey-overlay")) {
    addClass(document.body, "grey-overlay");
  }
}

var exitBodyGrey = function() {
  if(hasClass(document.body, "grey-overlay")) {
    removeClass(document.body, "grey-overlay");
  }
}

var enterReturn = function() {
  var underConstruction = document.getElementById("under-construction");
  if(hasClass(underConstruction, "fadeIn")) {
    addClass(underConstruction, "fadeOut");
    setTimeout(function() {
      removeClass(underConstruction, "fadeIn");
      removeClass(underConstruction, "fadeOut");
    }, 500);
  }

  if(!hasClass(document.getElementById("nav-return"), "visible")) {
    addClass(document.getElementById("nav-return"), "visible");
  }
}

var exitReturn = function() {
  if(hasClass(document.getElementById("nav-return"), "visible")) {
    removeClass(document.getElementById("nav-return"), "visible");
  }
}

var enterUnderConst = function() {
  var navUl = document.querySelector("header ul.navigation");
  var underConstruction = document.getElementById("under-construction");
  if(!hasClass(navUl, "animate")) {
    addClass(navUl, "animate");
    addClass(navUl, "fadeOut");
    setTimeout(function() {
      if(!hasClass(underConstruction, "fadeIn")) {
        addClass(underConstruction, "fadeIn");
        setTimeout(function() {
          addClass(underConstruction, "fadeOut");
          setTimeout(function() {
            removeClass(navUl, "fadeOut");
            addClass(navUl, "fadeIn");
          }, 250);
          setTimeout(function() {
            removeClass(underConstruction, "fadeIn");
            removeClass(underConstruction, "fadeOut");
          }, 750);
          setTimeout(function() {
            removeClass(navUl, "animate");
            removeClass(navUl, "fadeIn");
          }, 1000);
        }, 3000);
      }
    }, 250);
  }
}

var enterSecContact = function() {
  var secContact = document.getElementById("contact");
  if(!hasClass(secContact, "visible")) {

    var contactHead = document.querySelector("#contact h1");
    var contactInfoChildren = document.querySelector("#contact .contact-info").children;
    var contactFormChildren = document.querySelector("#contact .contact-form").children;

    for(i = 0; i < contactInfoChildren.length; i++) {
      addClass(contactInfoChildren[i], "animate");
      addClass(contactInfoChildren[i], "fadeInUp");
    }
    for(i = 0; i < contactFormChildren.length; i++) {
      addClass(contactFormChildren[i], "animate");
      addClass(contactFormChildren[i], "fadeInLeft");
    }
    addClass(contactHead, "animate");
    addClass(contactHead, "fadeInRight");

    addClass(secContact, "visible");

    setTimeout(function() {
      for(i = 0; i < contactInfoChildren.length; i++) {
        removeClass(contactInfoChildren[i], "animate");
        removeClass(contactInfoChildren[i], "fadeInUp");
      }
      for(i = 0; i < contactFormChildren.length; i++) {
        removeClass(contactFormChildren[i], "animate");
        removeClass(contactFormChildren[i], "fadeInLeft");
      }
      removeClass(contactHead, "animate");
      removeClass(contactHead, "fadeInRight");
    }, 750);

  }
}

var exitSecContact = function() {
  var secContact = document.getElementById("contact");
  if(hasClass(secContact, "visible")) {

    var contactHead = document.querySelector("#contact h1");
    var contactInfoChildren = document.querySelector("#contact .contact-info").children;
    var contactFormChildren = document.querySelector("#contact .contact-form").children;

    for(i = 0; i < contactInfoChildren.length; i++) {
      addClass(contactInfoChildren[i], "animate");
      addClass(contactInfoChildren[i], "fadeOutUp");
    }
    for(i = 0; i < contactFormChildren.length; i++) {
      addClass(contactFormChildren[i], "animate");
      addClass(contactFormChildren[i], "fadeOutLeft");
    }
    addClass(contactHead, "animate");
    addClass(contactHead, "fadeOutRight");

    setTimeout(function() {
      removeClass(document.getElementById("contact"), "visible");

      for(i = 0; i < contactInfoChildren.length; i++) {
        removeClass(contactInfoChildren[i], "animate");
        removeClass(contactInfoChildren[i], "fadeOutUp");
      }
      for(i = 0; i < contactFormChildren.length; i++) {
        removeClass(contactFormChildren[i], "animate");
        removeClass(contactFormChildren[i], "fadeOutLeft");
      }
      removeClass(contactHead, "animate");
      removeClass(contactHead, "fadeOutRight");
    }, 750);

  }
}

document.contactForm.addEventListener("submit", function(e) {
  e.preventDefault();
});

document.contactForm.contactSubmit.addEventListener("click", function() {
  var validCount = 0;
  var formElems = document.contactForm.querySelectorAll("input, textarea");

  for(i = 0; i < formElems.length; i++) {
    if(formElems[i].validity.valid) {
      validCount++;
    } else {
      addClass(formElems[i], "invalid");
      formElems[i]["validify"] = function() {
        this.addEventListener("keyup", function() {
          if(this.validity.valid) {
            removeClass(this, "invalid");
          }
        });
      }
      formElems[i].validify();
    }
  }

  if(validCount == formElems.length) {
    postNewMessage(
      document.contactForm.contactEmail.value,
      document.contactForm.contactName.value,
      document.contactForm.contactMessage.value,
      document.contactForm.contactPhone.value
    ).then(function() {
      document.contactForm.contactEmail.value = "";
      document.contactForm.contactName.value = "";
      document.contactForm.contactMessage.value = "";
      document.contactForm.contactPhone.value = "";
    }).catch(function() {
      console.log("Message posting failed!");
    });
  }
});

window.addEventListener("load", function() {

  var initDelay = 500;
  var prelSec = document.getElementById("preloader");
  var socialBtns = document.querySelectorAll("header .social .fa");
  var navBtns = document.querySelectorAll("header .navigation li:not(#under-construction)");


  // Fade out preloader white overlay

  removeClass(prelSec, "visible");


  // Animate in the name and titles

  setTimeout(function() {

    addClass(document.querySelector("header h1.animate"), "fadeInRight");
    addClass(document.querySelector("header h4.animate"), "fadeInRight");

  }, initDelay);


  // Remove preloader white overlay from DOM

  setTimeout(function() {

    prelSec.parentNode.removeChild(prelSec);

  }, 250);


  // Animate in the social buttons

  setTimeout(function() {

    for(i = 0; i < socialBtns.length; i++) {
      addClass(socialBtns[i], "fadeInUp");
    }

  }, initDelay + 500);


  // Animate in the navigation buttons

  setTimeout(function() {

    for(i = 0; i < navBtns.length; i++) {
      addClass(navBtns[i], "fadeInUp");
    }

    document.getElementById("nav-return").addEventListener("click", function() {
      exitSecContact();
      exitReturn();

      setTimeout(exitBodyGrey, 750);
    });

    document.getElementById("nav-about").addEventListener("click", function() {
      enterUnderConst();
    });

    document.getElementById("nav-works").addEventListener("click", function() {
      enterUnderConst();
    });

    document.getElementById("nav-contact").addEventListener("click", function() {

      enterBodyGrey();

      enterReturn();

      if(!hasClass(document.getElementById("contact"), "visible")) {
        setTimeout(function() {

          enterSecContact();

        }, 500);
      }

    });

  }, initDelay + 1000);

});
