// Recommended: All functions declared here

function createAllCityBoxes (city) {
    const cityDiv = document.createElement("div");
    cityDiv.classList.add("cityBox");
    cityDiv.textContent = city.name;
    return cityDiv;
}


function markCityBox (cityObject, kindOfCity) {
    const cityBoxes = document.querySelectorAll(".cityBox");
    for (let cityBox of cityBoxes) {
        if (cityBox.textContent = cityObject.name) {
            cityBox.classList.add("target");
        } else if (cityBox > 1) {
            cityBox.classList.add("closest");
        } else {
            cityBox.classList.add("furthest");
        }
    }
}

function isCityFound (target) {
    let cityFound = false;
    let chosenCity = null;
    const targetLC = target.toLowerCase ();
// sätter "chosenCity" till True/False om "target" matchar något namn i "cities"
    for (let cityValue of cities) {
        const cityValueLC = cityValue.name.toLowerCase ()
        titleElem = document.querySelector("title");
        if (targetLC == cityValueLC) {
            //jämför target med indexderad (chosenCity) array i Cities
            cityFound = true;
            h2, textContent = target + "(" + cityValue.country + ")";
            chosenCity = cityValue;
            //sätt rätt title (fliken)
            titleElem.innerText = cityValue.name;
            //avbryt loopen, chosenCity=True, staden finns i databasen
            break;
        } else {
            h2.textContent = target + "finns inte i databasen"
            //sätt rätt title (fliken)
            titleElem.innerText = "Not Found"
        }
        console.log("___")
    }
    return cityFound;
};







// Recommended: constants with references to existing HTML-elements

const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const closestCity = document.getElementById("closest");
const furthestCity = document.getElementById("furthest");
const divCities = document.getElementById("cities");

// Recommended: Ask for the city name and then the rest of the code

const target = prompt("Vilken stad?");
console.log (target);

isCityFound(target);

let divCitiesElem = document.getElementById("cities");

for (let city of cities) {
    divCitiesElem.append(createAllCityBoxes(city));
};