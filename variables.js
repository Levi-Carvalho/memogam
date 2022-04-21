const btnStart = document.querySelector('.start');
const btnLogoff = document.querySelector('.logoff');
const btnHigscores = document.querySelector('.highscores');
const restart = document.querySelector('.restart');
const back = document.querySelector('.btn-back');
const capa = document.querySelector('.capa');
const menu = document.querySelector('.nav');

const btnLogin = document.querySelector('.login');
const btnSignUp = document.querySelector('.signUp');

const game = document.querySelector('.game');
const modal = document.querySelector('.modal');
const modalTittle = document.querySelector('.modal-h1-sign');
const overlay = document.querySelector('.overlay');

const displayName = document.querySelector('.display-name');
const displayPoints = document.querySelector('.display-points');
const displayAttempts = document.querySelector('.display-attempts');
const displayHigscore = document.querySelector('.display-highscore');
const btnClose = document.querySelector('.btn-close');

const modalSignInUp = document.querySelector('.sign-in-up');
const inputUser = document.querySelector('.input-username');
const inputPass = document.querySelector('.input-password');
const submitLogin = document.querySelector('.submit-login');
const submitSignUp = document.querySelector('.submit-signUp');
const highscoresModal = document.querySelector('.show-highscores');
const warn = document.querySelector('.warning');


class Account {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.highscore = 0;
    inputUser.value = '';
    inputPass.value = '';
  }
  
}

class CommonParts {
  constructor(){}

  _closeModal() {
    document.querySelectorAll('.modal').forEach(el => this._hide(el));
    this._hide(warn, overlay, overlay);
  }

  _show(...el) {
    el.forEach(el => {
      el.classList.remove('hidden');
     setTimeout(function(){el.classList.remove('opacity')}, 0);
    })
  }

  _hide(...el) {
    el.forEach(el => {
      setTimeout(function(){el.classList.add('hidden')}, 500);
      el.classList.add('opacity');
    })
  }

}