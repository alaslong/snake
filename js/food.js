// define class Food
class Food {

    constructor(gameScreen) {

        this.gameScreen = gameScreen;

        //randomly generate the next location for an apple
        const left = Math.floor(Math.random() * 90) + 10;
        const top = Math.floor(Math.random() * 90) + 10;

        // define size of apple 
        this.width = 4.5;
        this.height = 6.0882;
        this.element = document.createElement(`img`);
        this.element.src = `images/apple.png`;
        this.element.style.position = `absolute`;
        this.element.style.width = `${this.width}%`;
        this.element.style.height = `${this.height}%`;
        this.element.style.left = `${left}%`;
        this.element.style.top = `${top}%`;

        // adds apple to the gameScreen
        this.gameScreen.appendChild(this.element);
    }

    // removes apple from gameScreen following collision
    remove() {
        this.gameScreen.removeChild(this.element);
    }

}