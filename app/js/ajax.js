		
		// JQUERY, NOT EVEN ONCE!
		
		var brands = [];
		var symptom = "";
		var substances = [];
		var drugforms = [];
		
		function GenerateChallenge()
		{			
			brands = [];
			substances = [];
			drugforms = [];
			
			// haetaan oire ja siihen k‰ytett‰v‰n l‰‰kkeen brandi
			// paikallisesta json-tiedostosta
			loadJSON();
			// haetaan brandin perusteella vaikuttava aine
			for (var i = 0;i<brands.length;i++)
			{
				sqlLoadSubstance(brands[i]);
			}			
			// haetaan brandin perusteella muoto				
			for (var i = 0;i<brands.length;i++)
			{
				sqlLoadForm(brands[i]);
			}					
		}
		
        function loadJSON()
		{
            var data_file = "../json/data.json";
			
			var bind = function(fn, context) {
				return function() {
					fn.apply(context, arguments);
				};
			};
			
            var http_request = new XMLHttpRequest();
            try
			{
               // Opera 8.0+, Firefox, Chrome, Safari
               http_request = new XMLHttpRequest();
            }
			catch (e)
			{
               // Internet Explorer Browsers
				try
				{
					http_request = new ActiveXObject("Msxml2.XMLHTTP");
				}
				catch (e) 
				{
					try
					{
						http_request = new ActiveXObject("Microsoft.XMLHTTP");
					}
					catch (e)
					{
						// Something went wrong
						alert("Unable to load data from JSON!");
						return false;
					}
				}
            }
			
            http_request.onreadystatechange = bind(function(){
				
               if (http_request.readyState == 4 && http_request.status == 200)
			   {
					// Javascript function JSON.parse to parse JSON data
					var jsonObj = JSON.parse(http_request.responseText);
					var drugs = jsonObj.drugs;
					// Math.random() on luku nollasta yhteen desimaalina
					var rand = Math.random() * drugs.length;
					var index = parseInt(rand);
					var split = drugs[index].brand.split(",");
					this.brands = split;
					this.symptom = drugs[index].symptom;
                }
			}, this);
			
            http_request.open("GET", data_file, false);
            http_request.send();			
        }
		
		function sqlLoadSubstance(str) 
		{
			var bind = function(fn, context) {
				return function() {
					fn.apply(context, arguments);
				};
			};
			var http_request = new XMLHttpRequest();
            try
			{
               // Opera 8.0+, Firefox, Chrome, Safari
               http_request = new XMLHttpRequest();
            }
			catch (e)
			{
               // Internet Explorer Browsers
				try
				{
					http_request = new ActiveXObject("Msxml2.XMLHTTP");
				}
				catch (e) 
				{
					try
					{
						http_request = new ActiveXObject("Microsoft.XMLHTTP");
					}
					catch (e)
					{
						// Something went wrong
						alert("Unable to load data from database!");
						return false;
					}
				}
            }
			http_request.onreadystatechange = bind(function() {		
				if (http_request.readyState == 4 && http_request.status == 200) 
				{
					var jsondata = JSON.parse(http_request.responseText);
					this.substances.push(jsondata);
				}
			},this);
			http_request.open("GET","../php/getsubstance.php?brand="+encodeURIComponent(str),false);
			http_request.send();			
		}
		
		function sqlLoadForm(str) 
		{
			var bind = function(fn, context) {
				return function() {
					fn.apply(context, arguments);
				};
			};
			var http_request = new XMLHttpRequest();
            try
			{
               // Opera 8.0+, Firefox, Chrome, Safari
               http_request = new XMLHttpRequest();
            }
			catch (e)
			{
               // Internet Explorer Browsers
				try
				{
					http_request = new ActiveXObject("Msxml2.XMLHTTP");
				}
				catch (e) 
				{
					try
					{
						http_request = new ActiveXObject("Microsoft.XMLHTTP");
					}
					catch (e)
					{
						// Something went wrong
						alert("Unable to load data from database!");
						return false;
					}
				}
            }
			http_request.onreadystatechange = bind(function() {
				if (http_request.readyState == 4 && http_request.status == 200) 
				{					
					var jsondata = JSON.parse(http_request.responseText);
					this.drugforms.push(jsondata);
				}
			},this);
			http_request.open("GET","../php/getform.php?brand="+encodeURIComponent(str),false);
			http_request.send();
		}
		