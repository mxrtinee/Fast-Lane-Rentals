// Genesis
function openModal() {
	document.getElementById('reviewmodal').style.display = 'block';
}

// Revelations
function closeModal() {
	document.getElementById('reviewmodal').style.display = 'none';
	let inputs = document.querySelectorAll('input');
	document.getElementById('car-input').placeholder = 'which car did you rent out?';
	document.getElementById('experience-input').placeholder =
		'how was your entire experience, before, during and after?';
	inputs.forEach((input) => (input.value = ''));
}