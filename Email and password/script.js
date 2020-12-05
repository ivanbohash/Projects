// 1. Navigation (input, validation p, button)
// 2. Not only click, submit
// 3. Autocorrect false
// 4. Validation
// 5. Login button able/disable
var userEmail = document.getElementById('email');
var validationEmail = document.querySelector('.validationEmailMessage');
var userPassword = document.getElementById('password');
var validationPassword = document.querySelector('.validationPasswordMessage');
// var loginButton = document.getElementById('btn');

// loginButton.disabled = true;

var emailCheck = function (event) {
	var value = event.target.value;
	if (!value.includes('@') && value.length > 0) {
		validationEmail.innerText = 'Your email should contain @';
	} else {
		validationEmail.innerText = '';
	}
};

var passCheck = function (event) {
	var value = event.target.value;
	if (!value.length) {
		validationPassword.innerText = '';
	} else if (value.length < 3) {
		validationPassword.innerText = 'Minimum length should be 3 symbols';
	} else if (value.length > 8) {
		validationPassword.innerText =
			'Maximum length should be less than 8 symbols';
	} else {
		validationPassword.innerText = '';
	}
};

userEmail.addEventListener('input', emailCheck);
userPassword.addEventListener('input', passCheck);
