var game = {score: 0, ellapsedTime: 60};
var $timer = $('.timer');
var $picture = $(".picture")
var $displayQuote = $("#displayquote")
var $scoreboard = $('.score')
var $restart = $("button")

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

function getRandomQuote(){
  quoteIndex = Math.floor(Math.random() * randnums.length);
  var randomNumber = randnums.splice(quoteIndex, 1);
  console.log('randomNumber', randomNumber);
  if (randnums.length === 0) {
    allQuestionsAnswered();
    }
  return allQuotes[randomNumber];
}


$displayQuote.text(getRandomQuote());


// enable click on pictures
function setEventHandlers(){
  $(donald.$picture).click (function (){
  if (quoteIndex <= 9) {
    alert ("You picked Trump, you are correct!")
    // $(this).toggleClass('clickedcorrect');
    game.score++;
    $scoreboard.text("Score: "+ game.score);
    //console.log(getRandomQuote());
    $displayQuote.text(getRandomQuote())
  } else if (quoteIndex >= 10) {
    alert ("You choose the wrong answer")
    $(this).toggleClass('clickedwrong');
    game.score-=1;
    $displayQuote.text(getRandomQuote());
    $scoreboard.text("Score: "+ game.score);
  }
  });

  $(kanye.$picture).click(function (){
  if (quoteIndex >= 10 && quoteIndex <= 19 ) {
    alert ("You picked Kanye, you are correct!")
    game.score++;
    $scoreboard.text("Score: " + game.score);
    //console.log(getRandomQuote());
    $displayQuote.text(getRandomQuote())
  } else if (quoteIndex >= 20 || quoteIndex <=9) {
    alert ("You choose the wrong answer")
    game.score-=1;
    $displayQuote.text(getRandomQuote());
    $scoreboard.text("Score: "+ game.score);
  }
  })

  $(voldemort.$picture).click(function (){
  if (quoteIndex >= 20 ) {
    alert ("You picked Voldemort, you are correct!")
    game.score++;
    $scoreboard.text("Score: "+ game.score);
    //console.log(getRandomQuote());
    $displayQuote.text(getRandomQuote())
  } else if (quoteIndex < 20) {
    alert ("You choose the wrong answer")
    game.score-=1;
    $displayQuote.text(getRandomQuote());
    $scoreboard.text("Score: "+ game.score);
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
  game = {score: 0, ellapsedTime: 60};
  $timer.text("Time: 60");
  $scoreboard.text("Score: 0");
  clearInterval(displayTimer);
  startTimer();
}

//disableEvent Handlers, alert time is up and press refresh to start again
function gameOver(){
  clearInterval(displayTimer);
  disableEventHandlers();
  alert ("Time is up!");
  $timer.text("Time is up");
  $scoreboard.text("Press restart to play again");
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
