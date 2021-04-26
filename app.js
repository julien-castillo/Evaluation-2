/*****************/
/* THE GAME CODE */
/*****************/

// Declaring the fundamental game variables
let scores, roundScore, activePlayer, gamePlaying, progressBar1, progressBar2, scoreValue0, scoreValue1, player1, player2,
    audioDice, audioLose, audioLock, audioWin, audioRules, audioNew, victoryPlayer1, victoryPlayer2, defeatPlayer1, defeatPlayer2;

// Initializing the game
init();

// Adding an event listener to the button that makes the dice roll
document.querySelector('.btn-roll').addEventListener('click', function(){

    // Checking if the game is being played
    if(gamePlaying) {

        // 1. Create a random number for the dice
        let dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'assets/img/' + 'dice-' + dice + '.png';

        // 3. Update the round score if dice !1
        if(dice !== 1) {
            // Add score if the dice number is different from 1
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            playAudioDice();
        } else {
            // Next player's turn
            playAudioLose();
            nextPlayer();
        }
    }
});

// Functionality that allows to accumulate points ('hold')
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {

        // 1. Adding the current score to the global score
        scores[activePlayer] += roundScore;

        // 2. Updating the UI (user interface)
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // 3. Change ProgressBar
        changeProgressBar1();
        changeProgressBar2();

        // 4. Play audio for hold button
        playAudioLock();

        // 5. Function victory() on click hold button if global >= 100
        document.querySelector('.btn-hold').addEventListener('click', victory);

        // 6. Checking if the player won the game
        if(scores[activePlayer] >= 100) {


            // 1. Changing the name of the player to 'Winner!'
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

            // 2. Hiding the dice
            document.querySelector('.dice').style.display = 'none';

            // 3. Adding the 'winner' class to the player
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

            // 4. Removing the active player status from the winner
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            // 5. Changing the 'gamePlaying' variable to 'false'
            gamePlaying = false;

            // 6. Play audio win
            playAudioWin();

            // 7. stop loadingActive
            stopLoadingActive();

        } else {
            // If the player wins the game, then it's the next player's turn
            nextPlayer();
        }
    }
});

// Restarting the game after clicking the 'New Game' button

  // 1. play audio
document.querySelector(".btn-new").addEventListener('click', init);
document.querySelector(".btn-new").addEventListener('click', playAudioNew);
document.querySelector('.btn-modal.reset').addEventListener('click', reset);
document.querySelector('.btn-modal.reset').addEventListener('click', playAudioNew);
document.querySelector('.btn-modal.close.uk').addEventListener('click', playAudioRulesClose);
document.querySelector('.btn-modal.close.fr').addEventListener('click', playAudioRulesClose);
document.getElementById("play").addEventListener('click', playAudioNew);

  // 2. Mute or Unmute
document.getElementById("unMute").addEventListener("click", mute);
document.getElementById("mute").addEventListener("click", unMute);
document.getElementById("unMute").style.display="";
document.getElementById("mute").style.display="none";

// Function that initializes the game
function init() {

    // 1. Get players'name value
    document.getElementById("play").addEventListener('click', getValue);

    // 2. Check players' name value
    document.getElementById("play").addEventListener('click', checkValue);

    // 3. Audio rules (uk and fr)
    document.querySelector(".btn-rules-fr").addEventListener("click", playAudioRules);
    document.querySelector(".btn-rules-uk").addEventListener("click", playAudioRules);

    // 4. Setting the 'gamePlaying' variable to 'true'
    gamePlaying = true;

    // 5. Setting both scores back to 0
    scores = [0, 0];

    // 6. Setting the activePlayer back to being 'Player 1'
    activePlayer = 0;

    // 7. Setting the roundScore back to 0
    roundScore = 0;

    // 8. Hiding the dice right from the beggining of the game
    document.querySelector('.dice').style.display = 'none';

    // 9. Setting the scores to 0 by default (using the 'getElementById' method)
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // 10. Functions changeProgressBar
    changeProgressBar1();
    changeProgressBar2();

    // 11. Removing the 'winner status' from the winning player
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    // 12. Removing the 'active status' from the winning player
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    // 13. Make sure that the 'active status' from 'Player 2' is removed and given to 'Player 1'
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    // 14. Make sure that the 'loadingActive' from 'Player 2' is removed and given to 'Player 1'
    document.querySelector(".loadingActive1").style.display = "flex";
    document.querySelector(".loadingActive2").style.display = "none";
}

    // Function to giving the turn to the next player
