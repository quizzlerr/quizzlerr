const Confidentialité = () => {
  const siteUrl = 'https://quizzlerr.github.io/quizzlerr/';
  renderConfidentialityPage(siteUrl);
};

function renderConfidentialityPage(siteUrl) {
  const updateDate = '14 décembre 2023';

  const main = document.querySelector('main');
  main.innerHTML = `
    <div id="inner_content-7-239">
    <div style="height:50px"></div>
    <p><span style="text-decoration: underline;">Date de mise à jour : ${updateDate}</span></p>
    <div style="height:50px"></div>
    <p><strong>Accès rapide :</strong></p>
    <div style="height:25px"></div>
    <p>
        <a href="#compte">1.Création d'un compte</a><br>
        <a href="#cookies">2. Cookies</a><br>
        <a href="#supprimer">3. Supprimer un compte</a>
    </p>
    <div style="height:25px"></div>
    <p>
        Cette politique vous informe sur les types d’utilisation qui sont fait de vos données et sur la façon dont nous les protégeons lorsque vous utilisez notre site internet ${siteUrl}.<br>
        Il appartient au visiteur du site de rester informé de ces évolutions qui l’engagent en consultant la présente page avant toute utilisation du présent site internet.
    </p>
    <div style="height:50px"></div>
    <p>
        Le gérant s'engage à respecter les dispositions de la loi n°78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés modifiées et au Règlement (UE)<br>
        2016/679 du Parlement européen et du Conseil du 27 avril 2016 dit "<em>RGPD</em>" et prendre toute précaution nécessaire pour préserver la sécurité des informations nominatives confiées.
    </p>
    <div style="height:50px"></div>
    <h2 id="compte">1. Création d'un compte</h2>
    <div style="height:50px"></div>
    <p>
        Certaines informations personnelles sont collectées sur ce site de façon à nous permettre à répondre à certaines de vos demandes d’informations ou de services.<br>
        En dehors de ces cas spécifiques, il vous est possible de visiter le présent site internet sans avoir à nous transmettre la moindre information.
    </p>
    <div style="height:25px"></div>
    <p>Listes des informations collectées :</p>
    <div style="height:25px"></div>
    <div class="wp-block-column">
        <ol>
            <li><strong>Adresse de courrier électronique</strong></li>
            <li><strong>Pseudonyme</strong></li>
            <li><strong>Mot de passe</strong></li>
        </ol>
    </div>
    <div style="height:50px"></div>
    <h3 id="cookies">2. Cookies</h3>
    <div style="height:50px"></div>
    <p>${siteUrl} utilise ces informations pour le bon fonctionnement de l'espace membres et ne sont pas partagées à des sociétés tierces.</p>
    <p>Les utilisateurs sont identifiés sur notre site au travers de leur pseudonyme créé au moment de la création du compte.</p>
    <p>Ces sites web pourraient collecter des données sur vous, utiliser des cookies, embarquer des outils de suivis tiers, suivre vos interactions avec ces contenus embarqués si vous disposez d’un compte connecté sur leur site web.</p>
    <div style="height:50px"></div>
    <h3 id="supprimer">3. Supprimer un compte</h3>
    <div style="height:50px"></div>
    <p>Vous pouvez à n'importe quel moment décider de supprimer votre compte</p>
    <div style="height:50px"></div>`;
}

export default Confidentialité;
