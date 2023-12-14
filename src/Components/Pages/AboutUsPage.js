import imageAlexis from "../../img/Alexis.jpg";
import imageSimon from "../../img/Simon.jpg";
import imageIsmet from "../../img/Ismet.jpg";
import imageKeyvan from "../../img/Keyvan.jpg";
import imageNico from "../../img/Nicolas.jpg";

const aboutUs = () => {
  const main = document.querySelector('main');
  main.innerHTML = `
  <div class = "box2">
  <div class="card" style="width: 18rem;">
  <img src="${imageNico}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Nicolas Venturini</h5>
    <div class="text-center">
    <button id="showStory" class="btn btn-info AboutUsPage-description-button"> Description </button>
    </div>
        <dialog id="Story">
          <form method="dialog">
            <p>Nicolas est le responsable de la base de données. Il a conceptualisé la base de donnée, l'a remplie et l'a déployée avec Simon. Nicolas a également fait le backend de la page du classement et a participé au backend pour la création des quizzes.
            </p>
            <div class="text-center">
            <button id="confirmBtn" class="btn btn-dark" style="font-family:sans-serif">Close</button>
          </div>
          </form>
        </dialog>
  </div>
  </div>
  <div class="card" style="width: 18rem;">
  <img src="${imageAlexis}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Alexis Arnaud</h5>
    <div class="text-center">
    <button id="showStory" class="btn btn-info AboutUsPage-description-button"> Description </button>
    </div>
    <dialog id="Story">
      <form method="dialog">
        <p>
        Alexis est le responsable du backend. Il s'est chargé de la page de création de quizzes, la page de visionnage de tous les quizzes par catégorie, ainsi que la page d'affichage d'un quizz.
        </p>
        <div class="text-center">
          <button id="confirmBtn" class="btn btn-dark" style="font-family:sans-serif">Close</button>
        </div>
      </form>
    </dialog>
  </div>
</div>
<div class="card" style="width: 18rem;">
  <img src="${imageKeyvan}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Keyvan Nikazm</h5>
    <div class="text-center">
    <button id="showStory" class="btn btn-info AboutUsPage-description-button"> Description </button>
    </div>
        <dialog id="Story">
          <form method="dialog">
            <p>Pudor in debeo sum nostro illum orationi fortius quidem fortius postulabat aetas fortius datam Neque robustioribus tuli patiebatur meum versari aliquis Atratino hunc accusationis accusationis erga dicendi et Vellem debeo enim Atratino dicendi tueri et accusationis patiebatur tuli parentemque istam tuus quidem et vobis accusationis accusationis moderatur beneficium in magis.</p>
            <div class="text-center">
            <button id="confirmBtn" class="btn btn-dark" style="font-family:sans-serif">Close</button>
          </div>
          </form>
        </dialog>
  </div>
</div>
<div class="card" style="width: 18rem;">
  <img src="${imageSimon}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Simon Bosseler</h5>
    <div class="text-center">
    <button id="showStory" class="btn btn-info AboutUsPage-description-button"> Description </button>
    </div>
        <dialog id="Story">
          <form method="dialog">
            <p> Simon est l'un des deux conceptualisateurs de la base de données avec son acolyte Nicolas. Ils ont fourni une base de données structurées afin de déployer une application fonctionnelle et dans le cadre d'une expérience utilisateur à la hauteur des attentes.
            <br> Il a participé à l'insertion de toutes les données dans la base de données ainsi qu'au déploiement de celle-ci.
             <br> Il a également participé au backend de la création des quizzes.
            </p>
            <div class="text-center">
            <button id="confirmBtn" class="btn btn-dark" style="font-family:sans-serif">Close</button>
          </div>
          </form>
        </dialog>

  </div>
</div>
<div class="card" style="width: 18rem;">
  <img src="${imageIsmet}" class="card-img-top" alt="...">
  <div class="card-body-AboutUs">
    <h5 class="card-title">Ismet Ismet</h5>
    <div class="text-center">
    <button id="showStory" class="btn btn-info AboutUsPage-description-button"> Description </button>
    </div>
    <dialog id="Story">
      <form method="dialog">
        <p>
          À l'aube de ses 21 ans, Ismet, l'étudiant en informatique au regard lumineux,
          sculpte l'éclat du virtuel avec une virtuosité éblouissante. En tandem avec
          son complice Keyvan, il danse entre les pixels en tant qu'artisan du frontend.
           Cependant, ce n'est pas seulement l'élégance visuelle qui émane de ses doigts 
           agiles ; Ismet tisse également la toile du backend avec une dextérité exceptionnelle. 
           Aux côtés d'Alexis, il insuffle la vie aux portails d'authentification, 
           érigeant des remparts numériques impénétrables. Ismet, sculpteur d'expériences, 
           forge un cyberespace sécurisé où chaque clic résonne comme une symphonie technologique.
        </p>
        <div class="text-center">
          <button id="confirmBtn" class="btn btn-dark" style="font-family:sans-serif">Close</button>
        </div>
      </form>
    </dialog>
  </div>
</div>
</div>

  `
  const showStory = document.querySelectorAll('#showStory');
  const Story = document.querySelectorAll('#Story');

  for (let i = 0; i < showStory.length; i+=1) {
    showStory[i].addEventListener('click', () => Story[i].showModal());
    
  }

};



export default aboutUs;
