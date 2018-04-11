$(".left-menu-btn").click(() => {
  $("nav").toggleClass("displayed");
});

$(".shade").click(() => {
  if( $("nav").hasClass("displayed") ) {
    $("nav").toggleClass("displayed");
  }
})

$(".surah-list-ul a").click(() => {
  $("nav").toggleClass("displayed");
});
