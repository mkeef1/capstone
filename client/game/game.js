/* global Game */
(function(){
  'use strict';

  Game.play = function(){
  };

  var map, player, cursors, sky, ground, records, spikes;

  Game.play.prototype = {
    preload: function(){
      this.game.load.spritesheet('quasrun', '/assets/quasrun.png', 128, 128);
      this.game.load.spritesheet('record', '/assets/record.png', 32, 32);
      this.game.load.tilemap('map', '/assets/lv1.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('minicular', '/assets/minicular.png');
      this.game.load.image('sky', '/assets/presents1.jpg');
      this.game.load.image('spike', '/assets/SteelspikeUp.png');
    },
    create: function(){
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      map = this.game.add.tilemap('map');
      map.addTilesetImage('minicular');
      sky = this.game.add.tileSprite(0, 0, 900, 600, 'sky');
      sky.fixedToCamera = true;

      ground = map.createLayer('Ground');
      ground.resizeWorld();
      player = this.game.add.sprite(100, 550, 'quasrun');
      this.game.physics.arcade.enable(player);
      player.anchor.setTo(0.5, 0.5);
      player.body.setSize(37, 73);
      player.scale.setTo(1, 1);
      cursors = this.game.input.keyboard.createCursorKeys();
      this.game.camera.follow(player);
      player.body.collideWorldBounds = true;
      map.setCollisionByExclusion([]);
      player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10, true);

      records = this.game.add.group();
      records.enableBody = true;

      spikes = this.game.add.group();
      spikes.enableBody = true;

      map.createFromObjects('Record', 66, 'record', 0, true, false, records);
      map.createFromObjects('Spikes', 72, 'spike', 0, true, false, spikes);
      records.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 2, true);
      records.callAll('animations.play', 'animations', 'spin');
    },
    update: function(){
      this.game.physics.arcade.collide(player, ground);
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
