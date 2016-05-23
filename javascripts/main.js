$(document).ready(function()
{

  window.onload = function () {
    $('body').addClass('loaded');
    checkResize();
  }

  window.onresize = checkResize;
  $(window).scroll(onScroll);

  $("#navbar > ul > li > a").click(function(e) {
    // Prevent a page reload when a link is pressed
    e.preventDefault();
    // Call the scroll function
    // alert(this.id);
    goToByScroll(this.id);
  });

  $("#chevron > a").click(function(e) {
    // Prevent a page reload when a link is pressed
    e.preventDefault();
    // Call the scroll function
    goToByScroll(this.id.replace("chevron_", ""));
  });

  $("#menulist > li > a").click(function(e) {
    // Prevent a page reload when a link is pressed
    e.preventDefault();
    onMenuClicked();
    // Call the scroll function
    goToByScroll(this.id.replace("menu_", ""));
  });
  // checkResize();
  // alert($('#projects_body').css('height')+" "+$('#research_body').css('height'));

});

// Variables for menu behavior
var menu_selected = false;
var last_y = 0;

function goToByScroll(id) {
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
  $("#navbar > ul > li > a").each(function() {
    refId = "#".concat(this.id.replace("link", ""));
    refSecId = "#".concat(this.id.replace("link", "_body"))
    var refElem = $(refId);
    var refSecElem = $(refSecId);
    if (Math.floor(refElem.position().top) <= scrollPos &&
        Math.floor(refElem.position().top + refElem.height() + refSecElem.height()) > scrollPos) {
      $("#navbar > ul > li > a").removeClass("viewing");
      $(this).addClass("viewing");
    }
  });
}

function checkResize() {
  var width = document.documentElement.clientWidth;
  var height = document.documentElement.clientHeight;
  // Condition for reformatting various elements
  ratio =  (width < 10 + Number($('#flowchart').css('width').replace("px", "")));
  // Toggle navbar formats
  document.getElementById("navlist").style.display = ratio ? "none" : "inline";
  document.getElementById("nav-menu").style.display = ratio ? "inline" : "none";
  if (!ratio) {
    last_y = Math.floor($(document).scrollTop());
    menu_selected = true;
    onMenuClicked();
  }
  // Toggle chevron display
  document.getElementById("chevron").style.display = ratio ? "none" : "table";
  // Adjust projects section elements
  var myProjects = document.querySelectorAll(".proj");
  for (var i = 0; i < myProjects.length; i++) {
      myProjects[i].style.width = (width/height) < 1 ? "90vw" : "40vw";
      myProjects[i].style.float = (width/height) < 1 ? "none" : "left";
  }
  // Adjust about section elements
  if (ratio) {
      $('div[class^="about_item"]').addClass("mobile");
      $('img[class^="about_item"]').addClass("mobile");
  } else {
      $('div[class^="about_item"]').removeClass("mobile");
      $('img[class^="about_item"]').removeClass("mobile");
  }
  // Adjust research section elements
  // document.getElementById("sbu_logo").style.width = ratio ? "60vw" : "30vw";
  document.getElementById("flowchart").style.display = ratio ? "none" : "table";
  document.getElementById("research_description").style.width = ratio ? "90vw" : $('#flowchart').css('width');
  document.getElementById("publications").style.width = ratio ? "90vw" : $('#flowchart').css('width');
  // Adjust contact section elements
  var smrows = document.querySelectorAll(".smrow");
  for (var i = 0; i < smrows.length; i++) {
      // smrows[i].style.width = (width/height) < 1 ? "80vw" : "30vw";
      smrows[i].style.float = (width/height) < 1.2 ? "none" : "left";
  }
  // Set Section Heights
  setSectionHeights(width, height);
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
  // Change format when menu is selected/deselected
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

function setSectionHeights(width, height) {
  // Set home section height
  home_height = Number($('#header').css('height').replace("px", ""));
  $('#home').css("min-height", (home_height+20)+"px");
  // Set projects section height
  var maxProjectHeight = 0;
  var descriptions = document.querySelectorAll(".proj_description");
  for (var i = 0; i < descriptions.length; i++) {
      maxProjectHeight = Math.max(maxProjectHeight, Number($(descriptions[i]).css("height").replace("px", "")));
  }
  var projHeightThresh = (width/height) < 1 ? 0 : maxProjectHeight;
  for (var i = 0; i < descriptions.length; i++) {
      $(descriptions[i]).css("min-height", projHeightThresh+"px");
  }
  projects_height = Number($('#proj_list').css('height').replace("px", ""));
  document.getElementById("projects_body").style.height = projects_height + "px";
  // Set research section height
  research_height = Number($('#action_classification').css('height').replace("px", ""));
  document.getElementById("research_body").style.height = (research_height+30) + "px";
  // Set contact section height
  contact_height = Number($('#smlinks').css('height').replace("px", ""));
  document.getElementById("contact_body").style.height = (contact_height) + "px";
}
