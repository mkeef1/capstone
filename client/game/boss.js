/* global Game */
(function(){
  'use strict';

  Game.boss = function(){
  };

  var map, player, cursors, sky, ground, records, spikes, score, spikeTraps, farBackground, trees, emitter, face,
  scoreText, style, door;

  Game.boss.prototype = {
    preload: function(){
      this.game.time.advancedTiming = true;
      this.game.load.spritesheet('quasrun', '/assets/quasrun.png', 128, 128);
      this.game.load.spritesheet('record', '/assets/record.png', 32, 32);
      this.game.load.spritesheet('face', '/assets/face2.png', 613, 540);
      this.game.load.tilemap('map', '/assets/lv2.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('Tiles_32x32', '/assets/Tiles_32x32.png');
      this.game.load.image('sky', '/assets/sunset.jpg');
      this.game.load.image('bck_hill_9', '/assets/bck_hill_9.png');
      this.game.load.image('cl2_gearTree_01', '/assets/cl2_gearTree_01.png');
      this.game.load.image('rev0718_cl2_gearTree_02', '/assets/rev0718_cl2_gearTree_02.png');
    },

    create: function(){
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      map = this.game.add.tilemap('map');
      map.addTilesetImage('Tiles_32x32');
      map.addTilesetImage('bck_hill_9');
      map.addTilesetImage('cl2_gearTree_01');
      map.addTilesetImage('rev0718_cl2_gearTree_02');
      sky = this.game.add.tileSprite(0, 0, 900, 600, 'sky');
      sky.fixedToCamera = true;
      map.setCollision(283);
      // map.setCollision(222);


      farBackground = map.createLayer('Background');
      trees = map.createLayer('Trees');
      ground = map.createLayer('Ground');
      ground.resizeWorld();

      player = this.game.add.sprite(400, 10, 'quasrun');
      this.game.physics.arcade.enable(player);
      player.anchor.setTo(0.5, 0.5);
      player.body.setSize(30, 73);
      player.scale.setTo(1, 1);

      this.game.camera.follow(player);
      player.body.collideWorldBounds = true;
      player.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10, true);
      player.body.velocity.x = 0;
      player.body.gravity.y = 1000;

      cursors = this.game.input.keyboard.createCursorKeys();

      records = this.game.add.group();
      records.name = 'records';
      records.enableBody = true;

      face = this.game.add.group();
      face.name = 'face';
      face.enableBody = true;


      // this.moveTimer = this.game.time.events.loop(1500, this.moveItems, this);

      map.createFromObjects('Face', 346, 'face', 0, true, false, face);
      map.createFromObjects('Records', 345, 'record', 0, true, false, records);

      face.callAll('animations.add', 'animations', 'blink', [0, 1], 10, true);
      face.callAll('animations.play', 'animations', 'blink');

      records.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 2, true);
      records.callAll('animations.play', 'animations', 'spin');

      score = 0;
      style = {fontSize: '32px', fill: '#fff'};
      scoreText = this.game.add.text(16, 40, 'score: 0', style);
      scoreText.fixedToCamera = true;

      emitter = this.game.add.emitter(0, 0, 100);
      emitter.makeParticles('record');
    },

    update: function(){
      this.game.physics.arcade.collide(player, ground);
      this.game.physics.arcade.overlap(player, records, this.collectRecord, null, this);

      if(cursors.left.isDown){
        player.body.velocity.x = -150;
        player.animations.play('walk');
        player.scale.x = -1;
      }
      else if(cursors.right.isDown){
        player.body.velocity.x = 150;
        player.animations.play('walk');
        player.scale.x = 1;
      }else{
        player.animations.stop();
        player.frame = 11;
        player.body.velocity.x = 0;
      }
      if(cursors.up.isDown && player.body.onFloor()){
        player.body.velocity.y = -400;
      }

    },

    nextLevel: function(){
      this.game.state.start('menu');
      spikes.destroy();
      records.destroy();
      spikeTraps.destroy();
      sky.destroy();
      door.destroy();
      emitter.destroy();
    },

    hurtPlayer: function(player, spikes){
      if(!player.invincible && score > 0){
        emitter.x = player.x;
        emitter.y = player.y;
        emitter.gravity = 0;
        player.body.velocity.y = -400;
        player.body.velocity.x = 1000;
        emitter.start(true, 4000, null, score / 10);
        score = 0;
        scoreText.setText('Score: ' + score);
        this.toggleInvincible();
        this.time.events.add(2000, this.toggleInvincible, this);
      }
      if(!player.invincible && score === 0){
        this.game.state.restart(true, false);
      }
    },

    toggleInvincible: function(){
      player.invincible = !player.invincible;
    },

    collectRecord: function(player, record){
      record.destroy();
      score += 10;
      scoreText.setText('Score: ' + score);
      console.log('score', score);

    },

    render: function(){
    }
  };

})();
