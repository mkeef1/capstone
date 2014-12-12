'use strict';

var menuState = {
  menuState: menuState,
  create: function(){
    // Call the 'start' function when pressing the spacebar
    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.start, this);
    // Defining variables
    var style = {font: '30px Arial', fill: '#e78f27'},
      x = this.game.world.width/2, y = this.game.world.height/2,
// Adding a text centered on the screen
      text = this.game.add.text(x, y-120, 'Press space to start', style);
      text.anchor.setTo(0.5, 0.5);
      // If the user already played
  },
  // Start the actual game
  start: function(){
      this.game.state.start('load');
  }
};
