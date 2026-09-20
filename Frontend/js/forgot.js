const menuBar = document.querySelector('#hamburger')
const navLink = document.querySelector('.nav-link')
menuBar.addEventListener('click', () => {
    navLink.classList.toggle("active")
    menuBar.classList.toggle('fa-bars')
    menuBar.classList.toggle('fa-xmark')
})



//backend connecting
const forgotForm = document.querySelector(".forgot-form");
const forgotEmail = document.getElementById("forgot-email");

if (forgotForm) {
    forgotForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = forgotEmail.value.trim();

        if (!email) {
            alert("Please enter your email");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:3000/api/users/forgot-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                sessionStorage.setItem("resetEmail", email);

                window.location.href = "/html/verifyotp.html";
            } else {
                alert(data.message || "Unable to send OTP");
            }

        } catch (error) {
            console.error("Forgot Password Error:", error);
            alert("Unable to connect to server");
        }
    });
}