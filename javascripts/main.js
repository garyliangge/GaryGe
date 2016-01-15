$(document).ready(function()
{
  window.onload = checkResize;
  window.onresize = checkResize;
  $(window).scroll(onScroll);

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

  $("#menulist > li > a").click(function(e) {
    // Prevent a page reload when a link is pressed
    e.preventDefault();
    onMenuClicked();
    // Call the scroll function
    goToByScroll(this.id.replace("menu_", ""));
  });
});

// Variables for menu behavior
var menu_selected = false;
var last_y = 0;

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
    $('#nav').removeClass("opaque");
    $('#nav').addClass("transparent");
  } else {
    $('#nav').removeClass("transparent");
    $('#nav').addClass("opaque");
  }
  // Check active section
  var scrollPos = Math.floor($(document).scrollTop());
  $("#navbar a").each(function() {
    refId = "#".concat(this.id.replace("link", ""));
    refSecId = "#".concat(this.id.replace("link", "_body"))
    var refElem = $(refId);
    var refSecElem = $(refSecId);
    if (Math.floor(refElem.position().top) <= scrollPos &&
        Math.floor(refElem.position().top + refElem.height() + refSecElem.height()) > scrollPos) {
      $("#navbar > ul > li > a").removeClass("viewing");
      $(this).addClass("viewing");
    } else {
      $(this).removeClass("viewing");
    }
  });
}

function checkResize() {
  // Condition for reformatting various elements
  ratio =  (document.documentElement.clientWidth < 10 + Number($('#flowchart').css('width').replace("px", "")));
  // Toggle navbar formats
  document.getElementById("navlist").style.display = ratio ? "none" : "inline";
  document.getElementById("nav-menu").style.display = ratio ? "inline" : "none";
  if(!ratio) {
    menu_selected = true;
    onMenuClicked();
  }
  // Toggle chevron display
  document.getElementById("chevron").style.display = ratio ? "none" : "table";
  // Adjust research section elements
  document.getElementById("sbu_logo").style.width = ratio ? "60vw" : "30vw";
  document.getElementById("flowchart").style.display = ratio ? "none" : "table";
  document.getElementById("research_description").style.width = ratio ? "90vw" : $('#flowchart').css('width');
  document.getElementById("publications").style.width = ratio ? "90vw" : $('#flowchart').css('width');
  // Set Section Heights
  setSectionHeights()
}

function onMenuClicked() {
  // Set menu item colors
  $("#navbar a").each(function() {
    menuItemID = "menu_" + this.id;
    if ($(this).hasClass('viewing')) {
      document.getElementById(menuItemID).style.color = "gold";
    } else {
      document.getElementById(menuItemID).style.color = "black";
    }
  });
  // Change format when menu is selected/deselcted
  if(menu_selected) {
    $('body').removeClass("noscroll");
    $('#menu').addClass("collapsed");
    $('#nav').removeClass("hold-opaque");
    menu_selected = false;
    window.scrollTo(0, last_y);
  } else {
    last_y = Math.floor($(document).scrollTop());
    $('body').addClass("noscroll");
    $('#menu').removeClass("collapsed");
    $('#nav').addClass("hold-opaque");
    menu_selected = true;
  }
}

//<--------------Section Specific Code-------------->

function setSectionHeights(){
  // Set home section height
  home_height = Number($('#header').css('height').replace("px", ""));
  $('#home').css("min-height", (home_height+20)+"px");
  // Set projects section height
  projects_height = Number($('#proj_list').css('height').replace("px", ""));
  document.getElementById("projects_body").style.height = (projects_height+30) + "px";
  // Set research section height
  research_height = Number($('#action_classification').css('height').replace("px", ""));
  document.getElementById("research_body").style.height = (research_height+30) + "px";
}