function nextPlayer() {
    loadingActive();

    // 1. It's the next player's turn if the dice number is 1 (using the ternary operator)
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    // 2. Setting the roundScore back to 0
    roundScore = 0;

    // 3. Setting the current score back to 0
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // 4. Adding the active class to the player who has the turn now
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

// Functions
function changeProgressBar1(){
    scoreValue0 = document.getElementById("score-0").innerText;
    progressBar1 = document.getElementById("idProgress1");
    progressBar1.style.width = scoreValue0+"%";
}

function changeProgressBar2(){
    scoreValue1 = document.getElementById("score-1").innerText;
    progressBar2 = document.getElementById("idProgress2");
    progressBar2.style.width = scoreValue1+"%";
}

function loadingActive(){
    if (activePlayer) {
        document.querySelector(".loadingActive1").style.display = "flex";
        document.querySelector(".loadingActive2").style.display = "none";
    } else {
        document.querySelector(".loadingActive1").style.display = "none";
        document.querySelector(".loadingActive2").style.display = "flex";
    }
}

function stopLoadingActive() {
    if (!gamePlaying) {
        document.querySelector(".loadingActive1").style.display = "none";
        document.querySelector(".loadingActive2").style.display = "none";
    }
}

function getValue(){
    player1= document.getElementById('name1').value;
    document.querySelector('.text1').textContent = player1.toUpperCase() + " Score";
    document.getElementById("name-0").textContent = player1;

    player2= document.getElementById('name2').value;
    document.querySelector('.text2').textContent = player2.toUpperCase() + " Score";
    document.getElementById("name-1").textContent = player2;
}

function checkValue(e) {
    if ((player1.length < 4) && (player2.length > 3)){
        e.preventDefault();
        document.getElementById("name1").style.borderColor="red";
        alert("The name of Player 1 is invalid")
    }
    if ((player2.length < 4) && (player1.length > 3)){
        e.preventDefault();
        document.getElementById("name2").style.borderColor = "red";
        alert("The name of Player 2 is invalid")
    }
    if ((player1.length < 4) && (player2.length < 4)) {
        e.preventDefault();
        document.getElementById("name1").style.borderColor = "red";
        document.getElementById("name2").style.borderColor = "red";
        alert("The names of Player 1 & Player 2 are invalid")
    }
}

// Functions Audio
function playAudioDice() {
    audioDice = document.getElementById("dice-mp3");
    audioDice.play();
}

function playAudioLose() {
    audioLose = document.getElementById("lose-mp3");
    audioLose.play();
}

function playAudioLock() {
    audioLock = document.getElementById("lock-mp3");
    audioLock.play();
}

function playAudioWin() {
    audioWin = document.getElementById("win-mp3");
    audioWin.play();
}

function playAudioRules() {
    audioRules = document.getElementById("rules-mp3");
    audioRules.play();
}
function playAudioRulesClose() {
    audioRules = document.getElementById("rules-close-mp3");
    audioRules.play();
}

function playAudioNew() {
    audioNew = document.getElementById("new-mp3");
    audioNew.play()
}

function mute() {
    document.getElementById("unMute").style.display="none";
    document.getElementById("mute").style.display="";

    document.getElementById("dice-mp3").muted=true;
    document.getElementById("lose-mp3").muted=true;
    document.getElementById("lock-mp3").muted=true;
    document.getElementById("win-mp3").muted=true;
    document.getElementById("rules-mp3").muted=true;
    document.getElementById("rules-close-mp3").muted=true;
    document.getElementById("new-mp3").muted=true;
}
function unMute() {
    document.getElementById("mute").style.display = "none";
    document.getElementById("unMute").style.display = "";

    document.getElementById("dice-mp3").muted=false;
    document.getElementById("lose-mp3").muted=false;
    document.getElementById("lock-mp3").muted=false;
    document.getElementById("win-mp3").muted=false;
    document.getElementById("rules-mp3").muted=false;
    document.getElementById("rules-close-mp3").muted=false;
    document.getElementById("new-mp3").muted=false;
}

// Functions Victory / Defeat
victoryPlayer1 = parseInt(document.querySelector(".badge-player1 .btn.btn-success .badge.bg-success").innerHTML);
defeatPlayer1 = parseInt(document.querySelector(".badge-player1 .btn.btn-danger .badge.bg-danger").innerHTML);
victoryPlayer2 = parseInt(document.querySelector(".badge-player2 .btn.btn-success .badge.bg-success").innerHTML);
defeatPlayer2 = parseInt(document.querySelector(".badge-player2 .btn.btn-danger .badge.bg-danger").innerHTML);

function victory() {
    if(scoreValue0 >= 100) {
        victoryPlayer1 ++;
        defeatPlayer2 ++;
        document.querySelector(".badge-player1 .btn.btn-success .badge.bg-success").innerHTML = victoryPlayer1;
        document.querySelector(".badge-player2 .btn.btn-danger .badge.bg-danger").innerHTML = defeatPlayer2;
    }
    if (scoreValue1 >= 100) {
        victoryPlayer2 ++;
        defeatPlayer1 ++;
        document.querySelector(".badge-player2 .btn.btn-success .badge.bg-success").innerHTML = victoryPlayer2;
        document.querySelector(".badge-player1 .btn.btn-danger .badge.bg-danger").innerHTML = defeatPlayer1;
    }
}

// Function reset
function reset() {
    document.querySelector(".badge-player1 .btn.btn-success .badge.bg-success").innerHTML = "0";
    document.querySelector(".badge-player1 .btn.btn-danger .badge.bg-danger").innerHTML = "0";
    document.querySelector(".badge-player2 .btn.btn-success .badge.bg-success").innerHTML = "0";
    document.querySelector(".badge-player2 .btn.btn-danger .badge.bg-danger").innerHTML = "0";
    victoryPlayer1 = 0;
    victoryPlayer2 = 0;
    defeatPlayer1 = 0;
    defeatPlayer2 = 0;
}