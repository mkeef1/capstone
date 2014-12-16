/* global Game */

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    initPhaser();
  }

  var game;

  function initPhaser(){
    game = new Phaser.Game(900, 600, Phaser.CANVAS, 'game');

    game.state.add('menu', Game.boot);
    game.state.add('game', Game.mainMenu);

    game.state.start('menu');
  }
})();
