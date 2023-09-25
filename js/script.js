import BasicTimer from "./BasicTimer.js";

const play = document.getElementById('itd-play');
const pause = document.getElementById('itd-pause');
const restart = document.getElementById('itd-restart');
const visualTimer = document.getElementById('itd-visual_timer');
const timeoutNotice = document.getElementsByClassName('itd-timeout')[0];
const timerEndSeconds = 10;

const oscillatFreq = 21600;
let oscillatID = null;
const oscAnimMax = 6;
const oscAnimMin = 1.5;
let oscAnimTime = 2;

const getRanTimePoint = (originalTime, min=0) =>{
    return Math.random() * (originalTime - min) + min;
};

const randomEnd = getRanTimePoint(timerEndSeconds, timerEndSeconds * 0.85)
let break1 = getRanTimePoint(timerEndSeconds * 0.2, timerEndSeconds * 0.05);
let break2 = getRanTimePoint(timerEndSeconds * 0.5, timerEndSeconds * 0.3);
let break3 = getRanTimePoint(timerEndSeconds * 0.8, timerEndSeconds * 0.6);

const itdMainTimer = new BasicTimer(timerEndSeconds, document, 0);
const itdBp1Timer = new BasicTimer(break1, document, 1);
const itdBp2Timer = new BasicTimer(break2, document, 2);
const itdBp3Timer = new BasicTimer(break3, document, 3);

/*
console.log(break1);
console.log(break2);
console.log(break3);
console.log(randomEnd);
*/



const setRandomOscillate = (target) =>{
    if(!target.classList.contains('oscillate')) target.classList.add('oscillate');
    animTime = Math.random() * (oscAnimMax - oscAnimMin) + oscAnimMin;
    target.style.setProperty('--randomized-anim', oscAnimTime + 's');
    
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
        oscillatID = setTimeout(continueOscillation, oscillatFreq);
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
    
    itdMainTimer.start();
    itdBp1Timer.start();
    itdBp2Timer.start();
    itdBp3Timer.start();

    startOscillation();
});

pause.addEventListener('click', ()=>{
    flipButtonClass(play, pause, 'hidden');

    itdMainTimer.pause();
    itdBp1Timer.pause();
    itdBp2Timer.pause();
    itdBp3Timer.pause();

    endOscillation();
});

restart.addEventListener('click', ()=>{
    
    itdMainTimer.restart();
    itdBp1Timer.restart();
    itdBp2Timer.restart();
    itdBp3Timer.restart();

    flipButtonClass(pause, play, 'hidden');
})


document.addEventListener(`btDone${itdMainTimer.getEventNumber()}`, ()=>{
    //console.log('BT done');
    endOscillation();
    visualTimer.classList.add('hidden');
    restart.classList.add('invisible');
    timeoutNotice.classList.remove('hidden');
    flipButtonClass(play, pause, 'hidden');
});

document.addEventListener(`btDone${itdBp1Timer.getEventNumber()}`, ()=>{

});
document.addEventListener(`btDone${itdBp2Timer.getEventNumber()}`, ()=>{
    
});
document.addEventListener(`btDone${itdBp3Timer.getEventNumber()}`, ()=>{
    
});
