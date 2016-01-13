var currentPlayer = {score: 0}
var game = {ellapsedTime: 60};
var $timer = $(".timer");
var $picture = $(".picture")
var $displayQuote = $("#displayquote")
var $scoreboard = $(".score")
var $restart = $("button")
var $seconds = $(".seconds")


//set donald as an object with 0-9 quotes and picture
var donald = {
quote: [
  "You need somebody because politicians are all talk, no action.",
  "Anyone who thinks my story is anywhere near over is sadly mistaken.",
  "Sometimes by losing a battle you find a new way to win the war.",
  "It's always good to be underestimated.",
  "I promise, if I wanted it, I would've gotten it.",
  "Controversy, in short, sells.",
  "As long as you are going to be thinking anyway, think big.",
  "Show me someone without an ego, and I'll show you a loser.",
  "I will have the finest team that anybody has put together and we will solve a lot of problems.",
  "I didn’t want to do this. I just... felt I had to do it."
],
$picture: $("#donald")
}

//set kanye as an object with 10-19 quotes and picture
var kanye = {
quote: [
    "I hate politics. I’m not a politician at all.",
    "I am so credible and so influential and so relevant that I will change things.",
    "I will be the leader of a company that ends up being worth billions of dollars because I got the answers.",
    "Am I supposed to say this in the press? Am I not supposed to say this?",
    "I feel like I'm too busy writing history to read it.",
    "Nothing in life is promised except death.",
    "I live and breathe every element in life.",
    "The media crucify me like they did Christ.",
    "I still think I am the greatest.",
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
    "There is no good and evil. There is only power.",
    "No, I am extraordinary.",
    "They never learn. Such a pity.",
    "Only I can live forever.",
    "After tonight, no one will ever again question my power.",
    "I have seen your heart and it is mine.",
    "Greatness inspires envy."
  ],
  $picture: $("#voldemort")
}

//combine all quotes
var allQuotes = []
allQuotes.push.apply(allQuotes, donald.quote);
allQuotes.push.apply(allQuotes, kanye.quote);
allQuotes.push.apply(allQuotes, voldemort.quote);

var randnums = [ ];
for (i= 0; i < 30; i++){
    randnums.push(i)
}

function getRandomQuote(){
  var randomPosition = Math.floor(Math.random() * randnums.length); //get random position based on length of randnums
  quoteIndex = randnums.splice(randomPosition, 1)[0]; //get quoteIndex using random position inside randnums, taking out used number
  //console.log('randnums.length', randnums.length);
  console.log('quoteIndex', quoteIndex);
  if (randnums.length === 0) {
      clearInterval(displayTimer);
      disableEventHandlers();
      getWinner()
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
    currentPlayer.score++;
    $scoreboard.text(+ currentPlayer.score);
    $scoreboard.fadeIn(750).fadeOut(750).fadeIn(750)
    $displayQuote.text(getRandomQuote())
  } else if (quoteIndex >= 10) {
      $("#donalddevil").css("visibility","visible");
      setTimeout(function (){
          $("#donalddevil").css("visibility","hidden");
      }, 1000);
    currentPlayer.score-=1;
    $scoreboard.text(+ currentPlayer.score);
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
    currentPlayer.score++;
    $scoreboard.text(+ currentPlayer.score);
    $scoreboard.fadeIn(750).fadeOut(750).fadeIn(750)
    $displayQuote.text(getRandomQuote())
  } else if (quoteIndex >= 20 || quoteIndex <=9) {
    $("#kanyedevil").css("visibility","visible");
    setTimeout(function (){
        $("#kanyedevil").css("visibility","hidden");
    }, 1000);
    currentPlayer.score-=1;
    $scoreboard.text(+ currentPlayer.score);
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
    currentPlayer.score++;
    $scoreboard.text(+ currentPlayer.score);
    $displayQuote.text(getRandomQuote())
  } else if (quoteIndex < 20) {
    $("#voldemortdevil").css("visibility","visible");
    setTimeout(function (){
        $("#voldemortdevil").css("visibility","hidden");
    }, 1000);
    currentPlayer.score-=1;
    $scoreboard.text(+ currentPlayer.score);
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
$restart.click(function(){
  reset();
})

//declare variable to call later
var displayTimer;

//reset time and score and start timer
function reset(){
  randnums = [ ];
  for (i= 0; i < 30; i++){
      randnums.push(i)
  };
  $displayQuote.text(getRandomQuote());
  game = {ellapsedTime: 60};
  currentPlayer = {score: 0}
  clearInterval(displayTimer);
  $h2.text("60");
  $scoreboard.text("0");
  $("#mustache").css("visibility","hidden");
  $("#minniemouse").css("visibility","hidden");
  $("#sunglasses").css("visibility","hidden");
  startTimer();
}

function getWinner(){
    $timer.text("Score: " + currentPlayer.score);
    $seconds.css("visibility", "hidden");
    $("#mustache").css("visibility","visible");
    $("#minniemouse").css("visibility","visible");
    $("#sunglasses").css("visibility","visible");
    $scoreboard.text("Game over").fadeIn(750).fadeOut(750).fadeIn(750).fadeOut(750).fadeIn(750).fadeOut(750).fadeIn(750);
    if (randnums.length === 0) {
      $displayQuote.text("All Quotes Used")
    } else {
    $displayQuote.text("Jesus Walks")
  }
}

//disableEvent Handlers, alert time is up and press refresh to start again
function gameOver(){
  clearInterval(displayTimer);
  disableEventHandlers();
  $timer.text("Time is up");
  $seconds.text("visibility", "hidden");
  $scoreboard.text("Game over").fadeIn(750).fadeOut(750).fadeIn(750).fadeOut(750).fadeIn(750).fadeOut(750).fadeIn(750);
  getWinner();
}

//Display time and when time is finished game over
function check_time(){
  if (game.ellapsedTime > 0){
    game.ellapsedTime--;
    $timer.text(+ game.ellapsedTime);
  }  else if (game.ellapsedTime === 0){
      gameOver();
    }
}

//set EventHandlers and setInterval for Check Time
function startTimer(){
  disableEventHandlers();//remove any existing handlers
  setEventHandlers();
  displayTimer = setInterval(function() {
    check_time();
  }, 1000);
}

//first function to be called
startTimer();
