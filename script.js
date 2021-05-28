const Game = () => {
    let game_board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let turn = 1;
    let winner = 0;
    return {game_board, turn, winner};
}

//Initialize a game
let game =  Game();


function play_again() {
    //Clean HTML changes made during the game
    const content = document.querySelector(".content");     
    const winner_popup = document.querySelector("#popup");
    content.removeChild(winner_popup);

    const board = document.querySelector(".board");
    board.style.opacity = "1";

    for (let i = 0; i < 9; i++) {
        if (game.game_board[i] != 0) {
            const position = document.getElementById(`${String(i)}`);   
            const icon = document.querySelector(".material-icons");
            position.style.background = "rgb(240,187,117)"
            position.removeChild(icon);
        }
    }
    const text = document.querySelector("#guide");
    text.textContent = `Player 1 turn`;

    //Restart game obejct
    game.winner = 0;
    game.turn = 1;
    game.game_board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

}

function game_over() {
    //Check if the board is fully filled
    if (!(game.game_board.includes(0))) {
        return true;  
    }
    //Define winning combinations (by border index)
    let combs = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
                        [1, 4, 7], [2, 5 ,8], [0, 4, 8], [2, 4, 6]]

    for (let i = 0; i < combs.length; i++) {
        let position1 = game.game_board[combs[i][0]];
        let position2 = game.game_board[combs[i][1]];
        let position3 = game.game_board[combs[i][2]];
        if ((position1 === position2) && (position2 === position3) && (position1 != 0)) {
            game.winner = position1;
            return true;
        }
    }
}

function check_position(board_position) {
    if (game.game_board[board_position] === 0) {
        return true;
    }
    return false
}


//Answer to a click on the game board
function move(event) {
    //Get the board position coming from the click
    let board_position = parseInt(event.id);

    //Check if the board position is valid
    if (check_position(board_position)) {
        //Create visuals to represent the play being made,
        //background being changed and icon added
        const icon = document.createElement('span');
        icon.setAttribute("class", "material-icons"); 
        if (game.turn === 1) {
            icon.textContent = "api";
            event.style.backgroundColor = "white";
        }
        else {
            icon.textContent = "offline_bolt";
            event.style.backgroundColor = "#E86659";
        }
        icon.style.fontSize = "5rem";
        event.appendChild(icon);

        //Update game border
        game.game_board[board_position] = game.turn;

        //Change player turn
        game.turn = game.turn === 1 ? 2 : 1;

        //Check if game is over
        if (game_over()){
            //Indicate winner and create button for a restart
            const board = document.querySelector(".board");
            board.style.opacity = "0.1";
            const content = document.querySelector(".content");
        
            const winner_popup = document.createElement('div');
            winner_popup.setAttribute("id", "popup"); 

            const win_message = document.createElement('h3');
            win_message.textContent = `Player ${game.winner} wins`;
            if (game.winner === 0){
                win_message.textContent = "It's a draw"; 
            }

            const replay = document.createElement('button');
            replay.textContent = "Play Again";
            replay.setAttribute("onclick", "play_again()"); 

            winner_popup.appendChild(win_message);
            winner_popup.appendChild(replay);
            content.appendChild(winner_popup);
        }

        //Update text telling which player turn it is
        const text = document.querySelector("#guide");
        text.textContent = `Player ${game.turn} turn`;
    }
}
