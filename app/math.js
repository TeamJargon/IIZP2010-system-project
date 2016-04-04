function letsDoSomeMath() {
	$("#nurse").show("slide", { direction: "left" }, 1000, function(){
		$("#math").fadeIn("slow"); 
	});
}

function sure() {
	Event();
	$("#math").fadeOut("slow"); 
	$("#mathProblem").fadeIn("slow"); 
}

function nope() {
	$("#math").fadeOut("slow");
	$("#nurse").hide("slide", { direction: "left" }, 1000); 
}


	