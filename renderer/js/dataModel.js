const fs = require("fs");

export default class Vehicle {
	constructor(vehicleData) {
		this.vehicleData = vehicleData
	}

	dataToJSON() {
		return {
			vehicleData: this.vehicleData
		}
	}

	static saveToJSON(vehicle, filePath) {
        let existingData = [];

        if (fs.existsSync(filePath)) {
            existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        }

        existingData.push(vehicle.dataToJSON().vehicleData);

        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 4));

        console.log("Data appended and saved.");
	}
}