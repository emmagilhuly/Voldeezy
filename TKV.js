var playerOne = {score: 0}
var playerTwo = {score: 0}
var game = {
    ellapsedTime: 5,
    currentPlayer: playerOne
};
var $timer = $('.timer');
var $picture = $(".picture")
var $displayQuote = $("#displayquote")
var $scoreboard = $('.score')
var $switchPlayer = $("button")

//set donald as an object with 0-9 quotes and picture
var donald = {
quote: [
  "You need somebody because politicians are all talk, no action.",
  "Anyone who thinks my story is anywhere near over is sadly mistaken.",
  "Sometimes by losing a battle you find a new way to win the war",
  "It's always good to be underestimated.",
  "I promise, if I wanted it, I would've gotten it.",
  "Controversy, in short, sells.",
  "As long as you are going to be thinking anyway, think big.",
  "Show me someone without an ego, and I'll show you a loser.",
  "I will have the finest team that anybody has put together and we will solve a lot of problems.",
  "I didn’t want to do this. I just see our country as going to hell. And I felt I had to do it."
],
$picture: $("#donald")
}

//set kanye as an object with 10-19 quotes and picture
var kanye = {
quote: [
    "I hate politics. I’m not a politician at all.",
    "I am so credible and so influential and so relevant that I will change things.",
    "I will be the leader of a company that ends up being worth billions of dollars because I got the answers.",
    "There’s certain things where I’m like, am I supposed to say this in the press? Am I not supposed to say this?",
    "I feel like I'm too busy writing history to read it.",
    "Nothing in life is promised except death.",
    "I still think I am the greatest.",
    "I live and breathe every element in life.",
    "The media crucify me like they did Christ.",
    "When you're the absolute best, you get hated on the most.",
],
$picture: $("#kanye")
}

// set voldemort as an object with 20-29 quotes and picture
var voldemort = {
  quote: [
    "Spoken like a true politician. You will, I think, prove most useful.",
    "I’d introduce you, but rumor has it you’re almost as famous as me these days.",
    "From this day forth, you put your faith in me.",
    "There is no good and evil. There is only power",
    "No, I am extraordinary.",
    "They never learn. Such a pity.",
    "Only I can live forever.",
    "After tonight, no one will ever again question my power.",
    "From this day forth, you put your faith... in me.",
    "Greatness inspires envy."
  ],
  $picture: $("#voldemort")
}

//combine all quotes
var allQuotes = []
allQuotes.push.apply(allQuotes, donald.quote);
allQuotes.push.apply(allQuotes, kanye.quote);
allQuotes.push.apply(allQuotes, voldemort.quote);

var randnums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
// var randnums = [ ];
// for (i= 0; i < 30; i++){
//     randnums.push()
// }

function getRandomQuote(){

  var randomPosition = Math.floor(Math.random() * randnums.length); //get random position based on length of randnums
  quoteIndex = randnums.splice(randomPosition, 1)[0]; //get quoteIndex using random position inside randnums, taking out used number
  //console.log('randnums.length', randnums.length);
  console.log('quoteIndex', quoteIndex);
  if (randnums.length === 0) {
    clearInterval(displayTimer);
    disableEventHandlers();
    alert ("All quotes used!")
    return 'All quotes used';
    allQuestionsAsked()
    game = {ellapsedTime: 0};
  } else {
    return allQuotes[quoteIndex];
  }
}

$displayQuote.text(getRandomQuote());

