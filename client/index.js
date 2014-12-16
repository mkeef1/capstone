(function(){
  'use strict';

  angular.module('game', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise('/menu');

      $stateProvider
        .state('game',         {url:'/menu',     templateUrl:'/game/game.html', controller:'GameCtrl'});
    });
    // .run(['$rootScope', '$http', function($rootScope, $http){
    //   $http.get('/status').then(function(response){
    //     $rootScope.rootuser = response.data;
    //   }, function(){
    //     $rootScope.rootuser = null;
    //   });
    // }]);

  $(document).ready(init);

  function init(){
    initPhaser();
  }

  var game;

  function initPhaser(){
    game = new Phaser.Game(900, 600, Phaser.CANVAS, 'game');

    game.state.add('menu', menuState);
    game.state.add('game', gameState);


    game.state.start('menu');
  }
})();
