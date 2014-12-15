(function(){
  'use strict';

  angular.module('game', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise('/menu');

      $stateProvider
        .state('load',         {url:'',          abstract:true,                 controller:'BootCtrl'})
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
