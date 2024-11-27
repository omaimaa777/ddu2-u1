const targetCityName = prompt ("Vilken stad?");
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const citiesDiv = document.getElementById("cities");
const cityElement = document.createElement("p");
const tablediv = document.getElementById("table");
const cityFound = findCity (targetCityName);

createTable()
createAllCityBoxes();

function createAllCityBoxes() {
    citiesDiv.innerHTML = "";
    for (let city of cities) { 
        const cityElement = document.createElement("p");
        cityElement.textContent = city.name; 
        cityElement.classList.add("cityBox"); 
        citiesDiv.appendChild(cityElement); 
    
    } 
}

function findCity (targetCityName) { 
    for (let city of cities) {
        if (city.name === targetCityName) {
            return city; 
        }
    }
    return null; 
}

function markCityBox(kindOfCity, cityObject, distance = null) {
    const cityElements = document.querySelectorAll(".cityBox")
    for (let cityElement of cityElements) { 
       if (cityElement.textContent === cityObject.name) {
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

function getClosestCity(targetCity) {
    let closestCity = null;
    let minDistance = Infinity;

    for (let counter of distances) {
        if (counter.city1 === targetCity.id || counter.city2 === targetCity.id) {
            const otherCityId = counter.city1 === targetCity.id ? counter.city2 : counter.city1;
            const otherCity = cities.find(city => city.id === otherCityId);

            if (counter.distance < minDistance) {
                minDistance = counter.distance;
                closestCity = otherCity;
            }
        }
    }
    return {city: closestCity, distance: minDistance};
}

function getFurthestCity(targetCity) {
    let furthestCity = null;
    let maxDistance = -Infinity;

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

function findDistance(city1Id, city2Id) {
    for (let distance of distances) {
        if (
            (distance.city1 === city1Id && distance.city2 === city2Id) ||
            (distance.city1 === city2Id && distance.city2 === city1Id)
        ) {
            return distance.distance; 
        }
    }
    return null;
}

if (cityFound == null) {
    h2.textContent = `${targetCityName} Finns inte i databasen!`
    document.title = "Not found"; 
    h3.textContent= "";
} else {
    h2.textContent = `${cityFound.name} (${cityFound.country})`;
    document.title = `${cityFound.name}`; 
    markCityBox("target", cityFound);
    const {city: closestCity, distance: minDistance} = getClosestCity(cityFound);
    markCityBox("closest", closestCity, minDistance /10);
    const {city: farthestCity, distance: maxDistance} = getFurthestCity(cityFound);
    markCityBox("furthest", farthestCity, maxDistance /10); 

    h3.textContent = `Av städerna i databasen så ligger ${ closestCity.name } närmast och ${farthestCity.name} längst bort.`;        
}


function createTable(){
const emptyCell = document.createElement("p");
emptyCell.classList.add("cell");
tablediv.appendChild(emptyCell);

for (let city of cities){
    const idCell = document.createElement ("p");
    idCell.classList.add("cell", "head_row");
    idCell.textContent = city.id;
    tablediv.appendChild(idCell);
    
}

for (let cityRow of cities){
    let classEvenrows = "";
    if (cityRow.id % 2 == 0) {
     classEvenrows= "even_row";
    }

 const cityCell = document.createElement("p");
 cityCell.classList.add("cell", "head_column");
 cityCell.textContent = ` ${cityRow.id}-${cityRow.name}`;
 cityCell.classList.add("even_row");
 tablediv.appendChild(cityCell);

 for (let cityColumn of cities) {
    let classEvenCols = cityColumn.id % 2 == 0 ? "even_col" : "";
    let cellClass = `cell ${classEvenrows} ${classEvenCols}`;

    if (cityRow.id === cityColumn.id) {
        tablediv.innerHTML += `<p class="${cellClass}"></p>`;
    } else {
        const distance = findDistance(cityRow.id, cityColumn.id);
        const cellContent = distance ? (distance / 10) : "";
        tablediv.innerHTML += `<p class="${cellClass}">${cellContent}</p>`;
    }
   }
  }   
 }


