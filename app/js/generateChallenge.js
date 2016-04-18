		var problemSolved = true;
		var newPatient = false;
		
		// JQUERY, NOT EVEN ONCE!
		
		var brands = [];		
		var substances = [];
		var drugforms = [];
		var symptom = "";
		var disease = "";
		var i = 0;
		
		function GenerateChallenge()
		{			
			brands = [];
			substances = [];
			drugforms = [];
			
			// haetaan tauti, oireet ja siihen käytettävien lääkkeiden brandit
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

			/*for (var i = 0;i<brands.length;i++)
			{
				document.getElementById("brands").innerHTML += brands[i] + "<br>";
			}	
			
			for (var i = 0;i<substances.length;i++)
			{
				document.getElementById("substances").innerHTML += substances[i] + "<br>";
			}	
			for (var i = 0;i<drugforms.length;i++)
			{
				document.getElementById("forms").innerHTML += drugforms[i] + "<br>";
			}
			*/
			document.getElementById("symptom").innerHTML = symptom;
			//document.getElementById("disease").innerHTML = disease;
			//document.getElementById("brand").innerHTML = brands.join();
			
			
			
			
		}
		
		// hakee json-tiedostosta satunnaisen tietueen, joka sisältää oireet tautiin ja siihen sopivien lääkkeiden brandit
		// taudin oireet asetetaan symptoms muuttujaan
		// brandit pushataan brands taulukkoon
		// taudin nimike asetetaan diseasse muuttujaan
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
					while(this.i == rand)
					{
						rand = Math.random() * drugs.length;
					}
					this.i = rand;
					var index = parseInt(rand);
					var split = drugs[index].brand.split(",");
					this.brands = split;
					this.symptom = drugs[index].symptom;
					this.disease = drugs[index].disease;
                }
			}, this);
			
            http_request.open("GET", data_file, false);
            http_request.send();			
        }
		
		// Ottaa vastaan brandin nimen stringina
		// Pushaa substances taulukkoon annettua brandia vastaavan lääkeaineen
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
					//document.getElementById("substance").innerHTML = jsondata.join();
					
				}
			},this);
			http_request.open("GET","../php/getsubstance.php?brand="+encodeURIComponent(str),true);
			http_request.send();			
		}
		
		// Ottaa vastaan brandin nimen stringina
		// Pushaa drugforms taulukkoon annetulle brandille kuuluvan lääkkeen muodon
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
					//document.getElementById("form").innerHTML = jsondata;
				}
			},this);
			http_request.open("GET","../php/getform.php?brand="+encodeURIComponent(str),true);
			http_request.send();
		}
		
		function answer(brandChoice, substanceChoiceArray, formChoice)
		{
			var points = 0;
			
			if(substanceChoiceArray.length>1)
			{
				var selectedSubstances = substanceChoiceArray.join();		
			}
			else
			{
				var selectedSubstances = substanceChoiceArray[0];
			}
			
			// abandon hope all who enter here.
			
			for(var a = 0;a<brands.length;a++)
			{
				for(var b = 0;b<substances.length;b++)
				{
					for(var c = 0; c<drugforms.length;c++)
					{
						if(brands[a] == brandChoice && substances[b] == selectedSubstances && drugforms[c] == formChoice)
						{
							document.getElementById("info").innerHTML = "<h1>Congratulations!</h1><p>You made the right drug for the patient and you got 1000 score points.<br>Now go back to the reception, you got a new patient waiting for you.</p>";
<<<<<<< HEAD
							//alert("Congratulations, you made the right drug for the patient!");
=======
							alert("Congratulations, you made the right drug for the patient!");
							$('#btnAnswer').prop('disabled', true);
>>>>>>> origin/master
							problemSolved = true; 
							newPatient = true;
							updateScore(1);
							resetHint();
							return;
						}
					}
				}				
			}
			document.getElementById("info").innerHTML = "<h1>Wrong answer!</h1><p>You lost 500 score points, try again.<br>If you can't remember the drug's recipe, you can always check it out in the medical room.</p>";
			//alert("Incorrect answer!");
			updateScore(0);
		}
		
		function updateScore(answer){
		
			//answer arvo 0 = väärin
			//answer arvo 1 = oikein
			//answer arvo 2 = hint näytetty
			//answer arvo 3 = oikea vastaus katsottu
			//answer arvo 4 = yksikkömuunnos oikein
			//answer arvo 5 = yksikkömuunnon väärin
			
			var stringOldScore = document.getElementById("score1").innerHTML;
			var intOldScore = parseInt(stringOldScore);
			
			if(answer == 1){	
				var newScore = intOldScore + 1000;
				
			} else if (answer == 0){				
				var newScore = intOldScore - 500;
				
			} else if(answer == 2){
				var newScore = intOldScore - 200;
				
			} else if(answer == 3){
				var newScore = intOldScore - 1000;
				
			} else if(answer == 4){
				var newScore = intOldScore + 300;
				
			} else if (answer == 5){
				var newScore = intOldScore - 300;
				
			}
			
			var stringNewScore = String(newScore);
			
			document.getElementById("score1").innerHTML = stringNewScore;
			document.getElementById("score2").innerHTML = stringNewScore;
			document.getElementById("score3").innerHTML = stringNewScore;
		}
		
		function resetHint() {
			 document.getElementById("hintboxdisease").innerHTML = "";
			 document.getElementById("hintboxbrand").innerHTML = "";
		}
		