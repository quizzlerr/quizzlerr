import quizzlerLogo from '../../img/logo-site.png';
import { setAuthenticatedUser } from '../../utils/auths';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';
import { loginUser } from '../../utils/authsQueries';

const LoginPage = () => {
  renderLoginPage();
  addListenerToRegisterText();
};

function renderLoginPage() {
  const main = document.querySelector('main');
  main.innerHTML = `
    <div class="container-login">
        <div class="left-container">
            <div class="center-content">
                <img src="${quizzlerLogo}" alt="" class="img-fluid">
                <h1>QUIZZLER</h1>
            </div>
        </div>
        <div class="right-container">
            <div class="center-content">
                <h1>se connecter</h1>
                <form id="loginForm">
                    <div class="form-group">
                        <label for="username">nom d'utilisateur</label>
                        <input type="text"  name="username" id="username">
                    </div>
                    <div class="form-group">
                        <label for="password">mot de passe</label>
                        <input type="password" name="password" id="password">
                    </div>
                    <div class="form-group">
                        <input type="submit" id="submitBtn">
                    </div>
                </form>
                <a id="href-register">Vous n'avez pas de compte ?</a>
            </div>
        </div>
    </div>

    `;
  const submitButton = document.querySelector('#loginForm');
  submitButton.addEventListener('submit', onLogin);
}


function addListenerToRegisterText() {
    const text = document.querySelector('#href-register');

    text.style.cursor = 'pointer';
    text.style.textDecoration = 'underline';

    text.addEventListener('click', (e) => {
        onLoginText(e);
    });
};

function onLoginText(e) {
    e.preventDefault();

    Navigate(`/register`);

    return true;
};

async function onLogin(e) {
  e.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const authenticatedUser = await loginUser(username, password);

  setAuthenticatedUser(authenticatedUser);
  Navbar();

  Navigate('/');

  return true;
}

export default LoginPage;
