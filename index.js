// Recommended: All functions declared here


//funktion för att hitta en stad baserat på dess namn
function findCityByName (name) {
    return cities.find(city => city.name === name) || null;
}









// Recommended: constants with references to existing HTML-elements

const cititesDiv = document.getElementById ("cities");
const tableDiv = document.getElementById("table");
const h2 = document.querySelector ("h2");
const h3 = document.querySelector ("h3");

// Recommended: Ask for the city name and then the rest of the code

const target = prompt("Vilken stad?");
console.log (target);

isCityFound(target);

let divCitiesElem = document.getElementById("cities");

for (let city of cities) {
    divCitiesElem.append(createAllCityBoxes(city));
};