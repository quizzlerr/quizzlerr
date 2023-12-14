import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Points,
  PointsMaterial,
  BufferGeometry,
  Float32BufferAttribute,
  MathUtils,
  TextureLoader,
  Group,
  Clock,
} from 'three';
import circle from '../../img/circle.png';
import { getAllQuizzesCategoriesData } from '../../utils/quizzesData';
import Navigate from '../Router/Navigate';

const HomePage = () => {
  generateStructure();
  generateCards();
  const animationId = renderThreeDimension();
  handleContextCanvas(animationId);
};

function generateRandomPointsDistanceColor(pointsCount, pointsDistance) {
  const points = new Float32Array(pointsCount * 3); // chaque point a des coordonnées en x, y, z
  const colors = new Float32Array(pointsCount * 3); // tableau qui contient toute les couleurs r, g, b

  for (let i = 0; i < points.length; i += 3) {
    // possibilite de probleme avec l'incrementation
    points[i] = MathUtils.randFloatSpread(pointsDistance * 2); // genere un entier compris entre 1 et -1 car la distance / 2
    points[i + 1] = MathUtils.randFloatSpread(pointsDistance * 2); // genere un entier compris entre 1 et -1 car la distance / 2
    points[i + 2] = MathUtils.randFloatSpread(pointsDistance * 2); // genere un entier compris entre 1 et -1 car la distance / 2
    colors[i] = Math.random();
    colors[i + 1] = Math.random();
    colors[i + 2] = Math.random();
  }

  return { colors, points };
}

function renderThreeDimension() {
  const texture = new TextureLoader(); // creer l'objet qui va changer la forme de l'element
  const circleTexture = texture.load(circle); // j'ajoute la texture a mon element
  const scene = new Scene(); // creation d'un objet

  const count = 750; // nombre de point presents
  const distance = 2; // qui va permettre de specifier la distance entre le point le plus proche et le point le plus loin

  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // camera qui permet de regarder la scene
  camera.position.y = 0.5;
  camera.position.z = 2; // pousser la camera pour regarder le centre
  camera.position.x = 0.5;
  scene.add(camera); // ajout de la camera a la scene

  const { points, colors } = generateRandomPointsDistanceColor(count, distance);

  const Geometrie = new BufferGeometry(); // cette ligne permet de créer des geometrie plus complexe par exemple des faces

  Geometrie.setAttribute('position', new Float32BufferAttribute(points, 3)); // l'attribut va s'appeler position et va contenir des triplet d'element et prendre 3 elements qui correspond a une coordonner
  Geometrie.setAttribute('color', new Float32BufferAttribute(colors, 3));
  const pointMaterial = new PointsMaterial({
    size: 0.1,
    vertexColors: true,
    map: circleTexture,
    alphaTest: 0.01,
    transparent: true,
  });
  const pointsObject = new Points(Geometrie, pointMaterial); // creer des point

  const groupe = new Group();
  groupe.add(pointsObject);

  scene.add(groupe);
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true, // permet de rendre les bord plus lisse sans le pixelisage
  }); // permet de rendre la scene a l'ecran
  renderer.setSize(window.innerWidth, window.innerHeight); // definir la taille du rendu
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // definir le ratio et mettre 2 pour economiser des ressources sur des ecrans qui on une densite de pixel important
  const particlesContainer = document.querySelector('#homepage-particles-container');
  particlesContainer.appendChild(renderer.domElement); // rendre l'element sur le body

  const clock = new Clock();

  function tick() {
    // une function pour avoir un nouveau rendu
    const time = clock.getElapsedTime(); // compter le temps qui c'est ecouler
    groupe.rotation.y = time * 0.1; // controle automatique
    groupe.rotation.x = time * 0.1; // controle automatique
    groupe.rotation.z = time * 0.1; // controle automatique

    renderer.render(scene, camera); // faire le rendu par rapport a la camera

    requestAnimationFrame(tick); // permet de rappeler la fonction pour avoir des rendu en permanence
  }

  const animationId = tick();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight; // changer l'aspect de la camera
    camera.updateProjectionMatrix(); // mettre a jour la camera
    renderer.setSize(window.innerWidth, window.innerHeight); // changer la taille du renderer
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // changement du pixel ratio exemple changement d'ecran
  });

  return animationId;
}
function generateStructure() {
  const main = document.querySelector('main');
  main.innerHTML = `<div id="homepage-particles-container"></div>
  <div class="container homepage-container">
    <div class="homepage-glass-container"> 
    <div class="content">
    <div class= "main">
      <h1> QUIZZLER </h1> <br>
      <h4>
        Plongez dans le savoir !
      </h4>
      <div class = "box">
      </div>
  </div>
</div>
</div>
</div>`;
}

function generateCards() {
  const box = document.querySelector('.box');

  const quizzesCategories = getAllQuizzesCategoriesData();

  quizzesCategories.forEach((category) => {
    box.innerHTML += `
      <div class="card">
        <img src="${category.image}" class="card-img-top" alt="image">
        <div class="card-body ">
          <h5 class="card-title"> ${category.name} </h5>
          <a id="${category.id}" class="btn-primary" data-is-category="true"> jouer </a>
        </div>
      </div>`;
  });

  quizzesCategories.forEach((category) => {
    const categoryButton = box.querySelector(`#${category.id}`);

    categoryButton.addEventListener('click', (e) => {
      e.preventDefault();

      Navigate(category.link);
    });
  });
}

function handleContextCanvas(animationId) {
  const canvas = document.querySelector('canvas');

  canvas.addEventListener(
    'webglcontextlost',
    (e) => {
      e.preventDefault();
      cancelAnimationFrame(animationId);
    },
    false,
  );
}

export default HomePage;