// enable click on pictures
function setEventHandlers(){
  $(donald.$picture).click (function (){
  if (quoteIndex <= 9) {
    $("#donaldhalo").css("visibility","visible");
    setTimeout(function (){
        $("#donaldhalo").css("visibility","hidden");
    }, 1000);
    game.currentPlayer.score++;
    $scoreboard.text("Score: "+ game.currentPlayer.score);
    $scoreboard.fadeIn(750).fadeOut(750).fadeIn(750)
    $displayQuote.text(getRandomQuote())
  } else if (quoteIndex >= 10) {
      $("#donalddevil").css("visibility","visible");
      setTimeout(function (){
          $("#donalddevil").css("visibility","hidden");
      }, 1000);
    game.currentPlayer.score-=1;
    $scoreboard.text("Score: "+ game.currentPlayer.score);
    $scoreboard.fadeIn(750).fadeOut(750).fadeIn(750)
    $displayQuote.text(getRandomQuote());
  }
  });

  $(kanye.$picture).click(function (){
  if (quoteIndex >= 10 && quoteIndex <= 19 ) {
    $("#kanyehalo").css("visibility","visible");
    setTimeout(function (){
        $("#kanyehalo").css("visibility","hidden");
    }, 1000);
    game.currentPlayer.score++;
    $scoreboard.text("Score: " + game.currentPlayer.score);
    $scoreboard.fadeIn(750).fadeOut(750).fadeIn(750)
    $displayQuote.text(getRandomQuote())
  } else if (quoteIndex >= 20 || quoteIndex <=9) {
    $("#kanyedevil").css("visibility","visible");
    setTimeout(function (){
        $("#kanyedevil").css("visibility","hidden");
    }, 1000);
    game.currentPlayer.score-=1;
    $scoreboard.text("Score: "+ game.currentPlayer.score);
    $scoreboard.fadeIn(750).fadeOut(750).fadeIn(750)
    $displayQuote.text(getRandomQuote());
  }
  })

  $(voldemort.$picture).click(function (){
  if (quoteIndex >= 20 ) {
    $("#voldemorthalo").css("visibility","visible");
    setTimeout(function (){
        $("#voldemorthalo").css("visibility","hidden");
    }, 1000);
    game.currentPlayer.score++;
    $scoreboard.text("Score: "+ game.currentPlayer.score);
    $displayQuote.text(getRandomQuote())
  } else if (quoteIndex < 20) {
    $("#voldemortdevil").css("visibility","visible");
    setTimeout(function (){
        $("#voldemortdevil").css("visibility","hidden");
    }, 1000);
    game.currentPlayer.score-=1;
    $scoreboard.text("Score: "+ game.currentPlayer.score);
    $displayQuote.text(getRandomQuote());
  }
  })
}

//disable click on pictures
function disableEventHandlers(){
  $(donald.$picture).unbind('click');
  $(kanye.$picture).unbind('click');
  $(voldemort.$picture).unbind('click');
}

//click restart to reset
$switchPlayer.click(function(){
  reset();
})

//declare variable to call later
var displayTimer;

//reset time and score and start timer
function reset(){
  game = {ellapsedTime: 5, currentPlayer: playerTwo};
  $timer.text("Time: 60");
  $scoreboard.text("Score: 0");
  clearInterval(displayTimer);
  startTimer();
}

function getWinner(){
    $("button").hide()
    $timer.text("Player One Score: " + playerOne.score + ",  Player Two Score: " + playerTwo.score)
    if (playerOne.score > playerTwo.score){
         $scoreboard.text("Player One has won!");
    } else if (playerTwo.score > playerOne.score){
         $scoreboard.text("Player Two has won!");
    } else if (playerOne.score === playerTwo.score){
        $scoreboard.text("Tie game!");
    }
}

// function allQuestionsAsked(){
//     if (game.currentPlayer === playerOne) {
//         $timer.text("Press Switch Player for Player Two");
//     } else if (game.currentPlayer === playerTwo){
//         $timer.text("Game over");
//         getWinner();
//     }
// }

//disableEvent Handlers, alert time is up and press refresh to start again
function gameOver(){
  clearInterval(displayTimer);
  disableEventHandlers();
  alert ("Time is up!");
  $timer.text("Time is up");
  if (game.currentPlayer === playerOne) {
      $scoreboard.text("Press Switch Player for Player Two");
  } else if (game.currentPlayer === playerTwo){
      $scoreboard.text("Game over");
      getWinner();
  }
}

//Display time and when time is finished game over
function check_time(){
  if (game.ellapsedTime > 0){
    game.ellapsedTime--;
    $timer.text("Time: " + game.ellapsedTime);
  }  else if (game.ellapsedTime === 0){
      gameOver();
    }
}

//set EventHandlers and setInterval for Check Time
function startTimer(){
  setEventHandlers();
  displayTimer = setInterval(function() {
    check_time();
  }, 1000);
}

//first function to be called
startTimer();
