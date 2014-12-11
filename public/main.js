var game = new Phaser.Game(900, 600, Phaser.AUTO, 'capstone', { preload: preload, create: create, update:update});

function preload(){
  game.load.image('quas', '/img/quas.gif');
  game.load.spritesheet('quasrun', '/img/quasrun.png', 128, 128);
}

var player, cursors;

function create(){
  player = game.add.sprite(100, 200, 'quasrun');
  //game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);
  player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10, true);
  cursors = game.input.keyboard.createCursorKeys();
}

function update(){
  player.body.velocity.x = 0;
  player.animations.play('left');
  if(cursors.left.isDown){
    player.body.velocity.x = -150;
    player.animations.play('left');
  }
  else if(cursors.right.isDown){
    player.body.velocity.x = 150;
    player.animations.play('left');
  }else{
    player.animations.stop();
    player.frame = 11;
  }
  if(cursors.up.isDown && player.body.touching.down){
    player.body.velocity.y = -350;
  }
}
