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
                game.snake.directionY = -20;
                break;

            case `ArrowDown`:
                if (game.snake.directionY) break;
                game.snake.directionX = 0;
                game.snake.directionY = 20;
                break;

            case `ArrowLeft`:
                if (game.snake.directionX) break;
                game.snake.directionY = 0;
                game.snake.directionX = -20;
                break;

            case `ArrowRight`:
                if (game.snake.directionX) break;
                game.snake.directionY = 0;
                game.snake.directionX = 20;
                break;
        }
    })


    // add event listener to start game button
    startButton.addEventListener(`click`, startGame);

    // add event listener to restart game button
    restartButton.addEventListener(`click`, () => {

        game.gameEndScreen.style.display = `none`;
        game.startScreen.style.display = `block`;
        
    })
}

// define class Game
class Game {

    constructor() {

        this.startScreen = document.querySelector(`#game-intro`);
        this.gameScreen = document.querySelector(`#game-screen`);
        this.gameEndScreen = document.querySelector(`#game-end`);
        this.height = 500;
        this.width = 500;
        this.food = [];
        this.snakeArr = [];
        this.score = 0;
        this.lives = 3;
        this.gameIsOver = false;
        this.gameIntervalId = null;
        this.gameLoopFrequency = 200;
        this.counter = 0;

        this.snakeArr.push(this.snake = new Snake(this.gameScreen, 230, 500, 20, 20, `/circle.png`));
        this.snakeHead = this.snakeArr[0];
    }

    // starts setInterval to loop through game functions
    start() {

        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;

        this.startScreen.style.display = `none`;
        this.gameScreen.style.display = `block`;

        this.gameIntervalId = setInterval(() => {
            this.gameLoop();
        }, this.gameLoopFrequency)
    }

    // checks whether game has ended
    gameLoop() {

        this.update();

        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId);
        }
    }

    // updates game information
    update() {

        // counter is used to generate apples
        this.counter++;
        this.snake.move();

        // apples are generated on the first loop, and every 20 loops
        if (this.counter === 1 || this.counter % 20 === 0) {
            this.food.push(new Food(this.gameScreen));
        }

        // loops through each apple to check if collision with snake's head (snakeArr[0]) has occured
        this.food.forEach(apple => {
            if (this.snakeArr[0].didCollide(apple)) {

                // if yes, the apple is removed from gameScreen
                apple.remove();

                // these variables store the most recent location of the last part of the snake
                const lastLeft = parseInt(this.snakeArr[this.snakeArr.length-1].element.style.left);
                const lastTop = parseInt(this.snakeArr[this.snakeArr.length-1].element.style.top);

                // a delay is used to prevent didCollide from registering a collision between the snake's head and the rest of the body
                setTimeout(() => {
                    this.snakeArr.push(this.snake.grow(lastLeft, lastTop));
                }, 170)
            }

            
        })

        // the slice method is appled on snakeArr to prevent didCollide registering a collision between snakeArr[0] and itself
        this.snakeArr.slice(1).forEach(x => {

            // if snakeArr[0] touches another element of snakeArr, the endGame function is called
            if (this.snakeArr[0].didCollide(x)) {
                this.endGame();
            }

        })
        
        // checks if snakeArr containe more than just the snake's head
        if (this.snakeArr.length > 0) {

            //if so, cycle through each element of the snakeArr (starting from the end), and move each element to the location of the one preceeding it
            for (let i = this.snakeArr.length; i > 1; i--) {

                setTimeout(() => {
                    this.snakeArr[i-1].element.style.left = this.snakeArr[i-2].element.style.left;
                    this.snakeArr[i-1].element.style.top = this.snakeArr[i-2].element.style.top;
                }, 170);


            }
        }


    }

    // endGame function triggers clearInterval and switches to the gameEndScreen div
    endGame() {
        this.gameIsOver = true;
        this.gameScreen.style.display = `none`;
        this.gameEndScreen.style.display = `block`;
    }
}


// define class Snake
class Snake {

    constructor(gameScreen, left, top, width, height, imgSrc) {

        this.gameScreen = gameScreen;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.directionX = 0;
        this.directionY = 0;
        this.element = document.createElement(`img`);

        this.element.src = imgSrc;
        this.element.style.position = `absolute`;

        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;

        this.element = this.gameScreen.appendChild(this.element);

    }

    //note: the following only applies to snakeArr[0]
    move() {

        // update snakeArr[0]'s next position by adding directionX/directionY to it's current top/left values
        this.left += this.directionX;
        this.top += this.directionY;



        // ensure snake stays within the game screen
        if (this.left < 10) { //left
            this.left = 10;
        }

        if (this.top < 10) { //top
            this.top = 10;
        }

        if (this.left > this.gameScreen.offsetWidth - this.width - 10) { //right
            this.left = this.gameScreen.offsetWidth - this.width - 10;
        }

        if (this.top > this.gameScreen.offsetHeight - this.height - 10) { //bottom
            this.top = this.gameScreen.offsetHeight - this.height - 10;
        }

        this.updatePosition();
    }

    // update the position of snakeArr[0] on the screen
    updatePosition() {

        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

    }

    // check for collision
    didCollide(arg) {

        const snakeHeadRect = this.element.getBoundingClientRect();
        const argRect = arg.element.getBoundingClientRect();

        if (
            snakeHeadRect.left < argRect.right &&
            snakeHeadRect.right > argRect.left &&
            snakeHeadRect.top < argRect.bottom &&
            snakeHeadRect.bottom > argRect.top
        ) {
            return true;
        } else {
            return false;
        }
    }

    // returns a new part of the snake based on the current location of the end of the snake (which is pushed to snakeArr)
    grow(left, top) {

        const newBodyPart = new Snake(this.gameScreen, left, top, 20, 20, `/circle.png`)
        
        return newBodyPart;

    }

}


// define class Food
class Food {

    constructor(gameScreen) {

        this.gameScreen = gameScreen;

        //randomly generate the next location for an apple
        this.left = Math.floor(Math.random() * 490) + 10;
        this.top = Math.floor(Math.random() * 490) + 10;

        // define size of apple 
        this.width = 20;
        this.height = 20;
        this.element = document.createElement(`img`);
        this.element.src = `/apple.png`;
        this.element.style.position = `absolute`;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

        // adds apple to the gameScreen
        this.gameScreen.appendChild(this.element);
    }

    // removes apple from gameScreen following collision
    remove() {
        this.gameScreen.removeChild(this.element);
    }

}