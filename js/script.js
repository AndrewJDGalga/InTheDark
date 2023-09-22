const play = document.getElementById('itd-play');
const pause = document.getElementById('itd-pause');
const restart = document.getElementById('itd-restart');
const visualTimer = document.getElementById('itd-visual_timer');
const timoutNotice = document.getElementsByClassName('itd-timeout')[0];

const flipButtonClass = (button1, button2, className) => {
    
};

play.addEventListener('click', ()=>{
    pause.classList.remove('hidden');
    play.classList.add('hidden');
});

pause.addEventListener('click', ()=>{
    pause.classList.add('hidden');
    play.classList.remove('hidden');
});