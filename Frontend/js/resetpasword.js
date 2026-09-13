const menuBar = document.querySelector('#hamburger')
const navLink = document.querySelector('.nav-link')
menuBar.addEventListener('click', () => {
    navLink.classList.toggle("active")
    menuBar.classList.toggle('fa-bars')
    menuBar.classList.toggle('fa-xmark')
})
