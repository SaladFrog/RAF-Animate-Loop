import now from "right-now";
import EventEmitter from "events";
import raf from "raf";

/*
* Set to 30 frame/s
*
*let count = 0;
*var loop = new Loop(function (dt) {
*  console.log(dt);
*  count++;
*  if (count >= 10) {
*    loop.stop();
*  }
*}, 30).start();
*/

class Loop {
  constructor(callBack, frameRate) {
    this.nEvent = new EventEmitter();

    this._loop = true;
    this._requestAnimId = 0;
    this._targetFrameRate = frameRate || 60;
    this._lastFrameTime = now();
    this._tick = this.tick.bind(this);

    if (callBack) {
      this.nEvent.on("tick", callBack);
    }
  }

  start() {
    if (this._loop) {
      this._requestAnimId = raf(this._tick);
    }
    return this;
  }

  stop() {
    this._loop = false;
    if (this._requestAnimId) {
      raf.cancel(this._requestAnimId);
    }
    this._requestAnimId = 0;
    return this;
  }

  tick() {
    const rightNow = now();
    const then = rightNow - this._lastFrameTime;
    const frameInterval = 1000.0 / this._targetFrameRate;
    const epsilon = 5;

    if (!this._loop || then >= frameInterval - epsilon) {
      this.deltaTime = rightNow - this._lastFrameTime;
      this.nEvent.emit("tick", this.deltaTime);
      this._lastFrameTime = rightNow;
    }

    if (this._loop) {
      this._requestAnimId = raf(this._tick);
    }
  }
}

export default Loop;
