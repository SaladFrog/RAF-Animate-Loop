var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var width = canvas.width = 400;
var height = canvas.height = 400;

var zOff = 0;

var loop = true;
var requestAnimId = 0;
var targetFrameRate = 10;
var lastFrameTime = window.performance.now();

function draw() {
  var now = window.performance.now();
  var time_since_last = now - lastFrameTime;
  var target_time_between_frames = 1000.0 / targetFrameRate;
  var epsilon = 5;

  if (!loop ||
    time_since_last >= target_time_between_frames - epsilon) {

    redraw();

    var frameRate = 1000.0 / (now - lastFrameTime);
    var deltaTime = now - lastFrameTime;
    lastFrameTime = now;
  }
  if (loop) {
    requestAnimId = window.requestAnimationFrame(draw);

  }
}

function redraw() {
  context.fillRect(zOff,0,5,5);
  zOff += 5;
}

draw();
