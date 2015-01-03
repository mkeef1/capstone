/* global Game */
(function(){
  'use strict';

  Game.play = function(){
  };

  var map, player, cursors, sky, ground, records, spikes, score, spikeTraps;

  Game.play.prototype = {
    preload: function(){
      this.game.load.spritesheet('quasrun', '/assets/quasrun.png', 128, 128);
      this.game.load.spritesheet('record', '/assets/record.png', 32, 32);
      this.game.load.tilemap('map', '/assets/lv1.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('minicular', '/assets/minicular.png');
      this.game.load.image('sky', '/assets/presents1.jpg');
      this.game.load.image('spike', '/assets/SteelspikeUp.png');
      this.game.load.image('spikeTrap', '/assets/SpikeGroundTrap.png');
    },
    create: function(){
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      map = this.game.add.tilemap('map');
      map.addTilesetImage('minicular');
      // map.addTilesetImage('spike');
      // map.addTilesetImage('spikeTrap');
      sky = this.game.add.tileSprite(0, 0, 900, 600, 'sky');
      sky.fixedToCamera = true;

      // posts = this.game.add.group();
      // posts.enableBody = true;

      ground = map.createLayer('Ground');
      // post = map.createLayer('Post');
      // post.resizeWorld();
      ground.resizeWorld();
      player = this.game.add.sprite(1200, 550, 'quasrun');
      this.game.physics.arcade.enable(player);
      player.anchor.setTo(0.5, 0.5);
      player.body.setSize(30, 73);
      player.scale.setTo(1, 1);
      cursors = this.game.input.keyboard.createCursorKeys();
      this.game.camera.follow(player);
      player.body.collideWorldBounds = true;
      map.setCollisionByExclusion([]);
      player.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10, true);

      records = this.game.add.group();
      records.enableBody = true;

      spikes = this.game.add.group();
      spikes.enableBody = true;

      spikeTraps = this.game.add.group();
      spikeTraps.enableBody = true;
      // spikeTraps.physicsBodyType = Phaser.Physics.ARCADE;
      // spikeTraps.body.bounce.set(0.5);
      // spikeTraps.body.tilePadding.set(32);
      this.moveTimer = this.game.time.events.loop(1500, this.moveItems, this);


      map.createFromObjects('Record', 66, 'record', 0, true, false, records);
      map.createFromObjects('Spikes', 72, 'spike', 0, true, false, spikes);
      map.createFromObjects('SpikeTrap', 64, 'spikeTrap', 0, true, false, spikeTraps);


      records.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 2, true);
      records.callAll('animations.play', 'animations', 'spin');

      score = 0;

      // spikeTraps.setAll('body.velocity.x', -100);
      // spikeTraps.body.checkCollision.left = true;
      // spikeTraps.body.checkCollision.left = true;
      // spikeTraps.body.bounce.set(1);
      // this.moveSpikeTrap();

    },
    update: function(){
      this.game.physics.arcade.collide(player, ground);
      this.game.physics.arcade.collide(spikeTraps, ground);
      this.game.physics.arcade.overlap(player, records, this.collectRecord, null, this);
      // this.game.physics.arcade.overlap(spikeTraps, ground, this.changeSpikeTrapDirection, null);
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

      //sprite dimensions
      // mummy.width = 44;
      // mummy.height = 44;

      //animations
      // mummy.animations.add('left', [4, 5, 6, 7], 10, true);
      // mummy.animations.add('right', [8, 9, 10, 11], 10, true);

      //enemy behavior
      // spikeTrap.body.gravity.y = 600;
      //mummy.body.bounce.y = 0.7 + Math.random() * 0.2;
      if(direction === 1){
        spikeTrap.body.velocity.x += 100;
      }else if(direction === 0){
        spikeTrap.body.velocity.x -= 100;
        spikeTrap.scale.x = 1;
      }
    }, this);

    // changeSpikeTrapDirection: function(){
    //   console.log('spike trap hit');
    //   console.log('spikeTrap', spikeTraps);
    //   // spikeTrap.body.velocity.x = 100;
    //   // var currentTrap = spikeTraps.getTop();
    //   // spikeTraps.setProperty(currentTrap, 'body.velocity.x', -1, false, false, 3);

        // spikeTraps.set(this, 'body.velocity.x', -1, false, false, 3);
    },

    // moveSpikeTrap: function(){
    //   spikeTraps.forEach(function(spikeTrap){
    //     spikeTrap.body.velocity.x = -100;
    //   });
    // },

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
