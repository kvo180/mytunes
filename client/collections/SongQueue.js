// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Backbone.Collection.extend({

  model: SongModel,

  initialize: function() {  
    this.on('add', function() {
      if (this.length === 1) {
        this.playFirst();
      }
    }, this);

    this.on('ended', function(song) {
      // if song ends, remove song
      this.shift();
      // check to see if any other songs in queue
        // if yes, play that song
      if (this.length > 0) {
        this.playFirst();
      }
    }, this);

    this.on('dequeue', function(song) {
      // if song is clicked in queue, song must be removed from list
      this.remove(song);
      if (this.length >= 1) {
        this.playFirst();
      }
    }, this);
  },

  playFirst: function() {
    this.at(0).play();
  }
});