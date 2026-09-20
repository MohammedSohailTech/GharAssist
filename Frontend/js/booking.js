
const bookingForm = document.querySelector('.hero-booking-form')

bookingForm.addEventListener('submit', async function (e) {

    e.preventDefault()

    const isValid = validateBooking()

    if (!isValid) {
        return
    }

    const token = localStorage.getItem("token")

    if (!token) {
        alert("Please login first")
        window.location.href = "/html/login.html"
        return
    }

    const bookingData = {
        service: document.getElementById("select-service").value,
        name: document.getElementById("name-input").value,
        phone: document.getElementById("phone-input").value,
        email: document.getElementById("email-inpt").value,
        location: document.getElementById("location-input").value,
        date: document.getElementById("date-input").value
    }

    try {

        const response = await fetch("https://gharassist.onrender.com/api/bookings/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(bookingData)
        })

        const data = await response.json()

        if (!response.ok) {
            alert(data.message || "Booking failed")
            return
        }

        alert("Booking created successfully!")

        bookingForm.reset()

    } catch (error) {

        console.error("Booking Error:", error)
        alert("Unable to connect to server")

    }

})


const today = new Date().toISOString().split('T')[0];

const dateInput = document.getElementById('date-input')

dateInput.min = today


function validateBooking() {

    let isValid = true

    // ++++++++++++++++++++++++++++++ServiceError+++++++++++++++++++++++

    const serviceError = document.getElementById('select-error')

    const serviceInput = document.getElementById('select-service')

    const service = document.getElementById('select-service').value

    if (service === '') {

        serviceError.innerHTML = '*Please Select any service'

        serviceError.style.color = 'red'

        serviceInput.style.border = '2px solid red'

        isValid = false

    }
    else {

        serviceError.innerHTML = ''

        serviceInput.style.border = ''

    }


    // _++++++++++++++++++++++++++++++nameError++++++++++++++++++++++++++++

    const namePattern = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;

    const nameError = document.getElementById('name-error')

    const nameInput = document.getElementById('name-input')

    const name = document.getElementById('name-input').value

    if (name.trim() === '') {

        nameError.innerHTML = '*Please Enter Your Name!'

        nameError.style.color = 'red'

        nameInput.style.border = '2px solid red'

        isValid = false

    }
    else if (!namePattern.test(name)) {

        nameError.innerHTML = '*Please Enter a valid Name!'

        nameError.style.color = 'red'

        nameInput.style.border = '2px solid red'

        isValid = false

    }
    else if (name.trim().length < 3) {

        nameError.innerHTML = '*Name must be at least 3 character'

        nameError.style.color = 'red'

        nameInput.style.border = '2px solid red'

        isValid = false

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

        isValid = false

    }
    else if (phone.trim().length < 10) {

        phoneError.innerHTML = '*Please enter a valid 10 digit number!'

        phoneInput.style.border = '2px solid red'

        phoneError.style.color = 'red'

        isValid = false

    }
    else if (!phonePattern.test(phone)) {

        phoneError.innerHTML = '*Please enter a valid number!'

        phoneInput.style.border = '2px solid red'

        phoneError.style.color = 'red'

        isValid = false

    }
    else if (isNaN(phone)) {

        phoneError.innerHTML = '*Please enter a valid number!'

        phoneInput.style.border = '2px solid red'

        phoneError.style.color = 'red'

        isValid = false

    }
    else {

        phoneError.innerHTML = ''

        phoneInput.style.border = ''

    }


    // +++++++++++++++++++++++++++++++emailError++++++++++++++++++++++++

    const emailInput = document.getElementById('email-inpt')

    const email = document.getElementById('email-inpt').value

    const emailError = document.getElementById('email-error')

    if (email.trim() === '') {

        emailError.innerHTML = '*Please enter a valid email!'

        emailInput.style.border = '2px solid red'

        emailError.style.color = 'red'

        isValid = false

    } else {

        emailError.innerHTML = ''

        emailInput.style.border = ''

    }


    // ++++++++++++++++++location++++++++++++++++++++

    const locationInput = document.getElementById('location-input')

    const location = document.getElementById('location-input').value

    const locationError = document.getElementById('location-error')

    if (location.trim() === '') {

        locationError.style.color = 'red'

        locationError.innerHTML = '*Please Enter a Location'

        locationInput.style.border = '2px solid red'

        isValid = false

    }
    else {

        locationError.innerHTML = ''

        locationInput.style.border = ''

    }


    // ++++++++++++++++++++++++Date++++++++++++++++++++++++++++++++++++++++

    const date = dateInput.value

    const dateError = document.getElementById('date-error')

    if (date === '') {

        dateError.innerHTML = '*Please Select a Date'

        dateInput.style.border = '2px solid red'

        dateError.style.color = 'red'

        isValid = false

    }
    else if (date < today) {

        dateError.innerHTML = '*Please Select Today or Future Date'

        dateInput.style.border = '2px solid red'

        dateError.style.color = 'red'

        isValid = false

    }
    else {

        dateError.innerHTML = ''

        dateInput.style.border = ''

    }


    return isValid

}


const menuBar = document.querySelector('#hamburger')

const navLink = document.querySelector('.nav-link')

menuBar.addEventListener('click', () => {

    navLink.classList.toggle("active")

    menuBar.classList.toggle('fa-bars')

    menuBar.classList.toggle('fa-xmark')

})

