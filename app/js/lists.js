$(document).ready(function() {
    $.ajax({  
        type: 'POST',  
        url: 'php/selectbrands.php', 
        data: { },
        dataType: "json",
        success: function(response) {
            for (var i = 0; i < response.length; i++) {
                $("#CraftingBrands").append("<li><input class=btn type=button value='"+ response[i] +"' onclick=selectBrand('"+ encodeURIComponent(response[i]) +"') </li>");
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
                $("#CraftingSubstances").append("<li><input class=btn type=button value='"+ response[i] +"' onclick=selectSubstance('"+ encodeURIComponent(response[i]) +"') </li>");
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
                $("#CraftingForms").append("<li><input class=btn type=button value='"+ response[i] +"' onclick=selectForm('"+ encodeURIComponent(response[i]) +"') </li>");
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
                $(".categories").append("<li><input class=btn type=button value='"+ response[i] +"' onclick=selectCategory('"+ encodeURIComponent(response[i]) +"') </li>");
            }
        }
    });    
	
	/* -------------------------------------------------------------------- */
	/* -------------------------------------------------------------------- */
	
	$.ajax({  
        type: 'POST',  
        url: 'php/selectbrands.php', 
        data: { },
        dataType: "json",
        success: function(response) {
            for (var i = 0; i < response.length; i++) {
                $("#BankBrands").append("<li><input class=btn type=button value='"+ response[i] +"' onclick=selectBankMedicine('"+ encodeURIComponent(response[i]) +"') </li>");
            }
        }
    });  
});

var selectedBrand = "";
var selectedSubstances = [];
var selectedForm = "";
var selectedCategory = "";

function selectBankMedicine(brand)
{
	selectedBrand = decodeURIComponent(brand);
	
	$.ajax({  
        type: 'GET',  
        url: 'php/getsubstance.php?brand=' + selectedBrand, 
        data: { },
        dataType: "json",
        success: function(response) {
            document.getElementById("BankSubstances").innerHTML = "<p>" + response + "</p>";
        }
    });
	
	$.ajax({  
        type: 'GET',  
        url: 'php/getform.php?brand=' + selectedBrand, 
        data: { },
        dataType: "json",
        success: function(response) {
			switch (response.join())
			{
				case "depot tablet":
					document.getElementById("BankAdministration").innerHTML = "<img src='img/pilleri.jpg'><p>"+response.join()+"</p>";
					break;
				case "gastro-resistant tablet":
					document.getElementById("BankAdministration").innerHTML = "<img src='img/pilleri.jpg'><p>"+response.join()+"</p>";
					break;
				case "tablet":
					document.getElementById("BankAdministration").innerHTML = "<img src='img/pilleri.jpg'><p>"+response.join()+"</p>";
					break;
				case "injection":
					document.getElementById("BankAdministration").innerHTML = "<img src='img/ruisku.jpg'><p>"+response.join()+"</p>";
					break;
				case "solution for injection":
					document.getElementById("BankAdministration").innerHTML = "<img src='img/ruisku.jpg'><p>"+response.join()+"</p>";
					break;
				case "oral suspension":
					document.getElementById("BankAdministration").innerHTML = "<p>Laita kuva pipetistä</p><p>"+response.join()+"</p>";
					break;
				case "inhalation powder":
					document.getElementById("BankAdministration").innerHTML = "<p>Laita kuva hengitysjauheesta</p><p>"+response.join()+"</p>";
					break;
			}
            
        }
    });
	
}

function selectBrand(brand) {
    selectedBrand = decodeURIComponent(brand);
	document.getElementById("selectedBrand").innerHTML = "<button class='btn' onclick=resetSelection('brand')>"+decodeURIComponent(brand)+"</button>";
}

function selectSubstance(substance) {
    selectedSubstances.push(decodeURIComponent(substance));
	document.getElementById("selectedSubstance").innerHTML += "<button class='btn' onclick=resetSelection('substance')>"+decodeURIComponent(substance)+"</button>";
}

function selectForm(Mform) {
    selectedForm = decodeURIComponent(Mform);
	document.getElementById("selectedForm").innerHTML = "<button class='btn' onclick=resetSelection('form')>"+decodeURIComponent(Mform)+"</button>";

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