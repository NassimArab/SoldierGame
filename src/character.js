class Character {
    constructor() {
        this.character = new Image();
        this.character.src = "images/moving_soldier.png"
        this.originalPosition = new Vector(widthScreen * 0.05, heightScreen * 0.835);
        this.position = this.originalPosition.copy();
        this.nbPositions = 8;
        this.sWidth;
        this.sHeight;
        this.step = 0;
        this.scale = 2;
        this.velocity = new Vector(0,0);
        this.force = new Vector(0,0);
        this.isAlive = true;
        this.isJumping = false;
        this.isFiring = false;
        this.ammo = new BulletGenerator(this);
	this.score = 0;
        this.diefin = false;
    }

    draw() {
	if(this.isAlive){
            if(this.isJumping) {
		this.character.src = "images/jumping_soldier.png";
		this.sWidth = 56;
		this.sHeight = 64;
            }
            if(this.isFiring) {
		this.character.src = "images/firing_soldier.png";
		this.sWidth = 87;
		this.sHeight = 59;
            }
            if(!this.isJumping && !this.isFiring){ 
		this.character.src = "images/moving_soldier.png";
		this.sWidth = 65;
		this.sHeight = 57;
            }
	}
	else {
	    this.character.src = "images/dead_soldier.png";
	    this.sWidth = 71;
	    this.sHeight = 62;
	}
        ctx.drawImage(this.character,
                      this.sWidth*Math.floor(this.step),
                      0,
                      this.sWidth,
                      this.sHeight,
                      this.position.x,
                      this.position.y,
                      this.sWidth*this.scale,
                      this.sHeight*this.scale
                     );
        this.ammo.draw();
    }
    
    update() {
        this.ammo.update();
	if(this.isAlive) {
            if(this.isFiring) {
		this.step += 0.30;
		if(this.step > 4) {
                    this.step = 0;
                    this.isFiring = false;
		}
            } else if (!this.isJumping) {
		this.step += 0.30;
		if(this.step > 7)
                    this.step = 0;
            }
	} else {
	    this.step += 0.30;
	    if(this.step >= 3){
		      this.step = 2;
            this.diefin = true;
        }
	  }
    }

    check() {
        if(this.position.y > this.originalPosition.y) {
            this.position.y = this.originalPosition.y;
            this.force.y = 0;
            this.isJumping = false;
        }
        if(this.position.x > widthScreen*0.9)
            this.position.x = widthScreen*0.9;
        if(this.position.x < widthScreen*0.01)
            this.position.x = widthScreen*0.01;
    }

    motion(deltaTime) {
        this.position.y -= this.force.y*deltaTime;
        this.position.x += this.force.x;
        this.force.y -= 9.81*deltaTime;
        this.check();
    }

    jump() {
        if(this.position.y == this.originalPosition.y) {
            this.force.y += 100;
            this.isJumping = true;
            this.step = 0;
	}
    }

    goRight() {
        this.force.x = 10;
    }

    goLeft() {
        this.force.x = -10;
    }

    stopX() {
        this.force.x = 0
    }

    fire() {
        this.isFiring = true
        this.step = 0;
        this.ammo.fire();
    }

    die() {
        this.isAlive = false;
	this.step = 0;
    }

}


class BulletGenerator {
    constructor(soldier) {
        this.soldier = soldier;
        this.position = new Vector(this.soldier.position.x + (this.soldier.sWidth*this.soldier.scale), this.soldier.position.y + (this.soldier.sHeight*0.42));
        this.nbreMax = 50;
        this.bullets = [];
        for(var i = 0; i < this.nbreMax; i++)
            this.bullets.push(new Bullet());
    }

    update() {
        this.position = new Vector(this.soldier.position.x + (this.soldier.sWidth*this.soldier.scale), this.soldier.position.y + (this.soldier.sHeight*0.42));
        for(var i = 0; i < this.bullets.length; i++) {
            if(this.bullets[i].isAlive)
                this.bullets[i].update();
        }
    }

    draw() {
        for(var i = 0; i < this.bullets.length; i++)
            if(this.bullets[i].isAlive)
                this.bullets[i].draw();            
    }

    fire() {
        for(var i = 0; i < this.bullets.length; i++) {
            if(!this.bullets[i].isAlive){
                this.bullets[i].isAlive = true;
                this.bullets[i].position = this.position.copy();
                break;
            }
        }
    }
}

class Bullet {
    constructor() {
        this.image = new Image();
        this.image.src = "images/bullet.png";
        this.position;
        this.step = 0;
        this.sWidth = 45;
        this.sHeight = 29;
        this.scale = 2;
        this.isAlive = false;
	this.spaceX = 8;
	this.spaceY = 4;
    }

    draw() {
        ctx.drawImage(this.image,
                      this.sWidth*Math.floor(this.step),
                      0,
                      this.sWidth,
                      this.sHeight,
                      this.position.x,
                      this.position.y,
                      this.sWidth*this.scale,
                      this.sHeight*this.scale
                     );
    }

    check() {
        if(this.position.x >= widthScreen)
            this.isAlive = false;
    }

    update() {
        this.position.x += 50;
        this.step += 30;
        if(this.step >= 4)
            this.step = 3;
        this.check();
    }

    die() {
	this.isAlive = false;
    }
}



