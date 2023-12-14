async function createParticipation( userId, quizzId, countQuestionsSucceeded ) {

    const options = {
        method: 'POST',
        body: JSON.stringify({
        userId,
        quizzId,
        countQuestionsSucceeded
        }),
        headers: {
        'Content-Type': 'application/json',
        },
    };

    let participationCreated;
    try {
        const response = await fetch(`${process.env.API_BASE_URL}quizzes/createParticipation`, options);

        if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

        participationCreated = await response.json();
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('createParticipation::error: ', err);
    }

    return participationCreated;
}

async function getParticipation( userId, quizzId ) {

    const options = {
        method: 'POST',
        body: JSON.stringify({
        userId,
        quizzId
        }),
        headers: {
        'Content-Type': 'application/json',
        },
    };

    let participationFound;
    try {
        const response = await fetch(`${process.env.API_BASE_URL}/quizzes/getParticipation`, options);

        if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

        participationFound = await response.json();
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('getParticipation::error: ', err);
    }

    return participationFound;
}

async function updateParticipation( userId, quizzId, countQuestionsSucceeded ) {

    const options = {
        method: 'POST',
        body: JSON.stringify({
        userId,
        quizzId,
        countQuestionsSucceeded
        }),
        headers: {
        'Content-Type': 'application/json',
        },
    };

    let participationUpdated;
    try {
        const response = await fetch(`${process.env.API_BASE_URL}/quizzes/updateParticipation`, options);

        if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

        participationUpdated = await response.json();
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('updateParticipation::error: ', err);
    }

    return participationUpdated;
}

module.exports = {
    createParticipation,
    getParticipation,
    updateParticipation,
}