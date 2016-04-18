function generateProblem() {
	$("#patient").show("slide", { direction: "right" }, 1000, function(){
		$("#problem").fadeIn("slow", function(){
			$('.btnBack').prop('disabled', false);
			$('#diseasebtn').prop('disabled', false);
			$('#brandbtn').prop('disabled', false);	
			}); 
		
		if(problemSolved == true)
		{
			problemSolved = false;
			GenerateChallenge();
			$('#btnAnswer').prop('disabled', false);
			$('#diseasebtn').prop('disabled', false);
			$('#brandbtn').prop('disabled', false);	
		}	
	});
}