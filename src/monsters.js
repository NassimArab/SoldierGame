class MonsterGenerator {
    constructor () {
        this.nbBirth = 0;
        this.birthRate=0.02;
        this.min = new Vector(widthScreen, heightScreen*0.4);
        this.max = new Vector(widthScreen, heightScreen*0.9);
    }

    initMonster(m) {
        m.position = Vector.setRandInt(this.min, this.max);
        m.velocity = new Vector(-20, 0);
        m.isAlive = true;
    }
}

class Monster {
    constructor() {
        this.monster = new Image();
        this.monster.src = "images/mons.png";
        this.velocity = new Vector(-10, 0);
        this.position;
        this.isAlive = false;
        this.sWidth = 32;
        this.sHeight = 32;
        this.step = 0;
        this.scale = 2;
    }

    die() {
        this.isAlive = false;
    }

    draw() {
        if(this.isAlive) {
            ctx.drawImage(this.monster,
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
    }

    motion(deltaTime) {
        this.position = this.position.addition(this.velocity.multiplication(deltaTime));
    }
}

class MonsterManager {
    constructor() {
        this.all=[];
        this.nbAliveMax = 2;
        this.generator = new MonsterGenerator();

        for(var i = 0; i < this.nbAliveMax; i++) {
            this.all.push(new Monster());
        }
    }

    update(deltaTime) {

        for(var i = 0; i < this.nbAliveMax; i++) {
            if(this.all[i].isAlive){
                this.all[i].step+= 0.25;

                if(this.all[i].step >= 9)
                    this.all[i].step = 0;

                if(this.all[i].position.x <= -32)
                    this.all[i].isAlive = false;
            }
        }
        for(var i = 0; i < this.nbAliveMax; i++) {
            if(this.all[i].isAlive)
                this.all[i].motion(deltaTime);
            else
                this.generator.initMonster(this.all[i]);
        }
    }

    draw() {
        for(var i = 0; i < this.nbAliveMax; i++) {
            if(this.all[i].isAlive)
                this.all[i].draw();
        }
    }
}
