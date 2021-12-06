
function showStuff(el) {
var elementID = document.getElementById(el);
	for (i=0; i<elementID.length; i++) {
	if (elementID[i].selected=== true) {
		var x = elementID[i].text;
	} // end if
	} // end loop
	return x;
} // end function


function showMore(el) {
	var elementID = document.getElementsByName(el);
	//console.log(elementID.length);
	var mycheck = "";
	for (i=0; i<elementID.length; i++) {
			//console.log(elementID[i].checked);
			//console.log(elementID[i].value);
			if (elementID[i].checked === true) {
				mycheck = mycheck + elementID[i].value + '<br>';
			} // end if
			
	} // end of loop

return mycheck;
	

} // end of function


function evaluatePage() {
	var feedbackState = showStuff("state");
	var feedbackHome = showStuff("home");
	var feedbackLight = showMore('bulb');
	document.getElementById("output").innerHTML = feedbackState +'<br>' +feedbackHome +'<br>'+ feedbackLight;
	


	
}

