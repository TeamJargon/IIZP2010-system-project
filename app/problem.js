function generateProblem() {
	$("#patient").show("slide", { direction: "right" }, 1000, function(){
		$("#problem").fadeIn("slow"); 
		GenerateChallenge();
	});
}