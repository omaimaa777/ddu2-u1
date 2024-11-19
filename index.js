// Recommended: All functions declared here

function isCityFound (target) {
    let cityFound = false;
    let chosenCity = null;
    const targetLC = target.toLowerCase ();

    for (let cityValue of cities) {
        const cityValueLC = cityValue.name.toLowerCase ()
        console.log("Innan if funktionen.");

        if (targetLC == cityValueLC) {
            console.log("Inuti if-satsen")
            //Jämför target med indexerad (chosenCity) array i Cities
            cityFound = true;
            h2.textContent = target;
            chosenCity = cityValue;
            console.log(cityFound);
            break;
        } else {
            console.log("Denna stad finns ej");
            console.log(cityFound);
        }
        console.log("Chosen city = '" + chosenCity + "'" );
        console.log("______")

    }
};

// Recommended: constants with references to existing HTML-elements



// Recommended: Ask for the city name and then the rest of the code


