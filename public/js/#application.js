 $(document).ready(function() {

  var p1Name = $('#player1').attr('data-player-name');
  var p2Name = $('#player2').attr('data-second-player-name');

  var items = $('.spot');
  var items2 = $('.spot2');

  var restart = function() {

    items.first().addClass('active');
    items2.first().addClass('active');
  }; // end function



  restart();

  var t0 = new Date().getTime()


  $(window).keyup(function(e) {
      var old = items.filter('.active');
      var current;

      var old2 = items2.filter('.active');
      var current2;

      if (e.keyCode === 81) {
          current = old.next();
          old.removeClass('active');
          current.addClass('active');

        if ( items.last().hasClass( "active" ) ) {
          var t1 = new Date().getTime();
          var time = Math.floor((t1-t0)/1000);

          window.alert(p1Name + " is triumphant");
          $.post('/log_winner', {p1: p1Name, p2: p2Name, winner: p1Name, time: time})
            .done(function( gameId ) {

              window.location.href="/results?game_id=" + gameId;
          });
        }; // end inner if
      };// end outer if




      if (e.keyCode === 80) {
          current2 = old2.next();
          old2.removeClass('active');
          current2.addClass('active');

        if ( items2.last().hasClass( "active" ) ) {
          var t1 = new Date().getTime();
          var time = Math.floor((t1-t0)/1000);
          // console.log(time);
          window.alert(p2Name + " is triumphant");
          $.post('/log_winner', {p1: p1Name, p2: p2Name, winner: p2Name, time: time})
            .done(function( gameId ) {
              window.location.href="/results?game_id=" + gameId;
          });
        }; // end inner
      }; // end outer
  }); //end listener

  // }; //end function
// restart();
// play();
}); //end document
