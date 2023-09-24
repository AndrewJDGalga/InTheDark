import BasicTimer from "./BasicTimer.js";

const play = document.getElementById('itd-play');
const pause = document.getElementById('itd-pause');
const restart = document.getElementById('itd-restart');
const visualTimer = document.getElementById('itd-visual_timer');
const timeoutNotice = document.getElementsByClassName('itd-timeout')[0];
const timerStartSeconds = 10;
const timer = new BasicTimer(timerStartSeconds);

let playing = false;

/*
const oscillatFreqMin = 600;
const oscillatFreqMax = 1000;
*/
let oscillatID = null;

let animTime = 2;

const setRandomOscillate = (target) =>{
    if(!target.classList.contains('oscillate')) target.classList.add('oscillate');
    animTime = Math.random() * (4 - 1) + 1;
    target.style.setProperty('--randomized-anim', animTime + 's');
    console.log(target.style.getPropertyValue('--randomized-anim'));
}

const oscillationEnd = () => {
    setRandomOscillate(visualTimer);

    clearTimeout(oscillatID);
    oscillatID = null;

    if(playing){
        startOscillation();
    }
}

const startOscillation = () => {
    if(playing && !oscillatID){
        oscillatID = setTimeout(oscillationEnd, 8160); //Math.floor(Math.random() * (3500 - 1100) + 1100));
        console.log(oscillatID);
    }
}

const flipButtonClass = (button1, button2, className) => {
    button1.classList.remove(className);
    button2.classList.add(className);
};

play.addEventListener('click', ()=>{
    flipButtonClass(pause, play, 'hidden');
    visualTimer.classList.remove('invisible');
    restart.classList.remove('invisible');
    timer.start();
    
    playing = true;
    startOscillation();
});

pause.addEventListener('click', ()=>{
    flipButtonClass(play, pause, 'hidden');
    timer.pause();

    //playing = false;
});

restart.addEventListener('click', ()=>{
    timer.restart();
    flipButtonClass(pause, play, 'hidden');

    playing = true;
})

