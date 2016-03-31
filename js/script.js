//Collapse Menu Button Collapses the Menu when it loses focus

$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });
});

//Load the Main Menu inside SPA (Single Page Application) index.html

(function (global) {

var dc = {};

var homeHtml = "snippets/home-snippet.html";

//Convenience Function for inserting innerHTML for 'select'
var insertHTML = function (selector, html) {
	var targetElem = document.querySelector(selector);
	 targetElem.innerHTML = html;
};

//Show loading icon element identified by 'selector'
var showLoading = function (selector) {
	var html = "<div class='text-center'>";
	html += "<img src='images/ajax-loader.gif'><div>";
	insertHTML(selector, html);
};

//On page Load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {

//On first load, show home view
showLoading("#main-content");
$ajaxUtils.sendGetRequest(
	homeHtml, 
	function (responseText) {
		document.querySelector("#main-content")
		.innerHTML = responseText;
	},
	false);
});

global.$dc = dc;

})(window);