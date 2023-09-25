
export default class BasicTimer {
    constructor(startTimeInSeconds) {
        this.refTime = startTimeInSeconds;
        this.currentTime = 0; //this.refTime;
        this.seconds = 1000;
        this.intervalId = null;
        this.timeoutId = null;
        this.STATES = {
            DEF_RUN : Symbol('default_run'),
            UNPAUSED : Symbol('unpaused'),
            NORM_END : Symbol('normal_end'),
            PAUSED : Symbol('paused'),
        }
        //this.state = this.STATES.PAUSED;
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
            case this.STATES.UNPAUSED:
                console.log('unpause');
                this.stateUnpause();
                break;
            case this.STATES.NORM_END:
                console.log('timeout');
                //this.currentTime = this.refTime;
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
        }, this.seconds * this.currentTime); //this.refTime);
    }

    statePause() {
        if(this.intervalId && this.timeoutId) {
            clearInterval(this.intervalId);
            clearTimeout(this.timeoutId);
        }
        this.intervalId = null;
        this.timeoutId = null;
    }

    stateUnpause() {
        console.log('time left? ' + this.currentTime);

        //clearTimeout(this.timeoutId);
        //this.timeoutId = null;

        this.timeoutId = setTimeout(()=>{
            clearInterval(this.intervalId);
        }, this.seconds * this.currentTime);
    }

    start() {
        if(!this.intervalId && !this.timeoutId && !this.timeLeft()){
            this.currentTime = this.refTime;
            /*
            this.intervalId = setInterval(()=>{
                this.currentTime--;
            }, this.seconds);
            this.timeoutId = setTimeout(()=>{
                clearInterval(this.intervalId);
            }, this.seconds * this.refTime);
            */
           this.setState(this.STATES.DEF_RUN);

        } else if ( this.timeLeft()) {
            /*
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
            this.timeoutId = setTimeout(()=>{
                clearInterval(this.intervalId);
            }, this.seconds * this.currentTime);
            */
           //this.setState(this.STATES.UNPAUSED);
           
           this.setState(this.STATES.DEF_RUN);
        }
    }

    pause() {
        //if(this.intervalId && this.timeoutId){
            /*
            clearInterval(this.intervalId);
            clearTimeout(this.timeoutId);
            this.intervalId = null;
            this.timeoutId = null;
            */
            this.setState(this.STATES.PAUSED);
        //}
    }

    restart() {
        if(this.timeLeft()){
            this.currentTime = this.refTime;
        } else {
            //this.pause();
            this.setState(this.STATES.PAUSED);
        }
        this.start();
    }
}