<!doctype html> 
<html lang="en"> 
<head> 
	<meta charset="UTF-8" />
    <title>Phaser</title>
	<script type="text/javascript" src="phaser.min.js"></script>
	<script type="text/javascript" src="phaser-plugin-isometric.min.js"></script>
    <style type="text/css">
        body {
            margin: 0;
        }
    </style>
</head>
<body>

<script type="text/javascript">

var selectedTile;
function init() {
var game = new Phaser.Game(1024, 800, Phaser.CANVAS, '', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

var tileGroup, itemGroup, playerGroup, isoGroup, player, box, cursorPos

BasicGame.Boot.prototype =
{
    preload: function () {
            game.load.crossOrigin = 'anonymous';

        game.load.image('tile', 'http://i.imgur.com/FqYQBfI.png');
        game.load.image('box', 'http://i.imgur.com/Z5b96kv.png');
        game.load.spritesheet('characterAnim', 'http://i.imgur.com/HFbuaEL.png', 70, 74);

        game.time.advancedTiming = true;

        // Add and enable the plug-in.
        game.plugins.add(new Phaser.Plugin.Isometric(game));

        // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
        // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
        game.iso.anchor.setTo(0.5, 0.2);

        game.input.onDown.add(movePlayer,this);

        // Start the physics system
        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);

    },
    create: function () {

        // Create ISO groups
        tileGroup = game.add.group();
        playerGroup = game.add.group();
        itemGroup = game.add.group();
        isoGroup = game.add.group();

        // Let's make a load of tiles on a grid.
        this.spawnTiles();

        // Provide a 3D position for the cursor
        cursorPos = new Phaser.Plugin.Isometric.Point3();

       // player = game.add.isoSprite(185, 185, 0, 'characterAnim', 0, playerGroup);
        player = game.add.isoSprite(185, 185, 0, 'characterAnim', 0, isoGroup);
        player.anchor.set(0.5,0.5);

        //box = game.add.isoSprite(200, 90, 0, 'box', 0, itemGroup);
        //box = game.add.isoSprite(38*5, 38*1, 0, 'characterAnim', 0, itemGroup); // 38 is tilesize
        box = game.add.isoSprite(38*5, 38*1, 0, 'characterAnim', 0, isoGroup); // 38 is tilesize
        box.tint=0xFF0000;
        box.anchor.set(0.5,0.5);

        //Setup physics
        game.physics.isoArcade.gravity.setTo(0, 0, -500);
        game.physics.isoArcade.enable(player);
        game.physics.isoArcade.enable(box);
        
        player.body.moves=false
        box.body.moves = false
        player.body.collideWorldBounds = true;
        box.body.collideWorldBounds = true;
        //game.physics.isoArcade.enable(tileGroup,true);
        //game.physics.isoArcade.enable(isoGroup,true);
        
        /*tileGroup.forEach(function(tile) {
            tile.body.allowGravity=false
        })*/
        //tileGroup.bodyType=static
    },
    update: function () {
        // Update the cursor position.
        // It's important to understand that screen-to-isometric projection means you have to specify a z position manually, as this cannot be easily
        // determined from the 2D pointer position without extra trickery. By default, the z position is 0 if not set.
        game.iso.unproject(game.input.activePointer.position, cursorPos);

        // Loop through all tiles and test to see if the 3D position from above intersects with the automatically generated IsoSprite tile bounds.
        tileGroup.forEach(function (tile) {
            var inBounds = tile.isoBounds.containsXY(cursorPos.x, cursorPos.y);

            
            // If it does, do a little animation and tint change.
            if (!tile.selected && inBounds) {
                tile.selected = true;
                selectedTile = tile;
                tile.tint = 0x86bfda;
               // game.add.tween(tile).to({ isoZ: 4 }, 200, Phaser.Easing.Quadratic.InOut, true);
            }
            // If not, revert back to how it was.
            else if (tile.selected && !inBounds) {
                tile.selected = false;
                tile.tint = 0xffffff;
               // game.add.tween(tile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
            }
        });

        
        //Setup collisions
        game.physics.isoArcade.collide(box, player , this.doCollide) 
        game.iso.topologicalSort(isoGroup);            
    },
    
    doCollide: function(box, player){
            
      console.log('great success');
      itemGroup.add(box)
      
      var tween = game.add.tween(box)
            .to(
                { isoZ: 350, alpha:0 }, 
                500, 
                null, //Phaser.Easing.Quadratic.InOut, 
                true
                )      
                tween.onComplete.add(function(box) {
                    box.destroy();
                    player.tint=0xFFFF00;
                },this)
                
     },
    
    // doesnt fire
    doOverlap: function() {
        
        console.log("doOverlap")
    },
    render: function () {
        //game.debug.text("Move your mouse around!", 2, 36, "#ffffff");
        game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
        
         //game.debug.bodyInfo(player, 32, 32);
        // game.debug.body(player);
         //game.debug.body(box)
    },
    spawnTiles: function () {
        var tile;
        for (var xx = 0; xx < 400; xx += 38) {
            for (var yy = 0; yy < 400; yy += 38) {
                // Create a tile using the new game.add.isoSprite factory method at the specified position.
                // The last parameter is the group you want to add it to (just like game.add.sprite)
                tile = game.add.isoSprite(xx, yy, 0, 'tile', 0, tileGroup);
                tile.anchor.set(0.5, 0);
                //game.physics.isoArcade.enableBody(tile)
                //tile.body.allowGravity=false
            }
        }
    }
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');

function movePlayer() {
    
    var tile = selectedTile
    console.log("tile", selectedTile)
    var isoBaseSize = 32;
    var tween = game.add.tween(player)
        .to(
            { isoZ: 60, isoX: (tile.isoX), isoY: (tile.isoY) }, 
            200, 
            Phaser.Easing.Quadratic.InOut, 
            false
          ).to(
             { isoZ: 0 }, 
             200, 
             Phaser.Easing.Bounce.Out, 
             false
         );
    tween.start()
    
         
    }
   


}

init();

</script>

</body>
</html>