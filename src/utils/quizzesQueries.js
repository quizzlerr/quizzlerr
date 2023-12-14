async function getOneQuizzContent(quizzId) {
  let quizz;
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/quizzes/${quizzId}`);

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    quizz = await response.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('HomePage::error: ', err);
  }

  return quizz;
}

async function getAllQuizzes(category) {
  let quizzes;
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/quizzes?categorie=${category}`);

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    quizzes = await response.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('HomePage::error: ', err);
  }

  return quizzes;
}

async function createQuizz( difficultee, categorie ) {

  const options = {
    method: 'POST',
    body: JSON.stringify({
      difficultee,
      categorie
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let quizz;
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/quizzes/createQuizz`, options);

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    quizz = await response.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('createQuizz::error: ', err);
  }

  return quizz;
}

async function createQuestion( quizzId, questionNumero, questionIntitule ) {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      quizzId,
      questionNumero,
      questionIntitule
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let quizz;
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/quizzes/createQuestion`, options);

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    quizz = await response.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('createQuestion::error: ', err);
  }

  return quizz;
}

async function createProposition( proposition, reponse ,questionId ) {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      proposition,
      reponse,
      questionId
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let quizz;
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/quizzes/createProposition`, options);

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    quizz = await response.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('createProposition::error: ', err);
  }

  return quizz;
}

async function getLastQuestionId() {
  let lastQuestionId;
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/quizzes/getLastQuestionId`);

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    lastQuestionId = await response.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getLastQuestionId::error: ', err);
  }

  return lastQuestionId;
}

async function getLastQuizzId() {
  let lastQuizzId;
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/quizzes/getLastQuizzId`);

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    lastQuizzId = await response.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getLastQuizzId::error: ', err);
  }

  return lastQuizzId;
}

module.exports = {
  getOneQuizzContent,
  getAllQuizzes,
  createQuizz,
  createQuestion,
  createProposition,
  getLastQuestionId,
  getLastQuizzId,
}