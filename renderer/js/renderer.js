const button = document.querySelector('.submit');

button.addEventListener('click', (e) => {
	const regNumInput = document.querySelector('.registration-container').value;
	const wheelsNum = document.querySelector('.wheels-container').value;
	const weightNum = document.querySelector('.weight-container').value;
	const passNum = document.querySelector('.passengers-container')?.value;
	const heightNum = document.querySelector('.height-container')?.value;

	const vehicle = new VehicleModel(regNumInput, wheelsNum, weightNum, passNum ? passNum : null, heightNum ? heightNum : null);
})
