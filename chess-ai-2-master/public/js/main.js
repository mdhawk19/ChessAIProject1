// Computer makes a move with algorithm choice and skill/depth level
var makeMove = function(eval, algo, skill=3) {
  // exit if the game is over
  if (game.game_over() === true) {
    console.log('game over');
    return;
  }
  // Calculate the best move, using chosen algorithm
  if (algo === 1) {
    var move = randomMove();
  } else if (algo === 2) {
    var move = calcBestMoveOne(game.turn());
  } else if (algo === 3) {
    var move = calcBestMoveNoAB(skill, game, game.turn())[1];
  } else {
    var move = calcBestMove(eval, skill, game, game.turn())[1];
  }
  // Make the calculated move
  game.move(move);
  // Update board positions
  board.position(game.fen());
}

// Computer vs Computer
var playGame = function(evalW=1, evalB=1 ,algo=4, skillW=2, skillB=2) {
  if (game.game_over() === true) {
    console.log('game over');
    return;
  }
  var skill = game.turn() === 'w' ? skillW : skillB;
  var eval = game.turn() === 'w' ? evalW : evalB;
  makeMove(eval, algo, skill);
  window.setTimeout(function() {
    playGame(evalW, evalB, algo, skillW, skillB);
  }, 250);
  //window.clearTimeout();
};
var trialNumber = 0
var arr = new Array(9);
for(var i = 0; i<9; i++){
  arr[i] = [0,0,0];
}
function test(){
  var evalW = 0; //white
    var skillW = 0;
    var evalB = 0; //black
    var skillB = 0;
    while ((evalW === evalB) && (skillW === skillB))
    {     
        evalW  = Math.floor((Math.random() * 3) + 1);
        skillW  = Math.floor((Math.random() * 3) + 1);
        evalB  = Math.floor((Math.random() * 3) + 1);
        skillB  = Math.floor((Math.random() * 3) + 1);
    }
  playGame(evalW, evalB, 4, skillB, skillW);
  var myVar = window.setInterval(function() {
    if(game.game_over()){
      var p1 = (evalW*10)+skillW;
      var p2 = (evalB*10)+skillB;

     switch(p1){
      case 11:
            p1 = 0
            break;

      case 12:
            p1 = 1;
            break;

      case 13:
            p1 = 2;
            break;

      case 21:
            p1 = 3;
            break;

      case 22:
            p1 = 4
            break;

      case 23:
            p1 = 5;
            break;

      case 31:
            p1 = 6;
            break;

      case 32:
            p1 = 7;
            break;

      case 33:
            p1 = 8;
            break;

      default:
            break;

      }

      switch (p2) {

        case 11:
            p2 = 0
            break;

        case 12:
            p2 = 1;
            break;

        case 13:
            p2 = 2;
            break;

        case 21:
            p2 = 3;
            break;

        case 22:
            p2 = 4
            break;

        case 23:
            p2 = 5;
            break;

        case 31:
            p2 = 6;
            break;

        case 32:
            p2 = 7;
            break;

        case 33:
            p2 = 8;
            break;

        default:
            break;
      }
      arr[p1][0] += 1;
      arr[p2][0] += 1;
    
      if (game.in_draw())
      {
        arr[p1][2] += 1;
        arr[p2][2] += 1;
      }

      else if (game.in_checkmate() === 'w')
      {
        arr[p2][1] += 1;
      }

      else
      {
        arr[p1][1] += 1;
      }
      game.reset();
      board.clear();
      board.start()
      clearInterval(myVar);
      if(trialNumber<2){
        trialNumber ++;
        console.log("Now starting trial Number:" + trialNumber);
        test(); 
      }
      else{
        console.log("Results:")
        for (var player = 0; player < 9; player++)
        {
          for (var value = 0; value < 3; value++)
          {

            console.log(player + ": " + arr[player][value]);

          }
        }
      }
    }
    
  }, 11250);
}
// Handles what to do after human makes move.
// Computer automatically makes next move
var onDrop = function(source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // If illegal move, snapback
  if (move === null) return 'snapback';

  // Log the move
  console.log(move)

  // make move for black
  window.setTimeout(function() {
    makeMove(4, 3);
  }, 250);
};
