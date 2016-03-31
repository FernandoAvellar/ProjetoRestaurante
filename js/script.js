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
var allCategoriesUrl = 
  "http://davids-restaurant.herokuapp.com/categories.json";
var categoriesTitleHtml = "snippets/categories-title-snippet.html";
var categoryHtml = "snippets/category-snippet.html";

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

//Return substitute of '{{propName}} with propValue in given 'string'
var insertProperty = function (string, propName, propValue) {
	 var propToReplace = "{{" + propName + "}}";
	 string = string.replace(new RegExp(propToReplace, "g"), propValue);
	 return string;
}

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

//Load the menu categories view
dc.loadMenuCategories = function () {
	 showLoading("#main-content");
	 $ajaxUtils.sendGetRequest(
	 	allCategoriesUrl,
	 	builAndShowCategoriesHTML,
	 	true); //true pra informar JASON e já converter pra string (parse)
};

//Builds HTML for the categories page based on the data from the server
function builAndShowCategoriesHTML (categories) {
	 //Load title snippet of categories page
	 $ajaxUtils.sendGetRequest(
	 	categoriesTitleHtml,
	 	function (categoriesTitleHtml) {
	 		//Retrieve single category snippet
	 		$ajaxUtils.sendGetRequest(
	 			categoryHtml,
	 			function (categoryHtml) {
	 				var categoriesViewHtml = 
	 					builCategoriesViewHtml(categories,
	 									               categoriesTitleHtml,
	 										             categoryHtml);
	 			insertHTML("#main-content", categoriesViewHtml);
	 		},
	 		false); //false to not process snippets as JASON
	 	},
	 	false);
}

//Using categories data and snippets html
//build categories view HTML to be inserted into page
function builCategoriesViewHtml (categories,
								 categoriesTitleHtml,
								 categoryHtml) {

	var finalHtml = categoriesTitleHtml;
	finalHtml += "<section clas='row'>";

	//Loop over categories
	for (var i = 0; i < categories.length; i++){
		//Insert category values
		var html = categoryHtml;
		var name = "" + categories[i].name;
		var short_name = categories[i].short_name;
		html = insertProperty(html, "name", name);
		html = insertProperty(html, "short_name", short_name);
		finalHtml += html;
	}
	finalHtml += "</section>";
	return finalHtml;	 
}	

global.$dc = dc;

})(window);