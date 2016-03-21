var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var circles = [];
var currentRoom;

function drawMain()
{
	$('.room').hide();
	$('#myCanvas').show();	
	//x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext, name
	drawCircle(c.width / 2.7, c.height / 4, "blue", c.width * 0.04, 4, "#003300", "white", "center", "bold 20pt Arial", "1", "reception");
	drawCircle(c. width / 1.8, c.height / 2.5, "yellow", c.width * 0.04, 4, "#003300", "white", "center", "bold 20pt Arial", "2", "medical");
	drawCircle(c. width / 1.3, c.height / 1.7, "green", c.width * 0.04, 4, "#003300", "white", "center", "bold 20pt Arial", "3", "craft");
}

/*
function drawRect(ctx, x, y, width, height, rects, name)
{
	//luodaan uusi neliö, joka tallennetaan taulukkoon
	ctx.strokeRect(x, y, width, height);
	var rect = new Object();
		rect.x = x;
		rect.y = y;
		rect.width = width;
		rect.height = height;
		rect.name = name;
	rects.push(rect);
}
*/

function switchScene(name)
{
	switch(name) {
	case "reception":
		currentRoom = "reception";	
		$("#myCanvas").fadeOut("slow", function(){
			$('#reception').fadeIn("slow", function(){
				letsDoSomeMath();
			});
		});	
		break;
		
	case "medical":
		currentRoom = "medical";
		$('#myCanvas').fadeOut("slow", function(){
			$('#medical').fadeIn("slow");
		});	
		break;
		
	case "craft":
		currentRoom = "craft";
		$('#myCanvas').fadeOut("slow", function(){
			$('#craft').fadeIn("slow");
		});	
		break;
		
	default:
		currentRoom = "main";
		$('.room').hide();
		$('.roomChildEle').hide();
		$('#myCanvas').show();
		resize();		
		break;
	}
}

function resize() 
{
	if (currentRoom == "main" || !currentRoom) 
	{
		c.width = window.innerWidth;
		c.height = window.innerHeight;
		drawMain();
	}		
}

window.addEventListener('resize', resize, false);
window.addEventListener('load', resize, false);

function draw(x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext) 
{
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = fillcolor;
    ctx.fill();
    ctx.lineWidth = linewidth;
    ctx.strokeStyle = strokestyle;
    ctx.stroke();
    
    ctx.fillStyle = fontcolor;
    ctx.textAlign = textalign;
    ctx.font = fonttype;
    
    ctx.fillText(filltext, x, y);    
}

var Circle = function(x, y, radius, name) 
{
    this.left = x - radius;
    this.top = y - radius;
    this.right = x + radius;
    this.bottom = y + radius;
	this.name = name;
}

function drawCircle(x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext, name) 
{
    draw(x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext);
    var circle = new Circle(x, y, radius, name);
    circles.push(circle);  
}

$('#myCanvas').click(function (e)
{
    var clickedX = e.pageX - this.offsetLeft;
    var clickedY = e.pageY - this.offsetTop;
    
	for (var i = 0; i < circles.length; i++) {
        if (clickedX < circles[i].right && clickedX > circles[i].left && clickedY > circles[i].top && clickedY < circles[i].bottom) {
			//vaihdetaan näkymää sen mukaan mitä ympyrää klikattiin
			switchScene(circles[i].name);
			break;
        }
    }
});

$(window).bind('resize', function(e)
{
	if (currentRoom == "main" || !currentRoom) {
		if (window.RT) clearTimeout(window.RT);
		window.RT = setTimeout(function()
		{
			this.location.reload(false);
		}, 100);
	}
});
