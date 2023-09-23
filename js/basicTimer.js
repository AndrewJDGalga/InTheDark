
export default class BasicTimer {
    constructor(startTimeInSeconds) {
        this.refTime = startTimeInSeconds;
        this.currentTime = this.refTime;
        this.seconds = 1000;
        this.intervalId = null;
        this.timeoutId = null;
    }
    getCurrentTime() { return this.currentTime; }
    isRunning() { return this.currentTime > 0; }

    setStartTime(newTimeInSeconds) { this.refTime = newTimeInSeconds; }

    start() {
        console.log('start');
        this.intervalId = setInterval(()=>{
            this.currentTime--;
            console.log('time: ' + this.currentTime);
        }, this.seconds);
        this.timeoutId = setTimeout(()=>{
            clearInterval(this.intervalId);
            console.log('timeout');
        }, this.seconds * this.refTime);
    }

    pause() {
        console.log('pause');
        if(this.intervalId && this.timeoutId){
            clearInterval(this.intervalId);
            clearTimeout(this.timeoutId);
            this.intervalId = null;
            this.timeoutId = null;
        }
    }

    restart() {
        console.log('restart');
        this.currentTime = this.refTime;
        start();
    }
}