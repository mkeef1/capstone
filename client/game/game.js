/* global Game */
(function(){
  'use strict';

  Game.play = function(){
  };

  var map, player, cursors, sky, ground, records, spikes, score, spikeTraps, platforms, farBackground1, farBackground2;

  Game.play.prototype = {
    preload: function(){
      this.game.load.spritesheet('quasrun', '/assets/quasrun.png', 128, 128);
      this.game.load.spritesheet('record', '/assets/record.png', 32, 32);
      this.game.load.tilemap('map', '/assets/lv1.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('minicular', '/assets/minicular.png');
      this.game.load.image('sky', '/assets/presents1.jpg');
      this.game.load.image('spike', '/assets/SteelspikeUp.png');
      this.game.load.image('spikeTrap', '/assets/SpikeGroundTrap.png');
      this.game.load.image('bck_hill_9', '/assets/background/Far/used/bck_hill_9.png');
      this.game.load.image('bck_hill_10', '/assets/background/Far/used/bck_hill_10.png');
    },
    create: function(){
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      map = this.game.add.tilemap('map');
      map.addTilesetImage('minicular');
      map.addTilesetImage('bck_hill_10');
      map.addTilesetImage('bck_hill_9');
      sky = this.game.add.tileSprite(0, 0, 900, 600, 'sky');
      sky.fixedToCamera = true;
      map.setCollisionByExclusion([]);


      farBackground1 = map.createLayer('FarBackground1');
      farBackground2 = map.createLayer('FarBackground2');
      // farBackground2.scrollFactorX = -0.5;
      ground = map.createLayer('Ground');
      ground.resizeWorld();

      player = this.game.add.sprite(600, 550, 'quasrun');
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
    },

    update: function(){
      this.game.physics.arcade.collide(player, ground);
      this.game.physics.arcade.collide(player, platforms);
      this.game.physics.arcade.collide(spikeTraps, ground);
      this.game.physics.arcade.overlap(player, records, this.collectRecord, null, this);

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
      this.game.debug.body(player);
    }
  };

})();
