(function(){
  'use strict';

  angular.module('game')
    .controller('MenuCtrl', ['$scope', function($scope){
      $scope.title = 'Adventures of Lord Quas';
      var Game = {},
          newGameBtn;

      Game.MainMenu = {
        create: function(){
          this.add.sprite(0, 0, 'menu');
          newGameBtn = this.add.text(this.world.centerX, this.world.centerY, 'New game');
          newGameBtn.inputEnabled = true;
        // Add input handlers
          newGameBtn.events.onInputDown.add(startGame, this);
        }
      };

      function startGame(){
        this.state.start('game');
      }
    }]);
})();
