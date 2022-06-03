var previousKey;
// Adding event listener to butoon on click
document.querySelectorAll(".drum").forEach(btn=>{
    btn.addEventListener('click', ()=>{
        if(previousKey){
            removeAnimation(previousKey);
        }
        let btnInnerHtml = btn.innerHTML
        playSound(btnInnerHtml);
        addAnimation(btnInnerHtml);
        previousKey = btnInnerHtml;
    });
});

// Keyboard key press event listener

document.addEventListener('keypress', function(event){
    if(previousKey){
        removeAnimation(previousKey);
    }
    playSound(event.key);
    addAnimation(event.key);
    previousKey = event.key;
});


// This function play sound at specific key
function playSound(key){
    switch (key) {
        case 'w':
            const tom1 = new Audio('./sounds/tom-1.mp3');
            tom1.play();
            break;
        case 'a':
            const tom2 = new Audio('./sounds/tom-2.mp3');
            tom2.play();
            break;
        case 's':
            const tom3 = new Audio('./sounds/tom-3.mp3');
            tom3.play();
            break;
        case 'd':
            const tom4 = new Audio('./sounds/tom-4.mp3');
            tom4.play();
            break;
        case 'j':
            const snare = new Audio('./sounds/snare.mp3');
            snare.play();
            break;
        case 'k':
            const kick = new Audio('./sounds/kick-bass.mp3');
            kick.play();
            break;
        case 'l':
            const crash = new Audio('./sounds/crash.mp3');
            crash.play();
            break;
        default:
            break;
    }
}

// This fucntion is used to add animation class to button that is selected
function addAnimation(key){
    activeButton = document.querySelector("."+key);
    activeButton.classList.add("pressed");
    // for automatically removing animation
    setTimeout(function(){
        activeButton.classList.remove("pressed");
    },100);
}

// This fucntion is used to remove animation class to button that is selected
function removeAnimation(key){
    activeButton = document.querySelector("."+key);
    activeButton.classList.remove("pressed");
    
}