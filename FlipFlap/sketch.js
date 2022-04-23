// State and input variables
var state = 0;
var stateInput = null;
var inputHistory = [];
var inputCount = 0;
const inputMax = 3;

// Button variables
var wasPressed = false;

// Frame variables
var prevFramecount = 0;
var frameDelay = 50;

function changeState(newState, newInput) {
  state = newState;
  stateInput = newInput;
  console.log(inputCount);
}

function displayMessage(finalNumber) {
  textAlign(CENTER);
  fill(250);
  square(Ax, Ay, 400);
  fill(0);
  textSize(25);
  let finalText = "hello";
  if (finalNumber == 1) {
    finalText = "One is the loneliest number that you'll ever do.";
  }
  if (finalNumber == 2) {
    finalText =
      "Two can be as bad as one. \n\n It's the loneliest number since the number one";
  }
  if (finalNumber == 3) {
    finalText = "Three is your lucky number!";
  }
  if (finalNumber == 4) {
    finalText = "What did you do that four??? xD";
  }
  if (finalNumber == 5) {
    finalText = "Mambo no. 5";
  }
  if (finalNumber == 6) {
    finalText = "The obligatory aglet."
  }
  if (finalNumber == 7) {
    finalText = "Breaking a mirror is seven years of bad luck"
  }
  if (finalNumber == 8) {
    finalText = "If eight falls over, it's infinite."
  }

  text(finalText, midX - 200, midY - 100, 400);
}

function setup() {
  createCanvas(600, 600);
  //middle
  midX = width / 2;
  midY = height / 2;

  //reference corner
  Ax = midX - 200;
  Ay = midY - 200;

  //color boxes
  yellowBox = new Button(Ax, Ay, 200, 200, "yellow");
  yellowBox.colorChange(color("#FFCC00"), color("#FFE063"));

  greenBox = new Button(Ax, Ay + 200, 200, 200, "green");
  greenBox.colorChange(color("#00CA36"), color("#74D17A"));

  redBox = new Button(Ax + 200, Ay, 200, 200, "red");
  redBox.colorChange(color("#E20000"), color("#FD6B6B"));

  blueBox = new Button(Ax + 200, Ay + 200, 200, 200, "blue");
  blueBox.colorChange(color("#3FC3FF"), color("#9AE0FF"));

  //number boxes 1
  oneBox = new Button(Ax, Ay, 200, 200, 1);
  twoBox = new Button(Ax + 200, Ay, 200, 200, 2);
  fiveBox = new Button(Ax, Ay + 200, 200, 200, 5);
  sixBox = new Button(Ax + 200, Ay + 200, 200, 200, 6);

  //number boxes 2
  threeBox = new Button(Ax, Ay, 200, 200, 3);
  fourBox = new Button(Ax + 200, Ay, 200, 200, 4);
  sevenBox = new Button(Ax, Ay + 200, 200, 200, 7);
  eightBox = new Button(Ax + 200, Ay + 200, 200, 200, 8);
}

function draw() {
  background(220);

  //display history
  let count = 0;
  for (let i = 0; i < inputHistory.length; i++) {
    text(inputHistory[i], 100 + count, 50);
    count += 100;
  }

  //color choice
  if (state == 0) {
    yellowBox.display();
    yellowBox.onClick(1);

    greenBox.display();
    greenBox.onClick(1);

    redBox.display();
    redBox.onClick(1);

    blueBox.display();
    blueBox.onClick(1);
  }

  //number choice
  if (state == 1) {
    if (stateInput == "yellow" || stateInput == "blue") {
      oneBox.display();
      oneBox.onClick(2);

      twoBox.display();
      twoBox.onClick(2);

      fiveBox.display();
      fiveBox.onClick(2);

      sixBox.display();
      sixBox.onClick(2);
    } else {
      threeBox.display();
      threeBox.onClick(2);

      fourBox.display();
      fourBox.onClick(2);

      sevenBox.display();
      sevenBox.onClick(2);

      eightBox.display();
      eightBox.onClick(2);
    }
    if (frameCount > prevFramecount + frameDelay) {
      wasPressed = false;
    }
  }

  //second number choice
  if (state == 2) {
    // even number
    if (stateInput % 2 === 0) {
      if (inputCount < inputMax) {
        changeState(1, inputHistory[0]);
      } else {
        state = 3;
      }
    } else {
      // uneven number
      if (inputCount < inputMax) {
        if (inputHistory[0] == "yellow" || inputHistory[0] == "blue") {
          changeState(1, "red");
        } else {
          changeState(1, "yellow");
        }
      } else {
        state = 3;
      }
    }
  }

  //final state, displays message based on final input
  if (state == 3) {
    displayMessage(inputHistory[inputHistory.length - 1]);
  }
}

// Button class
class Button {
  constructor(buttonX, buttonY, buttonWidth, buttonHeight, buttonText) {
    this.x = buttonX;
    this.y = buttonY;
    this.width = buttonWidth;
    this.height = buttonHeight;
    this.text = buttonText;
    this.color = color("#EAEAEA"); //default color
    this.hoverColor = color("#F8F8F8");
    this.baseColor = this.color;
  }

  //Function to determine if mouse is hovering on button
  mouseOnButton() {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.width &&
      mouseY > this.y &&
      mouseY < this.y + this.height
    ) {
      this.color = this.hoverColor; //hover display color
      return true;
    } else {
      this.color = this.baseColor; //default color
      return false;
    }
  }

  onClick(newState) {
    if (this.mouseOnButton() && mouseIsPressed) {
      console.log("Hello " + this.text);
      if (!wasPressed) {
        inputHistory.push(this.text);
        inputCount++;

        changeState(newState, this.text);
        prevFramecount = frameCount;
        console.log(prevFramecount);
        wasPressed = true;
      }
    }
  }

  colorChange(baseColor, hoverColor) {
    this.baseColor = baseColor;
    this.hoverColor = hoverColor;
  }

  //Function to draw button
  display() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
    textAlign(CENTER);
    fill(0);
    textSize(25);
    text(this.text, this.x, this.y + this.height / 2.5, this.width);
  }
}
