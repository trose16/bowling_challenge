function BowlingGame() {
  this.ball = 1;
  this.frameCounter = 1;
  this.frameHolder = [];
  this.rollTracker = [];
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
        this.autoRoll().roll_2;
    } else if (validate <= 10 && this.ball === 2 ) {
        this.nextFrame();
    }
  };

BowlingGame.prototype.nextFrame = function(){
  this.ball = 1;
  this.frameCounter++;
  this.frameHolder = [0, 0];
  // if( this.frameCounter > 10 ) {
  //   throw new Error("You've played 10 frames, start a new game!")
  // };
};

BowlingGame.prototype.frameValidate = function() {
  validate = this.frameHolder.reduce(function(a,b){
    return a+b;
  });
    if ( validate > 10 ) {
        this.rollTracker.pop();
        this.frameHolder.pop();
        throw new Error("Oops! You can't hit more than 10 pins per frame!");
  }
  else if ( validate === 10 && this.ball === 1 ) {
        this.nextFrame();
        return 'STRIKE';
  } else if ( validate === 10 && this.ball === 2 ) {
        this.nextFrame();
        return '/';
  } else if ( validate > 10 && this.ball === 2 ) {
        this.nextFrame();
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
  }
  return calc;
};

BowlingGame.prototype.scoreSpare = function(i) {
  return this.rollTracker[i] + this.rollTracker[i+1] === 10;
};

BowlingGame.prototype.scoreStrike = function(i) {
  return this.rollTracker[i] === 10;
};
