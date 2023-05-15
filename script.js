let url = "https://api.nationalize.io/?name=rajasekhara";
let restCountriesUrl = "https://restcountries.com/v3.1/all";

let h1 = document.createElement("h1")
h1.innerText = "Nationality Guess from Names";
h1.setAttribute("class", "text-center bg-dark text-light p-1")
document.body.appendChild(h1);

let container = document.createElement('div');
document.body.appendChild(container);
container.setAttribute('class', 'container w-75');

let userInputElement = document.createElement('input');
userInputElement.setAttribute('placeholder', "Enter any name");
userInputElement.setAttribute('class', 'form-control m-2 mt-4');
container.appendChild(userInputElement);

let submitBtn = document.createElement('button');
submitBtn.innerText = "Submit";
container.appendChild(submitBtn);
submitBtn.setAttribute('onclick', 'nationalize()');
submitBtn.setAttribute('class', 'btn btn-warning m-2');

let displayContainer = document.createElement('div');
displayContainer.setAttribute('class', 'container-fluid d-flex flex-wrap justify-content-center');
displayContainer.setAttribute('id', 'displayContainer');
document.body.appendChild(displayContainer);



async function nationalize() {
    try {
        let input = document.querySelector('input').value;

        if (input !== "") {
            // console.log(input);
            let dataObj = await fetch(`https://api.nationalize.io/?name=${input}`)
            let data = await dataObj.json()
            // console.log(data);
            displayData(data);

            input.value = "";
            // return data;
        } else {
            alert("Input cannot be blank");
        }

    } catch (error) {
        console.log(error);
    }
};

// let nationalizeFun = nationalize();

async function displayData(data) {
    let displayContainer = document.querySelector('#displayContainer');
    displayContainer.innerHTML = "";
    // let html = '';
    try {
        // console.log(data);
        if (data.country != "") {
            // console.log("found");
            let countriesData = await fetch(restCountriesUrl);
            let countries = await countriesData.json();
            // console.log(countries[0].cca2);

            data["country"].forEach(element => {
                // console.log(element.country_id);
                probability = (element.probability * 100).toFixed(1);
                countryId = element.country_id;
                countries.forEach((e) => {
                    if (countryId == e.cca2) {
                        countryName = e.name.common;
                        countryFlag = e["flags"]["png"];
                    }
                });
                // console.log(countryName);

                let card = document.createElement('div');
                card.setAttribute('class', 'card m-2 d-flex align-items-center text-dark border-2 border-primary');
                displayContainer.appendChild(card);

                let img = document.createElement('img');
                img.setAttribute('class', "w-100");
                // img.style.width= "250px"
                img.src = countryFlag;
                card.appendChild(img);

                let nameE = document.createElement('h5');
                card.appendChild(nameE);
                nameE.innerText = `${countryId} - ${countryName}`;

                let probE = document.createElement('h5');
                card.appendChild(probE);
                probE.innerText = `Probability: ${probability} %`;

                // html += `<div>
                // <img src="${countryFlag}></img>
                // <h1>${countryName}</h1>
                // <h1>${probability} %</h1>
                // </div>`
            });
        }
        else {
            // console.log("not found");
            displayContainer.innerHTML = "Input can't be blank";
        }
        // displayContainer.innerHTML = html;

    } catch (error) {
        displayContainer.innerHTML = "Data not found plese try with a different name";
    }
}

