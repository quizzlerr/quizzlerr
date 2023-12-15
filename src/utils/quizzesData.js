import geographyImg from "../img/geographie.jpg"
import historyImg from "../img/histoire.jpg";
import sciencesImg from "../img/science.jpg";
import historyImg1 from "../img/img_histoire/img_histoire1.jpg";
import historyImg2 from "../img/img_histoire/img_histoire2.jpg";
import historyImg3 from "../img/img_histoire/img_histoire3.jpg";
import geoImg1 from "../img/img_geography/img_geo1.jpg";
import geoImg2 from "../img/img_geography/img_geo2.jpg";
import geoImg3 from "../img/img_geography/img_geo3.jpg";
import scienceImg1 from '../img/img_science/img_sci1.jpg';
import scienceImg2 from '../img/img_science/img_sci2.jpg';
import scienceImg3 from '../img/img_science/img_sci3.jpg';

let viewQuizzesPath;
if ( process.env.PATH_PREFIX === '/quizzlerr/' ) {

  viewQuizzesPath = '/viewQuizzes'

} else {

  viewQuizzesPath = 'viewQuizzes'

}

const quizzesCategoriesData = [
    {
      id : "geographie",
      image : geographyImg,
      images : [geoImg1,geoImg2,geoImg3],
      name : "Géographie",
      link : `${viewQuizzesPath}?categorie=geographie`
    },
    {
      id : "histoire",
      image: historyImg,
      images : [historyImg1,historyImg2,historyImg3],
      name : "Histoire",
      link : `${viewQuizzesPath}?categorie=histoire`
    },
    {
      id : "sciences",
      image : sciencesImg,
      images : [scienceImg1,scienceImg2,scienceImg3],
      name : "Sciences",
      link : `${viewQuizzesPath}?categorie=sciences`
    },
  ];

function getQuizzCategoryData (category) {

  return quizzesCategoriesData.find( quizz => quizz.id === category );

}

function getAllQuizzesCategoriesData () {

  return quizzesCategoriesData;

};

export {
  getQuizzCategoryData, 
  getAllQuizzesCategoriesData
};