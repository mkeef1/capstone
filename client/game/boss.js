/* global Game */
(function(){
  'use strict';

  Game.boss = function(){
  };

  var map, player, cursors, sky, ground, records, spikes, score, spikeTraps, farBackground, trees, emitter, face,
  scoreText, style, door, fireBalls, fireBall, fireBall2, boss, savior, savior1, brick, spaceKey, brickTime, bricks,
  faceHealth;

  Game.boss.prototype = {
    preload: function(){
      this.game.time.advancedTiming = true;
      this.game.load.spritesheet('quasrun', '/assets/quasrun.png', 128, 128);
      this.game.load.spritesheet('record', '/assets/record.png', 32, 32);
      this.game.load.spritesheet('face', '/assets/newface.png', 602, 539);
      this.game.load.spritesheet('fire', '/assets/fire2.png', 128, 128);
      this.game.load.spritesheet('brickSheet', '/assets/blah.png', 152, 152);
      this.game.load.tilemap('map', '/assets/lv2.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('Tiles_32x32', '/assets/Tiles_32x32.png');
      this.game.load.image('brick', '/assets/redbrick.png');
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
      map.setCollisionByExclusion([]);

      brickTime = 0;
      faceHealth = 100;


      farBackground = map.createLayer('Background');
      trees = map.createLayer('Trees');
      ground = map.createLayer('Ground');
      ground.resizeWorld();

      player = this.game.add.sprite(200, 400, 'quasrun');
      this.game.physics.arcade.enable(player);
      player.anchor.setTo(0.5, 0.5);
      player.body.setSize(30, 73);
      player.scale.setTo(1, 1);
      this.game.camera.follow(player);
      player.body.collideWorldBounds = true;
      player.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10, true);
      player.body.velocity.x = 0;
      player.body.gravity.y = 1000;

      boss = this.game.add.sprite(1100, 300, 'record');
      this.game.physics.arcade.enable(boss);
      boss.animations.add('spin', [0, 1, 2, 3, 4, 5], 2, true);
      boss.animations.play('spin');

      bricks = this.game.add.group();
      bricks.name = 'bricks';
      bricks.enableBody = true;

      // brick = this.game.add.sprite(player.body.x + 15, player.body.y + 32, 'brickSheet');
      // this.game.physics.arcade.enable(brick);
      // bricks.add(brick);
      // brick.animations.add('turn', [0, 2, 1, 2], 10, true);
      // // brick.animations.play('turn');
      // brick.scale.setTo(0.2, 0.2);
      // brick.anchor.setTo(0.5, 0.5);
      // brick.body.velocity.x = 180;

      cursors = this.game.input.keyboard.createCursorKeys();

      spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

      spaceKey.onDown.add(this.throwBrick, this);

      records = this.game.add.group();
      records.name = 'records';
      records.enableBody = true;

      fireBalls = this.game.add.group();
      fireBalls.name = 'fireBalls';
      fireBalls.enableBody = true;

      map.createFromObjects('Records', 345, 'record', 0, true, false, records);

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
      this.game.physics.arcade.overlap(player, boss, this.boss, null, this);
      this.game.physics.arcade.overlap(player, savior, this.collectSavior, null, this);
      this.game.physics.arcade.overlap(player, savior1, this.collectSavior1, null, this);
      this.game.physics.arcade.overlap(bricks, face, this.hurtFace, null, this);
      this.game.physics.arcade.overlap(player, fireBalls, this.hurtPlayer, null, this);

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


    startTimers: function(){
      this.createSaviors();
      this.shotTimer = this.game.time.events.loop(4000, this.shoot, this);
      this.powershotTimer = this.game.time.events.loop(12000, this.powerShot, this);
      this.pauseTimer = this.game.time.events.loop(15000, this.powerUp, this);
      this.saviorTimer = this.game.time.events.loop(10000, this.createSaviors, this);
    },


    moveFace: function(){
      this.game.add.tween(face).to({x: 1300}, 2000, Phaser.Easing.Linear.None, true);
      this.time.events.add(2000, this.freakOut, this);
    },

    freakOut: function(){
      face.animations.play('blink');
      this.game.add.tween(face).to({x: 1305}, 10, Phaser.Easing.Linear.None)
      .to({y: 218}, 10, Phaser.Easing.Linear.None)
      .to({x: 1305}, 10, Phaser.Easing.Linear.None)
      .to({y: 213}, 10, Phaser.Easing.Linear.None)
      .to({x: 1300}, 10, Phaser.Easing.Linear.None)
      .repeatAll(15)
      .start();
      this.time.events.add(1200, this.moveFaceBack, this);
    },

    freakOut2: function(){
      face.animations.play('blink');
      this.game.add.tween(face).to({x: 1405}, 10, Phaser.Easing.Linear.None)
      .to({y: 218}, 10, Phaser.Easing.Linear.None)
      .to({x: 140}, 10, Phaser.Easing.Linear.None)
      .to({y: 213}, 10, Phaser.Easing.Linear.None)
      .to({x: 1405}, 10, Phaser.Easing.Linear.None)
      .repeatAll(15)
      .start();
      this.time.events.add(1200, this.toggleTimers, this);
    },

    // resetTimers: function(){
    //   face.animations.stop('blink', true);
    //   this.shotTimer.reset();
    //   this.powershotTimer.reset();
    //   this.pauseTimer.reset();
    //   this.saviorTimer.reset();
    //   this.startTimers();
    // },

    moveFaceBack: function(){
      face.animations.stop('blink', true);
      // face.frame = 0;
      this.game.add.tween(face).to({x: 1410}, 2000, Phaser.Easing.Linear.None, true);
      this.time.events.add(2000, this.startTimers, this);
    },

    throwBrick: function(){
      if(brickTime < this.game.time.now){
        brickTime = this.game.time.now + 3000;
        brick = this.game.add.sprite(player.body.x + 15, player.body.y + 32, 'brickSheet');
        this.game.physics.arcade.enable(brick);
        bricks.add(brick);
        brick.animations.add('turn', [0, 2, 1, 2], 10, true);
        brick.animations.play('turn');
        brick.scale.setTo(0.2, 0.2);
        brick.anchor.setTo(0.5, 0.5);
        brick.body.velocity.x = 180;
      }
    },

    createSaviors: function(){
      savior1 = this.game.add.sprite(800, 100, 'record');
      this.game.physics.arcade.enable(savior1);
      savior1.animations.add('spin', [0, 1, 2, 3, 4, 5], 2, true);
      savior1.animations.play('spin');
      savior1.body.velocity.y = 60;
      savior1.checkWorldBounds = true;
      savior1.outOfBoundsKill = true;

      savior = this.game.add.sprite(1055, 100, 'record');
      savior.game.physics.arcade.enable(savior);
      savior.animations.add('spin', [0, 1, 2, 3, 4, 5], 2, true);
      savior.animations.play('spin');
      savior.body.velocity.y = 60;
      savior.checkWorldBounds = true;
      savior.outOfBoundsKill = true;
    },

    collectSavior: function(player, savior){
      score += 10;
      savior.destroy();
      scoreText.setText('Score: ' + score);
    },

    collectSavior1: function(player, savior1){
      score += 10;
      savior1.destroy();
      scoreText.setText('Score: ' + score);
    },

    boss: function(){
      score += 10;
      face = this.game.add.sprite(1700, 213, 'face');
      this.game.physics.arcade.enable(face);

      face.animations.add('blink', [0, 1], 10, true);
      face.anchor.setTo(0.3, 0.35);
      face.body.setSize(100, 150);
      face.scale.setTo(1, 0.95);
      boss.destroy();
      this.game.camera.unfollow(player);
      this.game.camera.unfollow(scoreText);
      this.game.world.setBounds(scoreText.x - 16, scoreText.y - 40, 790, 600);
      this.moveFace();
    },

    shoot: function(){
      fireBall = this.game.add.sprite(face.body.x - 130, face.body.y + 295, 'fire');
      this.game.physics.arcade.enable(fireBall);
      fireBalls.add(fireBall);
      fireBall.body.setSize(70, 32);
      fireBall.width = 32;
      fireBall.height = 70;
      fireBall.rotation = this.game.physics.arcade.angleBetween(fireBall, player);
      this.game.physics.arcade.accelerateToObject(fireBall, player, 60, 100, 100);
      fireBall.anchor.setTo(0.2, 0.5);
      fireBall.scale.x = -1;
      fireBall.animations.add('flame', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 10, true);
      fireBall.animations.play('flame');
      fireBall.checkWorldBounds = true;
      fireBall.outOfBoundsKill = true;
    },

    powerUp: function(){
      face.animations.play('blink');
      this.time.events.add(4000, this.toggleTimers, this);
      this.toggleFaceInvincible();
      this.time.events.add(4000, this.toggleFaceInvincible, this);
    },

    toggleFaceInvincible: function(){
      face.invincible = !face.invincible;
    },

    toggleTimers: function(){
      face.animations.stop('blink', true);
    },

    powerShot: function(){
      fireBall = this.game.add.sprite(face.body.x - 130, face.body.y + 295, 'fire');
      this.game.physics.arcade.enable(fireBall);
      fireBalls.add(fireBall);
      fireBall.rotation = this.game.physics.arcade.angleToXY(fireBall, 900, 100);
      this.game.physics.arcade.accelerateToXY(fireBall, 500, 150, 200, 200);
      fireBall.anchor.setTo(0.2, 0.5);
      fireBall.body.setSize(70, 32);
      fireBall.width = 32;
      fireBall.height = 70;
      fireBall.scale.x = -1;
      fireBall.animations.add('flame', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 10, true);
      fireBall.animations.play('flame');
      fireBall.checkWorldBounds = true;
      fireBall.outOfBoundsKill = true;
      fireBall2 = this.game.add.sprite(face.body.x - 130, face.body.y + 295, 'fire');
      this.game.physics.arcade.enable(fireBall2);
      fireBalls.add(fireBall2);
      fireBall2.rotation = this.game.physics.arcade.angleToXY(fireBall, 1100, 500);
      this.game.physics.arcade.accelerateToXY(fireBall2, 500, 500, 200, 200);
      fireBall2.anchor.setTo(0.2, 0.5);
      fireBall2.body.setSize(70, 32);
      fireBall2.width = 32;
      fireBall2.height = 70;
      fireBall2.scale.x = -1;
      fireBall2.animations.add('flame', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 10, true);
      fireBall2.animations.play('flame');
      fireBall2.checkWorldBounds = true;
      fireBall2.outOfBoundsKill = true;
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

    hurtFace: function(brick, face){
      if(!face.invincible){
        this.freakOut2();
        // faceHealth -= 70;
        // face.animations.stop('blink');
      // }
      // if(!face.invincible && faceHealth < 40){
      //   this.game.state.restart(true, false);
      }
    },

    hurtPlayer: function(player, fireBall){
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
    },

    render: function(){
      // this.game.debug.body(face);
    }
  };
})();
