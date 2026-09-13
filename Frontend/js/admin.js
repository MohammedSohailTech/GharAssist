const options =  {
    day:'2-digit',
    month:'short',
    year:'numeric'
}

const heroDate = document.getElementById('current-date')
setInterval(function(){
    let date = new Date()
    heroDate.textContent = date.toLocaleDateString('en-GB',options);
})