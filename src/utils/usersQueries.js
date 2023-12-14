async function getLeaderboard() {
  let quizz;
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/users/leaderboard`);

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    quizz = await response.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('HomePage::error: ', err);
  }

  return quizz;
}

async function getUserFromUsername( username ) {

  let userFound;
  try {
      const response = await fetch(`${process.env.API_BASE_URL}/users?username=${username}`);

      if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

      userFound = await response.json();
  } catch (err) {
      // eslint-disable-next-line no-console
      console.error('updateParticipation::error: ', err);
  }

  return userFound;
}

async function updateUserPoints( userId, countPointsToAdd ) {

  const options = {
    method: 'POST',
    body: JSON.stringify({
    userId,
    countPointsToAdd,
    }),
    headers: {
    'Content-Type': 'application/json',
    },
};

  let updateCountPoints;
  try {
      const response = await fetch(`${process.env.API_BASE_URL}/users/updateUserPoints`, options);

      if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

      updateCountPoints = await response.json();
  } catch (err) {
      // eslint-disable-next-line no-console
      console.error('updateParticipation::error: ', err);
  }

  return updateCountPoints;
}

async function deleteInParticipationById(userId) {

  const options = {
    method: 'POST',
    body: JSON.stringify({
    userId
    }),
    headers: {
    'Content-Type': 'application/json',
    },
};

  let deleteIdPart;
  try {
      const response = await fetch(`${process.env.API_BASE_URL}/users/deleteParticipationById`, options);

      if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

      deleteIdPart = await response.json();
  } catch (err) {
      // eslint-disable-next-line no-console
      console.error('updateParticipation::error: ', err);
  }

  return deleteIdPart;
}

async function deleteInUsersById(userId) {

  const options = {
    method: 'POST',
    body: JSON.stringify({
    userId
    }),
    headers: {
    'Content-Type': 'application/json',
    },
};

  let deleteIdUsers;
  try {
      const response = await fetch(`${process.env.API_BASE_URL}/users/deleteUsersById`, options);

      if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

      deleteIdUsers = await response.json();
  } catch (err) {
      // eslint-disable-next-line no-console
      console.error('updateParticipation::error: ', err);
  }

  return deleteIdUsers;
}



module.exports = {
  getLeaderboard,
  getUserFromUsername,
  updateUserPoints,
  deleteInParticipationById,
  deleteInUsersById
}; 