let currentUser;

const getAuthenticatedUser = () => currentUser;

const setAuthenticatedUser = (authenticatedUser) => {
  currentUser = authenticatedUser;
};

const isAuthenticated = () => currentUser !== undefined;

const clearAuthenticatedUser = () => {
  currentUser = undefined;
};

const isAdmin = () => {
  if(currentUser === undefined){
    return false;
  }
  return currentUser.isAdmin;
};

// eslint-disable-next-line object-curly-newline
export { getAuthenticatedUser, setAuthenticatedUser, isAuthenticated, clearAuthenticatedUser, isAdmin };