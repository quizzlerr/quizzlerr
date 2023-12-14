import throphyImg from '../../img/throphyImg.png';
import medailleBronz from '../../img/medaille_bronze.png';
import medailleOr from '../../img/medaille_or.png';
import medailleArgent from '../../img/medaille_argent.png';
import {getLeaderboard} from '../../utils/usersQueries';

import { isAuthenticated } from '../../utils/auths';
import Navigate from '../Router/Navigate';

const ClassementPage = async() => {

    if(!isAuthenticated()){
        return Navigate('/');
    };

    const quizzClassement = await getLeaderboard();

    renderLeaderboardPage(quizzClassement);

    return creatCase(quizzClassement);
};

function renderLeaderboardPage(quizzClassement) {

    const main = document.querySelector('main');

    const defaultObject = {
        username : "inconnu",
        nbr_points : 0
    };

    const first = quizzClassement[0] ? quizzClassement[0] : defaultObject;
    const second = quizzClassement[1] ? quizzClassement[1] : defaultObject;
    const third = quizzClassement[2] ? quizzClassement[2] : defaultObject;


    main.innerHTML = `
    <div class="container-classement">
    <div class="sous-classement-body">

        <div class="classement-header">
            <img src="${throphyImg}" alt="Trophy Image">
            <h1>CLASSEMENT ACTUEL</h1>
        </div>

        <div class="classement-body">
            <div class="table text-dark">
            
                <div class="medal-container">
                    <div class="medal">
                        <img src="${medailleArgent}" alt="Médaille d'argent">
                        <div class="usernameClassement">${second.username}</div>
                        <div class="scoreClassement">${second.nbr_points}</div>
                    </div>
                    <div class="medal">
                        <img src="${medailleOr}" alt="Médaille d'or">
                        <div class="usernameClassement">${first.username}</div>
                        <div class="scoreClassement">${first.nbr_points}</div>

                    </div>
                    <div class="medal">
                        <img src="${medailleBronz}" alt="Médaille de bronze">
                        <div class="usernameClassement">${third.username}</div>
                        <div class="scoreClassement">${third.nbr_points}</div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>`;

}

function creatCase(quizzClassement){
    
    if(quizzClassement.length > 3){
        const textDark = document.querySelector('.text-dark');
        // eslint-disable-next-line no-plusplus
        for(let i=3; i<quizzClassement.length;i++){
            textDark.innerHTML += `
                <div class="data-row">
                    <div class="rankClassement">${i+1}</div>
                    <div class="usernameClassement">${quizzClassement[i].username}</div>
                    <div class="scoreClassement">${quizzClassement[i].nbr_points}</div>
                </div>`;
        }
    }
}

export default ClassementPage;