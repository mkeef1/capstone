/* global Game */

(function(){
  'use strict';

  angular.module('game')
    .controller('GameCtrl', ['$rootScope', '$scope', '$state', 'User', function($rootScope, $scope, $state, User){
      window.game = new Phaser.Game(900, 600, Phaser.CANVAS, 'game');
      window.game.state.add('menu', Game.menu);
      window.game.state.add('game', Game.play);
      window.game.state.add('boss', Game.boss);
      // window.game.state.add('video', Game.video);
      window.game.state.start('menu');
      // var quasVid = document.getElementById('video');

      $scope.logout = function(){
        User.logout().then(function(){
          $rootScope.rootuser = null;
          $state.go('login');
        });
      };
    }]);
})();
