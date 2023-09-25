import BasicTimer from "./BasicTimer.js";

const play = document.getElementById('itd-play');
const pause = document.getElementById('itd-pause');
const restart = document.getElementById('itd-restart');
const visualTimer = document.getElementById('itd-visual_timer');
const timeoutNotice = document.getElementsByClassName('itd-timeout')[0];
const timerStartSeconds = 2;
const timer = new BasicTimer(timerStartSeconds, document);

const getRanTimePoint = (originalTime, multiplier, min=0) =>{
    return Math.random() * ((originalTime * multiplier) - min) + min;
};

const break1 = getRanTimePoint(timerStartSeconds, 0.5, 0.5); //timerStartSeconds*0.25;
const break2 = getRanTimePoint(timerStartSeconds, 0.75, 3); //timerStartSeconds*0.5;
const endPoint = getRanTimePoint(timerStartSeconds, 1, 7);

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

const clearOscillation = () => {
    clearTimeout(oscillatID);
    oscillatID = null;
}

const endOscillation =() => {
    clearOscillation();
    visualTimer.classList.remove('oscillate');
};

const startOscillation = () => {
    if(!oscillatID){
        visualTimer.classList.add('oscillate');
        oscillatID = setTimeout(continueOscillation, 21600); //Math.floor(Math.random() * (3500 - 1100) + 1100));
    }
}

const continueOscillation = () => {
    setRandomOscillate(visualTimer);
    clearOscillation();
    startOscillation();
};

const flipButtonClass = (button1, button2, className) => {
    button1.classList.remove(className);
    button2.classList.add(className);
};

play.addEventListener('click', ()=>{
    flipButtonClass(pause, play, 'hidden');
    visualTimer.classList.remove('invisible');
    visualTimer.classList.remove('hidden');
    restart.classList.remove('invisible');

    if(!timeoutNotice.classList.contains('hidden')) timeoutNotice.classList.add('hidden');
    
    timer.start();
    startOscillation();
});

pause.addEventListener('click', ()=>{
    flipButtonClass(play, pause, 'hidden');
    timer.pause();

    endOscillation();
});

restart.addEventListener('click', ()=>{
    timer.restart();
    flipButtonClass(pause, play, 'hidden');
})


document.addEventListener('btDone', ()=>{
    console.log('BT done');
    endOscillation();
    visualTimer.classList.add('hidden');
    restart.classList.add('invisible');
    timeoutNotice.classList.remove('hidden');
    flipButtonClass(play, pause, 'hidden');
});

//timer.stateDone();