const getCustomerProfile = async () => {

    try {

        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/html/login.html";
            return;
        }

        const response = await fetch(
            "http://localhost:3000/api/users/profile",
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

        document.getElementById("customer-name").textContent =
            user.name;

        document.getElementById("customer-name-detail").textContent =
            user.name;

        document.getElementById("customer-email").textContent =
            user.email;

        document.getElementById("customer-phone").textContent =
            user.phone;

        document.getElementById("customer-role").textContent =
            user.role;

        document.getElementById("customer-role-detail").textContent =
            user.role;

    } catch (error) {

        console.error("Customer Profile Error:", error);

    }

};


getCustomerProfile();

//logout code
const profileLogout = document.getElementById("profile-logout");

if (profileLogout) {

    profileLogout.addEventListener("click", () => {

        localStorage.removeItem("token");

        window.location.href = "/html/login.html";

    });

}