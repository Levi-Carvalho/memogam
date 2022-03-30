const displayName = document.querySelector('.display-name');
const displayPoints = document.querySelector('.display-points');
const displayAttempts = document.querySelector('.display-attempts');
const displayHigscore = document.querySelector('.display-highscore');
const btnClose = document.querySelector('.btn-close');

function mirutights(){
  displayName.innerHTML = playerName;
  score = (Math.ceil((pontos/attempts) * 1000)) || "0";
  displayAttempts.textContent = attempts || '0';
  displayPoints.textContent = score;
}

btnClose.addEventListener('click', () => {
  finish();
  modal.querySelector('h1').textContent = 'Atumalaca';
})