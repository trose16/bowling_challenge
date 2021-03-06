function BowlingGame() {
  this.ball = 1;
  this.frameCounter = 1;
  this.frameHolder = [];
  this.rollTracker = [];
};

BowlingGame.prototype.isSinglePoints = function() {
  this.frameHolder.length === 2;
  this.frameCounter != 10;
};

BowlingGame.prototype.isSpare = function() {
  this.frameCalculate() === 10;
  this.ball === 2;
  this.frameCounter != 10;
};

BowlingGame.prototype.isStrike = function() {
  this.frameHolder[0] === 10;
  this.frameCounter != 10;
};

BowlingGame.prototype.spareBonus = function() {
  this.frameCalculate() === 10;
  this.frameHolder.length === 2;
  this.frameCounter === 10;
};

BowlingGame.prototype.strikeBonusOne = function() {
  this.frameHolder[0] === 10;
  this.frameHolder.length === 1;
  this.frameCounter === 10;
};

BowlingGame.prototype.strikeBonusTwo = function() {
  this.frameHolder[0] === 10;
  this.frameHolder[1] === 10;
  this.frameHolder.length === 2;
  this.frameCounter === 10;
};

BowlingGame.prototype.gameOverSingle = function() {
  this.frameCalculate() < 10;
  this.frameHolder.length === 2;
  this.frameCounter === 10;
};

BowlingGame.prototype.gameOverSpare = function() {
  this.frameCalculate() != 30;
  this.frameHolder.length === 3;
  this.frameCounter === 10;
};

BowlingGame.prototype.gameOverDoubleStrike = function() {
  this.frameCalculate() != 30;
  this.frameHolder.length === 3;
  this.frameCounter === 10;
};

BowlingGame.prototype.scoreSpare = function(i) {
  return this.rollTracker[i] + this.rollTracker[i+1] === 10;
};

BowlingGame.prototype.scoreStrike = function(i) {
  return this.rollTracker[i] === 10;
};

BowlingGame.prototype.roll = function(pins){
  this.rollTracker.push(pins);
  if ( this.ball === 1 ) {
        this.frameHolder[0] = pins;
        this.ball++;
        return this.frameValidate();
  } else if ( this.ball === 2 ) {
        this.frameHolder[1] = pins;
        return this.frameValidate();
        this.nextFrame();
  } else if ( this.ball === 3 ) {
        this.frameHolder[2] = pins;
        return this.frameValidate();
  } else if ( this.ball === 0 ) {
        return this.gameReset();
  }
};

BowlingGame.prototype.autoRoll = function(){
  pins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  if ( this.ball === 1 ) {
      roll_1 = pins[Math.floor(Math.random() * pins.length)];
      this.rollTracker.push(roll_1);
      this.frameHolder[0] = roll_1;
      this.ball++;
      return roll_1;
  } else if ( this.ball === 2 ) {
      roll_2 = pins[Math.floor(Math.random() * pins.length)];
      this.rollTracker.push(roll_2);
      this.frameHolder[1] = roll_2;
      this.autoFrameValidate();
      return roll_2;
  }
};

BowlingGame.prototype.autoFrameValidate = function() {
  validate = this.frameHolder.reduce(function(a,b){
    return a+b;
  });
      if (validate > 10 ) {
        this.rollTracker.pop();
        this.frameHolder.pop();
        this.autoRoll().roll_2;
    } else {
      return this.frameValidate();
    }
  };

BowlingGame.prototype.frameValidate = function() {
  if ( this.frameCalculate() > 10 && this.frameCounter != 10 ) {
      this.ball = 2;
      this.rollTracker.pop();
      this.frameHolder.pop();
      throw new TypeError("Oops! You can't hit more than 10 pins per frame!");
  } else if ( this.isSinglePoints() ) {
      this.nextFrame();
  } else if ( this.isSpare() ) {
      this.nextFrame();
      return '/';
  } else if ( this.isStrike() ) {
      this.nextFrame();
      return 'X';
  } else if ( this.frameCounter === 10 ) {
      return this.tenthFrameBonus();
  } else {
      return this.gameOver();
  }
};

BowlingGame.prototype.nextFrame = function(){
  this.ball = 1;
  this.frameCounter++;
  this.frameHolder = [];
  if ( this.frameCounter > 10 ) {
    throw new TypeError("You've played 10 frames, start a new game!")
  }
};

BowlingGame.prototype.tenthFrame = function() {
  if ( this.spareBonus() ) {
        this.ball++;
        return 'Spare bonus roll';
  } else if ( this.strikeBonusOne() ) {
        return 'Strike bonus roll 1';
  } else if ( this.strikeBonusTwo() ){
        this.ball = 3;
        return "Strike bonus roll 2";
  }
};

BowlingGame.prototype.frameCalculate = function() {
  this.frameHolder.reduce(function(a,b){
    return a+b;
  });
};

BowlingGame.prototype.gameOver = function() {
  if ( this.gameOverSingle() ) {
      this.ball = 0;
      return "Game Over! Your Score: " + this.score();
  } else if ( this.gameOverSpare() ) {
      this.ball = 0;
      return "Game Over! Your Score: " + this.score();
  } else if ( this.gameOverDoubleStrike() ){
      this.ball = 0;
      return "Game Over! Your Score: " + this.score();
  }
};

BowlingGame.prototype.score = function() {
  let calc = 0;
  let i = 0;
  for (var frame = 0; frame < 10; frame++) {
      if (this.scoreStrike(i)) {
          calc += 10 + this.rollTracker[i+1] + this.rollTracker[i+2];
          i++;
      } else if (this.scoreSpare(i)){
          calc += 10 + this.rollTracker[i+2];
          i+=2;
      } else {
          calc += this.rollTracker[i] + this.rollTracker[i+1];
          i+=2;
      }
  };
  return calc;
};

BowlingGame.prototype.gameReset = function(){
  this.ball = 1;
  this.frameCounter = 1;
  this.frameHolder = [];
  this.rollTracker = [];
  return "You've started a new game of 10 pin bowling!";
};

BowlingGame.prototype.frameLayout = function(){
  frames = this.rollTracker;
  frame = 1;
  for (i = 0; frames; i++) {
    // add logic for returning frames in pairs from index 0
  };
};
