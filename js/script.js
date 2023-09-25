import BasicTimer from "./BasicTimer.js";

const play = document.getElementById('itd-play');
const pause = document.getElementById('itd-pause');
const restart = document.getElementById('itd-restart');
const visualTimer = document.getElementById('itd-visual_timer');
const timeoutNotice = document.getElementsByClassName('itd-timeout')[0];
const timerStartSeconds = 10;
const timer = new BasicTimer(timerStartSeconds);

const getRanTimePoint = (originalTime, multiplier, min=0) =>{
    return Math.random() * ((originalTime * multiplier) - min) + min;
};

const break1 = getRanTimePoint(timerStartSeconds, 0.25, 0.5); //timerStartSeconds*0.25;
const break2 = getRanTimePoint(timerStartSeconds, 0.5, 3); //timerStartSeconds*0.5;
const break3 = getRanTimePoint(timerStartSeconds, 0.75, 6); //timerStartSeconds*0.75;
const endPoint = getRanTimePoint(timerStartSeconds, 1, 7);

/*
console.log(break1);
console.log(break2);
console.log(break3);
console.log(endPoint);
let playing = false;
*/

/*
const oscillatFreqMin = 600;
const oscillatFreqMax = 1000;
*/
let oscillatID = null;

let animTime = 2;

const setRandomOscillate = (target) =>{
    if(!target.classList.contains('oscillate')) target.classList.add('oscillate');
    animTime = Math.random() * (6 - 1.5) + 1.5;
    target.style.setProperty('--randomized-anim', animTime + 's');
    
    //console.log(target.style.getPropertyValue('--randomized-anim'));
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
        oscillatID = setTimeout(oscillationEnd, 21600); //Math.floor(Math.random() * (3500 - 1100) + 1100));
        
        //console.log(oscillatID);
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

