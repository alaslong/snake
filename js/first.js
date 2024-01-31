// define start and restart buttons as variables upon window load
window.onload = () => {

    const startButton = document.getElementById(`start-button`);
    const restartButton = document.getElementById(`restart-button`);

    let game = null;


    // define function startGame
    const startGame = () => {

        console.log(`Game started`);
        game = new Game();

        game.start(); 
    }

    // define function resetGame
    const resetGame = () => {
        game.gameEndScreen.style.display = `none`;
        game.gameScreen.style.display = `block`;
        game.startScreen.style.display = `flex`;
        game = null;
    }


    // event listeners for keystrokes (up, down, left, and right arrow keys)
    document.addEventListener("keydown", key => {

        switch (key.code) {

            case `Space`:

                if (game === null) {
                    startGame();
                    break;
                } else if (game.gameIsOver) {
                    resetGame();
                    break;
                } else if (game) {
                    break;
                }

            case `ArrowUp`:

                if (game.snake.directionY) break;
                game.snake.directionX = 0;
                game.snake.directionY = -4.0588;
                game.direction = `up`;
                break;

            case `ArrowDown`:

                if (game.snake.directionY) break;
                game.snake.directionX = 0;
                game.snake.directionY = 4.0588;
                game.direction = `down`;
                break;

            case `ArrowLeft`:

                if (game.snake.directionX) break;
                game.snake.directionY = 0;
                game.snake.directionX = -3;
                game.direction = `left`;
                break;

            case `ArrowRight`:
                
                if (game.snake.directionX) break;
                game.snake.directionY = 0;
                game.snake.directionX = 3;
                game.direction = `right`;
                break;
        }
    })

    // add event listener to start game button
    startButton.addEventListener(`click`, startGame);

    // add event listener and functionality to reset game button
    restartButton.addEventListener(`click`, resetGame)
}