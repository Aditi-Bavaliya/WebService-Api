function validateAndSave() {
    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    const mobileNoInput = document.getElementById('mobileNo');
    const emailInput = document.getElementById('email');
    const street = document.getElementById('street');
    const city  = document.getElementById('city');
    const state = document.getElementById('state');
    const country = document.getElementById('country');
    const loginIdInput = document.getElementById('loginId');
    const passwordInput = document.getElementById('password');

    if (firstname.trim() === '' || lastname.trim() === '' || street.trim() === '' || city.trim() === '' || state.trim() === '' ||
    country.trim() === '') {
    alert('Please fill in all fields.');
    return;
  }

    const mobileNoPattern = /^\d{10}$/;
    if (!mobileNoPattern.test(mobileNoInput.value)) {
        document.getElementById('mobileNoError').textContent = 'Invalid mobile number';
        return;
    } else {
        document.getElementById('mobileNoError').textContent = '';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
        document.getElementById('emailError').textContent = 'Invalid email address';
        return;
    } else {
        document.getElementById('emailError').textContent = '';
    }

    const loginIdPattern = /^[A-Za-z0-9_@.-]{8}$/;
    if (!loginIdPattern.test(loginIdInput.value)) {
        document.getElementById('loginIdError').textContent = 'Minimum eight characters, letters, numbers, and special characters (@, ., -) are allowed';
        return;
    } else {
        document.getElementById('loginIdError').textContent = '';
    }

    const password = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if(!password.test(passwordInput.value)){
        document.getElementById('passwordError').textContent='Minimum eight characters, at least one letter, one number, and one special character';
    }else{
        document.getElementById('passwordError').textContent='';
    }

   
    saveUser();
}

function saveUser() {
    const userData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        mobileNo: document.getElementById('mobileNo').value,
        email: document.getElementById('email').value,
        address: {
            street: document.getElementById('street').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            country: document.getElementById('country').value,
        },
        loginId: document.getElementById('loginId').value,
        password: document.getElementById('password').value,
        creationTime: new Date(),
        lastUpdatedOn: new Date(),
    };
}