/* eslint-disable no-param-reassign */
import imageLogo from '../../img/logo-site.png';
import { getOneQuizzContent } from '../../utils/quizzesQueries';
import getPathParameters from '../../utils/path-href';
import Navigate from '../Router/Navigate';
import {getQuizzCategoryData} from '../../utils/quizzesData';
import { ResultQuizzPage } from './ResultQuizzPage';
import { chooseDifficultyName } from '../../utils/difficultyData';  
import { createParticipation, getParticipation, updateParticipation } from '../../utils/participationsQueries';
import { getAuthenticatedUser } from '../../utils/auths';
import { getUserFromUsername, updateUserPoints } from '../../utils/usersQueries';

const countMaxAttempts = 3;

async function QuestionnairePage () {

    const parametersObject = getPathParameters();
    let {quizzId} = parametersObject;

    if ( quizzId === undefined || Number.isNaN(Number(quizzId))) {

        return Navigate(process.env.PATH_PREFIX);

    };

    quizzId = Number(quizzId);

    const quizz = await getOneQuizzContent(quizzId);

    if ( !quizz ) {
        const main = document.querySelector('main');
        main.innerHTML = `<h1>Oops! Something went wrong...</h1>`;
        return false;
    };

    const sessionUserId = sessionStorage.getItem('userId');

    let participationFound = null;
    let userId = -1;

    if ( sessionUserId === null || Number(sessionUserId) === -1 ) {

        const authenticatedUser = getAuthenticatedUser();

        const isAuthenticated = authenticatedUser !== undefined;

        if ( isAuthenticated ) {

            const {username} = authenticatedUser;
            const userFound = await getUserFromUsername(username);
            userId = userFound.id_user;

            participationFound = await getParticipation( userId, quizzId );

        };

    }

    if ( participationFound !== null ) {

        const countAttempts = participationFound.nbr_tentatives;

        if ( countAttempts === countMaxAttempts ) {

            return Navigate('/');

        };

    };

    const sessionQuizzId = Number( sessionStorage.getItem('quizzId') );

    const {

        name : categoryName,
        image : categoryImage,

    } = getQuizzCategoryData(quizz.categorie);

    if ( sessionQuizzId !== quizzId ) {

        // eslint-disable-next-line no-console
        console.log( `initialized !` );

        const randomQuestionsOrderArray = randomQuestionsOrder(quizz);
        const difficultyName = chooseDifficultyName( quizz.difficultee );
        const pointsRapportes = quizz.points_rapportes;
        const numberOfQuestions = randomQuestionsOrderArray.length;

        initializeSessionData( quizzId, randomQuestionsOrderArray, categoryName, difficultyName, pointsRapportes, numberOfQuestions, participationFound, userId );

    };

    const questions = JSON.parse( sessionStorage.getItem('questions') );
    const sessionCurrentIndex = Number( sessionStorage.getItem('currentIndexQuestion') );
    const countRightAnswers = Number( sessionStorage.getItem('countRightAnswers') );

    renderQuestionnaire(questions, sessionCurrentIndex, categoryName, categoryImage);

    if ( sessionCurrentIndex === questions.length - 1 ) {

        addEndQuizzButton();

    } else {

        addNextQuestionButton();

    };

    const maxCountQuestions = questions.length;
    addCounterQuestions( sessionCurrentIndex, maxCountQuestions );
    addCounterRightAnswers( countRightAnswers );

    addPropositionsListeners();

    return true;
    
};

function randomQuestionsOrder(quizz) {

    const {questions} = quizz;

    const randomQuestionsOrderArray = [];

    while ( questions.length > 0 ) {

        const randomIndex = Math.floor( Math.random() * questions.length );

        const randomQuestion = questions[randomIndex];

        questions.splice(randomIndex, 1);

        randomQuestionsOrderArray.push( randomQuestion );

    };

    return randomQuestionsOrderArray;

};

function renderQuestionnaire (questions, indexQuestion, categoryName, categoryImage) {

    const question = questions[indexQuestion];
    const intituleQuestion = question.intitule;

    const propositionsQuestion = question.propositions;

    const main = document.querySelector('main');
    main.innerHTML = `
        <div class="glass-container-pageQuestion" style="url(${categoryImage})">
            <div class="card-pageQuestion">
            <div class="card-header">
                <div id="counterQuestionsWrapper"></div>
                <h5 class="card-title-pageQuestion"> ${categoryName} </h5>
                <div id="countRightAnswersWrapper"></div>
            </div>
                <img src="${imageLogo}" class="card-img-top-pageQuestion" alt="...">
                <span class = "card-title-question">
                    ${intituleQuestion}
                </span>
                <div class="card-body propositions">
                    ${propositionsQuestion.map( proposition => `<a class="btn proposition-element" data-is-selected="false">${proposition.intitule}</a>` ).join("")}
                </div>
                <div id="endQuizzButtonWrapper"></div>
                <div id="nextQuestionButtonWrapper"></div>
            </div>
        </div>
    `;

};

