const contactForm = document.querySelector('.contact-form');

const phonePattern = /^[0-9]{10}$/;

contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
        return;
    }

    const contactData = {
        name: document.getElementById("name-input").value,
        email: document.getElementById("email-input").value,
        phone: document.getElementById("phone-input").value,
        message: document.getElementById("message-input").value
    };

    try {
        const response = await fetch("https://gharassist.onrender.com/api/contacts/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contactData)
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Contact Failed");
            return;
        }

        alert("Message sent successfully!");

        contactForm.reset();

    } catch (error) {
        console.error("Contact Error:", error);
        alert("Unable to connect to server");
    }
});


function validateForm() {

    const nameInput = document.getElementById('name-input');
    const emailInput = document.getElementById('email-input');
    const phoneInput = document.getElementById('phone-input');

    const namePattern = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;

    let isValid = true;


    // ++++++++++++++++++++++++++++++ NAME +++++++++++++++++++++++++

    const nameError = document.getElementById('name-error');
    const name = nameInput.value.trim();

    if (name === '') {

        nameInput.style.border = '2px solid red';
        nameError.innerHTML = '*Please enter a Name';
        nameError.style.color = 'red';
        isValid = false;

    }
    else if (!namePattern.test(name)) {

        nameInput.style.border = '2px solid red';
        nameError.innerHTML = '*Please enter a Valid Name';
        nameError.style.color = 'red';
        isValid = false;

    }
    else if (name.length < 3) {

        nameError.innerHTML = '*Name must be at least 3 characters';
        nameError.style.color = 'red';
        nameInput.style.border = '2px solid red';
        isValid = false;

    }
    else {

        nameError.innerHTML = '';
        nameInput.style.border = '';
    }


    // ++++++++++++++++++++++++++++++ EMAIL +++++++++++++++++++++++++

    const email = emailInput.value.trim();
    const emailError = document.getElementById('email-error');

    if (email === '') {

        emailError.innerHTML = '*Please Enter an Email';
        emailInput.style.border = '2px solid red';
        emailError.style.color = 'red';
        isValid = false;

    }
    else {

        emailError.innerHTML = '';
        emailInput.style.border = '';
    }


    // ++++++++++++++++++++++++++++++ PHONE +++++++++++++++++++++++++

    const phone = phoneInput.value.trim();
    const phoneError = document.getElementById('phone-error');

    if (phone === '') {

        phoneError.innerHTML = '*Please enter a phone number!';
        phoneInput.style.border = '2px solid red';
        phoneError.style.color = 'red';
        isValid = false;

    }
    else if (!phonePattern.test(phone)) {

        phoneError.innerHTML = '*Please enter a valid 10 digit number!';
        phoneInput.style.border = '2px solid red';
        phoneError.style.color = 'red';
        isValid = false;

    }
    else {

        phoneError.innerHTML = '';
        phoneInput.style.border = '';
    }


    return isValid;
}


// ++++++++++++++++++++++++++++++ HAMBURGER MENU +++++++++++++++++++++++++

const menuBar = document.querySelector('#hamburger');
const navLink = document.querySelector('.nav-link');

menuBar.addEventListener('click', () => {

    navLink.classList.toggle("active");

    menuBar.classList.toggle('fa-bars');
    menuBar.classList.toggle('fa-xmark');

});