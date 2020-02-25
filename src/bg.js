class BgManager{
    constructor() {
	this.move = 0;
        this.vitesse = -5;
    }

    draw() {
        $('#canvas').css('background-position', this.move + 'px');
    }

    update() {
        this.move += this.vitesse;
    }
    
}
