const form = document.querySelector('.contact-form')
const phonePattern = /^[0-9]{10}$/ 

form.addEventListener('submit', function (e) {
    e.preventDefault()
    validateForm();
})
function validateForm() {
    const nameInput = document.getElementById('name-input')
    const emailInput = document.getElementById('email-input')
    const phoneInput = document.getElementById('phone-input')
    const namePattern = /^[A-Za-z]+$/


    const nameError = document.getElementById('name-error')
    const name = nameInput.value
    if (name.trim() === '') {
        nameInput.style.border = '2px solid red'
        nameError.innerHTML = '*Please enter a Name'
        nameError.style.color = 'red'

    }
    else if (!namePattern.test(name)) {
        nameInput.style.border = '2px solid red'
        nameError.innerHTML = '*Please enter a Valid Name'
        nameError.style.color = 'red'

    }
    else if (name.trim().length < 3) {
        nameError.innerHTML = '*Name must be at least 3 character'
        nameError.style.color = 'red'
        nameInput.style.border = '2px solid red'
    }
    else {
        nameError.innerHTML = ''
        nameInput.style.border = ''
    }

    const email = emailInput.value
    const emailError = document.getElementById('email-error')
    if (email.trim() === '') {
        emailError.innerHTML = "*Please Enter a Email"
        emailInput.style.border = '2px solid red'
        emailError.style.color = 'red'

    }
    else {
        emailError.innerHTML = ''
        emailInput.style.border = ''
    }
    // ++++++++++++++++++++++++++++++phone++++++++++++++++++++++++
    const phone = phoneInput.value
    const phoneError = document.getElementById('phone-error')
    if (phone.trim() === '') {
        phoneError.innerHTML = '*Please enter a phone number!'
        phoneInput.style.border = '2px solid red'
        phoneError.style.color = 'red'
    }
    else if (phone.trim().length < 10) {
        phoneError.innerHTML = '*Please enter a valid 10 digit number!'
        phoneInput.style.border = '2px solid red'
        phoneError.style.color = 'red'
    }
    else if (!phonePattern.test(phone)) {
        phoneError.innerHTML = '*Please enter a valid  number!'
        phoneInput.style.border = '2px solid red'
        phoneError.style.color = 'red'
    }
    // else if (isNaN(phone)) {
    //     phoneError.innerHTML = '*Please enter a valid  number!'
    //     phoneInput.style.border = '2px solid red'
    //     phoneError.style.color = 'red'
    // }
    else {
        phoneError.innerHTML = ''
        phoneInput.style.border = ''
    }





}
const menuBar = document.querySelector('#hamburger')
const navLink = document.querySelector('.nav-link')
menuBar.addEventListener('click', () => {
    navLink.classList.toggle("active")
    menuBar.classList.toggle('fa-bars')
    menuBar.classList.toggle('fa-xmark')
})
