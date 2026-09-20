// ===============================
// GET PROVIDER PROFILE
// ===============================

const getProviderProfile = async () => {

    try {

        const token = localStorage.getItem("token");

        if (!token) {

            window.location.href = "/html/login.html";

            return;

        }

        const response = await fetch(
            "https://gharassist.onrender.com/api/users/profile",
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.message || "Unable to fetch profile");

            return;

        }

        const user = data.user;

        document.getElementById("provider-name").textContent =
            user.name;

        document.getElementById("provider-email").textContent =
            user.email;

        document.getElementById("provider-phone").textContent =
            user.phone;

        document.getElementById("provider-role").textContent =
            user.role;

    } catch (error) {

        console.error("Provider Profile Error:", error);

    }

};


// ===============================
// LOAD PROFILE
// ===============================

getProviderProfile();

// ===============================
// PROFILE PAGE LOGOUT
// ===============================

const profileLogout =
    document.getElementById("profile-logout");

if (profileLogout) {

    profileLogout.addEventListener("click", function () {

        localStorage.removeItem("token");

        window.location.href = "/html/login.html";

    });

}