function addCounterQuestions ( currentIndexQuestion, maxCountQuestions ) {
    
    const counterQuestionsWrapper = document.querySelector('#counterQuestionsWrapper');

    counterQuestionsWrapper.innerHTML += `
        <div class="div-counter-questions-pageQuestion">
            <p>Question n°${currentIndexQuestion+1} / ${maxCountQuestions}</p>
        </div>
    `;

};

function addCounterRightAnswers ( countRightAnswers ) {
    
    const countRightAnswersWrapper = document.querySelector('#countRightAnswersWrapper');

    countRightAnswersWrapper.innerHTML += `
        <div class="div-count-right-answers-pageQuestion">
            <p>${countRightAnswers} bonne(s) réponse(s)</p>
        </div>
    `;

};

function addNextQuestionButton() {

    const nextQuestionButtonWrapper = document.querySelector('#nextQuestionButtonWrapper');

    nextQuestionButtonWrapper.innerHTML += `
        <button class="QuizzPage-default-style-button" id="nextQuestionButton">
            Question suivante
        </button>
    `;

};

function onNextQuestionButton() {

    const sessionCurrentIndex = Number( sessionStorage.getItem('currentIndexQuestion') );

    const buttonNextQuestion = document.querySelector('#nextQuestionButton');

    sessionStorage.setItem('currentIndexQuestion', sessionCurrentIndex + 1 );

    buttonNextQuestion.removeEventListener('click', onNextQuestionButton );

    QuestionnairePage();

};

function checkAnswer( sessionCurrentIndex ) {

    const questions = JSON.parse( sessionStorage.getItem('questions') );

    const {propositions} = questions[sessionCurrentIndex];

    removePropositionsListeners();

    checkIsReponsePropositions( propositions );

    let propositionSelected = getPropositionSelected();

    propositionSelected = checkSelectedProposition( propositionSelected );

    if ( propositionSelected.isreponse ) {

        const countRightAnswers = Number( sessionStorage.getItem('countRightAnswers') );

        sessionStorage.setItem('countRightAnswers', countRightAnswers+1);

    };

}

function getPropositionSelected() {

    const propositionsElements = document.querySelectorAll('.proposition-element');

    let propositionSelected = null;

    propositionsElements.forEach( propositionElement => {

        if ( propositionElement.dataset.isSelected === 'true' ) {

            propositionSelected = {
                intitule : propositionElement.innerText,
            };

        };

    });

    return propositionSelected;

};

function checkSelectedProposition ( propositionSelected ) {

    const propositionsElements = document.querySelectorAll('.proposition-element');

    propositionsElements.forEach( propositionElement => {

        if ( propositionSelected.intitule === propositionElement.innerText ) {

            const booleanString = propositionElement.dataset.isReponse;
            propositionSelected.isreponse = JSON.parse(booleanString);

        };

    });

    return propositionSelected;

};

function checkIsReponsePropositions ( propositions ) {

    const propositionsElements = document.querySelectorAll('.proposition-element');

    propositionsElements.forEach( propositionElement => {

        const isReponse = propositions.find( p => p.intitule === propositionElement.innerText ).isreponse;

        if ( isReponse ) {

            propositionElement.dataset.isReponse = 'true';
            propositionElement.style.backgroundColor = '#4CBB17';

        } else {

            propositionElement.dataset.isReponse = 'false';
            propositionElement.style.backgroundColor = '#D2042D';

        };

    });

};

function addEndQuizzButton() {

    const endQuizzButtonWrapper = document.querySelector('#endQuizzButtonWrapper');

    endQuizzButtonWrapper.innerHTML += `
        <button class="QuizzPage-default-style-button" id="endQuizzButton">
            Terminer le quizz
        </button>
    `;

};

