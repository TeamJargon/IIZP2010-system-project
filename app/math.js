function letsDoSomeMath() {
	$("#nurse").show("slide", { direction: "left" }, 1000, function(){
		$("#math").fadeIn("slow"); 
	});
}

function sure() {
	alert("lets do some math!");
	console.log("SURE PAINETTU!");
	Event();
}

function nope() {
	$("#math").fadeOut("slow");
	$("#nurse").hide("slide", { direction: "left" }, 1000); 
}


	