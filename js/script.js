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
//let oscAnimTime = 2;

let randomEnd = 0;
let break1 = 0;
let break2 = 0;
let fresh = true;

//testtrack
const audioTrack = new Audio('./assets/audio/Hello, Failure.wav'); //new Audio('./assets/audio/jumpscare_test.wav');
const audioSting = new Audio('./assets/audio/Jumpscare Sound Effect.mp3');

//from Mozilla
const getRanTimePoint = (max, min=0) =>{
    return Math.random() * (max - min) + min;
};

const randomizeBreaks = () =>{
    randomEnd = getRanTimePoint(timerEndSeconds + (timerEndSeconds * 0.2), timerEndSeconds * 0.8)
    break1 = getRanTimePoint(timerEndSeconds * 0.3, timerEndSeconds * 0.1);
    break2 = getRanTimePoint(timerEndSeconds * 0.7, timerEndSeconds * 0.4);

    itdMainTimer.setStartTime(randomEnd);
    itdBp1Timer.setStartTime(break1);
    itdBp2Timer.setStartTime(break2);

    /*
    console.log(randomEnd);
    console.log(break1);
    console.log(break2);
    */
}

const resetVisualTimer = () => {
    if(!visualTimer.classList.contains('full')){
        visualTimer.classList.add('full');    
    }
    visualTimer.classList.remove('mid');
    visualTimer.classList.remove('last');
};

const itdMainTimer = new BasicTimer(randomEnd, document, 0);
const itdBp1Timer = new BasicTimer(break1, document, 1);
const itdBp2Timer = new BasicTimer(break2, document, 2);

const setRandomOscillate = (target) =>{
    if(!target.classList.contains('oscillate')) target.classList.add('oscillate');
    let oscAnimTime = getRanTimePoint(oscAnimMax, oscAnimMin); //Math.random() * (oscAnimMax - oscAnimMin) + oscAnimMin;
    target.style.setProperty('--randomized-anim', oscAnimTime + 's');
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
    if(fresh){
        randomizeBreaks();
        resetVisualTimer();
        fresh = false;
    }

    flipButtonClass(pause, play, 'hidden');
    visualTimer.classList.remove('invisible');
    visualTimer.classList.remove('hidden');
    restart.classList.remove('invisible');

    if(!timeoutNotice.classList.contains('hidden')) timeoutNotice.classList.add('hidden');
    
    itdMainTimer.start();
    itdBp1Timer.start();
    itdBp2Timer.start();

    startOscillation();

    if(audioTrack.readyState === 4){
        audioTrack.play();
    }
    audioSting.pause();
    audioSting.currentTime = 0;
});

pause.addEventListener('click', ()=>{
    flipButtonClass(play, pause, 'hidden');

    itdMainTimer.pause();
    itdBp1Timer.pause();
    itdBp2Timer.pause();

    endOscillation();

    audioTrack.pause();
});

restart.addEventListener('click', ()=>{
    randomizeBreaks();
    resetVisualTimer();

    itdMainTimer.restart();
    itdBp1Timer.restart();
    itdBp2Timer.restart();

    audioTrack.currentTime = 0;

    flipButtonClass(pause, play, 'hidden');
})

document.addEventListener(`btDone${itdMainTimer.getEventNumber()}`, ()=>{
    randomizeBreaks();
    resetVisualTimer();
    endOscillation();
    visualTimer.classList.add('hidden');
    restart.classList.add('invisible');
    timeoutNotice.classList.remove('hidden');
    flipButtonClass(play, pause, 'hidden');

    fresh = true;

    audioTrack.pause();
    audioTrack.currentTime = 0;
    audioSting.play();
});

document.addEventListener(`btDone${itdBp1Timer.getEventNumber()}`, ()=>{
    visualTimer.classList.remove('full');
    visualTimer.classList.add('mid');
});
document.addEventListener(`btDone${itdBp2Timer.getEventNumber()}`, ()=>{
    visualTimer.classList.remove('mid');
    visualTimer.classList.add('last');
});
