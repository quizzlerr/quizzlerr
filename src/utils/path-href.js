function getPathHref () {

    return window.location.href;

}

function getPathParameters () {

    const pathHref = getPathHref();

    const parametersObject = {};

    if ( pathHref.includes('?') ) {

        const parameters = pathHref.split('?')[1];
        const parametersArray = parameters.split('&');

        parametersArray.forEach( parameter => {

            const parameterEntries = parameter.split('=');
            const parameterKey = parameterEntries[0];
            const parameterValue = parameterEntries[1];

            parametersObject[parameterKey] = parameterValue;

        });

    }

    return parametersObject;

}

export default getPathParameters;