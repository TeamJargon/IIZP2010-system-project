function letsDoSomeMath() {
	$("#nurse").show("slide", { direction: "left" }, 1000, function(){
		$("#math").fadeIn("slow"); 
	});
}

function sure() {
	problemChoice();
	$("#math").fadeOut("slow"); 
	$("#mathProblemChoice").fadeIn("slow"); 
}

function problemChoice(buttonID) {
	if(buttonID == 'romanNumerals') {
		EventRomanNumerals();
		$("#mathProblemChoice").fadeOut("slow"); 
		$("#mathProblem").fadeIn("slow");
	}else if(buttonID == 'unitConversion') {
		EventUnitconversion();
		$("#mathProblemChoice").fadeOut("slow"); 
		$("#mathProblem").fadeIn("slow");
	}
}

function nope() {
	$("#math").fadeOut("slow");
	$("#mathProblemChoice").fadeOut("slow");
	$("#mathProblem").fadeOut("slow");
	$("#nurse").hide("slide", { direction: "left" }, 1000); 
}


	