function letsDoSomeMath() {
	$("#math").show("slide", { direction: "left" }, 1000, function(){
		$("#nurse").fadeIn("slow"); 
	});
}

function sure() {
	alert("lets do some math!");
}

function nope() {
	$("#math").fadeOut("slow");
	$("#nurse").hide("slide", { direction: "left" }, 1000); 
}


	