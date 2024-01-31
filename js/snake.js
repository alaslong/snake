// define class Snake
class Snake {

    constructor(gameScreen, width, height, imgSrc, styleId, styleClass, left, top) {

        this.gameScreen = gameScreen;
        this.width = width;
        this.height = height;
        this.directionX = 0;
        this.directionY = 0;
        this.element = document.createElement(`img`);
     
        if (left && top) {
            this.left = left;
            this.top = top;
        } else {
            this.left = 50;
            this.top = 50;
        }


        this.element.src = imgSrc;
        this.element.style.position = `absolute`;

        this.element.style.width = `${width}%`;
        this.element.style.height = `${height}%`;
        this.element.style.left = `${this.left}%`;
        this.element.style.top = `${this.top}%`;

        

        if (styleId) this.element.setAttribute(`id`, styleId);
        if (styleClass) this.element.setAttribute(`class`, styleClass);

        this.element = this.gameScreen.appendChild(this.element);

    }

    //note: the following only applies to snakeArr[0]
    move(directionArg) {

        // update snakeArr[0]'s next position by adding directionX/directionY to it's current top/left values
        this.left += this.directionX;
        this.top += this.directionY;

        // ensure snake stays within the game screen
        if (this.left < 0) { //left
            this.left = 0;
        }

        if (this.top < 0) { //top
            this.top = 0;
        }

        if (this.left >= 100 - this.width - 0) { //right
            this.left = 100 - this.width - 0;
        }

        if (this.top >= 100 - this.height - 0) { //bottom
            this.top = 100 - this.height - 0;
        }

        this.updatePosition(directionArg);
    }

    // update the position of snakeArr[0] on the screen
    updatePosition(arg) {

        

        this.element.style.left = `${this.left}%`;
        this.element.style.top = `${this.top}%`;

        if (arg) this.element.setAttribute(`class`, `snake ${arg}`);

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

        const newBodyPart = new Snake(this.gameScreen, 3, 4.0588, `images/body.png`, ``, `snake snake-body`, left, top);
        
        return newBodyPart;

    }

}