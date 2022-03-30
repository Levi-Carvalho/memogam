const game = document.querySelector('.game');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

let allowedToClick = true;
let attempts = 0;
let pontos = 0;
let clicks = 0;
let firstCard = undefined;
let secondCard = null;
let playerName = 'Levi';
let highscore = 0;
let score = 0;


document.querySelector('.game').addEventListener("click", function(e){
  const cardFace = e.target.parentElement;
  const card = cardFace.parentElement;

  if(
    cardFace.classList.contains('face') &&
    !card.classList.contains('disabled') &&
    allowedToClick
    ){
      card.classList.toggle('flip');
      card.classList.toggle('disabled');
      clicks++;
      (clicks !== 0 && clicks === 1) ? firstCard = card : secondCard = card;
    if (clicks === 2){
      allowedToClick = false;

      if(
        firstCard.dataset.id === secondCard.dataset.id &&
        firstCard.dataset.id !== undefined
        ){
        pontos++
        firstCard = 'sol';
        secondCard = 'chuva';
        //casamento de viúva
        clicks = 0;
        setTimeout(() => {
          allowedToClick = true;
        }, 500);
        if (pontos === 9) setTimeout(function(){finish()}, 1500);

      } else if (clicks === 2){
        setTimeout(() => {
          firstCard.classList.toggle('flip');
          firstCard.classList.toggle('disabled');
          secondCard.classList.toggle('flip');
          secondCard.classList.toggle('disabled');
          allowedToClick = true;
          clicks = 0;
        }, 1200);
      }
      attempts++
      mirutights();
    }
    
  } else {}
})

const Kaguya = [
'img/fujiwara.jpg',
'img/hayasaka.jpg',
'img/ishigami.jpg',
'img/kaguya-haysaka.jpg',
'img/kaguya.jpg',
'img/kei.jpg',
'img/miku-ishigami.jpg',
'img/miku.jpg',
'img/zorão.jpg'
];

const cardsHTML = Kaguya.flatMap((add, i) => {
  const cardHTML = `
  <div class="card flip" data-id="${i+1}">
    <div class="face back">
      <img src="${add}">
    </div>
    <div class="face front">
      <img src="img/kaguya-frente.jpg">
    </div>
  </div>
  `
  return [cardHTML, cardHTML]
})

function init() {
  game.querySelector('.cards-container').innerHTML = '';
  emb(cardsHTML).forEach(card => {
    game.querySelector('.cards-container').insertAdjacentHTML('beforeend', card);
  })
}

init()

function finish() {
  pontos = 0;
  clicks = 0;
  attempts = 0;
  highscore = score > highscore ? score : highscore;
  score = 0;
  firstCard = undefined;
  secondCard = undefined;
  mirutights();
  
  displayHigscore.textContent = highscore;

  modal.classList.remove('hidden');
  modal.classList.remove('opacity')
  overlay.classList.remove('hidden');
  overlay.classList.remove('opacity');

  modal.querySelector('h1').textContent = 'Parece que alguém ganhou.'
}

function emb(array) {
  array.forEach((_, i) => {
    const is = Math.trunc(Math.random() * array.length -1);
    [array[i], array[is]] = [array[is], array[i]]
  })
  return array;
}