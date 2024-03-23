export default class AddToList {
	constructor() { }

	refresh() {
		fetch("../../data.json")
			.then(response => {
				if (!response.ok) {
					throw new Error('Failed to fetch data.json');
				}
				return response.json();
			})
			.then(data => {
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
						console.log("registration number: ", item.registration_number);
					});
				} else {
					console.error('Data is not an array:', data);
				}
			})
			.catch(error => {
				console.error('Error fetching data:', error);
			});
	}
}