// define class Game
class Game {

    constructor() {

        this.startScreen = document.querySelector(`#game-intro`);
        this.gameScreen = document.querySelector(`#game-screen`);
        this.gameEndScreen = document.querySelector(`#game-end`);
        this.pointsText = document.querySelector(`#score`);

        this.food = [];
        this.snakeArr = [];
        this.score = 0;
        this.gameIsOver = false;
        this.gameIntervalId = null;
        this.gameLoopFrequency = null;
        this.counter = 0;
        this.direction = null;

        this.snakeArr.push(this.snake = new Snake(this.gameScreen, 3, 4.0588, `images/head.png`, `snake-head`, `snake`, ``, ``));
        this.snakeHead = this.snakeArr[0];
    }

    // starts setInterval to loop through game functions
    start() {

        this.startScreen.style.display = `none`;
        this.gameLoopFrequency = 180;

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

        this.snakeHead.move(this.direction);

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
                this.gameLoopFrequency -= 10;
                clearInterval(this.gameIntervalId);
                this.gameIntervalId = setInterval(() => {
                    this.gameLoop();
                }, this.gameLoopFrequency)


                // these variables store the most recent location of the last part of the snake
                const lastLeft = parseInt(this.snakeArr[this.snakeArr.length - 1].element.style.left);

                const lastTop = parseInt(this.snakeArr[this.snakeArr.length - 1].element.style.top);

                // a delay is used to prevent didCollide from registering a collision between the existing snake head/body and the newly added segment
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
                    this.snakeArr[i - 1].element.
                        style.left = this.snakeArr[i - 2].element.style.left;
                    this.snakeArr[i - 1].element.style.top = this.snakeArr[i - 2].element.style.top;
                }, this.gameLoopFrequency - 10)

            }
        }

    }

    // endGame function triggers clearInterval and switches to the gameEndScreen div
    endGame() {

        this.gameIsOver = true;
        this.gameScreen.style.display = `none`;

        this.gameScreen.innerHTML = `
        <div id="game-intro" class="screen flex">
        <p>Control the snake using the arrow keys.</p>
        <p>Eat the apples to grow.</p>
        <p>Don't bite yourself. Don't go off screen.</p>
        <button id="start-button">Click or press space to start</button>
        </div>
        `;

        this.score > 1 ? this.pointsText.innerText = `You got ${this.score} apples.` : this.pointsText.innerText = `You got ${this.score} apple.`

        this.gameEndScreen.style.display = `flex`;
    }
}


