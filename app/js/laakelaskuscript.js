// answer function variable
var GlobalDoseresult;

var correctStreak;

function float_exponent(number) {
    exponent = 1;
    while (number < 1.0) {
        exponent += 1
        number *= 10
    }
    return exponent;
}
function format_float(number, extra_precision) {
    precision = float_exponent(number) + (extra_precision || 0)
    return number.toFixed(precision).split(/\.?0+$/)[0]
}

/* --------------------------------------------Volume-------------------------------------------- */
function LitreToDecalitre(volume) {
	var Decalitre = volume * 0.1;
	
	return format_float(Decalitre);
}

function LitreToDecilitre(volume) {
	var decilitre = volume * 10;
	
	return format_float(decilitre);
}

function LitreToCentilitre(volume) {
	var centilitre = volume * 100;
	
	return format_float(centilitre);
}

function LitreToMillilitre(volume) {
	var millilitre = volume * 1000;
	
	return format_float(millilitre);
}

function LitreToMicrolitre(volume) {
	var microlitre = volume * 1000000;
	
	return format_float(microlitre);
}

function DecalitreToLitre(volume) {
	var decalitre = volume * 10;
	
	return format_float(decalitre);
}

function DecilitreToLitre(volume) {
	var decilitre = volume * 0.1;
	
	return format_float(decilitre);
}

function CentilitreToLitre(volume) {
	var centilitre = volume * 0.01;
	
	return format_float(centilitre);
}

function MillilitreToLitre(volume) {
	var millilitre = volume * 0.001;
	
	return format_float(millilitre);
}

function MicrolitreToLitre(volume) {
	var microlitre = volume * 0.000001;
	
	return format_float(microlitre);
}

/* --------------------------------------------Mass-------------------------------------------- */
function KilogramToGram(mass) {
	var gram = mass * 1000;
	
	return format_float(gram);
}

function KilogramToMicrogram(mass) {
	var Microgram = mass * 1000000000;
	
	return format_float(Microgram);
}

function KilogramToNanogram(mass) {
	var nanogram = mass *  1000000000000;
	
	return format_float(nanogram);
}

function GramToKilogram(mass) {
	var gram = mass * 0.001;
	
	return format_float(gram);
}

function MicrogramToKilogram(mass) {
	var Microgram = mass * 0.000000001;
	
	return format_float(Microgram);
}

function NanogramToKilogram(mass) {
	var nanogram = mass * 0.000000000001;
	
	return format_float(nanogram);
}

/* --------------------------------------------Event-------------------------------------------- */
var convertFrom;
var convertTo;
var convertDose;

