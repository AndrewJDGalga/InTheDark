const play = document.getElementById('itd-play');
const pause = document.getElementById('itd-pause');
const restart = document.getElementById('itd-restart');
const visualTimer = document.getElementById('itd-visual_timer');
const timoutNotice = document.getElementsByClassName('itd-timeout')[0];
const timerStartSeconds = 10;
let timerCurrent = timerStartSeconds;

/*
const seconds = 1000;
let break1 = 2;
let break2 = 5;
let break3 = 7;
let intervalId = null;
let timeoutId = null

const timer = () => {
    if(intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        clearTimeout(timeoutId);
        timeoutId = null;
        timerCurrent = timerStartSeconds;
    } else {
        intervalId = setInterval(()=>{
            timerCurrent--;
            console.log(timerCurrent);
            if(timerCurrent === break1) console.log('break1');
            if(timerCurrent === break2) console.log('break2');
            if(timerCurrent === break3) console.log('break3');
        }, seconds);
        timeoutId = setTimeout(()=>{
            clearInterval(intervalId);
            console.log('stopped, timeleft: ' + timerCurrent);
        }, timerStartSeconds * seconds);
    }
};*/

const flipButtonClass = (button1, button2, className) => {
    button1.classList.remove(className);
    button2.classList.add(className);
};

play.addEventListener('click', ()=>{
    flipButtonClass(pause, play, 'hidden');
    visualTimer.classList.remove('invisible');
    //timer();
});

pause.addEventListener('click', ()=>{
    flipButtonClass(play, pause, 'hidden');
    //timer();
});
