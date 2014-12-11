(function(){
  'use strict';

  angular.module('game', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home',         {url:'/',         templateUrl:'/home/home.html'})
        .state('menu',         {url:'/menu',     templateUrl:'/menu/menu.html', controller:'MenuCtrl'})
        .state('game',         {url:'/game',     templateUrl:'/game/template.html', abstract:true})
        .state('game.play',    {url:'/play',     templateUrl:'/game/game.html', controller:'GameCtrl'});
      }]);
    // .run(['$rootScope', '$http', function($rootScope, $http){
    //   $http.get('/status').then(function(response){
    //     $rootScope.rootuser = response.data;
    //   }, function(){
    //     $rootScope.rootuser = null;
    //   });
    // }]);
})();
