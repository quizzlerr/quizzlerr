import { clearAuthenticatedUser } from '../../utils/auths';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const Logout = () => {
  clearAuthenticatedUser();
  Navbar();
  Navigate(`${process.env.PATH_PREFIX}login`);
};

export default Logout;
