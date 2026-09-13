const bookingForm = document.querySelector('.hero-booking-form')


bookingForm.addEventListener('submit', function (e) {
    e.preventDefault()
    validateBooking();
})


const today = new Date().toISOString().split('T')[0];
const dateInput = document.getElementById('date-input')
dateInput.min = today


function validateBooking() {

    // ++++++++++++++++++++++++++++++ServiceError+++++++++++++++++++++++
    const serviceError = document.getElementById('select-error')
    const serviceInput = document.getElementById('select-service')
    const service = document.getElementById('select-service').value
    if (service === '') {
        serviceError.innerHTML = '*Please Select any service'
        serviceError.style.color = 'red'
        serviceInput.style.border = '2px solid red'
    }
    else {
        serviceError.innerHTML = ''
        serviceInput.style.border = ''
    }

    // _++++++++++++++++++++++++++++++nameError++++++++++++++++++++++++++++
    const namePattern = /^[A-Za-z]+$/
    const nameError = document.getElementById('name-error')
    const nameInput = document.getElementById('name-input')
    const name = document.getElementById('name-input').value
    if (name.trim() === '') {
        nameError.innerHTML = '*Please Enter Your Name!'
        nameError.style.color = 'red'
        nameInput.style.border = '2px solid red'
    }
    else if (!namePattern.test(name)) {
        nameError.innerHTML = '*Please Enter a valid Name!'
        nameError.style.color = 'red'
        nameInput.style.border = '2px solid red'
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

    // ++++++++++++++++++++++++++++++++++++phoneError+++++++++++++++++++++++++++++++
    const phonePattern = /^[0-9]+$/
    const phoneInput = document.getElementById('phone-input')
    const phone = document.getElementById('phone-input').value
    const phoneError = document.getElementById('number-error')

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
    else if (isNaN(phone)) {
        phoneError.innerHTML = '*Please enter a valid  number!'
        phoneInput.style.border = '2px solid red'
        phoneError.style.color = 'red'
    }

    else {
        phoneError.innerHTML = ''
        phoneInput.style.border = ''
    }

    // +++++++++++++++++++++++++++++++emailEror_____________________________++++++++
    const emailInput = document.getElementById('email-inpt')
    const email = document.getElementById('email-inpt').value
    const emailError = document.getElementById('email-error')
    if (email.trim() === '') {
        emailError.innerHTML = '*Please enter a valid email!'
        emailInput.style.border = '2px solid red'
        emailError.style.color = 'red'
    } else {
        emailError.innerHTML = ''
        emailInput.style.border = ''
    }

    // ++++++++++++++++++location_____________________________++++++++++++++++++++

    const locationInput = document.getElementById('location-input')
    const location = document.getElementById('location-input').value
    const locationError = document.getElementById('location-error')
    if (location.trim() === '') {
        locationError.style.color = 'red'
        locationError.innerHTML = '*Please Enter a Location'
        locationInput.style.border = '2px solid red'

    }
    else {
        locationError.innerHTML = ''
        locationInput.style.border = ''
    }
    // ++++++++++++++++++++++++Date++++++++++++++++++++++++++++++++++++++++
    
    const date = dateInput.value
    const dateError = document.getElementById('date-error')
 
    // const selectedDate = date.value
    if (date === '') {
        dateError.innerHTML = '*Please Select a Date'
        dateInput.style.border = '2px solid red'
        dateError.style.color = 'red'
    }
    else if (date < today) {
        dateError.innerHTML = '*Please Select Today or Future Date'
        dateInput.style.border = '2px solid red'
        dateError.style.color = 'red'
    }
    else {
        dateError.innerHTML = ''
        dateInput.style.border = ''
    }
}

const menuBar = document.querySelector('#hamburger')
const navLink = document.querySelector('.nav-link')
menuBar.addEventListener('click', () => {
    navLink.classList.toggle("active")
    menuBar.classList.toggle('fa-bars')
    menuBar.classList.toggle('fa-xmark')
})
