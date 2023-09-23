/*
    Basic, replaceable timer.
*/


class BasicTimer {
    constructor(startingTime){
        this.intervalID = null;
        this.currentTime = 0;
        this.startingTime = startingTime;
        this.states = {
            STOPPED : Symbol("stopped"),
            RUNNING : Symbol("running"),
            PAUSED : Symbol("paused"),
            RESTART : Symbol("restart"),
        };
        this.state = this.states.STOPPED;
    }
    process() {
        switch(this.state) {
            /*
            case RESTART:
                if(this.currentTime < this.startingTime) {
                    this.currentTime = this.startingTime;
                }*/
            case RUNNING:
                this.intervalID = setInterval(()=>{

                });
                break;
            case PAUSED:
                if(this.intervalID) {
                    clearInterval(this.intervalID);
                    this.intervalID = null;
                }
                break;
            case STOPPED:
                if(this.currentTime < this.startingTime) {
                    this.currentTime = this.startingTime;
                }
        }
    }
    restart() {
        this.state = this.states.RESTART;
        process();
    }
    start() {
        this.state = this.states.RUNNING;
        process();
    }
    stop() {
        this.state = this.states.STOPPED;
        process();
    }
    pause() {
        this.state = this.states.PAUSED;
        process();
    }
}