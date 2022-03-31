const btnStart = document.querySelector('.start');
const restart = document.querySelector('.restart');
const back = document.querySelector('.btn-back');
const capa = document.querySelector('.capa');
const menu = document.querySelector('.nav');

btnStart.addEventListener('click', function (){
  game.classList.remove('hidden');
  init();
  const name = prompt('Kimi no na wa:');
  playerName = (name.length < 21 ? name : false) || '</br> O palhaço caçarola'
  mirutights();
})

overlay.addEventListener('click', () => {
  closeModal();
  game.classList.add('hidden');
})

back.addEventListener('click', function() {
  closeModal();
  game.classList.add('hidden');
  console.log('cheguei');
})

restart.addEventListener('click', function(){
  closeModal();
  init();
})

menu.addEventListener('mouseover', changeOpacity.bind(0.3));
menu.addEventListener('mouseout', changeOpacity.bind(1));

function changeOpacity(e, opacity) {
  const menuList = document.querySelectorAll('.btn-menu');
  if (e.target.classList.contains('btn-menu')){
    menuList.forEach(el => {
      if (el === e.target) return;
      el.style.opacity = this;
    })
  }
}

function closeModal() {
  setTimeout(function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  }, 500)
  modal.classList.add('opacity');
  overlay.classList.add('opacity')
  }