class endGame {
    constructor() {
      this.i = 0;
      this.finBG = new Image();
      this.finBG.src = "images/game_over.jpg"
      this.sWidth = widthScreen;
      this.sHeight = heightScreen;
    }

    draw() {
      ctx.drawImage(this.finBG,
                    0,
                    0,
                    2048,
                    1152,
                    0,
                    0,
                    this.sWidth,
                    this.sHeight
                   );
	}

    update() {
      this.sWidth = widthScreen;
      this.sHeight = heightScreen;
    }
  }
