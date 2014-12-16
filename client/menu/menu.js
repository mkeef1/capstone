(function(){

'use strict';

var Game = {},
    newGameBtn;

Game.menu = function(){
};

Game.menu.prototype = function(){
  preload: function(){
    this.game.load.image('menu', '/assets/menu2.jpg');
  },
  create: function(){
    this.game.add.sprite(0, 0, 'menu');
    newGameBtn = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'New game');
    newGameBtn.inputEnabled = true;
  // Add input handlers
    newGameBtn.events.onInputDown.add(startNewgame, this);
  }
};

  function startNewgame(){
    this.game.state.start('game');
  }

})();
