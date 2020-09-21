const buttons = document.querySelectorAll('button');
const result = document.querySelector('#result');
const score = document.querySelector('#score');
const reset = document.querySelector('#reset');

let playerWins = 0;
let computerWins = 0;
let games = 0;

function computerPlay(){
    const options = ['piedra', 'papel', 'tijeras'];
    return options[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) { 
    const para = document.createElement('p');

    if (playerSelection != computerSelection) {
        if ((playerSelection == "piedra" && computerSelection == "tijeras") || (playerSelection == "papel" && computerSelection == "piedra") ||
                    (playerSelection == "tijeras" && computerSelection == "papel")){            
                playerWins += 1;                
                para.textContent = "¡Ganas! " + playerSelection + " vence a " + computerSelection;
                result.appendChild(para);
                updateScore();
            } else {
                computerWins += 1;                
                para.textContent = "¡Pierdes! " + computerSelection + " vence a " + playerSelection;
                result.appendChild(para);
                updateScore();
            }
    } else {
        para.textContent ="¡Empate! Nadie gana (" + playerSelection + " contra " + computerSelection + ")";
        result.appendChild(para);
    }
}

function updateScore(){
    score.textContent = "Tú: " + playerWins + " puntos - Máquina: " + computerWins + " puntos";
}

function showWinner(){  
    const para2 = document.createElement('p');
    const buttonReset = document.createElement('button'); 

    if (playerWins > computerWins) {
        para2.textContent ="¡Ganaste!";
    } else if (playerWins < computerWins) { 
        para2.textContent ="¡Perdiste!";
    } else {
        para2.textContent ="¡Hay un empate!";
    }
    result.appendChild(para2);
    
    buttons.forEach(button => {
        button.disabled = true;        
    });

    buttonReset.textContent = "¿Jugar otra vez?";
    buttonReset.addEventListener('click', () => {
        buttons.forEach(button => {
            button.disabled = false;                        
        });
        playerWins = 0;
        computerWins = 0;
        games = 0;        
        while (result.firstChild) {
            result.removeChild(result.lastChild);
        }
        while (score.firstChild) {
            score.removeChild(score.lastChild);
        }
        while (reset.firstChild) {
            reset.removeChild(reset.lastChild);
        }
        updateScore();
    });
    reset.appendChild(buttonReset);
}

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        games ++;
        if (games >= 5) {
            showWinner();
        } else {
            playRound(button.id, computerPlay());
        }        
    });
});

updateScore();
