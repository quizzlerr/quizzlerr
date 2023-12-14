import AboutUsPage from '../Pages/AboutUsPage';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import LogoutPage from '../Pages/LogoutPage';
import CreationQuizzPage from '../Pages/CreationQuizzPage';
import LeaderboardPage from '../Pages/LeaderboardPage';
import ViewQuizzesPage from '../Pages/ViewQuizzesPage';
import ResultQuizzPage from '../Pages/ResultQuizzPage';
import QuizzPage from '../Pages/QuizzPage';
import ConfidentialityPage from '../Pages/ConfidentialityPage';
import DeleteUserPage from '../Pages/DeleteUserPage';

const routes = {
  "/": HomePage,
  '/aboutUs': AboutUsPage,
  '/login': LoginPage,
  '/register' : RegisterPage,
  '/logout' : LogoutPage,
  '/creationQuizz' : CreationQuizzPage,
  '/leaderboard' : LeaderboardPage,
  '/confidentiality' : ConfidentialityPage,
  '/viewQuizzes' : ViewQuizzesPage,
  '/resultQuizz' : ResultQuizzPage,
  '/quizz': QuizzPage,
  '/deleteUser' : DeleteUserPage
};

export default routes;