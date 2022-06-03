document.querySelectorAll(".drum").forEach(btn=>{
    btn.addEventListener('click', ()=>{
        btn.style.color = 'white';
        var audio = new Audio('./sounds/tom-1.mp3');
        audio.play();
    });
});