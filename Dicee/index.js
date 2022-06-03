
const randomNumber1 = Math.floor(Math.random()*6)+1;
const randomNumber2 = Math.floor(Math.random()*6)+1;

const images = document.querySelectorAll('img');
images[0].setAttribute('src',`./images/dice${randomNumber1}.png`);
images[1].setAttribute('src',`./images/dice${randomNumber2}.png`);

let title = document.querySelector('h1');
if(randomNumber1>randomNumber2){
    title.innerHTML = "📌Player 1 Wins!";
}else if(randomNumber2>randomNumber1){
    title.innerHTML = "Player 2 Wins!📌";
}else{
    title.innerHTML = "Draw!";
}