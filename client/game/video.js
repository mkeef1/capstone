/* global Game */
(function(){
  'use strict';

  Game.video = function(){
  };

  Game.video.prototype = {
    preload: function(){
    },
    create: function(){
    },
    play: function(video){
      video.pause();
    }
  };
})();
