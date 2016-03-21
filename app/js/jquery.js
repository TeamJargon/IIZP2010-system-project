$(document).ready(function() {
    $.ajax({  
        type: 'POST',  
        url: 'php/selectbrands.php', 
        data: { },
        dataType: "json",
        success: function(response) {
            for (var i = 0; i < response.length; i++) {
                $("#brands").append('<li>' + response[i] + '</li>');
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
                $("#substances").append('<li>' + response[i] + '</li>');
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
                $("#forms").append('<li>' + response[i] + '</li>');
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
                $("#categories").append('<li>' + response[i] + '</li>');
            }
        }
    });
});
