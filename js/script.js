import BasicTimer from "./BasicTimer.js";

const play = document.getElementById('itd-play');
const pause = document.getElementById('itd-pause');
const restart = document.getElementById('itd-restart');
const visualTimer = document.getElementById('itd-visual_timer');
const timoutNotice = document.getElementsByClassName('itd-timeout')[0];
const timerStartSeconds = 10;
const timer = new BasicTimer(timerStartSeconds);

const flipButtonClass = (button1, button2, className) => {
    button1.classList.remove(className);
    button2.classList.add(className);
};

play.addEventListener('click', ()=>{
    flipButtonClass(pause, play, 'hidden');
    visualTimer.classList.remove('invisible');
    timer.start();
});

pause.addEventListener('click', ()=>{
    flipButtonClass(play, pause, 'hidden');
    timer.pause();
});
