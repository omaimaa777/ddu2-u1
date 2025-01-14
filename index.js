const targetCityName = prompt("Vilken stad?");
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const citiesDiv = document.getElementById("cities");
const tablediv = document.getElementById("table");

function createAllCityBoxes() {
    citiesDiv.textContent = '';
    
    for (let city of cities) {
        const p = document.createElement('p');
        p.className = 'cityBox';
        p.textContent = city.name;
        citiesDiv.appendChild(p);
    }
}

function markCityBox(kindOfCity, cityObject, distance) {
    const boxes = document.querySelectorAll('.cityBox');
    for (let box of boxes) {
        if (box.textContent === cityObject.name) {
            box.classList.add(kindOfCity);
            if (distance) {
                box.textContent = cityObject.name + " ligger " + distance + " mil bort";
            }
        }
    }
}

function createTable() {
    tablediv.textContent = ''; 

    const headerCell = document.createElement('p');
    headerCell.className = 'cell';
    tablediv.appendChild(headerCell);

    for (let city of cities) {
        const header = document.createElement('p');
        header.className = 'cell head_row';
        header.textContent = city.id;
        tablediv.appendChild(header);
    }

    for (let cityRow of cities) {
        const rowHeader = document.createElement('p');
        if (cityRow.id % 2 === 0) {
            rowHeader.className = 'cell head_column even_row';
        } else {
            rowHeader.className = 'cell head_column';
        }
        rowHeader.textContent = cityRow.id + "-" + cityRow.name;
        tablediv.appendChild(rowHeader);

        for (let cityCol of cities) {
            const cell = document.createElement('p');
            let className = 'cell';
            if (cityRow.id % 2 === 0) className += ' even_row';
            if (cityCol.id % 2 === 0) className += ' even_col';
            cell.className = className;

            if (cityRow.id !== cityCol.id) {
                let foundDistance = null;
                for (let dist of distances) {
                    if ((dist.city1 === cityRow.id && dist.city2 === cityCol.id) ||
                        (dist.city1 === cityCol.id && dist.city2 === cityRow.id)) {
                        foundDistance = dist.distance / 10;
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
for (let city of cities) {
    if (city.name === targetCityName) {
        cityFound = city;
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
    let shortestDistance = distances[0].distance; 
    let furthestCity = null;
    let longestDistance = distances[0].distance;

    for (let distance of distances) {
        if (distance.city1 === cityFound.id || distance.city2 === cityFound.id) {
            let otherCityId;
            if (distance.city1 === cityFound.id) {
                otherCityId = distance.city2;
            } else {
                otherCityId = distance.city1;
            }

            let otherCity = null;
            for (let city of cities) {
                if (city.id === otherCityId) {
                    otherCity = city;
                    break;
                }
            }

            if (distance.distance < shortestDistance) {
                shortestDistance = distance.distance;
                closestCity = otherCity;
            }

            if (distance.distance > longestDistance) {
                longestDistance = distance.distance;
                furthestCity = otherCity;
            }
        }
    }

    markCityBox("closest", closestCity, shortestDistance / 10);
    markCityBox("furthest", furthestCity, longestDistance / 10);

    h3.textContent = "Av städerna i databasen så ligger " + closestCity.name + " närmast och " + furthestCity.name + " längst bort.";
}



