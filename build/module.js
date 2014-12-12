(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(){
  'use strict';

  angular.module('game')
    .controller('GameCtrl', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state){
      $scope.title = 'Game Page';
    }]);
})();

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
'use strict';

var game = new Phaser.Game(900, 600, Phaser.CANVAS, 'capstone', {preload: preload, create: create, update:update});

function preload(){
  game.load.spritesheet('quasrun', '/assets/quasrun.png', 128, 128);
  game.load.tilemap('map', '/assets/capstone.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('set1', '/assets/hyptosis_tile-art-batch-1.png');
  game.load.image('set2', '/assets/hyptosis_tile-art-batch-3.png');
}

var player, cursors, map, background, objects;

function create(){
  game.physics.startSystem(Phaser.Physics.ARCADE);
  map = game.add.tilemap('map');
  //layer = map.createLayer('Background');
  //layer = map.createLayer('Objects');
  map.addTilesetImage('hyptosis_tile-art-batch-3', 'set2');
  map.addTilesetImage('hyptosis_tile-art-batch-1', 'set1');

  //objects.resizeWorld();
  background = map.createLayer('Background');
  objects = map.createLayer('objects');
  background.resizeWorld();
  player = game.add.sprite(100, 600, 'quasrun');
  game.physics.arcade.enable(player);
  cursors = game.input.keyboard.createCursorKeys();
  game.camera.follow(player);
  player.body.collideWorldBounds = true;
  map.setCollision(1724, true, 'objects');
  player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10, true);
}

function update(){
  game.physics.arcade.collide(player, objects);
  player.body.velocity.x = 0;
  player.animations.play('left');
  if(cursors.left.isDown){
    player.body.velocity.x = -150;
    player.animations.play('left');
  }
  else if(cursors.right.isDown){
    player.body.velocity.x = 150;
    player.animations.play('left');
  }else{
    player.animations.stop();
    player.frame = 11;
  }
  if(cursors.up.isDown && player.body.onFloor()){
    player.body.velocity.y = -350;
  }
  player.body.gravity.y = 1000;
}

game.state.add('menu');
game.state.add('load');

},{}],4:[function(require,module,exports){
(function(){
  'use strict';

  angular.module('game')
    .controller('MenuCtrl', ['$scope', function($scope){
      $scope.title = 'Adventures of Lord Quas';
    }]);
})();

},{}]},{},[1,2,3,4]);