function Event() {
var convertionsVolume = ["Decalitre", "Decilitre", "Centilitre", "Millilitre", "Microlitre"];
var convertionsMass = ["Gram", "Microgram", "Nanogram"];
var convertions = [];

if(parseInt((Math.random() * 2)) == 1) { 
	convertions = convertionsVolume;
}else {
	convertions = convertionsMass;
}
var convertions = 

shuffle(convertions);

var jsonDoseNumber = Math.floor(Math.random() * 30) + 1; 

var text = '{"Event":[' +
'{"eventNote":"Convert ","From":' + '"' + convertions[0] + '"' + ',"To":' + '"' + convertions[1] + '"' + ', "Dose":' + '"' + jsonDoseNumber + '"' + '}]}';

obj = JSON.parse(text);
document.getElementById('mathProblem').innerHTML = obj.Event[0].eventNote + obj.Event[0].Dose + " " + obj.Event[0].From + " to " + obj.Event[0].To + '<br>';

convertFrom = obj.Event[0].From;
convertTo = obj.Event[0].To;
convertDose = obj.Event[0].Dose

//--------------EventQuest----------------------//
	EventQuest(Number(convertDose));
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function choices(Doseresult) {
	var choicesArray = [];
	choicesArray.push(Doseresult);
	
	if(convertFrom.indexOf("litre") != -1 & convertTo.indexOf("litre") != -1) {
		choicesArray.push(LitreToDecalitre(Number(convertDose)));
		choicesArray.push(LitreToDecilitre(Number(convertDose)));
		choicesArray.push(LitreToCentilitre(Number(convertDose)));
		choicesArray.push(LitreToMillilitre(Number(convertDose)));
		choicesArray.push(LitreToMicrolitre(Number(convertDose)));
		
		choicesArray.push(DecalitreToLitre(Number(convertDose)));
		choicesArray.push(DecilitreToLitre(Number(convertDose)));
		choicesArray.push(CentilitreToLitre(Number(convertDose)));
		choicesArray.push(MillilitreToLitre(Number(convertDose)));
		choicesArray.push(MicrolitreToLitre(Number(convertDose)));
	}else {
		choicesArray.push(KilogramToGram(Number(convertDose)));
		choicesArray.push(KilogramToMicrogram(Number(convertDose)));
		choicesArray.push(KilogramToNanogram(Number(convertDose)));
		
		choicesArray.push(GramToKilogram(Number(convertDose)));
		choicesArray.push(MicrogramToKilogram(Number(convertDose)));
		choicesArray.push(NanogramToKilogram(Number(convertDose)));
	}
	
	var choicesArrayFiltered = [];

	for(var i in choicesArray){
		if(choicesArrayFiltered.indexOf(choicesArray[i]) === -1){
			choicesArrayFiltered.push(choicesArray[i]);
		}
	}
	
	// delete dublicated values
	var i = choicesArrayFiltered.indexOf(Doseresult);
	choicesArrayFiltered.splice(i, 1);

	shuffle(choicesArrayFiltered);
	
	// clear choicesArray[]
	choicesArray.splice(0, choicesArray.length);
	
	// Add 3 values to choicesArray
	for(choicesArrayIndex = 0; choicesArrayIndex < 3; choicesArrayIndex++) {
		choicesArray.push(choicesArrayFiltered[choicesArrayIndex]);
	}
	
	// Add right answer to array
	choicesArray.push(Doseresult);
	shuffle(choicesArray);
	
	return choicesArray;
}

function EventQuest(value) {
	var result = value;
	var DoseConvert;
	var Doseresult;
	
	// Volume to volume
	if(convertFrom.indexOf("litre") != -1 & convertTo.indexOf("litre") != -1){
		if(convertFrom == "Decalitre") {
			if(convertTo == "Decilitre"){
				
				DoseConvert = DecalitreToLitre (convertDose);
				Doseresult = LitreToDecilitre (DoseConvert);
				
			}else if(convertTo == "Centilitre") {
	
				DoseConvert = DecalitreToLitre (convertDose);
				Doseresult = LitreToCentilitre (DoseConvert);
				
			}else if(convertTo == "Millilitre") {
	
				DoseConvert = DecalitreToLitre (convertDose);
				Doseresult = LitreToMillilitre (DoseConvert);
				
			}else if(convertTo == "Microlitre") {
	
				DoseConvert = DecalitreToLitre (convertDose);
				Doseresult = LitreToMicrolitre (DoseConvert);
			}
			
		}else if(convertFrom == "Decilitre") {
			if(convertTo == "Decalitre"){
	
				DoseConvert = DecilitreToLitre (convertDose);
				Doseresult = LitreToDecalitre (DoseConvert);
				
			}else if(convertTo == "Centilitre") {
	
				DoseConvert = DecilitreToLitre (convertDose);
				Doseresult = LitreToCentilitre (DoseConvert);
				
			}else if(convertTo == "Millilitre") {
	
				DoseConvert = DecilitreToLitre (convertDose);
				Doseresult = LitreToMillilitre (DoseConvert);
				
			}else if(convertTo == "Microlitre") {
	
				DoseConvert = DecilitreToLitre (convertDose);
				Doseresult = LitreToMicrolitre (DoseConvert);
				
			}
		}else if(convertFrom == "Centilitre") {
			if(convertTo == "Decalitre"){
				
				DoseConvert = CentilitreToLitre (convertDose);
				Doseresult = LitreToDecalitre (DoseConvert);
				
			}else if(convertTo == "Decilitre") {
				
				DoseConvert = CentilitreToLitre (convertDose);
				Doseresult = LitreToDecilitre (DoseConvert);
				
			}else if(convertTo == "Millilitre") {
				
				DoseConvert = CentilitreToLitre (convertDose);
				Doseresult = LitreToMillilitre (DoseConvert);
				
			}else if(convertTo == "Microlitre") {
				
				DoseConvert = CentilitreToLitre (convertDose);
				Doseresult = LitreToMicrolitre (DoseConvert);
				
			}
		}else if(convertFrom == "Millilitre") {
			if(convertTo == "Decalitre"){
				
				DoseConvert = MillilitreToLitre (convertDose);
				Doseresult = LitreToDecalitre (DoseConvert);
				
			}else if(convertTo == "Decilitre") {
				
				DoseConvert = MillilitreToLitre (convertDose);
				Doseresult = LitreToDecilitre (DoseConvert);
				
			}else if(convertTo == "Centilitre") {
				
				DoseConvert = MillilitreToLitre (convertDose);
				Doseresult = LitreToCentilitre (DoseConvert);
				
			}else if(convertTo == "Microlitre") {
				
				DoseConvert = MillilitreToLitre (convertDose);
				Doseresult = LitreToMicrolitre (DoseConvert);
				
			}
		}else if(convertFrom == "Microlitre") {
			if(convertTo == "Decalitre"){
				
				DoseConvert = MicrolitreToLitre (convertDose);
				Doseresult = LitreToDecalitre (DoseConvert);
				
			}else if(convertTo == "Decilitre") {
				
				DoseConvert = MicrolitreToLitre (convertDose);
				Doseresult = LitreToDecilitre (DoseConvert);
				
			}else if(convertTo == "Centilitre") {
				
				DoseConvert = MicrolitreToLitre (convertDose);
				Doseresult = LitreToCentilitre (DoseConvert);
				
			}else if(convertTo == "Millilitre") {
				
				DoseConvert = MicrolitreToLitre (convertDose);
				Doseresult = LitreToMillilitre (DoseConvert);
				
			}
		}
	}
	// Volume to mass
	else if(convertFrom.indexOf("litre") != -1 & convertTo.indexOf("gram") != -1 || convertFrom.indexOf("litre") != -1 & convertTo.indexOf("Gram") != -1) {
		if(convertFrom == "Decalitre") {
			if(convertTo == "Gram"){
				
				DoseConvert = DecalitreToLitre (convertDose);
				Doseresult = KilogramToGram (DoseConvert);
				
			}else if(convertTo == "Microgram") {
				
				DoseConvert = DecalitreToLitre (convertDose);
				Doseresult = KilogramToMicrogram (DoseConvert);
				
			}else if(convertTo == "Nanogram") {
				
				DoseConvert = DecalitreToLitre (convertDose);
				Doseresult = KilogramToNanogram (DoseConvert);
				
			}
			
		}else if(convertFrom == "Decilitre") {
			if(convertTo == "Gram"){
				
				DoseConvert = DecilitreToLitre (convertDose);
				Doseresult = KilogramToGram (DoseConvert);
				
			}else if(convertTo == "Microgram") {
				
				DoseConvert = DecilitreToLitre (convertDose);
				Doseresult = KilogramToMicrogram (DoseConvert);
				
			}else if(convertTo == "Nanogram") {
				
				DoseConvert = DecilitreToLitre (convertDose);
				Doseresult = KilogramToNanogram (DoseConvert);
				
			}
			
		}else if(convertFrom == "Centilitre") {
			if(convertTo == "Gram"){
				
				DoseConvert = CentilitreToLitre (convertDose);
				Doseresult = KilogramToGram (DoseConvert);
				
			}else if(convertTo == "Microgram") {
				
				DoseConvert = CentilitreToLitre (convertDose);
				Doseresult = KilogramToMicrogram (DoseConvert);
				
			}else if(convertTo == "Nanogram") {
				
				DoseConvert = CentilitreToLitre (convertDose);
				Doseresult = KilogramToNanogram (DoseConvert);
				
			}
		}else if(convertFrom == "Millilitre") {
			if(convertTo == "Gram"){
				
				DoseConvert = MillilitreToLitre (convertDose);
				Doseresult = KilogramToGram (DoseConvert);
				
			}else if(convertTo == "Microgram") {
				
				DoseConvert = MillilitreToLitre (convertDose);
				Doseresult = KilogramToMicrogram (DoseConvert);
				
			}else if(convertTo == "Nanogram") {
				
				DoseConvert = MillilitreToLitre (convertDose);
				Doseresult = KilogramToNanogram (DoseConvert);
				
			}
		}else if(convertFrom == "Microlitre") {
			if(convertTo == "Gram"){
				
				DoseConvert = MicrolitreToLitre (convertDose);
				Doseresult = KilogramToGram (DoseConvert);
				
			}else if(convertTo == "Microgram") {
				
				DoseConvert = MicrolitreToLitre (convertDose);
				Doseresult = KilogramToMicrogram (DoseConvert)
				
			}else if(convertTo == "Nanogram") {
				
				DoseConvert = MicrolitreToLitre (convertDose);
				Doseresult = KilogramToNanogram (DoseConvert)
				
			}
		}	
	}
	// Mass to mass
	else if(convertFrom.indexOf("gram") != -1 & convertTo.indexOf("gram") != -1 || convertFrom.indexOf("gram") != -1 & convertTo.indexOf("Gram") != -1 || convertFrom.indexOf("Gram") != -1 & convertTo.indexOf("gram") != -1) {	
		if(convertFrom == "Gram") {
			if(convertTo == "Microgram"){
	
				DoseConvert = GramToKilogram (convertDose);
				Doseresult = KilogramToMicrogram (DoseConvert);
				
			}else if(convertTo == "Nanogram") {
	
				DoseConvert = GramToKilogram (convertDose);
				Doseresult = KilogramToNanogram (DoseConvert);
				
			}
			
		}else if(convertFrom == "Microgram") {
			if(convertTo == "Gram"){
	
				DoseConvert = MicrogramToKilogram (convertDose);
				Doseresult = KilogramToGram (DoseConvert);
				
			}else if(convertTo == "Nanogram") {
	
				DoseConvert = MicrogramToKilogram (convertDose);
				Doseresult = KilogramToNanogram (DoseConvert);
				
			}
			
		}else if(convertFrom == "Nanogram") {
			if(convertTo == "Gram"){
	
				DoseConvert = NanogramToKilogram (convertDose);
				Doseresult = KilogramToGram (DoseConvert);
				
			}else if(convertTo == "Microgram") {
	
				DoseConvert = NanogramToKilogram (convertDose);
				Doseresult = KilogramToMicrogram (DoseConvert);
				
			}
		}
	}
	// Mass to volume
	else if(convertFrom.indexOf("gram") != -1 & convertTo.indexOf("litre") != -1 || convertFrom.indexOf("Gram") != -1 & convertTo.indexOf("litre") != -1) {
		if(convertFrom == "Gram") {
			if(convertTo == "Decalitre"){
				
				DoseConvert = GramToKilogram (convertDose);
				Doseresult = LitreToDecalitre (DoseConvert);
				
			}else if(convertTo == "Microlitre") {
				
				DoseConvert = GramToKilogram (convertDose);
				Doseresult = LitreToMicrolitre (DoseConvert);
				
			}else if(convertTo == "Millilitre") {
				
				DoseConvert = GramToKilogram (convertDose);
				Doseresult = LitreToMillilitre (DoseConvert);
				
			}else if(convertTo == "Decilitre") {
				
				DoseConvert = GramToKilogram (convertDose);
				Doseresult = LitreToDecilitre (DoseConvert);
				
			}else if(convertTo == "Centilitre") {
				
				DoseConvert = GramToKilogram (convertDose);
				Doseresult = LitreToCentilitre (DoseConvert);
				
			}
			
		}else if(convertFrom == "Microgram") {
			if(convertTo == "Decalitre"){
				
				DoseConvert = MicrogramToKilogram (convertDose);
				Doseresult = LitreToDecalitre (DoseConvert);
				
			}else if(convertTo == "Microlitre") {
				
				DoseConvert = MicrogramToKilogram (convertDose);
				Doseresult = LitreToMicrolitre (DoseConvert);
				
			}else if(convertTo == "Millilitre") {
				
				DoseConvert = MicrogramToKilogram (convertDose);
				Doseresult = LitreToMillilitre (DoseConvert);
				
			}else if(convertTo == "Decilitre") {
				
				DoseConvert = MicrogramToKilogram (convertDose);
				Doseresult = LitreToDecilitre (DoseConvert);
				
			}else if(convertTo == "Centilitre") {
				
				DoseConvert = MicrogramToKilogram (convertDose);
				Doseresult = LitreToCentilitre (DoseConvert);
				
			}

		}else if(convertFrom == "Nanogram") {
			if(convertTo == "Decalitre"){
				
				DoseConvert = NanogramToKilogram (convertDose);
				Doseresult = LitreToDecalitre (DoseConvert);
				
			}else if(convertTo == "Microlitre") {
				
				DoseConvert = NanogramToKilogram (convertDose);
				Doseresult = LitreToMicrolitre (DoseConvert);
				
			}else if(convertTo == "Millilitre") {
				
				DoseConvert = NanogramToKilogram (convertDose);
				Doseresult = LitreToMillilitre (DoseConvert);
				
			}else if(convertTo == "Decilitre") {
				
				DoseConvert = NanogramToKilogram (convertDose);
				Doseresult = LitreToDecilitre (DoseConvert);
				
			}else if(convertTo == "Centilitre") {
				
				DoseConvert = NanogramToKilogram (convertDose);
				Doseresult = LitreToCentilitre (DoseConvert);
				
			}
		}	
	}
	
	GlobalDoseresult = Doseresult;
	
	choicesArray = choices(Doseresult);

	for(choicesArrayIndex = 0; choicesArrayIndex < choicesArray.length; choicesArrayIndex++) {
		document.getElementById('mathProblem').innerHTML += '<button ' + 'onclick="answerLaakelasku(this.id)"' + 'id=' + choicesArray[choicesArrayIndex] + '>' + choicesArray[choicesArrayIndex] + '</button>' + '<br>';
	}
}

function answerLaakelasku(clickedId) {
	if(clickedId == GlobalDoseresult) {
		if (correctStreak == null) {
			correctStreak = 0;
		}
		document.getElementById('mathProblem').innerHTML = "Correct answer, thanks! Can you help me with another one?<br>";
		document.getElementById('mathProblem').innerHTML += "<button type='button' onclick='Event()'>Ok</button>&nbsp;&nbsp;";
		document.getElementById('mathProblem').innerHTML += "<button type='button' onclick='nope()'>Nope</button>";
		correctStreak++;
	} else {
		if (correctStreak == null) {
			correctStreak = 0;
		}
		document.getElementById('mathProblem').innerHTML = "Sorry, but that was wrong answer. Your streak was: " + correctStreak + "<br>";
		correctStreak = 0;
		document.getElementById('mathProblem').innerHTML += "<button type='button' onclick='nope()'>Ok</button>";
	}
}
