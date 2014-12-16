(function(){
  'use strict';

  // angular.module('game')
  //   .controller('GameCtrl', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state){
  //     $scope.title = 'Game Page';

  Game.play = function(){
  };

  Game.play.prototype = {
    preload: function(){
      game.load.spritesheet('quasrun', '/assets/quasrun.png', 128, 128);
      game.load.tilemap('map', '/assets/capstone.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.image('set1', '/assets/hyptosis_tile-art-batch-1.png');
      game.load.image('set2', '/assets/hyptosis_tile-art-batch-3.png');
    },
    create: function(){
      game.physics.startSystem(Phaser.Physics.ARCADE);
      map = game.add.tilemap('map');
      map.addTilesetImage('hyptosis_tile-art-batch-3', 'set2');
      map.addTilesetImage('hyptosis_tile-art-batch-1', 'set1');

      background = map.createLayer('Background');
      objects = map.createLayer('objects');
      background.resizeWorld();
      player = game.add.sprite(100, 600, 'quasrun');
      game.physics.arcade.enable(player);
      player.anchor.setTo(0.5, 0.5);
      player.body.setSize(64, 64);
      player.scale.setTo(1, 1);
      cursors = game.input.keyboard.createCursorKeys();
      game.camera.follow(player);
      player.body.collideWorldBounds = true;
      map.setCollision(1694, true, 'objects');
      player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10, true);
    },
    update: function(){
      game.physics.arcade.collide(player, objects);
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
      game.debug.body(player);
    }
  };

})();
