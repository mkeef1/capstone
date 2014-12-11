(function(){
  'use strict';

  angular.module('game')
    .controller('GameCtrl', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state){
      $scope.title = 'Game Page';
    }]);
})();
