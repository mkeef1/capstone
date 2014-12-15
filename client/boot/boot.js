(function(){
  'use strict';

  angular.module('game')
    .controller('BootCtrl', ['$scope', function($scope){

      var Game = {};

      Game.boot = function(game){
      };

      Game.boot.prototype = {
        init: function(){
          this.input.maxPointers = 1;
          this.stage.disableVisibilityChange = true;
        },

        preload: function(){
          this.load.image('menu', '/assets/menu2.jpg');
          this.load.spritesheet('quasrun', '/assets/quasrun.png', 128, 128);
          this.load.tilemap('map', '/assets/capstone.json', null, Phaser.Tilemap.TILED_JSON);
          this.load.image('set1', '/assets/hyptosis_tile-art-batch-1.png');
          this.load.image('set2', '/assets/hyptosis_tile-art-batch-3.png');
        },

        create: function(){
          this.state.start('menu');
        }
      };
    }]);
})();
