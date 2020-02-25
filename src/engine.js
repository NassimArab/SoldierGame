/**
 *
 *
 * */


var randInt=function(a,b) {
    return Math.floor(Math.random()*(b-a)+a);
}

var setAttributes=function(v,lAttrib) {
    for(var k in lAttrib) {
        v[k]=lAttrib[k];
    }
}



class Engine {
    constructor() {
        this.bgManager = new BgManager();
        this.character = new Character();
        this.mManager = new MonsterManager();
	this.time=0;
        this.deltaTime=0.4;
        this.finish = new endGame();
    }

    draw() {
      if ((engine.character.isAlive == false) && (this.character.diefin == true)){
        this.finish.draw();
      }else {
        ctx.clearRect(0,0,widthScreen,heightScreen);
        this.mManager.draw();
        this.bgManager.draw();
        this.character.draw(); }
    }

    updateData() {
      if ((engine.character.isAlive == false) && (engine.character.diefin == true)){
        this.finish.update();
      }else {
        this.bgManager.update();
        this.character.update();
        this.mManager.update(this.deltaTime);
      }
    }

    jump() {
        this.character.jump();
    }

    goRight() {
        this.character.goRight();
    }

    goLeft() {
        this.character.goLeft();
    }

    stopX() {
        this.character.stopX();
    }

    fire() {
        this.character.fire();
    }

    loop() {
        this.time+=this.deltaTime;
        this.updateData();
        this.draw();
        this.motion();
        this.detectCollision();
        this.detectDeadMonster();
        window.requestAnimationFrame(this.loop.bind(this));
    }

    start() {
        this.loop();
    }

    motion() {
        this.character.motion(this.deltaTime);
    }

    detectCollision() {
        var monsterI;
        var touchedX, touchedYUp, touchedYDown;
        for(var i = 0; i < this.mManager.all.length; i++) {
            monsterI = this.mManager.all[i];
            touchedX = monsterI.position.x < this.character.position.x;
            touchedX = touchedX && (monsterI.position.x > (this.character.position.x-(this.character.sWidth*this.character.scale)));
            touchedYUp = monsterI.position.y > this.character.position.y;
            touchedYUp = touchedYUp && (monsterI.position.y < this.character.position.y+(this.character.sHeight*this.character.scale));
            touchedYDown = (monsterI.position.y+monsterI.sHeight > this.character.position.y) && (monsterI.position.y+monsterI.sHeight < this.character.position.y+(this.character.sHeight*this.character.scale));
            if((touchedX && touchedYUp) || (touchedX && touchedYDown))
                this.character.die();
        }
    }

    detectDeadMonster() {
        var bulletJ, monsterI;
        var up, center, down, xDectection;
        var yMonsterUp, yMonsterDown, yBulletUp, yBulletDown;
        for(var i = 0; i < this.mManager.all.length; i++) {
            for(var j = 0; j < this.character.ammo.bullets.length; j++) {
                monsterI = this.mManager.all[i];
                bulletJ = this.character.ammo.bullets[j];
                if(monsterI.isAlive && bulletJ.isAlive) {
                    yMonsterUp = monsterI.position.y;
                    yMonsterDown = monsterI.position.y+(monsterI.sHeight*monsterI.scale);
                    yBulletUp = bulletJ.position.y;
                    yBulletDown = bulletJ.position.y + (bulletJ.sHeight*bulletJ.scale);
                    
                    xDectection = bulletJ.position.x+(bulletJ.sWidth*bulletJ.scale) > monsterI.position.x;

                    up = (yBulletUp < yMonsterUp) && (yBulletDown > yMonsterUp);
                    center = (yBulletUp > yMonsterUp) && (yBulletDown < yMonsterDown);
                    down = (yBulletUp < yMonsterDown) && (yBulletDown > yMonsterDown);

                    if(xDectection && (up || center || down)){
			monsterI.die();
			bulletJ.die();
			this.character.score += 100;
			score.innerHTML = "Score : " + this.character.score;
		    }
                }
            }
        }
    }

}
