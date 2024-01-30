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
        this.element.src = `/images/apple.png`;
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