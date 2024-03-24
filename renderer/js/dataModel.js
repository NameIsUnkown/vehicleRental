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

		let foundMatch = false;
		if (existingData) {
			for (const item of existingData) {
				if (item.registration_number == vehicle.vehicleData.registration_number) {
					Object.assign(item, vehicle.dataToJSON().vehicleData);
					foundMatch = true;
				}
			}
		}

		if (!foundMatch) {
			existingData.push(vehicle.dataToJSON().vehicleData);
			foundMatch = false;
		}

        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 4));

        console.log("Data appended and saved.");
	}

	static removeData(data, filePath) {
		try {
			let existingData = [];
	
			if (fs.existsSync(filePath)) {
				existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
			}
	
			// Find the index of the item to remove
			const indexToRemove = existingData.findIndex(item => item.registration_number === data.registration_number);
	
			// Remove the item if found
			if (indexToRemove !== -1) {
				existingData.splice(indexToRemove, 1);
				fs.writeFileSync(filePath, JSON.stringify(existingData, null, 4));
				console.log("Data removed and saved.");
			} else {
				console.log("Data not found for removal.");
			}
		} catch (error) {
			console.error("Error removing data:", error);
		}
	}
	
}