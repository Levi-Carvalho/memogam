class App extends CommonParts {
  constructor() {
    super();
    this.currentUser;
    
    if(!localStorage.getItem('Accounts')){
      localStorage.setItem('Accounts', JSON.stringify(Accounts))
    }

    btnLogin.addEventListener('click', this._userShowLoginModal.bind(this));
    btnSignUp.addEventListener('click', this._userShowSignUpModal.bind(this));
    submitSignUp.addEventListener('click', this._createAccount.bind(this));
    submitLogin.addEventListener('click', this._userLogin.bind(this));
    overlay.addEventListener('click', this._closeModal.bind(this));
    menu.addEventListener('mouseover', this._changeOpacity.bind(0.5));
    menu.addEventListener('mouseout', this._changeOpacity.bind(1));
    btnHigscores.addEventListener('click', this._showHighscores.bind(this));
    btnLogoff.addEventListener('click', this._userLogoff.bind(this));
    btnStart.addEventListener('click', () => {
      let ggame = new Jogo(this.currentUser);
      this._show(game)
    });

    if(localStorage.getItem('logged')){
      const acc = JSON.parse(localStorage.getItem('logged'));
      this.currentUser = acc.username ;
      this._show(btnStart, btnLogoff);
      this._hide(btnLogin, btnSignUp);
    }
    
  }

  _userLogin() {
    const accs = JSON.parse(localStorage.getItem('Accounts'));

    accs.forEach(acc => {
      if(acc.username === inputUser.value){
        if(acc.password === inputPass.value){
          this.currentUser = inputUser.value;
          this._closeModal();
          this._show(btnStart, btnLogoff)
          this._hide(btnLogin, btnSignUp)
          localStorage.setItem('logged', JSON.stringify(acc))
        } else {this._warn('Não deu mt certo não, meu patrão, ve se ta tudo certo aí');}
      } else {this._warn('Não deu mt certo não, meu patrão, ve se ta tudo certo aí');}
    })

  }

  _userLogoff() {
    this._hide(btnStart, btnLogoff);
    this._show(btnLogin, btnSignUp);
    localStorage.removeItem('logged');
    this.currentUser = '';
  }

  _createAccount() {
    if(
      inputUser.value.length <= 16 &&
      inputPass.value.length > 5
      ){
        const accs = JSON.parse(localStorage.getItem('Accounts'));
        if(accs.some(acc => acc.username === inputUser.value)){
          this._warn('Esse nome de usuário já existe')
          return
        }
        const acc = new Account(inputUser.value, inputPass.value);
        accs.push(acc);
        localStorage.setItem('Accounts', JSON.stringify(accs));
        this._closeModal();
      } else {
        this._warn('senha deve conter ao menos 6 caracteres')
        return
      }  
  }

  _showHighscores() {
    this._show(highscoresModal, overlay);
    const table = highscoresModal.querySelector('table');
    const accs = JSON.parse(localStorage.getItem('Accounts'));
    accs.sort((a, b) => b.highscore - a.highscore);

    table.innerHTML = `
      <tr>
        <th>Rank</th>
        <th>Jogador</th>
        <th>Maior Pontuação</th>
      </tr>
    `
    accs.forEach((user, i) => {
      table.insertAdjacentHTML('beforeend', `
        <tr>
          <td>${i+1}°</td>
          <td>${user.username}</td>
          <td class="score">${user.highscore}</td>
        </tr>
      `)
    })

  }

  _userShowLoginModal() {
    modalTittle.textContent = 'Entrar';
    submitLogin.classList.remove('hidden');
    submitSignUp.classList.add('hidden');
    this._showSignModal();
  }

  _userShowSignUpModal() {
    modalTittle.textContent = 'Cadastrar'
    submitSignUp.classList.remove('hidden');
    submitLogin.classList.add('hidden');
    this._showSignModal();
  }

  _showSignModal() {
    this._show(modalSignInUp, overlay);
  }

  _warn(str){
    this._show(warn)
    warn.textContent =  str;
  }

  _changeOpacity(e, opacity) {
    const menuList = document.querySelectorAll('.btn-menu');
    if (e.target.classList.contains('btn-menu')){
      menuList.forEach(el => {
        if (el === e.target) return;
        el.style.opacity = this;
      })
    }
  }
}

const app = new App();