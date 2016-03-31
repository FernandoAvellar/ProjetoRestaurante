(function (global) {

var ajaxUtils = {};

//Return HTTP request object
function getRequestObject() {
	if (window.XMLHttpRequest) {
	 return (new XMLHttpRequest());
	}
	else if (window.ActiveXObject) {
		//Very Old Browsers
		return (new ActiveXObject("Microsoft.XMLHTTP"))
	}
	else {
		global.alert("Ajax is not supported!")
		return(null);
	}
  }
	
//Makes an Ajax request to 'requestUrl'
ajaxUtils.sendGetRequest = 
	function (requestUrl, responseHandler, isJsonResponse) {
	 var request = getRequestObject();
	 request.onreadystatechange = 
	 	function () {
	 	 	handleResponse(request, responseHandler, isJsonResponse);
	 	};
	 request.open("GET", requestUrl, true); //true make this request assyncronous
	 request.send(null); //execute the request
};


//Only call user provided 'responseHandler'
// function if response is ready and not error
function handleResponse (request, responseHandler, isJsonResponse) {
	if ((request.readyState == 4) && (request.status == 200)) {

		//Default is JsonResponse = true
		if (isJsonResponse == undefined) {
			isJsonResponse = true;
		}

		if (isJsonResponse) {
			responseHandler(JSON.parse(request.responseText));
		}
		else {
			responseHandler(request.responseText);
		}	
	}
}

//Expose utility to global
global.$ajaxUtils = ajaxUtils;

})(window);