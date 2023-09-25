
export default class BasicTimer {
    constructor(startTimeInSeconds) {
        this.refTime = startTimeInSeconds;
        this.currentTime = 0;
        this.seconds = 1000;
        this.intervalId = null;
        this.timeoutId = null;
        this.STATES = {
            DEF_RUN : Symbol('default_run'),
            NORM_END : Symbol('normal_end'),
            PAUSED : Symbol('paused'),
        }
    }
    getCurrentTime() { return this.currentTime; }
    timeLeft() { return this.currentTime > 0; }

    setStartTime(newTimeInSeconds) { this.refTime = newTimeInSeconds; }

    setState(newState) {
        switch(newState) {
            case this.STATES.DEF_RUN:
                console.log('run');
                this.stateRun();
                break;
            case this.STATES.NORM_END:
                console.log('timeout');
                break;
            case this.STATES.PAUSED:
                console.log('pause');
                this.statePause();
                break;
        }
    }

    setNormEnd() {
        this.setState(this.setState.NORM_END);
    }

    stateRun() {
        this.intervalId = setInterval(()=>{
            this.currentTime--;
            console.log(this.currentTime);
        }, this.seconds);
        this.timeoutId = setTimeout(()=>{
            clearInterval(this.intervalId);
            this.setNormEnd();
        }, this.seconds * this.currentTime);
    }

    statePause() {
        if(this.intervalId && this.timeoutId) {
            clearInterval(this.intervalId);
            clearTimeout(this.timeoutId);
        }
        this.intervalId = null;
        this.timeoutId = null;
    }

    start() {
        if(!this.intervalId && !this.timeoutId && !this.timeLeft()){
            this.currentTime = this.refTime;
           this.setState(this.STATES.DEF_RUN);
        } else if ( this.timeLeft()) {
           this.setState(this.STATES.DEF_RUN);
        }
    }

    pause() {
        this.setState(this.STATES.PAUSED);
    }

    restart() {
        if(this.timeLeft()){
            this.currentTime = this.refTime;
        } else {
            this.setState(this.STATES.PAUSED);
        }
        this.start();
    }
}