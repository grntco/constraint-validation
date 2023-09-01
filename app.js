// GLOBAL VARIABLS
const email = document.querySelector('input[name="email"]');
const country = document.querySelector('select[name="country"]');
const zip = document.querySelector('input[name="zip"]');

// SHOW MESSAGES
function showSuccessMsg(input, msgsContent) {
    const msg = input.nextElementSibling;

    msg.textContent = msgsContent.success;
    msg.classList.remove('invalid');
    msg.classList.add('valid');
}

function showErrorMsg(input, msgsContent) {
    const msg = input.nextElementSibling;

    msg.textContent = msgsContent.error;
    msg.classList.remove('valid');
    msg.classList.add('invalid');
}

// INPUT CHECKS
function checkEmail() {
    const emailMsgs = {
        error: '❗️Provide a valid email (ex. johnsmith@example.com).',
        success: '✅ Looks good!'
    }

    if (email.validity.patternMismatch || email.validity.valueMissing) {
        showErrorMsg(email, emailMsgs);
    } else {
        showSuccessMsg(email, emailMsgs);
    }
}

function checkCountry() {
    const countryMsgs = {
        error: '❗️Select your country.',
        success: '✅ Thank you!'
    }

    if (country.validity.valueMissing) {
        showErrorMsg(country, countryMsgs);
    } else {
        showSuccessMsg(country, countryMsgs);
    }
}

function checkZip() {
    const zipMsgs = {
        error: '❗️Provide a valid code (ex. 33333 or 22222-3333).',
        success: '✅ Awesome!'
    }

    if (zip.validity.patternMismatch || zip.validity.valueMissing) {
        showErrorMsg(zip, zipMsgs);
    } else {
        showSuccessMsg(zip, zipMsgs);
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
zip.addEventListener('blur', checkZip);