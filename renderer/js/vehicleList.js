class DataFetcher {
	constructor() { }

	async fetchData(url) {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Failed to fetch data from ${url}`);
			}
			return await response.json();
		} catch (error) {
			console.error('Error fetching data:', error);
			throw error;
		}
	}

	async refresh() {}
}

export default class AddToList extends DataFetcher {
	constructor() {
		super();
	}

	async refresh() {
		try {
			const data = await this.fetchData("../../data.json")
			const containerElement = document.querySelector('#items');
			if (containerElement == null) {
				console.log("container element is null")
				return;
			}

			containerElement.innerHTML = "";
			if (Array.isArray(data)) {
				data.forEach(item => {
					const childElement = document.createElement('span');
					childElement.classList.add('item');
					childElement.textContent = item.registration_number;
					containerElement.appendChild(childElement);
				});
			} else {
				console.error('Data is not an array:', data);
			}

		} catch (error) {
			throw new Error(error);
		}
	}
}