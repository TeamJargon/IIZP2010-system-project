function letsDoSomeMath() {
	$("#nurse").show("slide", { direction: "left" }, 1000, function(){
		$("#math").fadeIn("slow"); 
	});
}

function sure() {
	alert("lets do some math!");
	Event();
	$("#mathProblem").fadeIn("slow"); 
}

function nope() {
	$("#math").fadeOut("slow");
	$("#nurse").hide("slide", { direction: "left" }, 1000); 
}


	