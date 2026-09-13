const myForm = document.querySelector('.ca-form');

myForm.addEventListener('submit', function (e) {
    e.preventDefault();
    classError();
})
const pswdInput = document.getElementById('fpswd')
const cpswdInput = document.getElementById('fcpswd')
function classError() {
    let returnValue = true
    // +++++++++++++++++++++name++++++++++++++++++++++
    const nameError = document.getElementById('name-error');
    const name = document.getElementById('fname').value
    const nameInput = document.getElementById('fname')
    if (name.trim() === '') {
        nameError.innerHTML = '*Name is required';
        nameError.style.color = 'red'
        nameInput.style.border = "2px solid red"
        returnValue = false
    }
    else if (name.trim().length < 3) {
        nameError.innerHTML = '*Name must be at least 3 character';
        nameError.style.color = 'red'
        nameInput.style.border = "2px solid red"
        returnValue = false
    }
    else if (name.trim().length > 50) {
        nameError.innerHTML = '*Name must not exceed 50 character';
        nameError.style.color = 'red'
        nameInput.style.border = "2px solid red"
        returnValue = false
    }
    else {
        nameError.innerHTML = '';
        nameInput.style.border = ""
    }

    // ++++++++++++++++++email++++++++++++++++++++++++
    const emailError = document.getElementById('email-error');
    const email = document.getElementById('femail').value
    const emailInput = document.getElementById('femail')
    if (email.trim() === '') {
        emailError.innerHTML = '*Email is required';
        emailError.style.color = 'red'
        emailInput.style.border = "2px solid red"
        returnValue = false
    }
    else {
        emailError.innerHTML = '';
        emailInput.style.border = ""
    }
    // ++++++++++++++++++++++++++++phone+++++++++++++++++++++++++++++++++++++++
    const phoneError = document.getElementById('phone-error');
    const phone = document.getElementById('fphone').value
    const phoneInput = document.getElementById('fphone')
    if (phone.trim() === '') {
        phoneError.innerHTML = '*Number is required';
        phoneError.style.color = 'red'
        phoneInput.style.border = "2px solid red"
        returnValue = false
    }
    else if (isNaN(phone)) {
        phoneError.innerHTML = '*Enter a Valid Number';
        phoneError.style.color = 'red'
        phoneInput.style.border = "2px solid red"
        returnValue = false
    }
    else if (phone.length !== 10) {
        phoneError.innerHTML = '*Phone Number Must be 10 digits';
        phoneError.style.color = 'red'
        phoneInput.style.border = "2px solid red"
        returnValue = false
    }
    else {
        phoneError.innerHTML = '';
        phoneInput.style.border = ""
    }


// +++++++++++++++++++++++++++password+++++++++++++++++++++++++++++++++++++++++++
    const pswdError = document.getElementById('pswd-error');
    const password = document.getElementById('fpswd').value
    
    const hasNumber = /[0-9]/.test(password)
    const hasLetter = /[A-Za-z]/.test(password)
    const hasSpecial = /[!@#$%^&*]/.test(password)
    if (password.trim() === '') {
        pswdError.innerHTML = '*Password is required';
        pswdError.style.color = 'red'
        pswdInput.style.border = "2px solid red"

        returnValue = false
    }
    else if (password.length < 8) {
        pswdError.innerHTML = '*Password length should at least 8 character';
        pswdError.style.color = 'red'
        pswdInput.style.border = "2px solid red"
        returnValue = false
    }
    else if (!hasLetter || !hasNumber) {
        pswdError.innerHTML = '*Password must contain letters and numbers';
        pswdError.style.color = 'red'
        pswdInput.style.border = "2px solid red"
        returnValue = false
    }
    else if (!hasSpecial) {
        pswdError.innerHTML = '*Password must contain a special character';
        pswdError.style.color = 'red'
        pswdInput.style.border = "2px solid red"
        returnValue = false
    }
    else {
        pswdError.innerHTML = '';
        pswdInput.style.border = ""

    }


// ++++++++++++++++confirmpasssword+++++++++++++++++++++++++++++++++

    const cpswdError = document.getElementById('cpswd-error');
    const cpassword = document.getElementById('fcpswd').value
    if (cpassword.trim() === '') {
        cpswdError.innerHTML = '*Please confirm your password';
        cpswdError.style.color = 'red'
        cpswdInput.style.border = "2px solid red"
        returnValue = false
    }
    else if (cpassword !== password) {
        cpswdError.innerHTML = '*Password do not match';
        cpswdError.style.color = 'red'
        cpswdInput.style.border = "2px solid red"
        returnValue = false
    }
    else {
        cpswdError.innerHTML = '';
        cpswdInput.style.border = ""
    }
    return returnValue
}
// ++++++++++++++++++++++++++eyeicon+++++++++++++++++++++++++++++++++++++++
const pswdeyeicon = document.getElementById('pswd-eyeIcon')
const cpswdeyeicon = document.getElementById('cpswd-eyeIcon')
pswdeyeicon.addEventListener('click', function(){
    if(pswdInput.type ==='password'){
        pswdInput.type = 'text';
        pswdeyeicon.classList.replace('fa-eye', 'fa-eye-slash')

    }
    else{
         pswdInput.type = 'password';
         pswdeyeicon.classList.replace('fa-eye-slash', 'fa-eye')
    }
})
cpswdeyeicon.addEventListener('click', function(){
    if(cpswdInput.type ==='password'){
        cpswdInput.type = 'text';
        cpswdeyeicon.classList.replace('fa-eye', 'fa-eye-slash')

    }
    else{
         cpswdInput.type = 'password';
         cpswdeyeicon.classList.replace('fa-eye-slash', 'fa-eye')
    }
})




const menuBar = document.querySelector('#hamburger')
const navLink = document.querySelector('.nav-link')
menuBar.addEventListener('click', () => {
    navLink.classList.toggle("active")
    menuBar.classList.toggle('fa-bars')
    menuBar.classList.toggle('fa-xmark')
})
