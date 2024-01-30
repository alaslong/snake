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

        const newBodyPart = new Snake(this.gameScreen, left, top, 20, 20, `/images/circle.png`)
        
        return newBodyPart;

    }

}