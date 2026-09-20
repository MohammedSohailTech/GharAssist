const loginForm = document.querySelector('.login-form')
const emphError = document.getElementById('ep-error')
loginForm.addEventListener('submit', async function (e) {
    e.preventDefault()

    const isValid = validateForm()

    if (!isValid) {
        return
    }

    const emailPhone = document.querySelector('#login-input').value
    const password = document.querySelector('#login-pswd').value
    // console.log("Email sent:", emailPhone)
    // console.log("Password sent:", password)
    const response = await fetch('https://gharassist.onrender.com/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailPhone,
            password: password
        })

    })
    const data = await response.json()

    if (!response.ok || !data.token) {
        alert(data.message || "Login failed");
        return;
    }

    localStorage.setItem("token", data.token);

    if (data.role === "admin") {
        window.location.href = "/html/admin.html";
    }
    else if (data.role === "provider") {
        window.location.href = "/html/provider.html";
    }
    else if (data.role === "customer") {
        window.location.href = "/html/customer.html";
    }
})
const emailphoneInput = document.querySelector('#login-input')
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePatter = /^[0-9]{10}$/;

function validateForm() {
    let isValid = true
    const emailPhone = document.querySelector('#login-input').value
    if (emailPhone.trim() === '') {
        emphError.innerHTML = '*Email or Phone Number is required! '
        emphError.style.color = 'red'
        emailphoneInput.style.border = '2px solid red'
        isValid = false
    }
    else if (phonePatter.test(emailPhone)) {
        emphError.innerHTML = ''
        emailphoneInput.style.border = ''
    }
    else if (emailPattern.test(emailPhone)) {
        emphError.innerHTML = ''
        emailphoneInput.style.border = ''
    }

    else {
        emphError.innerHTML = '*Please Enter a valid Email or Phone Number'
        emphError.style.color = 'red'
        emailphoneInput.style.border = '2px solid red'
        isValid = false

    }


    const pswdError = document.getElementById('pswd-error')
    const password = document.getElementById('login-pswd').value
    const hasNumber = /[0-9]/.test(password)
    const hasLetter = /[A-Za-z]/.test(password)
    const hasSpecial = /[!@#$%^&*]/.test(password)
    const passwordInput = document.getElementById('login-pswd')
    if (password === '') {
        pswdError.innerHTML = 'Password is required!'
        pswdError.style.color = 'red'
        passwordInput.style.border = '2px solid red'
        isValid = false

    }
    else if (password.length < 8) {
        pswdError.innerHTML = 'Password length at least 8 character'
        pswdError.style.color = 'red'
        passwordInput.style.border = '2px solid red'
        isValid = false

    }
    else if (!hasNumber || !hasLetter) {
        pswdError.innerHTML = '*Password must contain letters and numbers'
        pswdError.style.color = 'red'
        passwordInput.style.border = '2px solid red'
        isValid = false

    }
    else if (!hasSpecial) {
        pswdError.innerHTML = '*Password must contain a special character'
        pswdError.style.color = 'red'
        passwordInput.style.border = '2px solid red'
        isValid = false

    }
    else {
        pswdError.innerHTML = ''
        passwordInput.style.border = ''
    }
    return isValid;
}

const pswdInput = document.getElementById('login-pswd')
const pswdeyeIcon = document.getElementById('pswd-eye')
pswdeyeIcon.addEventListener('click', function () {
    if (pswdInput.type === 'password') {
        pswdInput.type = 'text'
        pswdeyeIcon.classList.replace('fa-eye', 'fa-eye-slash')
    }
    else {
        pswdInput.type = 'password'
        pswdeyeIcon.classList.replace('fa-eye-slash', 'fa-eye')
    }
})

const menuBar = document.querySelector('#hamburger')
const navLink = document.querySelector('.nav-link')
menuBar.addEventListener('click', () => {
    navLink.classList.toggle("active")
    menuBar.classList.toggle('fa-bars')
    menuBar.classList.toggle('fa-xmark')
})
