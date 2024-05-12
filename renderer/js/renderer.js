import Vehicle from "./dataModel.js"
import AddToList from "./vehicleList.js";

const addtoList = new AddToList();

const button = document.querySelector('.submit');
const addVehiclesButton = document.querySelector('.add-vehicles');

const informationDisplay = document.querySelector('.information-display');
const form = document.querySelector('.form');
const itemsContainer = document.getElementById('items');

const vehiclesButton = document.querySelector('.list-header');
const triangle = document.querySelector('.triangle-down');
let isClicked2 = true;

let isClicked = true;

form.style.display = "none";
itemsContainer.style.display = "none";

let items;

const carChoice = document.querySelector('.ucar-choice');
const vanChoice = document.querySelector('.uvan-choice');

const mcarChoice = document.querySelector('.car-choice');
const mvanChoice = document.querySelector('.van-choice');

let isCar = true;

const carSection = document.querySelector('.ucar-information');
const vanSection = document.querySelector('.uvan-information');

vanSection.style.display = "none";

const edit = document.querySelector('.edit');
const remove = document.querySelector('.remove');

const selected = document.querySelector('.selected');

remove.addEventListener('click', (e) => {
    let regNumInput = document.querySelector('.registration-container')?.textContent;

    if (!regNumInput) {
        console.log("No data entered to remove.");
        return;
    }

    try {
        const dataToRemove = { registration_number: regNumInput };
        Vehicle.removeData(dataToRemove, 'data.json');
        console.log("Data removed successfully.");

        mcarChoice.style.backgroundColor = "#C7C7C7";
        mvanChoice.style.backgroundColor = "#C7C7C7";

				addtoList.refresh()
				document.querySelector('.uregistration-container').textContent = "";
        document.querySelector('.uwheels-container').textContent = "";
        document.querySelector('.uweight-container').textContent = "";
        document.querySelector('.upassengers-container').textContent = "";
        document.querySelector('.uheight-container').textContent = "";

				document.querySelector('.registration-container').textContent = "";
        document.querySelector('.wheels-container').textContent = "";
        document.querySelector('.weight-container').textContent = "";
        document.querySelector('.passengers-container').textContent = "";
        document.querySelector('.height-container').textContent = "";
			
				selected.textContent = ''
    } catch (error) {
        console.error("Error removing data:", error);
    }
});

edit.addEventListener('click', (e) => {
	form.style.display = ""
	informationDisplay.style.display = "none"
	let regNumInput = document.querySelector('.registration-container')?.textContent;
	let wheelsNum = document.querySelector('.wheels-container')?.textContent;
	let weightNum = document.querySelector('.weight-container')?.textContent;
	let passNum = document.querySelector('.passengers-container')?.textContent;
	let heightNum = document.querySelector('.height-container')?.textContent;
	
	if (mcarChoice.style.backgroundColor == "#2E2E2E") {
		carChoice.style.backgroundColor = "#2E2E2E";
		vanChoice.style.backgroundColor = "#C7C7C7";
	} else {
		carChoice.style.backgroundColor = "#C7C7C7";
		vanChoice.style.backgroundColor = "#2E2E2E";
	}

	document.querySelector('.uregistration-container').value = regNumInput;
	document.querySelector('.uwheels-container').value = wheelsNum;
	document.querySelector('.uweight-container').value = weightNum;
	document.querySelector('.upassengers-container').value = passNum;
	document.querySelector('.uheight-container').value = heightNum;
})

carChoice.addEventListener('click', (e) => {
	carChoice.style.backgroundColor = "#2E2E2E";
	vanChoice.style.backgroundColor = "#C7C7C7";
	isCar = true;
	vanSection.style.display = "none";
	carSection.style.display = "";
})

vanChoice.addEventListener('click', (e) => {
	carChoice.style.backgroundColor = "#C7C7C7";
	vanChoice.style.backgroundColor = "#2E2E2E";
	isCar = false;
	carSection.style.display = "none";
	vanSection.style.display = "";
})

document.addEventListener('DOMContentLoaded', () => {
	addtoList.refresh();
})

