// Check legal age (21 yrs) function 
function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
}

function calculate21stBirthday() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const birthYear = currentYear - 21;

    const birthday = new Date(birthYear, today.getMonth(), today.getDate());
    return formatDate(birthday);
}

function checkLegalAge() {
    const legalDrinkingAge = 21;
    const today = formatDate(new Date());
    const birthday = calculate21stBirthday();

    document.getElementById("today").textContent = `Today: ${today}`;
    document.getElementById("birthday").textContent = `${birthday}`;
 }

// Automatically check legal age on page load
checkLegalAge();


// Age Calculator based on birthday function

function formatDateInput(input) {
    let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length > 4) {
        value = `${value.slice(0, 4)}/${value.slice(4, 6) || ''}/${value.slice(6, 8) || ''}`;
    } else if (value.length > 2) {
        value = `${value.slice(0, 4)}/${value.slice(4, 6) || ''}`;
    }
    input.value = value;
}

function calculateAge() {
    const dobInput = document.getElementById("dob");
    const ageAtDateInput = document.getElementById("ageAtDate");
    const resultDiv = document.getElementById("result");

    const dobParts = dobInput.value.split("/");
    const ageAtDateParts = ageAtDateInput.value.split("/");

    // Validate input
    if (dobParts.length !== 3 || ageAtDateParts.length !== 3) {
        resultDiv.innerHTML = "Invalid date input.";
        return;
    }

    const dobYear = parseInt(dobParts[0], 10);
    const dobMonth = parseInt(dobParts[1], 10);
    const dobDay = parseInt(dobParts[2], 10);

    const ageAtDateYear = parseInt(ageAtDateParts[0], 10);
    const ageAtDateMonth = parseInt(ageAtDateParts[1], 10);
    const ageAtDateDay = parseInt(ageAtDateParts[2], 10);

    // Validate numeric values
    if (isNaN(dobYear) || isNaN(dobMonth) || isNaN(dobDay) || isNaN(ageAtDateYear) || isNaN(ageAtDateMonth) || isNaN(ageAtDateDay)) {
        resultDiv.innerHTML = "Invalid date input.";
        return;
    }

    const dob = new Date(dobYear, dobMonth - 1, dobDay);
    const ageAtDate = new Date(ageAtDateYear, ageAtDateMonth - 1, ageAtDateDay);

    // Validate dates
    if (isNaN(dob.getTime()) || isNaN(ageAtDate.getTime())) {
        resultDiv.innerHTML = "Invalid date input.";
        return;
    }

    const diff = ageAtDate - dob;
    const ageInMilliseconds = Math.abs(diff);
    const years = Math.floor(ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000));
    const months = Math.floor((ageInMilliseconds % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
    const days = Math.floor((ageInMilliseconds % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));

    resultDiv.innerHTML = `
        <p>Age: ${years} years, ${months} months, ${days} days</p>
        <p>Age in months: ${years * 12 + months} months</p>
        <p>Age in days: ${Math.floor(ageInMilliseconds / (24 * 60 * 60 * 1000))} days</p>`;
}

