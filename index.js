// Recommended: All functions declared here

//funktion för att hitta en stad baserat på dess namn
function getCityByName (cityName) {
    for (let city of cities) {
        if (cityName === city.name) {
            return city; //returnera staden om namnet matchar
        }
    }
    return null; // returnera null om staden inte hittas
}

//funktion för att hitta en stad baserat på dess ID
function getCityById (cityId) {
    for (let city of cities) {
        if (city.id === cityId) {
            return city; // returnera staden om ID matchar
        }
    }
}


//funktion for att hitta avstånd mellan två städer


// Recommended: constants with references to existing HTML-elements

const cititesDiv = document.getElementById ("cities");
const tableDiv = document.getElementById("table");
const h2 = document.querySelector ("h2");
const h3 = document.querySelector ("h3");

// Recommended: Ask for the city name and then the rest of the code

//fråga användaren om en stad

//hitta närmaste och längst bort städer

// visa information om städer

//bygga tabellen

//lägga till kolumnrubriker

// lägg till en stad för varje rad