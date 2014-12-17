/* global menuState, gameState */
(function(){
  'use strict';

  angular.module('game', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise('/register');

      $stateProvider
        .state('game',         {url:'/menu',     templateUrl:'/game/game.html', controller:'GameCtrl'})
        .state('register',     {url:'/register', templateUrl:'/views/users/users.html',        controller:'UsersCtrl'})
        .state('login',        {url:'/login',    templateUrl:'/views/users/users.html',        controller:'UsersCtrl'});
    })
    .run(['$rootScope', '$http', function($rootScope, $http){
      $http.get('/status').then(function(response){
        $rootScope.rootuser = response.data;
      }, function(){
        $rootScope.rootuser = null;
      });
    }]);

  // $(document).ready(init);

  // function init(){
  //   initPhaser();
  // }

  // var game;

  // function initPhaser(){
  //   game = new Phaser.Game(900, 600, Phaser.CANVAS, 'game');

  //   game.state.add('menu', menuState);
  //   game.state.add('game', gameState);


  //   game.state.start('menu');
  // }
})();
