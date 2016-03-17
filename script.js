var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var rects = [];

function drawMain()
{
	$('.room').hide();
	$('#myCanvas').show();
	drawRect(ctx, 20, 20, 100, 100, rects, "reception");
	drawRect(ctx, 500, 500, 100, 100, rects, "medical");
	drawRect(ctx, 800, 300, 100, 100, rects, "craft");
}

function drawRect(ctx, x, y, width, height, rects, name)
{
	//luodaan uusi neliö, joka tallennetaan taulukkoon
	ctx.fillRect(x, y, width, height);
	var rect = new Object();
		rect.x = x;
		rect.y = y;
		rect.width = width;
		rect.height = height;
		rect.name = name;
	rects.push(rect);
}

function switchScene(name)
{
	switch(name) {
	case "reception":
		alert ("SWITCH TO reception room");
		$('#myCanvas').hide();
		$('#reception').show();
		break;
		
	case "medical":
		alert ("SWITCH TO medical room");
		$('#myCanvas').hide();
		$('#medical').show();
		break;
		
	case "craft":
		alert ("SWITCH TO craft room");
		$('#myCanvas').hide();
		$('#craft').show();
		break;
		
	default:
		$('.room').hide();
		$('#myCanvas').show();
		break;
	}
}

$('#myCanvas').click(function (e)
{
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;
    
	//tarkistetaan, onko klikkaus jonkin neliön sisällä
    for (var i = 0; i < rects.length; i++) {
        if(((mouseX > rects[i].x) && (mouseX < (rects[i].x + rects[i].width))) && ((mouseY > rects[i].y) && (mouseY < (rects[i].y + rects[i].height)))) {
			//vaihdetaan huonetta sen mukaan mitä neliötä klikattiin
			switchScene(rects[i].name);
        }
    }
});






