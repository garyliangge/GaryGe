$(document).ready(function()
{

  window.onresize = checkResize;
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

  $(window).scroll(onScroll);

  setInitialSize();

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
  // Change color of navbar
  if($(this).scrollTop() == 0) {
    $('#nav').removeClass('opaque');
    $('#nav').addClass('transparent');
  } else {
    $('#nav').removeClass('transparent');
    $('#nav').addClass('opaque');
  }

  //Check active section
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

function setInitialSize() {
  // alert("Ratio: " + (window.innerWidth/window.innerHeight) + " Width: " + window.innerWidth);
  checkResize();
}

function checkResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  // alert("Ratio: " + (width/height) + " Width: " + width);
  if ((width/height) < 1.5) {

    document.getElementById("flowchart").style.display = "none";
    document.getElementById("sbu_logo").style.width = Math.min(400, width*.6)+"px";
    document.getElementById("research_description").style.width = Math.min(665, width*.9)+"px";
    // document.getElementById("research_body").style.height = "100px";

  }else{

    document.getElementById("flowchart").style.display = "table";
    document.getElementById("sbu_logo").style.width = Math.min(400, width*.3)+"px";
    document.getElementById("research_description").style.width = Math.min(665, width*.52)+"px";
    // document.getElementById("research_body").style.height = "875px";

  }
  document.getElementById("chevron").style.display = (width/height) < 1 ? "none" : "table";
}
