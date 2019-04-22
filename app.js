/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let roundScore, activatePlayer;
let diceAction = [];
const player1 = new player(0, 0);
const player2 = new player(1, 0);
let gamePlaying = true;
roundScore = 0;
activatePlayer = 0;
let maxScore = 0;
let antepnultimateDiceValue = 0;
const dado = document.getElementById('dado');

const  htmlId = {
    score : "#score-",
    current : "#current-",
    panel : ".panel-player-",
    namePlayer : "#name-",
    buttonsdiv : "#buttonsPlay",
    buttonsNewPlay : "buttonsNewPlay"
};
const  modalHtmlId = {
    jugador1 :"#jugador1",
    jugador2 :"#jugador2",
    puntuacionmax :"#puntuacionmax",
    bgmodal:".bg-modal",
}

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

function imformationTramision(){
    maxScore = selectElement(modalHtmlId.puntuacionmax).value;
    player1.nombre = selectElement(modalHtmlId.jugador1).value;
    player2.nombre = selectElement(modalHtmlId.jugador2).value;
    changeTextContent(htmlId.namePlayer, player1.indicador, player1.nombre); 
    changeTextContent(htmlId.namePlayer, player2.indicador, player2.nombre);
    selectElement(modalHtmlId.puntuacionmax).value = "";
    selectElement(modalHtmlId.jugador1).value = "";
    selectElement(modalHtmlId.jugador2).value = "";
    selectElement(".modal-bg").style.display = 'none'
}

function newGame(){
    document.querySelector(".modal-bg").style.display = "flex";
    gamePlaying = true;
    activatePlayer = 0;
    roundScore = 0;

    player1.score = 0;
    player2.score = 0;
   
    [player1.indicador, player2.indicador].forEach(element => {
        changeTextContent(htmlId.score, element, 0);
        changeTextContent(htmlId.current, element, 0);

    });
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
    diceAction = [];
    changeTextContent(htmlId.current, activatePlayer, 0);
    document.querySelector('.panel-player-' + activatePlayer).classList.toggle('active');
    changeTextContent(htmlId.current, activatePlayer, 0);
    activatePlayer === 0 ? activatePlayer = 1: activatePlayer = 0;
    document.querySelector('.panel-player-' + activatePlayer).classList.toggle('active');
};

function sumScore(score){
    if(score === 0){
        return score;
    }else{
        whoIsPlaying() === true ? scores = player1.score += score: scores = player2.score += score;
        return scores;
    }
}

function displayScore(score){

    if(whoIsPlaying() === true){
        player1.score = sumScore(score);
        document.querySelector('#score-' + activatePlayer).textContent = player1.score;
    } else{
        player2.score = sumScore(score);
        document.querySelector('#score-' + activatePlayer).textContent = player2.score;
    }   

}
function endGameActions(){

    if(whoIsPlaying() === true){
        changeTextContent(htmlId.namePlayer, player1.indicador, 'GANADOR'); 
        changeTextContent(htmlId.namePlayer, player2.indicador, 'PERDEDOR');
        changeTextContent(htmlId.current, player1.indicador, 0); 
    }else{
        changeTextContent(htmlId.namePlayer, player2.indicador, 'GANADOR'); 
        changeTextContent(htmlId.namePlayer, player1.indicador, 'PERDEDOR');
        changeTextContent(htmlId.current, player1.indicador, 0); 
     }
    };

function endGame(){
    gamePlaying = false;
    if( player1.score >= maxScore || player2.score >= maxScore){
            endGameActions();
            isFlashingDado(true);
            activateButtons();
    } else{
        changePlayer(activatePlayer);
    }
};
document.querySelector(".modal-bg").style.display = "flex";
isFlashingDado(true);

document.querySelector('.btn-roll').addEventListener('click', function( ) {
    isFlashingDado(false);   
    let dice = Math.floor(Math.random() * 6) + 1; 
    //diceAction.push(dice);
    //let antepnultimateDiceValue = diceAction[diceAction.length - 2];

    const diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png';

    if(dice === 6 && antepnultimateDiceValue === 6){
        displayScore(0);
        isFlashingDado(true);
        changePlayer(activatePlayer);
    }else if(dice !== 1 ){
    roundScore += dice;
    changeTextContent(htmlId.current, activatePlayer, roundScore);
    }else{
    isFlashingDado(true);
    changePlayer(activatePlayer);
}
antepnultimateDiceValue = dice; 
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    displayScore(roundScore);
    endGame();
});

document.querySelector('.btn-new').addEventListener('click', newGame);

document.querySelector('.btn-next').addEventListener('click', imformationTramision);