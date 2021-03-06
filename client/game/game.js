/* global Game */
(function(){
  'use strict';

  Game.play = function(){
  };

  var map, player, cursors, sky, ground, records, spikes, score, spikeTraps, farBackground, trees, emitter,
  scoreText, style, door, gameSound;

  Game.play.prototype = {
    preload: function(){
      this.game.time.advancedTiming = true;
      this.game.load.spritesheet('quasrun', '/assets/quasrun.png', 128, 128);
      this.game.load.spritesheet('record', '/assets/record.png', 32, 32);
      this.game.load.tilemap('map', '/assets/lv1.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('Tiles_32x32', '/assets/Tiles_32x32.png');
      this.game.load.image('sky', '/assets/sunset.jpg');
      this.game.load.image('spike', '/assets/SteelspikeUp.png');
      this.game.load.image('spikeTrap', '/assets/SpikeGroundTrap.png');
      this.game.load.image('bck_hill_9', '/assets/bck_hill_9.png');
      this.game.load.image('tree2', '/assets/cl2_gearTree_01.png');
      this.game.load.image('tree1', '/assets/rev0718_cl2_gearTree_02.png');
      this.game.load.image('door', '/assets/door.png');
      this.game.load.audio('lv1', '/assets/09. Quasimoto - Come On Feet.mp3');
    },

    create: function(){
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      map = this.game.add.tilemap('map');
      map.addTilesetImage('Tiles_32x32');
      map.addTilesetImage('bck_hill_9');
      map.addTilesetImage('tree1');
      map.addTilesetImage('tree2');
      sky = this.game.add.tileSprite(0, 0, 900, 600, 'sky');
      sky.fixedToCamera = true;
      map.setCollision(228);
      map.setCollision(222);


      farBackground = map.createLayer('FarBackground');
      trees = map.createLayer('Trees');
      ground = map.createLayer('Ground');
      ground.resizeWorld();

      player = this.game.add.sprite(30, 500, 'quasrun');
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

      spikes = this.game.add.group();
      spikes.name = 'spikes';
      spikes.enableBody = true;

      spikeTraps = this.game.add.group();
      spikeTraps.name = 'spikeTraps';
      spikeTraps.enableBody = true;

      door = this.game.add.group();
      door.name = 'door';
      door.enableBody = true;

      this.moveTimer = this.game.time.events.loop(1500, this.moveItems, this);


      map.createFromObjects('Record', 65, 'record', 0, true, false, records);
      map.createFromObjects('Spikes', 71, 'spike', 0, true, false, spikes);
      map.createFromObjects('SpikeTrap', 64, 'spikeTrap', 0, true, false, spikeTraps);
      map.createFromObjects('Door', 63, 'door', 0, true, false, door);


      records.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 2, true);
      records.callAll('animations.play', 'animations', 'spin');

      score = 0;
      style = {fontSize: '32px', fill: '#fff'};
      scoreText = this.game.add.text(16, 40, 'score: 0', style);
      scoreText.fixedToCamera = true;

      emitter = this.game.add.emitter(0, 0, 100);
      emitter.makeParticles('record');

      gameSound = this.game.add.audio('lv1');
      gameSound.play();
    },

    update: function(){
      this.game.physics.arcade.collide(player, ground);
      this.game.physics.arcade.collide(spikeTraps, ground);
      this.game.physics.arcade.overlap(player, records, this.collectRecord, null, this);
      this.game.physics.arcade.overlap(player, spikes, this.hurtPlayer, null, this);
      this.game.physics.arcade.overlap(player, spikeTraps, this.hurtPlayer, null, this);
      this.game.physics.arcade.overlap(player, door, this.nextLevel, null, this);

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
      this.game.state.start('boss');
      spikes.destroy();
      records.destroy();
      spikeTraps.destroy();
      sky.destroy();
      door.destroy();
      emitter.destroy();
      gameSound.stop();
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

    moveItems: function(){
      spikeTraps.forEach(function(spikeTrap){
        //random direction
        var direction = Math.floor(Math.random() + 0.5);

        if(direction === 1){
          spikeTrap.body.velocity.x += 100;
        }else if(direction === 0){
          spikeTrap.body.velocity.x -= 100;
        }
      }, this);
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
