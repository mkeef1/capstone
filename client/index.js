(function(){
  'use strict';

  angular.module('game', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise('/home');

      $stateProvider
        .state('home',         {url:'/home',     templateUrl:'/views/game/home.html',          controller:'HomeCtrl'})
        .state('game',         {url:'/game',     templateUrl:'/views/game/game.html',          controller:'GameCtrl'})
        .state('register',     {url:'/register', templateUrl:'/views/users/users.html',        controller:'UsersCtrl'})
        .state('login',        {url:'/login',    templateUrl:'/views/users/users.html',        controller:'UsersCtrl'});
    });
    // .run(['$rootScope', '$http', function($rootScope, $http){
    //   $http.get('/status').then(function(response){
    //     $rootScope.rootuser = response.data;
    //   }, function(){
    //     $rootScope.rootuser = null;
    //   });
    // }]);
})();
