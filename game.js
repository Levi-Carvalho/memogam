class Jogo extends CommonParts {
  constructor(playerName) {
    super();
    this.allowedToClick = true;
    this.attempts = 0;
    this.pontos = 0;
    this.clicks = 0;
    this.firstCard = undefined;
    this.secondCard = null;
    this.playerName = playerName;
    this.highscore;
    this.score = 0;
    this.Kaguya = kaka;
    this.cardsHTML = this._createHTMLcards();

    restart.addEventListener('click', this._restart.bind(this));
    btnClose.addEventListener('click', this._endGame.bind(this));
    game.addEventListener("click", this._clickCard.bind(this));
    back.addEventListener('click', this._back.bind(this));

    this._getPlayerHighscore();
    this._init();

  }

  _getPlayerHighscore() {
    const accs = JSON.parse(localStorage.getItem('Accounts'));
    accs.forEach(acc => {
      if(acc.username === this.playerName) this.highscore = acc.highscore
        })
    localStorage.setItem('Accounts', JSON.stringify(accs))
  }

  _createHTMLcards(){
    const HTMLCards =  this.Kaguya.flatMap((add, i) => {
      const cardHTML = 
        `
          <div class="card flip" data-id="${i+1}">
          <div class="face back">
          <img src="${add}">
          </div>
          <div class="face front">
          <img src="img/kaguya-frente.webp">
          </div>
          </div>
        `
        return [cardHTML, cardHTML]
      })
      return HTMLCards;
  }

  _clickCard(e){
    const cardFace = e.target.parentElement;
    const card = cardFace.parentElement;
  
    if(
      cardFace.classList.contains('face') &&
      !card.classList.contains('disabled') &&
      this.allowedToClick
      ){
        card.classList.toggle('flip');
        card.classList.toggle('disabled');
        this.clicks++;
        (this.clicks !== 0 && this.clicks === 1) ? this.firstCard = card : this.secondCard = card;
      if (this.clicks === 2){
        this.allowedToClick = false;
  
        if(
          this.firstCard.dataset.id === this.secondCard.dataset.id &&
          this.firstCard.dataset.id !== undefined
          ){
          this.pontos++
          this.firstCard = 'sol';
          this.secondCard = 'chuva';
          //casamento de viúva
          this.clicks = 0;
          setTimeout(() => {
            this.allowedToClick = true;
          }, 500);
          if (this.pontos === 9) setTimeout(this._finish.bind(this), 1500);
  
        } else if (this.clicks === 2){
          setTimeout(() => {
            this.firstCard.classList.toggle('flip');
            this.firstCard.classList.toggle('disabled');
            this.secondCard.classList.toggle('flip');
            this.secondCard.classList.toggle('disabled');
            this.allowedToClick = true;
            this.clicks = 0;
            
          }, 1200);
        }
        this.attempts++
        this._mirutights();
      }
      
    } else {}
  }

  _init() {
    game.querySelector('.cards-container').innerHTML = '';
    this._emb(this.cardsHTML).forEach(card => {
      game.querySelector('.cards-container').insertAdjacentHTML('beforeend', card);
    })
    this._mirutights();
  }

  _finish() {
    this.pontos = 0;
    this.clicks = 0;
    this.attempts = 0;
    this.highscore = this.score;
    this.score = 0;
    this.firstCard = undefined;
    this.secondCard = undefined;
    this._mirutights();

    const accs = JSON.parse(localStorage.getItem('Accounts'));
    accs.forEach(acc => {
      if(acc.username === this.playerName){
        this.highscore > acc.highscore ? acc.highscore = this.highscore: 0;
        console.log(acc.highscore)
        console.log(accs)
        console.log(this.playerName)
      }
    })
    localStorage.setItem('Accounts', JSON.stringify(accs))
    displayHigscore.textContent = this.highscore;
    modal.classList.remove('hidden');
    modal.classList.remove('opacity')
    overlay.classList.remove('hidden');
    overlay.classList.remove('opacity');
    modal.querySelector('h1').textContent = 'Ouvi dizer que alguém ganhou.'
  }

  _endGame(){
    this._finish();
    modal.querySelector('h1').textContent = 'Atumalaca'
}

  _emb(array) {
    array.forEach((_, i) => {
      const is = Math.trunc(Math.random() * array.length -1);
      [array[i], array[is]] = [array[is], array[i]]
    })
    return array;
  }

  _restart(){
    this._closeModal();
    this._init();
  }

  _back() {
    this._closeModal();
    this._hide(game)
    console.log('cheguei');
  }

  _mirutights(){
    displayName.innerHTML = this.playerName;
    this.score = (Math.ceil((this.pontos/this.attempts) * 1000)) || "0";
    displayAttempts.textContent = this.attempts || '0';
    displayPoints.textContent = this.score;
    displayHigscore.textContent = this.highscore;
  }
}