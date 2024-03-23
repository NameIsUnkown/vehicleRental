const { contextBridge } = require('electron');

const fs = require("fs");

class Vehicle {
	constructor(type, registration_number, number_of_wheels, weight, passengers, height) {
		this.type = type;
		this.registration_number = registration_number;
		this.number_of_wheels = number_of_wheels;
		this.weight = weight;
		this.passengers = passengers;
		this.height = height;
	}

	dataToJSON() {
		return {
			type: this.type,
			registration_number: this.registration_number,
			number_of_wheels: this.number_of_wheels,
			weight: this.weight,
			passengers: this.passengers,
			height: this.height,
		}
	}

	static saveToJSON(vehicle, filePath) {
		const jsonVehicleData = JSON.stringify(vehicle.dataToJSON());
		fs.writeFileSync(filePath, jsonVehicleData);
		alert("saved")
	}
}

contextBridge.exposeInMainWorld('electron', {
    Vehicle: Vehicle
});