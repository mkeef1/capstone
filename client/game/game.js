/* global Game */
(function(){
  'use strict';

  Game.play = function(){
  };

  var map, background, objects, player, cursors;

  Game.play.prototype = {
    preload: function(){
      this.game.load.spritesheet('quasrun', '/assets/quasrun.png', 128, 128);
      this.game.load.tilemap('map', '/assets/capstone.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('set1', '/assets/hyptosis_tile-art-batch-1.png');
      this.game.load.image('set2', '/assets/hyptosis_tile-art-batch-3.png');
    },
    create: function(){
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      map = this.game.add.tilemap('map');
      map.addTilesetImage('hyptosis_tile-art-batch-3', 'set2');
      map.addTilesetImage('hyptosis_tile-art-batch-1', 'set1');

      background = map.createLayer('Background');
      objects = map.createLayer('objects');
      background.resizeWorld();
      player = this.game.add.sprite(100, 600, 'quasrun');
      this.game.physics.arcade.enable(player);
      player.anchor.setTo(0.5, 0.5);
      player.body.setSize(64, 64);
      player.scale.setTo(1, 1);
      cursors = this.game.input.keyboard.createCursorKeys();
      this.game.camera.follow(player);
      player.body.collideWorldBounds = true;
      map.setCollision(1694, true, 'objects');
      player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10, true);
    },
    update: function(){
      this.game.physics.arcade.collide(player, objects);
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
      if(cursors.up.isDown && player.body.onFloor()){
        player.body.velocity.y = -350;
      }
      player.body.gravity.y = 1000;
    },

    render: function(){
      this.game.debug.body(player);
    }
  };

})();
