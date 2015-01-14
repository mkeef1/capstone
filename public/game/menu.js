'use strict';

var Game = {},
    newGameBtn;

Game.menu = function(){
};

var style = {font: '30px Arial', fill: '#FFFFFF'};

Game.menu.prototype = {
  preload: function(){
    this.game.load.image('menu', '/assets/menu2.jpg');
    this.game.load.image('quasHand', '/assets/quasinhand.jpg');
  },
  create: function(){
    this.game.add.sprite(0, 0, 'quasHand');
    newGameBtn = this.game.add.text(this.game.world.centerX - 70, this.game.world.centerY, 'New game', style);
    newGameBtn.inputEnabled = true;
  // Add input handlers
    newGameBtn.events.onInputDown.add(startNewgame, this);
  }
};

function startNewgame(){
  this.game.state.start('game');
}
