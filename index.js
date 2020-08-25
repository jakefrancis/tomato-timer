//DOM constants
/*
    ~Start/Pause Button
    ~Reset Button
    ~Time Remaining Display
    ~container to hold it all
*/

function Tomato(alarmMin, breakMin) {
  this.container = document.createElement("div");
  this.startButton = document.createElement("button");
  this.resetButton = document.createElement("button");
  this.time = document.createElement("h2");
  this.totalTime = alarmMin * 60;
  this.currentTime = this.totalTime;
  this.breakTime = breakMin * 60;
  this.state = "init";
  this.alarm = new Audio("assets/beep1.mp3");

  this.renderStartButton = function () {
    switch (this.state) {
      case "init":
        this.startButton.textContent = "Start Timer";
        this.container.appendChild(this.startButton);
        this.startButton.onclick = this.start.bind(this);
        break;
      case "start":
        this.startButton.textContent = "Pause Timer";
        this.startButton.onclick = this.pause.bind(this);
        break;
      case "pause":
        this.startButton.textContent = "Start Timer";
        this.startButton.onclick = this.start.bind(this);
        break;
      case "break":
        this.startButton.textContent = "Quit Break";
        this.startButton.onclick = this.quitBreak.bind(this);
        break;
    }
  };

  this.renderResetButton = function () {
    this.resetButton.textContent = "Reset Timer";
    this.container.appendChild(this.resetButton);
    this.resetButton.onclick = this.reset.bind(this);
  };

  this.renderTime = function () {
    switch (this.state) {
      case "init":
        this.time.textContent = this.formatTime(this.currentTime);
        this.container.appendChild(this.time);
        break;
      case "start":
        this.currentTime--;
        this.time.textContent = this.currentTime;
      case "pause":
        this.time.textContent = this.currentTime;
    }
  };

  this.formatTime = function (time) {
    console.log(time);
    let sec = time % 60;
    let min = (time - sec) / 60;
    if (sec < 10) {
      sec = "0" + sec.toString();
    }
    if (min < 10) {
      min = "0" + min.toString();
    }
    let formattedTime = `${min}:${sec}`;
    return formattedTime;
  };

  this.countDown = function () {
    this.currentTime--;
    if (this.currentTime < 0) {
      if (this.state === "start") {
        this.alarm.play();
        this.state = "break";
        this.currentTime = this.breakTime;
      } else {
        this.alarm.play();
        this.reset();
      }
    }
    this.time.textContent = this.formatTime(this.currentTime);
  };

  this.renderTimer = function () {
    switch (this.state) {
      case "init":
        this.renderTime();
        this.renderStartButton();
        this.renderResetButton();
        document.body.appendChild(this.container);
        break;
      case "start":
        this.renderTime();
    }
  };

  this.timeFunc;

  this.start = function () {
    this.state = "start";
    this.renderStartButton();
    this.timeFunc = setInterval(this.countDown.bind(this), 1000);
  };

  this.pause = function () {
    this.state = "pause";
    clearInterval(this.timeFunc);
    this.renderStartButton();
  };

  this.reset = function () {
    this.pause();
    this.state = "init";
    this.currentTime = this.totalTime;
    this.renderTimer();
  };
}

let tomatoTimer = new Tomato(25, 5);

tomatoTimer.renderTimer();
