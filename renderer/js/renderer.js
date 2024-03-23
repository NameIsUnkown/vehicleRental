import Vehicle from "./dataModel.js"
import AddToList from "./vehicleList.js";

const button = document.querySelector('.submit');
const addVehiclesButton = document.querySelector('.add-vehicles');

const informationDisplay = document.querySelector('.information-display');
const form = document.querySelector('.form');

const vehiclesButton = document.querySelector('.list-header');
const triangle = document.querySelector('.triangle-down');
let isClicked2 = true;

let isClicked = true;

form.style.display = "none"

let items;

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
	}

	if (regNumInput && wheelsNum && weightNum && (passNum || heightNum)) {
		const newVehicle = new Vehicle(vehicle);
		Vehicle.saveToJSON(newVehicle, 'data.json');
		const addtoList = new AddToList();

		addtoList.refresh()
	} else {
		return
	}

	document.querySelector('.uregistration-container').value = "";
	document.querySelector('.uwheels-container').value = "";
	document.querySelector('.uweight-container').value = "";
	document.querySelector('.upassengers-container').value = "";
	document.querySelector('.uheight-container').value = "";

	items = document.querySelectorAll(".item");

	document.addEventListener('click', async (event) => {
		if (event.target.classList.contains('item')) {
			try {
				console.log("clicked");
				const data = await (new fetchData()).fetchRegistrationNumber(event.target.textContent);
				console.log("Data: ", data);
			} catch (error) {
				console.error(error);
			}
		}
	});
})

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
	isClicked = !isClicked; // Toggle isClicked
})

vehiclesButton.addEventListener('click', (e) => {
	if (isClicked2) {
		triangle.style.transform = "rotate(180deg)"
		isClicked2 = false;
	}
	else {
		triangle.style.transform = ""
		isClicked2 = true;
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
						console.log("Array found: ", arr);
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
