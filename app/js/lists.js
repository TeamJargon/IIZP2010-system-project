$(document).ready(function() {
    $.ajax({  
        type: 'POST',  
        url: 'php/selectbrands.php', 
        data: { },
        dataType: "json",
        success: function(response) {
            for (var i = 0; i < response.length; i++) {
                $("#brands").append("<li><input class=btn type=button value="+ response[i] +" onclick=selectBrand("+ response[i] +") </li>");
            }
        }
    });
    $.ajax({  
        type: 'POST',  
        url: 'php/selectsubstances.php', 
        data: { },
        dataType: "json",
        success: function(response) {
            for (var i = 0; i < response.length; i++) {
                $("#substances").append("<li><input class=btn type=button value="+ response[i] +" onclick=selectSubstance("+ response[i] +") </li>");
            }
        }
    });
    $.ajax({  
        type: 'POST',  
        url: 'php/selectforms.php', 
        data: { },
        dataType: "json",
        success: function(response) {
            for (var i = 0; i < response.length; i++) {
                $("#forms").append("<li><input class=btn type=button value='"+ response[i] +"' onclick=selectForm("+ response[i] +") </li>");
            }
        }
    });
    $.ajax({  
        type: 'POST',  
        url: 'php/selectcategories.php', 
        data: { },
        dataType: "json",
        success: function(response) {
            for (var i = 0; i < response.length; i++) {
                $("#categories").append("<li><input class=btn type=button value="+ response[i] +" onclick=selectCategory("+ response[i] +") </li>");
            }
        }
    });    
});

var selectedBrand = "";
var selectedSubstances = [];
var selectedForm = "";
var selectedCategory = "";

function selectBrand(brand) {
    selectedBrand = brand;
	document.getElementById("selectedBrand").innerHTML = "<button class='btn' onclick=resetSelection('brand')>"+brand+"</button>";
}

function selectSubstance(substance) {
    selectedSubstances.push(substance);
	document.getElementById("selectedSubstance").innerHTML += "<button class='btn' onclick=resetSelection('substance')>"+substance+"</button>";
}

function selectForm(Mform) {
    selectedForm = Mform;
	document.getElementById("selectedForm").innerHTML = "<button class='btn' onclick=resetSelection('form')>"+Mform+"</button>";

}

function selectCategory(category) {
    selectedCategory = category;
}

function resetSelection(selection)
{
	switch (selection)
	{
		case "brand":
		document.getElementById("selectedBrand").innerHTML = "";
		selectedBrand = "";
		break;
		
		case "substance":
		document.getElementById("selectedSubstance").innerHTML = "";
		selectedSubstances = [];
		break;
		
		case "form":
		document.getElementById("selectedForm").innerHTML = "";
		selectedForm = "";
		break;
	}
}