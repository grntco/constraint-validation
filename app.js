// GLOBAL VARIABLS
const email = document.querySelector('input[name="email"]');
const country = document.querySelector('select[name="country"]');
const zip = document.querySelector('input[name="zip"]');
const password = document.querySelector('input[name="password"]');
const passwordConfirm = document.querySelector('input[name="confirm-password"]');

// SHOW MESSAGES
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

// INPUT CHECKS
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
    }

    password.pattern = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.\\/\\?<>]).+$";
    const capitalRegex = /[A-Z]/;
    const numRegex = /[0-9]/;
    const symbolRegex = /[!@#$%^&*.<>?/\\]/;

    // Additional error messages
    const capitalError = document.getElementById('capital-error')
    const numberError = document.getElementById('number-error')
    const symbolError = document.getElementById('symbol-error')
    const lengthError = document.getElementById('length-error')
    const additionalErrors = [ ...document.querySelector('.additional-errors-container').children]

    if (!password.validity.valid) {
        console.log('Your password sucks.')
        if (password.validity.valueMissing) {
            passwordMsgs.error = 'Please enter a password.';
            additionalErrors.map(error => error.classList.remove('invalid'));
        } else {
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
        showErrorMsg(password, passwordMsgs)
    } else {
        additionalErrors.map(error => error.classList.remove('invalid'));
        console.log('Looking good!');
        showSuccessMsg(password, passwordMsgs);
    }
}



// EVENTS
email.addEventListener('blur', () => {
    checkEmail();
    email.clicked = true;
});

email.addEventListener('input', () => {
    if (email.clicked) checkEmail();
});

country.addEventListener('blur', checkCountry);

zip.addEventListener('blur', () => { 
    checkZip();
    zip.clicked = true;
});

zip.addEventListener('input', () => { 
    if (zip.clicked) checkZip(); 
});

password.addEventListener('input', () => {
    checkPassword();
})

