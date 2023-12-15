// eslint-disable-next-line no-unused-vars
import logoQuizzLer from '../../img/logo-site.png';
import { isAuthenticated, isAdmin  } from '../../utils/auths';

const Navbar = () => {
  const navbarWrapper = document.querySelector('#navbarWrapper');

  const renderAuthLinks = () => {
    if (isAuthenticated()) {
      // Si l'utilisateur est authentifié, affiche "Logout"
      return `
         
      <li class="nav-item"><a class="nav-link" href="#" data-uri="/leaderboard">Classement</a></li>
        <li class="nav-item"><a class="nav-link" href="#" data-uri="/logout">Se déconnecter</a></li>
        <li class="nav-item"><a class="nav-link" href="#" data-uri="/deleteUser">Supprimer le profil</a></li>
        
      `;
    } 
      // Si l'utilisateur n'est pas authentifié, affiche "Login" et "Register"
      return `
        <li class="nav-item"><a class="nav-link" href="#" data-uri="/login">Se connecter</a></li>
        <li class="nav-item"><a class="nav-link" href="#" data-uri="/register">Créer un compte</a></li>
      `;
    
  };

  const renderAdminLinks = () => {
    if(isAdmin()){
      return `<li class="nav-item"> <a class="nav-link" href="#" data-uri="/creationQuizz">Création d'un quizz</a> </li>`;
    }
      return ``;
  };

  const navbar = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#" data-uri="/">
          <img src="${logoQuizzLer}" alt="Logo" width="100" height="100" class="d-inline-block align-top" href="/" data-uri="/">
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#" data-uri="/aboutUs">A propos de nous</a>
            </li>
            ${renderAdminLinks()}
            ${renderAuthLinks()}
          </ul>
        </div>
      </div>
    </nav>
  `;

  navbarWrapper.innerHTML = navbar;
};

export default Navbar;
