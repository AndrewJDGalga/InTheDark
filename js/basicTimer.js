
export default class BasicTimer {
    constructor(startTimeInSeconds, pageAnchor, eventNumber=0) {
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
        this.eventNumber = eventNumber;
        this.btDone = new Event(`btDone${eventNumber}`, {composed: true});
        this.pageAnchor = pageAnchor;
    }
    
    getCurrentTime() { return this.currentTime; }
    getEventNumber() { return this.eventNumber; }
    timeLeft() { return this.currentTime > 0; }
    stateDone() { 
        this.pageAnchor.dispatchEvent(this.btDone); 
    }

    setStartTime(newTimeInSeconds) { 
        this.refTime = newTimeInSeconds; 
    }

    setState(newState) {
        switch(newState) {
            case this.STATES.DEF_RUN:
                this.stateRun();
                break;
            case this.STATES.NORM_END:
                this.stateDone();
                break;
            case this.STATES.PAUSED:
                this.statePause();
                break;
        }
    }

    setNormEnd() {
        this.currentTime = 0;
        this.statePause();
        this.setState(this.STATES.NORM_END);
    }

    stateRun() {
        this.intervalId = setInterval(()=>{
            this.currentTime--;
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
        } else if (this.timeLeft()) {
           this.setState(this.STATES.DEF_RUN);
        }
    }

    pause() {
        this.setState(this.STATES.PAUSED);
    }

    restart() {
        this.currentTime = this.refTime;
        this.setState(this.STATES.PAUSED);
        this.start();
    }
}