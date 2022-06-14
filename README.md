# prehistoric-platformer

## Inicial setup
~~~
// Create a new scene
let gameScene = new Phaser.Scene('Game');

// Set the configuration of the game
let config = {
    type: Phaser.AUTO,
    with: 640,
    height: 360,
    scene: gameScene
}

// Create a new game, pass the configuration
let game = new Phaser.Game(config);

// some parameters for our scene
gameScene.init = function(){};

//Load assets files for our game
gameScene.preload = function(){
    //load images
}

gameScene.create = function(){
    
}
~~~

## Idle animation created
~~~
// Create a new scene
let gameScene = new Phaser.Scene('Game');

// Set the configuration of the game
let config = {
    type: Phaser.AUTO,
    with: 640,
    height: 360,
    scene: gameScene,
}

// some parameters for our scene
gameScene.init = function(){};

//Load assets files for our game
gameScene.preload = function(){
    //load sprites
    this.load.spritesheet('player', './prehistoric-platformer/characters/playable/caverman.png', {
        frameWidth: 96,
        frameHeight: 71, 
        margin: 1,
        spacing: 1
    });  
}

gameScene.create = function(){
    //Player
    this.player = this.add.sprite(90,100,'player',0 );

    //load an animation
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNames('player',{
          frames:[0,1,2,3,4,5]
        }),
        frameRate:12,
        yoyo: true,
        repeat:-1
      });
}

// Create a new game, pass the configuration
let game = new Phaser.Game(config);

gameScene.update = function(){
    if(!this.player.anims.isPlaying){
        this.player.anims.play('idle');
    }  
}
~~~