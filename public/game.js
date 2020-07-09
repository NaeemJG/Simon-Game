let buttonColours = ["red", "blue", "green", "yellow"];
let buttons = [97, 100, 119, 115];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let playing = false;
$('.container').hide();

$("h1").addClass("animate");
$(document).on('keypress', function(event){
    if (!playing) {
        $('.container').fadeIn(10);
        $("h1").html(`level ${level}`);
        nextSequence()
        keyBoardPlay();
        playing = true;

    }
})





$( "button, div[type='button']" ).on('click', function(event){
    let userChosenColour = event.target.id;
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.indexOf(userChosenColour));
    
})
function keyBoardPlay() {
    playing = true;
    if (playing) {
        for(let i = 0; i < buttons.length; i++) {
            $(document).on('keypress', function(event) {
                if(event.keyCode === buttons[i]) {
                    let userChosenColour = buttonColours[i];
                    playSound(userChosenColour);
                    userClickedPattern.push(userChosenColour);
                    checkAnswer(userClickedPattern.indexOf(userChosenColour));
                }
            })
        }
    }
} 


function nextSequence() {
    $("h1").removeClass("animate");
    userClickedPattern = [];

    $("h1").html(`level ${level}`);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $(":button").on("click", function() {
        console.log($(":button"));
    })
    
    level++;
}

function playSound(elem) {
    animatePress(elem);
    let audio = new Audio(`sounds/${elem}.mp3`);
    audio.play();
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    
    setTimeout(function(){
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        $('.container').fadeOut(100);
        playSound('wrong');
        $("body").addClass("game-over");
        $("h1").addClass("animate").delay(100);
    
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").html('Game Over, Press Any Key to Restart'); 
        startOver();
        
    }
}

function startOver() {
    gamePattern = [];
    playing = false;
    level = 0;
    $(document).on('keypress', function(event){
        location.reload();
    })
}
