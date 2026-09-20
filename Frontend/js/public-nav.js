console.log("PUBLIC NAV JS LOADED");

// =========================================
// PUBLIC NAVBAR ROLE CHECK
// =========================================

const updatePublicNavbar = async () => {

    const token = localStorage.getItem("token");

    // -----------------------------------------
    // NOT LOGGED IN
    // -----------------------------------------

    if (!token) {
        return;
    }

    try {

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

            localStorage.removeItem("token");

            return;
        }

        const user = data.user;

        // -----------------------------------------
        // NAVBAR ELEMENTS
        // -----------------------------------------

        const loginButton =
            document.getElementById("nav-login");

        const bookButton =
            document.getElementById("nav-book");

        const dashboardButton =
            document.getElementById("nav-dashboard");

        const myBookingsButton =
            document.getElementById("nav-my-bookings");


        // -----------------------------------------
        // CUSTOMER
        // -----------------------------------------

        if (user.role === "customer") {

            if (loginButton) {
                loginButton.style.display = "none";
            }

            if (bookButton) {
                bookButton.style.display = "none";
            }

            if (dashboardButton) {
                dashboardButton.style.display = "inline-block";
            }

            if (myBookingsButton) {
                myBookingsButton.style.display = "inline-block";
            }

        }

    } catch (error) {

        console.error(
            "Public Navbar Error:",
            error
        );

    }

};


// =========================================
// START
// =========================================

updatePublicNavbar();