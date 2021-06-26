/**Constantes */
const STATUS_DISPLAY = document.querySelector('.game-notification'),
GAME_STATE = ['','','','','','','','',''],
POSICIONES_GANADORES = [  [0,1,2],[3,4,5],[6,7,8], [0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],//posiciones de las ubicaciones ganadoras
MENSAJE_GANADOR = () => `El jugador ${currentPlayer} ha ganado`,
MENSAJE_EMPATE = () => `El juego ha terminado en empate`,
CURRENT_PLAYER_TURN = () => `Turno del jugador ${currentPlayer}`


/**Variables */

let gameActive = true, 
currentPlayer = 'X'


/**Funciones */

function main(){
    handleStatusDisplay(CURRENT_PLAYER_TURN())
    listeners()
}
main()

function handleStatusDisplay(message){ //poner estado del juego
    STATUS_DISPLAY.innerHTML = message
}

function listeners(){
    document.querySelector('.game-container').addEventListener('click', handleCellClick)
    document.querySelector('.game-restart').addEventListener('click', handleRestartGame)

}

function handleCellClick(clickedEvent){
    const clickedCell = clickedEvent.target
    if(clickedCell.classList.contains('game-cell')){ // convertimos cada una de las celdas en arreglo
        //para saber a que celda le dio click el jugador
        const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell)
        console.log(clickedCellIndex)
        if(GAME_STATE[clickedCellIndex] !== '' || !gameActive){
            return
        }

        handleCellPlayed(clickedCell, clickedCellIndex)
        handleResultValidation() //se revisa si el jugador ya gano, empato o no pasa nada
    }
    console.log(clickedCell)
}


function handleRestartGame(){
    gameActive = true
    currentPlayer = 'X',
    restartGameState()
    handleStatusDisplay(CURRENT_PLAYER_TURN())
    document.querySelectorAll('.game-cell').forEach(cell => cell.innerText = '') //cuendo se rastaura el juego las casillas quedan en blanco
}

function restartGameState() { //restaurar el juego cuando se presione el boton
    let i = GAME_STATE.length
    while(i--){
        GAME_STATE[i] =''
    }
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    GAME_STATE[clickedCellIndex] = currentPlayer
    clickedCell.innerText = currentPlayer //pinta la casilla de X/O
}


function handleResultValidation(){ //continua con el juego o lo finaliza dependiendo de la accion
    let roundWon = false
    for(let i=0; i<POSICIONES_GANADORES.length; i++){
        const winCondition = POSICIONES_GANADORES[i]
        let position1 = GAME_STATE[winCondition[0]],
            position2 = GAME_STATE[winCondition[1]],
            position3 = GAME_STATE[winCondition[2]]
        if(position1 =='' || position2 =='' || position3==''){
            continue;
        }
        if(position1==position2 && position2 == position3){
            roundWon = true
            break;
        }
            
    }

    if(roundWon){ //comprobar si la varible roundwon es positiva
        handleStatusDisplay(MENSAJE_GANADOR())
        gameActive = false
        return
    }

    let roundDraw = !GAME_STATE.includes('') //comprobar si existe una posicion vacia
   
    if(roundDraw){
        handleStatusDisplay(MENSAJE_EMPATE())
        gameActive = false
        return
    }

    handlePlayerChange()
}

function handlePlayerChange(){
    currentPlayer = (currentPlayer ==='X') ? 'O':'X' //cambia el jugador para que sea de a turnos
    handleStatusDisplay(CURRENT_PLAYER_TURN())
}

