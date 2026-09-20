const menuBar = document.querySelector('#hamburger')
const navLink = document.querySelector('.nav-link')
menuBar.addEventListener('click', () => {
    navLink.classList.toggle("active")
    menuBar.classList.toggle('fa-bars')
    menuBar.classList.toggle('fa-xmark')
})


//reset password linkage

const resetForm = document.querySelector(".reset-form");

if (resetForm) {
    resetForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const resetToken = sessionStorage.getItem("resetToken");

        if (!resetToken) {
            alert("Reset session expired. Please start again.");
            window.location.href = "/html/forgot.html";
            return;
        }

        const newPassword = document.getElementById("new-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (!newPassword || !confirmPassword) {
            alert("Please enter both passwords");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        try {
            const response = await fetch(
                "https://gharassist.onrender.com/api/users/reset-password",
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        resetToken: resetToken,
                        newPassword: newPassword
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                sessionStorage.removeItem("resetToken");
                sessionStorage.removeItem("resetEmail");

                window.location.href = "/html/resetsuccess.html";
            } else {
                alert(data.message || "Unable to reset password");
            }

        } catch (error) {
            console.error("Reset Password Error:", error);
            alert("Unable to connect to server");
        }
    });
}