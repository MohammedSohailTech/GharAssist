// Side hamburger menu toggle

const menuBar = document.getElementById("menu-toggle");
const sideBar = document.querySelector(".sidebar");

menuBar.addEventListener("click", () => {

    sideBar.classList.toggle("active");

    menuBar.classList.toggle("fa-bars");
    menuBar.classList.toggle("fa-xmark");

});


// ===============================
// PROFILE DROPDOWN
// ===============================

const profile = document.getElementById("profile");
const profileDropdown = document.getElementById("profile-dropdown");

if (profile && profileDropdown) {

    profile.addEventListener("click", function (event) {

        event.stopPropagation();

        if (profileDropdown.style.display === "block") {
            profileDropdown.style.display = "none";
        } else {
            profileDropdown.style.display = "block";
        }

    });

    document.addEventListener("click", function () {

        profileDropdown.style.display = "none";

    });
}


// ===============================
// NOTIFICATION DROPDOWN
// ===============================

const notification = document.getElementById("notification");
const notificationDropdown = document.getElementById("notification-dropdown");

if (notification && notificationDropdown) {

    notification.addEventListener("click", function (event) {

        event.stopPropagation();

        if (notificationDropdown.style.display === "block") {
            notificationDropdown.style.display = "none";
        } else {
            notificationDropdown.style.display = "block";
        }

    });

    document.addEventListener("click", function () {

        notificationDropdown.style.display = "none";

    });
}


// ===============================
// PROFILE LOGOUT
// ===============================

const profileLogoutButton = document.getElementById("profile-logout-button");

if (profileLogoutButton) {

    profileLogoutButton.addEventListener("click", function () {

        localStorage.removeItem("token");

        window.location.href = "/html/login.html";

    });

}


// ===============================
// NOTIFICATION COUNT
// ===============================

const updateNotificationCount = async () => {

    try {

        const token = localStorage.getItem("token");

        const [bookingsResponse, contactsResponse, usersResponse] =
            await Promise.all([

                fetch("https://gharassist.onrender.com/api/bookings/all", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }),

                fetch("https://gharassist.onrender.com/api/contacts/", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }),

                fetch("https://gharassist.onrender.com/api/users/all", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })

            ]);

        const bookingsData = await bookingsResponse.json();
        const contactsData = await contactsResponse.json();
        const usersData = await usersResponse.json();

        const bookingCount = bookingsData.bookings?.length || 0;
        const contactCount = contactsData.contacts?.length || 0;
        const userCount = usersData.users?.length || 0;

        const totalNotifications =
            bookingCount + contactCount + userCount;

        const badge = document.getElementById("notification-badge");

        if (badge) {
            badge.textContent = totalNotifications;
        }

    } catch (error) {

        console.log("Error updating notification count:", error);

    }

};

updateNotificationCount();

// SIDEBAR LOGOUT
const logoutButton = document.getElementById("logout-button");

if (logoutButton) {
    logoutButton.addEventListener("click", function (event) {
        event.preventDefault();

        localStorage.removeItem("token");

        window.location.href = "/html/login.html";
    });
}