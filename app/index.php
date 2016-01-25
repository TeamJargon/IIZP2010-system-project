<html>
<head>
</head>

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

echo "<form method='get' action='index.php'>";

foreach($taustavarit as $nimi => $vkoodi) {
	$valittu = '';
	if($vkoodi == $taustavari) $valittu = 'checked';
	echo "<input type='radio' name='taustavari' value=$vkoodi $valittu>$nimi<br>";
}
echo "<input type='submit' name='nappi' value='Vari'>";
echo "</form>";
?>


<script type="text/javascript">
    window.doorbellOptions = {
        appKey: 'TLjOh8A33PWoZDTun8H1Nc97RwxfDBYWW2imtaT1P6ByFFxkGgaSnLhNjCHg8ziy'
    };
    (function(d, t) {
        var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/3027?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g);
    }(document, 'script'));
</script>


</body>
</html>
