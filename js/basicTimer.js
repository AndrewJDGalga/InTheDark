/*
    Basic, replaceable timer.
*/


class BasicTimer {
    constructor(startingTime){
        this.currentTime = 0;
        this.startingTime = startingTime;
        this.states = {
            STOPPED : Symbol("stopped"),
            RUNNING : Symbol("running"),
            PAUSED : Symbol("paused"),
        };
        this.state = this.states.STOPPED;
    }
}