import BasicTimer from "./BasicTimer.js";

const play = document.getElementById('itd-play');
const pause = document.getElementById('itd-pause');
const restart = document.getElementById('itd-restart');
const visualTimer = document.getElementById('itd-visual_timer');
const timoutNotice = document.getElementsByClassName('itd-timeout')[0];
const timerStartSeconds = 10;
const timer = new BasicTimer(timerStartSeconds);

let playing = false;

const oscillatFreqMin = 600;
const oscillatFreqMax = 1000;
let oscillatID = null;

/*
const startVisualTimer = (timeleft, break1, break2, break3) = () => {
    oscillationID = setInterval(()=>{

    }, );
};*/

/*
const oscillationEnd = () => {

    if(playing){
        startOscillation();
    }
}

const startOscillation = () => {
    if(playing && !oscillatID){
        oscillatID = setTimeout(oscillationEnd, Math.floor(Math.random() * (oscillatFreqMax - oscillatFreqMin) + oscillatFreqMin));
    }
}
*/

const flipButtonClass = (button1, button2, className) => {
    button1.classList.remove(className);
    button2.classList.add(className);
};

play.addEventListener('click', ()=>{
    flipButtonClass(pause, play, 'hidden');
    visualTimer.classList.remove('invisible');
    restart.classList.remove('invisible');
    timer.start();
    
    //startOscillation();

    playing = true;
});

pause.addEventListener('click', ()=>{
    flipButtonClass(play, pause, 'hidden');
    timer.pause();

    playing = false;
});

restart.addEventListener('click', ()=>{
    timer.restart();
    flipButtonClass(pause, play, 'hidden');

    playing = true;
})

