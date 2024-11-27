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

function getFurthestCity (targetCity) {
    let furthestCity = null;
    let maxDistance = Infinity;

    for (let counter of distances) {
        if (counter.city1 === targetCity.id || counter.city2 === targetCity.id) {
            const otherCityId = counter.city1 === targetCity.id ? counter.city2 : counter.city1;
            const otherCity = cities.find(city => city.id === otherCityId);
            
            if (counter.distance > maxDistance) {
                maxDistance = counter.distance;
                furthestCity = otherCity;
            }
        }
    }

    return {city: furthestCity, distance: maxDistance};
}

if (cityFound == null) {
    document.title = "Not found";
    h2.textContent = `${targetCityName} finns inte i databasen!`;
    h3.textContent = "";
} else {
    document.title = `${cityFound.name}`;
    h2.textContent = `${cityFound.name} ${cityFound.country} )`;
    markCityBox ("target", cityFound);
    const {city: closestCity, distance: minDistance} = getClosestCity(cityFound);
    markCityBox ("closest", closestCity, minDistance /10);
    const {city: furthestCity, distance: maxDistance} = getFurthestCity(cityFound);

    markCityBox ("furthest", furthestCity, maxDistance /10);

    h3.textContent = `Av städerna i databasen så ligger ${ closestCity.name } närmast och ${farthestCity.name} längst bort.`;
}


//skapa tabell
for (let row = 0; row <= cities.length; row++) {
    for (let column = 0; column <= cities.length; column++) {
        let gridCell = document.createElement("div"); 
        gridCell.classList.add("cell"); 
        distanceTable.appendChild(gridCell); 

        if (row >= 1 && column >= 1) {
            for (let distanceKey in distances) {
                if (distances[distanceKey].city1 == column - 1 && distances[distanceKey].city2 == row - 1) {
                    gridCell.textContent = distances[distanceKey].distance / 10; 
                }
                if (distances[distanceKey].city2 == column - 1 && distances[distanceKey].city1 == row - 1) {
                    gridCell.textContent = distances[distanceKey].distance / 10; 
                }
            }
        }
        if (row == 0) {
            gridCell.classList.add("head_row"); 
            gridCell.textContent = column - 1; 
        }

        if (column == 0 && row >= 1) {
            gridCell.classList.add("head_column"); 
            gridCell.textContent = cities[row - 1].id + " - " + cities[row - 1].name;
        }

        if (row == column) {
            gridCell.textContent = " ";
        }

        if (row % 2 == 1) {
            gridCell.classList.add("even_row"); 
        }

        if (column % 2 == 1 && row != 0) {
            gridCell.classList.add("even_col"); 
        }
    }
}



// Recommended: constants with references to existing HTML-elements

let enterCity = prompt("Vilken stad?");
let cityWasfound = false;
let closestCityFound = null;
let furthestCityFound = null;
let minDistance = 3000;
let maxDistance = 0;

const titleHead = document.querySelector("title");
const cityTitle = document.querySelector("h2");
const cityUndertitle = document.querySelector("h3");
const cityBoxes = document.querySelector("#cities");
const distanceTable = document.querySelector("#table");
const theClosestCity = document.querySelector("#closest");
const theFurthestCity = document.querySelector("#furthest");

// Recommended: Ask for the city name and then the rest of the code

