window.require.define({"index": function(exports, require, module) {
(function(){
  'use strict';

  angular.module('game', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise('/menu');

      $stateProvider
        //.state('home',         {url:'/',         templateUrl:'/home/home.html'})
        .state('menu',         {url:'/menu',     templateUrl:'/menu/menu.html', controller:'MenuCtrl'})
        .state('game',         {url:'/game',     templateUrl:'/game/game.html', controller:'GameCtrl'});
      });
    // .run(['$rootScope', '$http', function($rootScope, $http){
    //   $http.get('/status').then(function(response){
    //     $rootScope.rootuser = response.data;
    //   }, function(){
    //     $rootScope.rootuser = null;
    //   });
    // }]);
})();
}});

