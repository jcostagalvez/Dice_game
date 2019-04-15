/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let roundScore, activatePlayer;

const player1 = new player(0, 0);
const player2 = new player(1, 0);
let gamePlaying = true;
roundScore = 0;
activatePlayer = 0;

const  htmlId= {
    score : "#score-",
    current : "#current-",
    panel : ".panel-player-",
    namePlayer : "#name-",
    buttonsdiv : "#buttonsPlay",
    buttonsNewPlay : "buttonsNewPlay"
};

function player (indicador, score,nombre) {
    this.indicador = indicador;
    this.score = score;
    this.nombre = nombre;
};

function activateButtons(){
    if (gamePlaying === true){
        selectElement(htmlId.buttonsdiv).style.display = 'inline';    
    }else if(gamePlaying === false){
        selectElement(htmlId.buttonsdiv).style.display = 'none';
    }
}

function selectElement(element){
    return document.querySelector(element);
};


function changeTextContent(scoretype, player, text){
    document.querySelector(scoretype + player).textContent = text
};

const dado = document.getElementById('dado');
function newGame(){
    gamePlaying = true;
    activatePlayer = 0;
    roundScore = 0;

    player1.nombre = 'Player 1' ;
    player2.nombre = 'Player 2';
    player1.score = 0;
    player2.score = 0;
   
    [player1.indicador, player2.indicador].forEach(element => {
        changeTextContent(htmlId.score, element, 0);
        changeTextContent(htmlId.current, element, 0);

    });

    changeTextContent(htmlId.namePlayer, player1.indicador, player1.nombre); 
    changeTextContent(htmlId.namePlayer, player2.indicador, player2.nombre);
    activateButtons();
};

function whoIsPlaying(){
    if (activatePlayer === player1.indicador){
        return true;
    }{
        return false;
    }
};
function isFlashingDado(choice) {
    if (choice == true) {
      dado.classList.replace('dice', 'FlashImg');
    } else {
      dado.classList.replace('FlashImg', 'dice');
    }
};




function changePlayer(){
    roundScore = 0;
    changeTextContent(htmlId.current, activatePlayer, 0);
    document.querySelector('.panel-player-' + activatePlayer).classList.toggle('active');
    changeTextContent(htmlId.current, activatePlayer, 0);
    activatePlayer === 0 ? activatePlayer = 1: activatePlayer = 0;
    document.querySelector('.panel-player-' + activatePlayer).classList.toggle('active');
};

function endGameActions(){

    if(whoIsPlaying() === true){
        changeTextContent(htmlId.namePlayer, player1.indicador, 'WINNER'); 
        changeTextContent(htmlId.namePlayer, player2.indicador, 'LOOSER');
        changeTextContent(htmlId.current, player1.indicador, 0); 
    }else{
        changeTextContent(htmlId.namePlayer, player2.indicador, 'WINNER'); 
        changeTextContent(htmlId.namePlayer, player1.indicador, 'LOOSER');
        changeTextContent(htmlId.current, player1.indicador, 0); 
     }
    };

function endGame(){
    gamePlaying = false;
    if( player1.score >= 10 || player2.score >= 10){
            endGameActions();
            isFlashingDado(true);
            activateButtons();
    } else{
        changePlayer(activatePlayer);
    }
};

isFlashingDado(true);

document.querySelector('.btn-roll').addEventListener('click', function( ) {
    isFlashingDado(false);   
    let dice = Math.floor(Math.random() * 6) + 1; 
    const diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png';
if(dice !== 1){
    roundScore += dice;
    changeTextContent(htmlId.current, activatePlayer, roundScore);
}else{

    isFlashingDado(true);
    changePlayer(activatePlayer);
} 
    
});

document.querySelector('.btn-hold').addEventListener('click', function(){

console.log(whoIsPlaying()===true);

    if(whoIsPlaying() === true){
        player1.score += roundScore;
        document.querySelector('#score-' + activatePlayer).textContent = player1.score;
    } else{
        player2.score += roundScore;
        document.querySelector('#score-' + activatePlayer).textContent = player2.score;
    }   

    endGame();
});

document.querySelector('.btn-new').addEventListener('click', newGame);