button.addEventListener('click', (e) => {
	let regNumInput = document.querySelector('.uregistration-container')?.value;
	let wheelsNum = document.querySelector('.uwheels-container')?.value;
	let weightNum = document.querySelector('.uweight-container')?.value;
	let passNum = document.querySelector('.upassengers-container')?.value;
	let heightNum = document.querySelector('.uheight-container')?.value;
	var vehicle = {
		registration_number: regNumInput ? regNumInput : null,
		wheels_number: wheelsNum ? wheelsNum : null,
		weight_value: weightNum ? weightNum : null,
		passengers_number: passNum ? passNum : null,
		height_number: heightNum ? heightNum : null,
		vehicle_type: isCar ? "carChoice" : "vanChoice",
	}

	if (regNumInput && wheelsNum && weightNum && (passNum || heightNum)) {
		const newVehicle = new Vehicle(vehicle)
		Vehicle.saveToJSON(newVehicle, 'data.json');
		addtoList.refresh()
	} else {
		return
	}

	document.querySelector('.uregistration-container').value = "";
	document.querySelector('.uwheels-container').value = "";
	document.querySelector('.uweight-container').value = "";
	document.querySelector('.upassengers-container').value = "";
	document.querySelector('.uheight-container').value = "";

	carChoice.style.backgroundColor = "#C7C7C7";
	vanChoice.style.backgroundColor = "#C7C7C7";

	triangle.style.transform = ""
	isClicked2 = true;
	itemsContainer.style.display = "none";
})

items = document.querySelectorAll(".item");

document.addEventListener('click', async (event) => {
	if (event.target.classList.contains('item')) {
		try {
			console.log("clicked");
			const data = await (new fetchData()).fetchRegistrationNumber(event.target.textContent);
			selected.textContent = data.registration_number
			console.log("Data: ", data);
		} catch (error) {
			console.error(error);
		}
	}
});

addVehiclesButton.addEventListener('click', (e) => {
	if (isClicked) {
		informationDisplay.style.display = "none";
		form.style.display = "";
		addVehiclesButton.style.backgroundColor = "#2E2E2E";
		addVehiclesButton.style.color = "#9B9B9B";
	} else {
		informationDisplay.style.display = "";
		form.style.display = "none";
		addVehiclesButton.style.backgroundColor = "";
		addVehiclesButton.style.color = "";
	}
	isClicked = !isClicked;
})

vehiclesButton.addEventListener('click', (e) => {
	if (isClicked2) {
		triangle.style.transform = "rotate(180deg)"
		isClicked2 = false;
		itemsContainer.style.display = "";
	}
	else {
		triangle.style.transform = ""
		isClicked2 = true;
		itemsContainer.style.display = "none";
	}
})

class fetchData {
	constructor() {}

	async fetchRegistrationNumber(registration_number) {
		console.log("Fetching data...");
		try {
			const response = await fetch("../../data.json");
			if (!response.ok) {
				throw new Error("Failed to fetch data");
			}
			const data = await response.json();
			if (Array.isArray(data)) {
				for (const arr of data) {
					if (arr.registration_number == registration_number) {
						document.querySelector('.registration-container').textContent = arr.registration_number;
						document.querySelector('.wheels-container').textContent = arr.wheels_number;
						document.querySelector('.weight-container').textContent = arr.weight_value;
						document.querySelector('.passengers-container').textContent = arr.passengers_number || "";
						document.querySelector('.height-container').textContent = arr.height_number || "";
						if (arr.vehicle_type == "carChoice") {
							mcarChoice.style.backgroundColor = "#2E2E2E";
							mvanChoice.style.backgroundColor = "#C7C7C7";
						} else {
							mvanChoice.style.backgroundColor = "#2E2E2E";
							mcarChoice.style.backgroundColor = "#C7C7C7";
						}
						return arr;
					}
				}
				console.log("Registration number not found");
			} else {
				console.log("Data is not an array");
			}
			return null;
		} catch (error) {
			console.error("Error fetching data:", error);
			throw error;
		}
	}
}
