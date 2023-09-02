// GLOBAL VARIABLES
const form = document.querySelector('form');
const email = document.querySelector('input[name="email"]');
const country = document.querySelector('select[name="country"]');
const zip = document.querySelector('input[name="zip"]');
const password = document.querySelector('input[name="password"]');
const passwordConfirm = document.querySelector('input[name="confirm-password"]');
const allInputs = [email, country, zip, password, passwordConfirm];

// FUNCTIONS

// This function makes the form inputs only invalid after a user leaves the input.
// This fixes the inputs defaulting to invalid on page load, which gives them a red border due to the :invalid class.
function setRequired(input) {
    input.setAttribute('required', true);
}

function showSuccessMsg(input, msgsContent) {
    const msg = input.nextElementSibling;

    msg.textContent = `✅ ${msgsContent.success}`;
    msg.classList.remove('invalid');
    msg.classList.add('valid');
}

function showErrorMsg(input, msgsContent) {
    const msg = input.nextElementSibling;

    msg.textContent = `❗️${msgsContent.error}`;
    msg.classList.remove('valid');
    msg.classList.add('invalid');
}

function checkEmail() {
    const emailMsgs = {
        error: 'Provide a valid email (ex. johnsmith@example.com).',
        success: 'Looks good!'
    }

    if (email.validity.patternMismatch || email.validity.valueMissing) {
        showErrorMsg(email, emailMsgs);
    } else {
        showSuccessMsg(email, emailMsgs);
    }
}

function checkCountry() {
    const countryMsgs = {
        error: 'Select your country.',
        success: 'Thank you!'
    }

    if (country.validity.valueMissing) {
        showErrorMsg(country, countryMsgs);
    } else {
        showSuccessMsg(country, countryMsgs);
    }
}

function checkZip() {
    const zipMsgs = {
        error: 'Provide a valid code (ex. 33333 or 22222-3333).',
        success: 'Awesome!'
    }

    if (zip.validity.patternMismatch || zip.validity.valueMissing) {
        showErrorMsg(zip, zipMsgs);
    } else {
        showSuccessMsg(zip, zipMsgs);
    }
}

function checkPassword() {
    const passwordMsgs = {
        error: 'Please include the following:',
        success: `That's a strong password.`
    };
    const capitalRegex = /[A-Z]/;
    const numRegex = /[0-9]/;
    const symbolRegex = /[!@#$%^&*.?]/;
    const capitalError = document.getElementById('capital-error');
    const numberError = document.getElementById('number-error');
    const symbolError = document.getElementById('symbol-error');
    const lengthError = document.getElementById('length-error');
    const additionalErrors = [ ...document.querySelector('.additional-errors-container').children];

    if (!password.validity.valid) {
        if (password.validity.valueMissing && !password.clicked) { //Not the best code. Even though the password is clicked, this is false b/c password.clicked hasn't been set to true yet on blur
            passwordMsgs.error = 'Please enter a password.';
            additionalErrors.map(error => error.classList.remove('invalid'));
        } else if (password.validity.patternMismatch) {
            if (!capitalRegex.test(password.value)) {
                capitalError.classList.add('invalid');
            } else {
                capitalError.classList.remove('invalid');
            }
            if (!numRegex.test(password.value)) {
                numberError.classList.add('invalid');
            } else {
                numberError.classList.remove('invalid');
            }
            if (!symbolRegex.test(password.value)) {
                symbolError.classList.add('invalid');
            } else {
                symbolError.classList.remove('invalid');
            }
            if (password.validity.tooShort || password.validity.tooLong) {
                lengthError.classList.add('invalid');
            } else {
                lengthError.classList.remove('invalid');
            }
        }
        showErrorMsg(password, passwordMsgs);
    } else {
        additionalErrors.map(error => error.classList.remove('invalid'));
        showSuccessMsg(password, passwordMsgs);
    }
}

function checkPasswordConfirm() {
    const passwordConfirmMsgs = {
        error: '',
        success: 'Thank you!'
    }

    const passwordEscaped = password.value.replace(/[.*+?^$]/g, '\\$&');
    passwordConfirm.setAttribute('pattern', passwordEscaped)

    if (passwordConfirm.validity.valueMissing) {
        passwordConfirmMsgs.error = 'Please confirm your password.';
        showErrorMsg(passwordConfirm, passwordConfirmMsgs);
    } else if (passwordConfirm.validity.patternMismatch) {
        passwordConfirmMsgs.error = `The passwords don't match.`;
        showErrorMsg(passwordConfirm, passwordConfirmMsgs);
    } else {
        showSuccessMsg(passwordConfirm, passwordConfirmMsgs);
    }
}

function checkAllInputs() {
    checkEmail();
    checkCountry();
    checkZip();
    checkPassword();
    checkPasswordConfirm()
}

// EVENTS
email.addEventListener('blur', () => {
    setRequired(email);
    checkEmail();
    email.clicked = true;
});

email.addEventListener('input', () => {
    if (email.clicked) checkEmail();
});

country.addEventListener('blur', () => {
    setRequired(country);
    checkCountry();
    country.clicked = true;
});

country.addEventListener('input', () => {
    if (country.clicked) checkCountry();
})

zip.addEventListener('blur', () => { 
    setRequired(zip)
    checkZip();
    zip.clicked = true;
});

zip.addEventListener('input', () => { 
    if (zip.clicked) checkZip(); 
});

password.addEventListener('blur', () => {
    setRequired(password);
    checkPassword();
    password.clicked = true;
});

password.addEventListener('input', () => {
    if (password.clicked) checkPassword();
});

passwordConfirm.addEventListener('blur', () => {
    setRequired(passwordConfirm);
    checkPasswordConfirm();
    passwordConfirm.clicked = true;
})

passwordConfirm.addEventListener('input', () => {
    if (passwordConfirm.clicked) checkPasswordConfirm();
});

form.addEventListener('submit', (event) => {
    const fixErrorsMsg = document.querySelector('.fix-errors-msg');
    const thumbsUp = document.querySelector('.thumbs-up');
    
    event.preventDefault();
    allInputs.forEach(input => {
        setRequired(input);
        input.clicked = true;
    });

    if (!form.checkValidity()) {
        fixErrorsMsg.classList.add('active');
        checkAllInputs();
    } else {
        fixErrorsMsg.classList.remove('active');
        thumbsUp.classList.add('active');
    }
});
