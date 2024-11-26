// Recommended: All functions declared here


//funktion för att vid anrop skapa city boxes
function createAllCityBoxes () {
    cititesDiv.innerHtml = "";
    for (let city of cities) { 
        const cityElement = document.createElement ("p");
        cityElement.textContent = city.name;
        cityElement.classList.add("cityBox");
        cititesDiv.appendChild(cityElement);
    }
}


//funktion för att markera och hitta targetCityName
function findCity (targetCityName) {
    for (let city of cities) {
        if (city.name === targetCityName) {
            return city;
        }
    }
    return null;
}

function markCityBox (kindOfCity, cityObject, distance = null) {
    const cityElements = document.querySelectorAll (".cityBox")
    for (let cityElement of cityElements) {
        if (cityElement.textContent === cityObjects.name) {
            cityElement.classList.add(kindOfCity);
            if (kindOfCity == "closest" && distance !== null){
                cityElement.innerHTML += ` ligger ${distance} mil bort`;
        }    
        if (kindOfCity == "furthest" && distance !== null){
            cityElement.innerHTML += ` ligger ${distance} mil bort`;
        }
        }
    }
}

function getClosestCity (targetCity) {
    let getClosestCity = null;
    let minDistance = Infinity;

    for (let counter of distances) {
        if (counter.city1 === targetCity.id || counter.city2 === targetCity.id) {
            const otherCityId = cities.find(city => city.id === otherCityId);

            if (counter.distance < minDistance) {
                minDistance = counter.distance;
                closestCity = otherCity;
            }
        }
    }
    return {city: closestCity, distance: minDistance};
}

// Recommended: constants with references to existing HTML-elements

const cititesDiv = document.getElementById ("cities");
const tableDiv = document.getElementById("table");
const cityElement = document.createElement ("p");
const h2 = document.querySelector ("h2");
const h3 = document.querySelector ("h3");

const targetCityName = prompt ("Ange en stad i Europa!");
const cityFound = searchCity (targetCityName);

// Recommended: Ask for the city name and then the rest of the code

//fråga användaren om en stad

//hitta närmaste och längst bort städer

// visa information om städer

//bygga tabellen

//lägga till kolumnrubriker

// lägg till en stad för varje rad