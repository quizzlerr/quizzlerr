import quizzlerLogo from "../../img/logo-site.png";
import { setAuthenticatedUser } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';
import { registerUser } from '../../utils/authsQueries';

const RegisterPage = () => {
    clearPage();
    renderPageTitle('Register');
    renderRegisterPage();
    addListenerToConfidentialityText();
};

function renderRegisterPage() {

    const main = document.querySelector('main');
    main.innerHTML = 
    `
    <div class="container-register">
        <div class="left-container">
            <div class="center-content">
                <img src="${quizzlerLogo}" alt="" class="img-fluid">
                <h1>QUIZZLER</h1>
            </div>
        </div>
        <div class="right-container">
            <div class="center-content">
                <h1>créer un compte</h1>
                <form id="registerForm">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email"  name="email" id="registerEmail">
                    </div>
                    <div class="form-group">
                        <label for="username">nom d'utilisateur</label>
                        <input type="text"  name="username" id="registerUsername">
                    </div>
                    <div class="form-group">
                        <label for="password">mot de passe</label>
                        <input type="password" name="password" id="registerPassword">
                    </div>
                    <div class="form-group">
                        <label for="confirmPassword">confirmation du mot de passe</label>
                        <input type="password" name="confpassword" id="registerConfPassword">
                    </div>
                    <div class="form-group">
                        <p>
                            En vous inscrivant, vous acceptez<br>
                            nos <a id="href-confidentiality">conditions générales d'utilisation</a>
                        </p>
                    </div>
                    <div class="form-group">
                        <input type="submit" id="submitBtn">
                    </div>
                </form>
                <a href="/login">Vous possédez un compte ?</a>
            </div>
        </div>
    </div>`;

    const submitButton = document.querySelector("#registerForm");
    submitButton.addEventListener('submit', onRegister);

};

function addListenerToConfidentialityText() {

    const text = document.querySelector('#href-confidentiality');

    text.style.cursor = 'pointer';
    text.style.textDecoration = 'underline';

    text.addEventListener('click', (e) => { onConfidentialityText(e) });

}
function onConfidentialityText(e) {

    e.preventDefault();

    Navigate(`${process.env.PATH_PREFIX}confidentiality`);

    return true;

}

async function onRegister(e) {
    e.preventDefault();

    const email = document.querySelector('#registerEmail').value;
    const password = document.querySelector('#registerPassword').value;
    const confPassword = document.querySelector('#registerConfPassword').value;
    const username = document.querySelector('#registerUsername').value;

    if (password !== confPassword) {
        throw new Error ("Passwords do not match");
    };

    const authenticatedUser = await registerUser( email, username, password );

    setAuthenticatedUser(authenticatedUser);
        
    Navbar();

    Navigate('/');

    return true;
}

  export default RegisterPage;