function addEndQuizzButtonListener() {

    const classStyleame = 'QuizzPage-set-style-button';
    const button = document.querySelector('#endQuizzButton');

    button.className = classStyleame;

    button.addEventListener('click', async () => {

        const category = sessionStorage.getItem('category');
        const difficulty = sessionStorage.getItem('difficulty');
        const pointsRapportes = Number( sessionStorage.getItem('pointsRapportes') );
        const countRightAnswers = Number( sessionStorage.getItem('countRightAnswers') );
        const numberOfQuestions = Number( sessionStorage.getItem('numberOfQuestions') );

        const pointsTotauxRapportes = pointsRapportes * countRightAnswers;

        const percentageQuestionsSucceeded = (countRightAnswers / numberOfQuestions) * 100;

        const userId = Number( sessionStorage.getItem('userId') );
        const quizzId = Number( sessionStorage.getItem('quizzId') );

        await saveParticipationForQuizz( userId, quizzId );

        ResultQuizzPage( category, difficulty, pointsTotauxRapportes, percentageQuestionsSucceeded );

        return true;

    });

};

function addNextQuestionButtonListener() {

    const classStyleame = 'QuizzPage-set-style-button';

    const button = document.querySelector('#nextQuestionButton');

    button.className = classStyleame;

    button.addEventListener('click', onNextQuestionButton );

};

async function saveParticipationForQuizz( userId, quizzId ) {

    // Pas connecté
    if ( userId === -1 ) return;

    const participation = await getParticipation( userId, quizzId );

    const countRightAnswers = Number( sessionStorage.getItem('countRightAnswers') );
    const pointsRapportes = Number( sessionStorage.getItem('pointsRapportes') );

    const nouveauNombrePointsRapportes = countRightAnswers * pointsRapportes;

    // Pas de participation

    if ( participation === null ) {

        await createParticipation( userId, quizzId, countRightAnswers );
        await updateUserPoints(userId, nouveauNombrePointsRapportes );

    } 
    // Déjà une participation
    else {

        const oldCountRightAnswers = participation.nbr_questions_reussies;
        
        const ancienNombrePointsRapportes = oldCountRightAnswers * pointsRapportes;

        // Meilleur score
        if ( ancienNombrePointsRapportes < nouveauNombrePointsRapportes ) {

            await updateParticipation( userId, quizzId, countRightAnswers );
            await updateUserPoints(userId, (nouveauNombrePointsRapportes-ancienNombrePointsRapportes));

        } else {

            // Moins bon ou même score

            await updateParticipation( userId, quizzId, oldCountRightAnswers );

        }

    }

}

function removePropositionsListeners() {

    const propositions = document.querySelectorAll('.proposition-element');

    propositions.forEach( proposition => {

        proposition.removeEventListener('click', onPropositionClick );

    });

};

function addPropositionsListeners () {

    const propositions = document.querySelectorAll('.proposition-element');

    propositions.forEach( proposition => {

        proposition.addEventListener('click', onPropositionClick );

    });

};

async function onPropositionClick(event) {

    const propositions = document.querySelectorAll('.proposition-element');

    for ( let i=0; i<propositions.length; i+=1 ) {

        propositions[i].dataset.isSelected = 'false';
        propositions[i].style.border = 'none';

    };

    const proposition = event.target;

    proposition.dataset.isSelected = 'true';
    proposition.style.border = '2px solid #FAF9F6';
    proposition.style.boxShadow = '2px 2px 10px #FAF9F6';

    const questions = JSON.parse( sessionStorage.getItem('questions') );
    const sessionCurrentIndex = Number( sessionStorage.getItem('currentIndexQuestion') );

    checkAnswer( sessionCurrentIndex );

    if ( sessionCurrentIndex === questions.length - 1 ) {

        addEndQuizzButtonListener();

    } else {

        addNextQuestionButtonListener();

    };

    return true;

};

function initializeSessionData ( currentQuizzId, quizzQuestions, quizzCategory, quizzDifficulty, pointsRapportes, numberOfQuestions, participation, userId ) {

    sessionStorage.setItem('quizzId', currentQuizzId );

    sessionStorage.setItem('category', quizzCategory );

    sessionStorage.setItem('difficulty', quizzDifficulty );

    sessionStorage.setItem('questions', JSON.stringify(quizzQuestions) );

    sessionStorage.setItem('currentIndexQuestion', 0 );

    sessionStorage.setItem('countRightAnswers', 0 );

    sessionStorage.setItem('pointsRapportes', pointsRapportes );

    sessionStorage.setItem('numberOfQuestions', numberOfQuestions );

    sessionStorage.setItem('participation', JSON.stringify(participation) );

    sessionStorage.setItem('userId', userId );

};

export default QuestionnairePage;