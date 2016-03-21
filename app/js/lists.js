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
}

function selectSubstance(substance) {
    selectedSubstances.push(substance);
}

function selectForm(form) {
    selectedForm = form;
}

function selectCategory(category) {
    selectedCategory = category;
}