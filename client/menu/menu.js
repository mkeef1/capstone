(function(){
  'use strict';

  angular.module('game')
    .controller('MenuCtrl', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state){
      $scope.title = 'Menu Page';
    }]);
})();
