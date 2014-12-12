'use strict';


var game = new Phaser.Game(900, 600, Phaser.CANVAS, 'capstone');

game.state.add('menu', game.menuState);

game.state.start('menu');
