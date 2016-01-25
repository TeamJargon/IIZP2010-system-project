<?php

$taustavarit["Valkoinen"] = "#fff";
$taustavarit["Keltainen"] = "#ff0";
$taustavarit["Harmaa"] = "#bbb";
$taustavarit["Sininen"] = "#00f";

$taustavari = 'white';

if(isset($_GET['taustavari'])) {
	$taustavari = $_GET['taustavari'];
}

echo "<body style='background-color: $taustavari'>";

echo "<form method='get' action='h2t2.php'>";

foreach($taustavarit as $nimi => $vkoodi) {
	$valittu = '';
	if($vkoodi == $taustavari) $valittu = 'checked';
	echo "<input type='radio' name='taustavari' value=$vkoodi $valittu>$nimi<br>";
}
echo "<input type='submit' name='nappi' value='Vari'>";
echo "</form>";
?>