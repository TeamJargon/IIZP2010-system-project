		
		// JQUERY, NOT EVEN ONCE!
		
		var brands = [];
		var symptom = "";
		var substances = [];
		var drugforms = [];
		var diseases = [];
		
		function GenerateChallenge()
		{			
			brands = [];
			substances = [];
			drugforms = [];
			diseases = [];
			
			// haetaan oire ja siihen k‰ytett‰vien l‰‰kkeiden brandit
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
		
		// hakee json-tiedostosta satunnaisen tietueen, joka sis‰lt‰‰ oireet tautiin ja siihen sopivien l‰‰kkeiden brandit
		// taudin oireet asetetaan symptoms muuttujaan
		// brandit pushataan brands taulukkoon
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
					this.diseases.push(drugs[index].disease);
                }
			}, this);
			
            http_request.open("GET", data_file, false);
            http_request.send();			
        }
		
		// Ottaa vastaan brandin nimen stringina
		// Pushaa substances taulukkoon annettua brandia vastaavan l‰‰keaineen
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
		
		// Ottaa vastaan brandin nimen stringina
		// Pushaa drugforms taulukkoon annetulle brandille kuuluvan l‰‰kkeen muodon
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
		