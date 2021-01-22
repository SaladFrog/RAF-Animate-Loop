const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let width = canvas.width = 400;
let height = canvas.height = 400;

context.fillStyle = 'grey';
context.fillRect(0, 0, width, height);

let pSize = 20;
let xOff = 0;
let yOff = 0;

this._loop = true;
this._requestAnimId = 0;
this._targetFrameRate = 30;
this._lastFrameTime = window.performance.now();

function draw() {
  const now = window.performance.now();
  const then = now - this._lastFrameTime;
  const frameInterval = 1000.0 / this._targetFrameRate;
  const epsilon = 5;

  if (!this._loop || then >= frameInterval - epsilon) {

    this.redraw();

    this._frameRate = 1000.0 / (now - this._lastFrameTime);
    //var deltaTime = now - this._lastFrameTime;
    //this.deltaTime = now - this._lastFrameTime;
    this._lastFrameTime = now;
  }
  if (this._loop) {
    this._requestAnimId = window.requestAnimationFrame(draw);
  }
}

function redraw() {
  if (xOff === width - pSize && yOff === height - pSize) {
    this._loop = false;
    if(this._requestAnimId) {
    	console.log('stop animation')
    	window.cancelAnimationFrame(this._requestAnimId);
    }
  }
  if (xOff === width) {
    xOff = 0;
    yOff += pSize;
  }
  context.fillStyle = 'black';
  context.fillRect(xOff, yOff, pSize, pSize);
  xOff += pSize;
}

draw();
