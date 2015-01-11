/* global Game */
(function(){
  'use strict';

  Game.play = function(){
  };

  var map, player, cursors, sky, ground, records, spikes, score, spikeTraps, platforms, farBackground, trees, emitter;

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
      map.setCollisionByExclusion([]);


      farBackground = map.createLayer('FarBackground');
      trees = map.createLayer('Trees');
      // farBackground2.scrollFactorX = -0.5;
      ground = map.createLayer('Ground');
      ground.resizeWorld();

      player = this.game.add.sprite(600, 450, 'quasrun');
      this.game.physics.arcade.enable(player);
      player.anchor.setTo(0.5, 0.5);
      player.body.setSize(30, 73);
      player.scale.setTo(1, 1);

      this.game.camera.follow(player);
      player.body.collideWorldBounds = true;
      player.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10, true);

      cursors = this.game.input.keyboard.createCursorKeys();

      platforms = this.game.add.group();
      platforms.enableBody = true;

      records = this.game.add.group();
      records.name = 'records';
      records.enableBody = true;

      spikes = this.game.add.group();
      spikes.name = 'spikes';
      spikes.enableBody = true;

      spikeTraps = this.game.add.group();
      spikeTraps.name = 'spikeTraps';
      spikeTraps.enableBody = true;

      this.moveTimer = this.game.time.events.loop(1500, this.moveItems, this);


      map.createFromObjects('Record', 65, 'record', 0, true, false, records);
      map.createFromObjects('Spikes', 71, 'spike', 0, true, false, spikes);
      map.createFromObjects('SpikeTrap', 64, 'spikeTrap', 0, true, false, spikeTraps);


      records.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 2, true);
      records.callAll('animations.play', 'animations', 'spin');

      score = 0;

      emitter = this.game.add.emitter(0, 0, 100);
      emitter.makeParticles('record');
    },

    update: function(){
      this.game.physics.arcade.collide(player, ground);
      this.game.physics.arcade.collide(player, platforms);
      this.game.physics.arcade.collide(spikeTraps, ground);
      this.game.physics.arcade.overlap(player, records, this.collectRecord, null, this);
      this.game.physics.arcade.overlap(player, spikes, this.hurtPlayer, null, this);
      // this.game.physics.arcade.overlap(player, emitter, this.collectRecord, null, this);
      this.game.physics.arcade.collide(emitter, ground);

      player.body.velocity.x = 0;
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
      }
      if(cursors.up.isDown && player.body.onFloor()){
        player.body.velocity.y = -400;
      }
      player.body.gravity.y = 1000;
    },

    hurtPlayer: function(player, spikes){
      if(!player.invincible){
        emitter.x = player.x;
        emitter.y = player.y;
        emitter.bounce.setTo(1, 1);
        emitter.start(true, 6000, null, score / 10);
        this.toggleRecordInvincible();
        this.time.events.add(1000, this.toggleRecordInvincible, this, emitter);
        score = 0;
        this.toggleInvincible();
        this.time.events.add(2000, this.toggleInvincible, this);
      }
    },

    toggleRecordInvincible: function(){
      emitter.invincible = !emitter.invincible;
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
      record.kill();
      score += 10;
      console.log('score', score);

    },

    render: function(){
      this.game.debug.text(this.game.time.fps || '--', 2, 14, '#00ff00');
      // this.game.debug.body(player);
    }
  };

})();
