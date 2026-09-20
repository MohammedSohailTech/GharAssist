const menuBar = document.querySelector('#hamburger')
const navLink = document.querySelector('.nav-link')
menuBar.addEventListener('click', () => {
    navLink.classList.toggle("active")
    menuBar.classList.toggle('fa-bars')
    menuBar.classList.toggle('fa-xmark')
})


const otpForm = document.querySelector(".otp-form");
const otpInputs = document.querySelectorAll(".otp-container input");

if (otpForm) {
    otpForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = sessionStorage.getItem("resetEmail");

        if (!email) {
            alert("Email not found. Please start again.");
            window.location.href = "/html/forgot.html";
            return;
        }

        let otp = "";

        otpInputs.forEach(input => {
            otp += input.value.trim();
        });

        if (otp.length !== 6) {
            alert("Please enter the 6-digit OTP");
            return;
        }

        try {
            const response = await fetch(
                "https://gharassist.onrender.com/api/users/verify-otp",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        otp: otp
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                sessionStorage.setItem("resetToken", data.resetToken);

                window.location.href = "/html/resetpassword.html";
            } else {
                alert(data.message || "Invalid OTP");
            }

        } catch (error) {
            console.error("Verify OTP Error:", error);
            alert("Unable to connect to server");
        }
    });
}


// OTP input auto-move
otpInputs.forEach((input, index) => {

    input.addEventListener("input", function () {

        // Allow only numbers
        this.value = this.value.replace(/[^0-9]/g, "");

        // Move to next input
        if (this.value && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
    });

    input.addEventListener("keydown", function (event) {

        // Move to previous input when Backspace is pressed
        if (event.key === "Backspace" && !this.value && index > 0) {
            otpInputs[index - 1].focus();
        }
    });
});

// OTP countdown and resend

const otpTimer = document.getElementById("otp-timer");
const resendOtp = document.getElementById("resend-otp");

let seconds = 30;
let countdown;

if (resendOtp) {
    resendOtp.style.pointerEvents = "none";
    resendOtp.style.opacity = "0.5";
}

function startOtpTimer() {

    seconds = 30;

    if (resendOtp) {
        resendOtp.style.pointerEvents = "none";
        resendOtp.style.opacity = "0.5";
    }

    if (otpTimer) {
        otpTimer.textContent = `(${seconds}s)`;
    }

    clearInterval(countdown);

    countdown = setInterval(() => {

        seconds--;

        if (otpTimer) {
            otpTimer.textContent = `(${seconds}s)`;
        }

        if (seconds <= 0) {

            clearInterval(countdown);

            if (resendOtp) {
                resendOtp.style.pointerEvents = "auto";
                resendOtp.style.opacity = "1";
            }
        }

    }, 1000);
}

if (resendOtp) {

    resendOtp.addEventListener("click", async function (event) {

        event.preventDefault();

        const email = sessionStorage.getItem("resetEmail");

        if (!email) {
            alert("Email not found. Please start again.");
            window.location.href = "/html/forgot.html";
            return;
        }

        try {

            resendOtp.style.pointerEvents = "none";
            resendOtp.style.opacity = "0.5";

            const response = await fetch(
                "https://gharassist.onrender.com/api/users/resend-otp",
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

                // Clear old OTP boxes
                otpInputs.forEach(input => {
                    input.value = "";
                });

                otpInputs[0].focus();

                alert("A new OTP has been sent to your email.");

                startOtpTimer();

            } else {

                alert(data.message || "Unable to resend OTP");

                resendOtp.style.pointerEvents = "auto";
                resendOtp.style.opacity = "1";
            }

        } catch (error) {

            console.error("Resend OTP Error:", error);

            alert("Unable to connect to server");

            resendOtp.style.pointerEvents = "auto";
            resendOtp.style.opacity = "1";
        }
    });
}

startOtpTimer();
// Show masked email
const maskedEmailElement = document.getElementById("masked-email");
const resetEmail = sessionStorage.getItem("resetEmail");

if (maskedEmailElement && resetEmail) {

    const [username, domain] = resetEmail.split("@");

    let maskedUsername;

    if (username.length <= 2) {
        maskedUsername = username[0] + "*".repeat(username.length - 1);
    } else {
        maskedUsername =
            username.substring(0, 2) +
            "*".repeat(username.length - 2);
    }

    maskedEmailElement.textContent =
        `${maskedUsername}@${domain}`;
}