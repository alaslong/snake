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


    // event listeners for keystrokes (up, down, left, and right arrow keys)
    document.addEventListener("keydown", key => {

        switch (key.code) {

            case `ArrowUp`:

                if (game.snake.directionY) break;
                game.snake.directionX = 0;
                game.snake.directionY = -15;
                game.direction = `up`;
                break;

            case `ArrowDown`:

                if (game.snake.directionY) break;
                game.snake.directionX = 0;
                game.snake.directionY = 15;
                game.direction = `down`;
                break;

            case `ArrowLeft`:

                if (game.snake.directionX) break;
                game.snake.directionY = 0;
                game.snake.directionX = -15;
                game.direction = `left`;
                break;

            case `ArrowRight`:
                
                if (game.snake.directionX) break;
                game.snake.directionY = 0;
                game.snake.directionX = 15;
                game.direction = `right`;
                break;
        }
    })

    // add event listener to start game button
    startButton.addEventListener(`click`, startGame);

    // add event listener and functionality to restart game button
    restartButton.addEventListener(`click`, () => {

        game.gameEndScreen.style.display = `none`;
        game.startScreen.style.display = `block`;
        game = null;
        startGame();
    })
}