// define class Game
class Game {

    constructor() {

        this.startScreen = document.querySelector(`#game-intro`);
        this.gameScreen = document.querySelector(`#game-screen`);
        this.gameEndScreen = document.querySelector(`#game-end`);
        this.height = 500;
        this.width = 800;
        this.food = [];
        this.snakeArr = [];
        this.score = 0;
        this.gameIsOver = false;
        this.gameIntervalId = null;
        this.gameLoopFrequency = 200;
        this.counter = 0;
        this.direction = null;

        this.snakeArr.push(this.snake = new Snake(this.gameScreen, 400, 250, 15, 15, `images/head.png`, `snake-head`, `snake`));
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
        this.snake.move(this.direction);

        // apples are generated on the first loop, and every 30 loops
        if (this.counter === 1 || this.counter % 30 === 0) {
            this.food.push(new Food(this.gameScreen));
        }

        // loops through each apple to check if collision with snakeHead (snakeArr[0]) has occured
        this.food.forEach(apple => {
            if (this.snakeHead.didCollide(apple)) {

                // if yes, the apple is removed from gameScreen
                apple.remove();
                this.score++;

                // these variables store the most recent location of the last part of the snake
                const lastLeft = parseInt(this.snakeArr[this.snakeArr.length-1].element.style.left);
                const lastTop = parseInt(this.snakeArr[this.snakeArr.length-1].element.style.top);

                // a delay is used to prevent didCollide from registering a collision between the snake's head and the rest of the body
                setTimeout(() => {
                    this.snakeArr.push(this.snake.grow(lastLeft, lastTop));
                }, 0)
            }

            
        })

        // the slice method is appled on snakeArr to prevent didCollide registering a collision between snakeHead and itself
        this.snakeArr.slice(1).forEach(x => {

            // if snakeHead touches another element of snakeArr, the endGame function is called
            if (this.snakeHead.didCollide(x)) {
                this.endGame();
            }

        })
        
        // checks if snakeArr containe more than just the snake's head
        if (this.snakeArr.length > 0) {

            // if so, cycle through each element of the snakeArr (starting from the end), and move each element to the location of the one preceeding it
            for (let i = this.snakeArr.length; i > 1; i--) {

                // timeout to prevent elements from overlapping
                setTimeout(() => {
                    this.snakeArr[i-1].element.
                    style.left = this.snakeArr[i-2].element.style.left;
                    this.snakeArr[i-1].element.style.top = this.snakeArr[i-2].element.style.top;
                }, 190)

            }
        }

    }

    // endGame function triggers clearInterval and switches to the gameEndScreen div
    endGame() {

        this.gameIsOver = true;
        this.gameScreen.style.display = `none`;
        this.gameEndScreen.style.display = `block`;
        this.gameScreen.innerHTML = ``;
    }
}


