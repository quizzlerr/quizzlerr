async function registerUser( email, username, password ) {

    const options = {
        method: 'POST',
        body: JSON.stringify({
            email,
            username,
            password
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    }
  
    let authenticatedUser;
    try{

        const response = await fetch(`${process.env.API_BASE_URL}/auths/register`, options);
        if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

        authenticatedUser = await response.json();

    }catch(error){
        // eslint-disable-next-line no-alert
        alert(error);
    } 

    return authenticatedUser;

}

async function loginUser( username, password ) {

    const options = {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    }
  
    let authenticatedUser;
    try{

        const response = await fetch(`${process.env.API_BASE_URL}/auths/login`, options);
        if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

        authenticatedUser = await response.json();

    }catch(error){
        // eslint-disable-next-line no-alert
        alert(error);
    } 

    return authenticatedUser;

}
  
  module.exports = {
    loginUser,
    registerUser,
  }; 