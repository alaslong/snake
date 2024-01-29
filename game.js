// define start and restart buttons as variables upon window load
window.onload = () => {

    const startButton = document.getElementById(`start-button`);
    const restartButton = document.getElementById(`restart-button`);
    let game = null;


    // define startGame function
    const startGame = () => {

        console.log(`Game started`);
        game = new Game();

        game.start();
    }


    // event listeners for keystrokes (up, down, left, and right arrow keys)
    document.addEventListener("keydown", key => {

        switch (key.code) {

            case `ArrowUp`:
                if (game.player.directionY) break;
                game.player.directionX = 0;
                game.player.directionY = -20;
                break;

            case `ArrowDown`:
                if (game.player.directionY) break;
                game.player.directionX = 0;
                game.player.directionY = 20;
                break;

            case `ArrowLeft`:
                if (game.player.directionX) break;
                game.player.directionY = 0;
                game.player.directionX = -20;
                break;

            case `ArrowRight`:
                if (game.player.directionX) break;
                game.player.directionY = 0;
                game.player.directionX = 20;
                break;
        }
    })


    // add event listener to start game 
    startButton.addEventListener(`click`, () => {

        startGame();
    })
}


// define game
class Game {

    constructor() {

        this.startScreen = document.querySelector(`#game-intro`);
        this.gameScreen = document.querySelector(`#game-screen`);
        this.gameEndScreen = document.querySelector(`#game-end`);
        this.height = 500;
        this.width = 500
        this.food = [];
        this.score = 0;
        this.lives = 3;
        this.gameIsOver = false;
        this.gameIntervalId = null;
        this.gameLoopFrequency = Math.round(1000 / 3);
        this.counter = 0;

        this.player = new Snake(this.gameScreen, 230, 500, 20, 20, `/circle.png`);
    }

    star () {

        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;

        this.startScreen.style.display = `none`;
        this.gameScreen.style.display = `block`;

        this.gameIntervalId = setInterval(() => {
            this.gameLoop();
        }, this.gameLoopFrequency)
    }

    gameLoop () {

        this.update();

        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId);
        }
    }

    update () {
        
        this.counter++;
        this.player.move();

        if (this.counter === 1 || this.counter % 15 === 0) {
            this.food.push(new Food(this.gameScreen));
        }

        this.food.forEach(apple => {
            if (this.player.didCollide(apple)) {
                apple.remove();
            }
        })

    }
}


// define snake (player)
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

        this.gameScreen.appendChild(this.element);
    }

    move () {

        // update snake position/direction based on directionX and directionY
        this.left += this.directionX;
        this.top += this.directionY;

        // ensure snake stays within the game screen
        // handles left hand side
        if (this.left < 10) {
            this.left = 10;
        }

        // handles top side
        if (this.top < 10) {
            this.top = 10;
        }

        // handles right hand side
        if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
            this.left = this.gameScreen.offsetWidth - this.width - 10;
        }

        // handles bottom side
        if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
            this.top = this.gameScreen.offsetHeight - this.height - 10;
        }

        // Update the player's car position on the screen
        this.updatePosition();
    }

    updatePosition() {

        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }

    didCollide(food) {

        const snakeHeadRect = this.element.getBoundingClientRect();
        const foodRect = food.element.getBoundingClientRect();

        if (
            snakeHeadRect.left < foodRect.right &&
            snakeHeadRect.right > foodRect.left &&
            snakeHeadRect.top < foodRect.bottom &&
            snakeHeadRect.bottom > foodRect.top
        ) {
            return true;
        } else {
            return false;
        }
    }

    grow () {
        
    }
}

//define food class
class Food {

    constructor (gameScreen) {
        
        this.gameScreen = gameScreen;
        this.left = Math.floor(Math.random() * 300 + 70);
        this.top = Math.floor(Math.random() * 300 + 70);
        this.width = 20;
        this.height = 20;
        this.element = document.createElement(`img`);

        this.element.src = `/apple.png`;
        this.element.style.position =  `absolute`;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

        this.gameScreen.appendChild(this.element);
    }

    remove () {
        this.gameScreen.removeChild(this.element);
    }

}