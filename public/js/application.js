// =========OBJECTS=======================

function Player(name,track) {
  this.name = name;
  this.track = track;
};

Player.prototype.$el = function() {
    if (this.track == 1) { return $('#player1 .active');}
    else if (this.track == 2) { return $('#player2 .active');}
};

Player.prototype.move = function(){
  var old = this.$el();
  var current = old.next();
  old.removeClass('active');
  current.addClass('active');
};

function Game(player1,player2) {
  this.t0 = new Date().getTime();
  this.player1 = new Player(player1,'1');
  this.player2 = new Player(player2,'2');
}

Game.prototype.onKeyUp = function(key) {
  if (key == 80) {
      this.player1.move();
  } else if (key == 81) {
      this.player2.move();
  }
};

Game.prototype.finished = function(){
 var cells1 = $('#player1 > div')
 var cells2 = $('#player2 > div')
  if ( cells1.last().hasClass( "active" ) ) {
    // $(document).unbind("keyup");
    var t1 = new Date().getTime();
    this.time = Math.floor((t1-this.t0)/1000);
    this.winner = this.player1.name;
    return true;
  } else if ( cells2.last().hasClass( "active" ) ) {
    // $(document).unbind("keyup");
    var t1 = new Date().getTime();
    this.time = Math.floor((t1-this.t0)/1000);
    this.winner = this.player2.name;
    return true;
  };
};

// ================LOGIC=====================

$(document).ready(function(){

  var player1 = $('#player1').attr('data-player-name');
  var player2 = $('#player2').attr('data-second-player-name');

  game = new Game(player1, player2);
  // game = new Game("Lorena", "Juan");

  $(window).keyup(function(e) {
     game.onKeyUp(event.which);
     game.finished();
     if(game.finished() === true){
      $(document).unbind("keyup");
      // window.alert(game.winner);

      $.post('/log_winner', {p1: game.player1.name, p2: game.player2.name, winner: game.winner, time: game.time})
      .done(function( gameId ) {
       window.location.href="/results?game_id=" + gameId;
    });

    }

  // $(document).on('keyup', function(event) {
  });



});




