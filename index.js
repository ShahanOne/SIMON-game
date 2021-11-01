var userClickPattern = [];
var level = 0;
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;


$(document).keydown(function() {  // ! means false
  if (!started) {
    nextSequence();
    $("h1").text("level " + level);

    started = true;    // as per my understanding ,  started is now true,so the function wont run again

  }
})

$(document).click(function() {  // ! means false
  if (!started) {
    nextSequence();
    $("h1").text("level " + level);

    started = true;    // as per my understanding ,  started is now true,so the function wont run again

  }
})

$(".btn").click(function() {


  var userChosenColor = this.id;

  userClickPattern.push(userChosenColor);
  $("#" + userChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  makeSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickPattern.length - 1);
})


function animatePress(currentColor) {
  $('.' + currentColor).addClass("pressed");

  setTimeout(function() {
    $('.' + currentColor).removeClass("pressed");
  }, 100);

}


function makeSound(randomcolor) {

  var audio = new Audio( randomcolor + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel) {
  if (userClickPattern[currentLevel] === gamePattern[currentLevel]) { //check if the most recent user answer is the same as the game pattern.


    if (userClickPattern.length === gamePattern.length) { //then check that they have finished their sequence
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    } , 1000);
  $("h1").text("Game Over , Press Any key to Restart");
  var gameOver = new Audio("wrong.mp3");
  gameOver.play();

  startOver();
  }
}



function nextSequence() {

userClickPattern = [];   //IF confusion : gamepattern to to rakhna hi hai na subsequent levels ke liye bhi , lekin userclicked pattern baar baar reset hoga kyuki shuru se karna hota hai na click, simon game me yaad karna padta hai ki kya tha pattern

level++;

  $("h1").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  makeSound(randomChosenColor);
}



function startOver() {
  level = 0;
  gamePattern= [];
  started = false;
}
