const targetCityName = prompt("Vilken stad?");
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const citiesDiv = document.getElementById("cities");
const tablediv = document.getElementById("table");

function createAllCityBoxes() {
    citiesDiv.textContent = '';
    for (let i = 0; i < cities.length; i++) {
        const p = document.createElement("p");
        p.className = "cityBox";
        p.textContent = cities[i].name;
        citiesDiv.appendChild(p);
    }
}

function markCityBox(kindOfCity, cityObject, distance) {
    const boxes = document.querySelectorAll(".cityBox");
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].textContent === cityObject.name) {
            boxes[i].classList.add(kindOfCity);
            if (distance) {
                boxes[i].textContent = cityObject.name + " ligger " + distance + " mil bort";
            }
        }
    }
}

function createTable() {
    tablediv.textContent = '';
    const headerCell = document.createElement("p");
    headerCell.className = "cell";
    tablediv.appendChild(headerCell);

    for (let i = 0; i < cities.length; i++) {
        const header = document.createElement("p");
        header.className = "cell head_row";
        header.textContent = cities[i].id;
        tablediv.appendChild(header);
    }

    for (let i = 0; i < cities.length; i++) {
        const rowHeader = document.createElement("p");
        if (cities[i].id % 2 === 0) {
            rowHeader.className = "cell head_column even_row";
        } else {
            rowHeader.className = "cell head_column";
        }
        rowHeader.textContent = cities[i].id + "-" + cities[i].name;
        tablediv.appendChild(rowHeader);

        for (let j = 0; j < cities.length; j++) {
            const cell = document.createElement("p");
            let className = "cell";
            if (cities[i].id % 2 === 0) {
                className += " even_row";
            }
            if (cities[j].id % 2 === 0) {
                className += " even_col";
            }
            cell.className = className;

            if (i !== j) {
                let foundDistance = null;
                for (let k = 0; k < distances.length; k++) {
                    if ((distances[k].city1 === cities[i].id && distances[k].city2 === cities[j].id) ||
                        (distances[k].city1 === cities[j].id && distances[k].city2 === cities[i].id)) {
                        foundDistance = distances[k].distance / 10;
                        break;
                    }
                }
                if (foundDistance !== null) {
                    cell.textContent = foundDistance;
                }
            }
            tablediv.appendChild(cell);
        }
    }
}

createAllCityBoxes();
createTable();

let cityFound = null;
for (let i = 0; i < cities.length; i++) {
    if (cities[i].name === targetCityName) {
        cityFound = cities[i];
        break;
    }
}

if (cityFound === null) {
    h2.textContent = targetCityName + " Finns inte i databasen!";
    document.title = "Not found";
    h3.textContent = "";
} else {
    h2.textContent = cityFound.name + " (" + cityFound.country + ")";
    document.title = cityFound.name;
    markCityBox("target", cityFound);

    let closestCity = null;
    let shortestDistance = Infinity;
    let furthestCity = null;
    let longestDistance = -Infinity;

    for (let i = 0; i < distances.length; i++) {
        if (distances[i].city1 === cityFound.id || distances[i].city2 === cityFound.id) {
            let otherCityId;
            if (distances[i].city1 === cityFound.id) {
                otherCityId = distances[i].city2;
            } else {
                otherCityId = distances[i].city1;
            }

            let otherCity = null;
            for (let j = 0; j < cities.length; j++) {
                if (cities[j].id === otherCityId) {
                    otherCity = cities[j];
                    break;
                }
            }

            if (distances[i].distance < shortestDistance) {
                shortestDistance = distances[i].distance;
                closestCity = otherCity;
            }

            if (distances[i].distance > longestDistance) {
                longestDistance = distances[i].distance;
                furthestCity = otherCity;
            }
        }
    }

    markCityBox("closest", closestCity, shortestDistance / 10);
    markCityBox("furthest", furthestCity, longestDistance / 10);

    h3.textContent = "Av städerna i databasen så ligger " + closestCity.name + " närmast och " + furthestCity.name + " längst bort.";
}


