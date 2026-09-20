// ===============================
// FETCH ADMIN PROFILE
// ===============================

const fetchAdminProfile = async () => {

    try {

        const token = localStorage.getItem("token");

        if (!token) {

            alert("Please login first");

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


        document.getElementById("admin-name").textContent =
            data.user.name;

        document.getElementById("admin-email").textContent =
            data.user.email;

        document.getElementById("admin-role").textContent =
            data.user.role;

    }

    catch (error) {

        console.log(
            "Error fetching admin profile:",
            error
        );

    }

};


fetchAdminProfile();


