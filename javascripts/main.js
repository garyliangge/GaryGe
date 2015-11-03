$(document).ready(function()
{
    $("#navbar > ul > li > a").click(function(e) {
      // Prevent a page reload when a link is pressed
      e.preventDefault();
      // Call the scroll function
      goToByScroll(this.id);
    });

    $("#chevron > a").click(function(e) {
      // Prevent a page reload when a link is pressed
      e.preventDefault();
      // Call the scroll function
      goToByScroll(this.id);
    });

    $(window).scroll(function() {
      onScroll();
      if($(this).scrollTop() == 0) {
          $('#nav').removeClass('opaque');
          $('#nav').addClass('transparent');
      } else {
          $('#nav').removeClass('transparent');
          $('#nav').addClass('opaque');
      }
    });
});

function goToByScroll(id){
  // Remove "link" from the ID
  id = id.replace("link", "");
  // Scroll
  $('html,body').animate({
      scrollTop: $("#"+id).offset().top},
      'medium');
}

function onScroll() {
    var scrollPos = Math.floor($(document).scrollTop());
    $("#navbar a").each(function() {
      var refId = $(this).attr("id");
      var refSecId = $(this).attr("id");
      refId = "#".concat(refId.replace("link", ""));
      refSecId = "#".concat(refSecId.replace("link", "_body"))
      var refElement = $(refId);
      var refSecElement = $(refSecId);
      if (Math.floor(refElement.position().top) <= scrollPos &&
          Math.floor(refElement.position().top + refElement.height() + refSecElement.height()) > scrollPos) {
        $("#navbar > ul > li > a").removeClass("active");
        $(this).addClass("active");
      } else {
        $(this).removeClass("active");
      }
    });
}
