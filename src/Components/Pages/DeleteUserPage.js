import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';
import {
  deleteInParticipationById,
  getUserFromUsername,
  deleteInUsersById,
} from '../../utils/usersQueries';
import { getAuthenticatedUser, clearAuthenticatedUser } from '../../utils/auths';

const DeleteUser = () => {
  DeleteUserM();
  clearAuthenticatedUser();
  Navbar();
  Navigate(process.env.PATH_PREFIX);
};

async function DeleteUserM() {
  const authenticatedUser = getAuthenticatedUser();

  const { username } = authenticatedUser;

  const user = await getUserFromUsername(username);

  const userId = user.id_user;

  deleteInParticipationById(userId);
  deleteInUsersById(userId);
}

export default DeleteUser;
