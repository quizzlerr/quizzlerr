import { Fireworks } from 'fireworks-js';
import Navigate from '../Router/Navigate';
import { isAuthenticated } from '../../utils/auths';

const ResultQuizzPage = (
  category,
  difficulty,
  pointsTotauxRapportes,
  percentageQuestionsSucceeded,
  quizzId,
  countOfAttempts,
) => {
  if (category === undefined) {
    return Navigate(process.env.PATH_PREFIX);
  }

  let textClassName;
  let textContent;

  const isSucceeded = percentageQuestionsSucceeded >= 50;

  if (isSucceeded) {
    textContent = 'Félicitation, vous avez réussi le quizz !';
    textClassName = 'text-success';
  } else {
    textContent = "Dommage, vous n'avez pas réussi le quizz..";
    textClassName = 'text-danger';
  }

  renderResults(
    category,
    difficulty,
    pointsTotauxRapportes,
    percentageQuestionsSucceeded,
    textContent,
    textClassName,
  );

  if (isAuthenticated()) {
    addButtonLeaderboardElement();
    addListenerToLeaderboardButton();
  }

  if ( countOfAttempts < 3 ) {
    addButtonPlayAgainElement();
    addListenerToPlayAgainButton(quizzId);
  }

  if (isSucceeded) {
    const fireworks = createFireworks();
    endFireworks(fireworks);
  }

  return true;
};

function renderResults(
  category,
  difficulty,
  pointsTotauxRapportes,
  percentageQuestionsSucceeded,
  textContent,
  textClassName,
) {
  sessionStorage.clear();

  const main = document.querySelector('main');
  main.innerHTML = `
        <div class="container">
                <div id="resultQuizz-fireworks"></div>
                <div id="resultQuizz-glass-container">
                    <div class="main">
                        <h1 class="ResultQuizz-text"> Résultat du Quizz </h1>

                        <h4 class="${textClassName} ResultQuizz-text-color"> ${textContent} </h4>

                        <div class="box-result">
                            <div class="card-result">
                                <h4 class="titre-resultat"> Difficulté : </h4><p class="${textClassName}"> ${difficulty} </p> 
                            </div>
                            <div class="card-result">
                                <h4 class="titre-resultat"> Catégorie : </h4><p class="${textClassName}"> ${category} </p> 
                            </div>
                            <div class="card-result">
                                <h4 class="titre-resultat"> Points gagnés : </h4><p class="${textClassName}"> ${pointsTotauxRapportes} pts </p> 
                            </div>
                            <div class="card-result">
                                <h4 class="titre-resultat"> Pourcentage de réussite : </h4><p class="${textClassName}"> ${percentageQuestionsSucceeded}% </p> 
                            </div>
                            <div id="button-leaderboard-wrapper"></div>
                            <div id="button-playagain-wrapper"></div>
                            </div>
                    </div>
                </div>
                </div>
        </div>
    `;
}

function addButtonLeaderboardElement() {
  const buttonWrapper = document.querySelector('#button-leaderboard-wrapper');

  buttonWrapper.innerHTML += `
    <div class="text-center">
    <button type="button" class="btn btn-outline-primary" id="button-leaderboard">Consulter le classement </button>
    </div>`;
}

function addListenerToLeaderboardButton() {
  const button = document.querySelector('#button-leaderboard');

  button.addEventListener('click', (e) => {
    e.preventDefault();

    Navigate('/leaderboard');

    return true;
  });
}

function addButtonPlayAgainElement() {
  const buttonWrapper = document.querySelector('#button-playagain-wrapper');

  buttonWrapper.innerHTML += `
    <br>
    <div class="text-center">
    <button type="button" class="btn btn-outline-success" id="button-playagain"> Rejouer </button>
    </div>`;
}

function addListenerToPlayAgainButton(quizzId) {
  const button = document.querySelector('#button-playagain');

  button.addEventListener('click', (e) => {
    e.preventDefault();

    Navigate(`/quizz?quizzId=${quizzId}`);

    return true;
  });
}

function createFireworks() {
  const container = document.querySelector('#resultQuizz-fireworks');
  // eslint-disable-next-line new-cap
  const fireworks = new Fireworks(container, {
    autoresize: false,
    traceSpeed: 5,
  });

  fireworks.start();

  return fireworks;
}

function endFireworks(fireworks) {
  setTimeout(() => {
    for (let i = 0; i < 60; i += 1) {
      const { currentOptions } = fireworks;

      setTimeout(() => {
        let { intensity } = currentOptions;

        if (intensity <= 0) {
          fireworks.stop();
        } else {
          intensity -= 0.5;

          fireworks.updateOptions({
            intensity,
          });
        }
      }, i * 300);
    }
  }, 3000);
}

export {
  // eslint-disable-next-line import/prefer-default-export
  ResultQuizzPage,
};
