$(document).ready(function() {
    $.ajax({  
        type: 'POST',  
        url: 'php/selectbrands.php', 
        data: { },
        dataType: "json",
        success: function(response) {
            for (var i = 0; i < response.length; i++) {
                $("#brands").append('<li><input id=btn type=button value='+ response[i] +' onclick=selectBrand("'+ response[i] +'") </li>');
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
                $("#substances").append('<li><input id=btn type=button value='+ response[i] +' onclick=selectSubstance("'+ response[i] +'") </li>');
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
                $("#forms").append('<li><input id=btn type=button value='+ response[i] +' onclick=selectForm("'+ response[i] +'") </li>');
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
                $("#categories").append('<li><input id=btn type=button value='+ response[i] +' onclick=selectCategory("'+ response[i] +'") </li>');
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
	document.getElementById("selected-items").innerHTML += "<tr><li>" + brand + "</li></tr>";
}

function selectSubstance(substance) {
    selectedSubstances.push(substance);
	document.getElementById("selected-items").innerHTML += "<tr><li>" + substance + "</li></tr>";
}

function selectForm(Mform) {
    selectedForm = Mform;
	document.getElementById("selected-items").innerHTML += "<tr><li>" + Mform + "</li></tr>";
}

function selectCategory(category) {
    selectedCategory = category;
}