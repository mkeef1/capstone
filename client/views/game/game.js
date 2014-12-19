/* global Game */

(function(){
  'use strict';

  angular.module('game')
    .controller('GameCtrl', ['$rootScope', '$scope', '$state', 'User', function($rootScope, $scope, $state, User){
      window.game = new Phaser.Game(900, 600, Phaser.CANVAS, 'game');
      window.game.state.add('menu', Game.menu);
      window.game.state.add('game', Game.play);
      window.game.state.start('game');

      $scope.logout = function(){
        User.logout().then(function(){
          $rootScope.rootuser = null;
          $state.go('login');
        });
      };
    }]);
})();
