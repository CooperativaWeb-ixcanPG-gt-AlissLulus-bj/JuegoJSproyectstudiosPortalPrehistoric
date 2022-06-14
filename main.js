// Create a new scene
let gameScene = new Phaser.Scene('Game');

// Set the configuration of the game
let config = {
    type: Phaser.AUTO,
    with: 640,
    height: 360,
    scene: gameScene,
    pixelArt: false,
    physics:{
        default: 'arcade',
        arcade: {
        gravity: {y:1},
        debug: true
        }
    }
}

// some parameters for our scene
gameScene.init = function(){
    //player parametres for our scene
  this.playerSpeed = 150;
  this.jumpSpeed = -200;
};

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
    this.physics.add.existing(this.player);

    //load idle animation
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNames('player',{
            frames:[0,1,2,3,4,5]
        }),
        frameRate:12,
        yoyo: true,
        repeat:-1
    });

    //load running animation
    this.anims.create({
        key: 'running',
        frames: this.anims.generateFrameNames('player',{
            frames:[6,7,8,9,10,11]
        }),
        frameRate:12,
        yoyo: true,
        repeat:-1
    });

     //load jumping animation
     this.anims.create({
        key: 'jumping',
        frames: this.anims.generateFrameNames('player',{
            frames:[12,13,14,15,16,17]
        }),
        frameRate:12,
        yoyo: true,
        repeat:-1
    });

    //enable cursor keys
  this.cursors = this.input.keyboard.createCursorKeys();
    
}

// Create a new game, pass the configuration
let game = new Phaser.Game(config);

gameScene.update = function(){

    // IDLE
    if(!this.player.anims.isPlaying){
        this.player.anims.play('idle');
    }  

    // MOVEMENT
    if(this.cursors.left.isDown){
        this.player.body.setVelocityX(-this.playerSpeed);
    
        this.player.flipX = true;
    
        this.player.anims.stop('idle');
        if(!this.player.anims.isPlaying){
          this.player.anims.play('running');
        }
        
      }else if(this.cursors.right.isDown){
        this.player.body.setVelocityX(this.playerSpeed);
    
        this.player.flipX = false;
        this.player.anims.stop('idle');
        if(!this.player.anims.isPlaying){
          this.player.anims.play('running');
        }
      }else if(this.cursors.space.isDown){
        this.player.body.setVelocityY(this.jumpSpeed);
        if(!this.player.anims.isPlaying){
            this.player.anims.play('jumping');
          }
      }else{
        // make the player stop
        // this.player.body.setVelocityX(0);
    
        // stop walking animation
        // this.player.anims.stop('running');
    
        //set default frame
        // this.player.setFrame(3);
      }
}