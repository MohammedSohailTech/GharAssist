console.log("PROVIDER HEADER JS LOADED");


// =========================================
// SIDEBAR / HAMBURGER MENU
// =========================================

const menuBar = document.getElementById("menu-toggle");
const sideBar = document.querySelector(".sidebar");

if (menuBar && sideBar) {

    menuBar.addEventListener("click", function () {

        sideBar.classList.toggle("active");

        if (sideBar.classList.contains("active")) {

            menuBar.classList.remove("fa-bars");
            menuBar.classList.add("fa-xmark");

        } else {

            menuBar.classList.remove("fa-xmark");
            menuBar.classList.add("fa-bars");

        }

    });

}


// =========================================
// PROFILE DROPDOWN
// =========================================

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

}


// =========================================
// NOTIFICATION DROPDOWN
// =========================================

const notification = document.getElementById("notification");
const notificationDropdown =
    document.getElementById("notification-dropdown");

if (notification && notificationDropdown) {

    notification.addEventListener("click", function (event) {

        event.stopPropagation();

        if (notificationDropdown.style.display === "block") {

            notificationDropdown.style.display = "none";

        } else {

            notificationDropdown.style.display = "block";

        }

    });

}


// =========================================
// CLOSE DROPDOWNS
// =========================================

document.addEventListener("click", function () {

    if (profileDropdown) {
        profileDropdown.style.display = "none";
    }

    if (notificationDropdown) {
        notificationDropdown.style.display = "none";
    }

});


// =========================================
// PROFILE LOGOUT
// =========================================

const profileLogoutButton =
    document.getElementById("profile-logout-button");

if (profileLogoutButton) {

    profileLogoutButton.addEventListener("click", function () {

        localStorage.removeItem("token");

        window.location.href = "/html/login.html";

    });

}


// =========================================
// SIDEBAR LOGOUT
// =========================================

const logoutButton =
    document.getElementById("logout-button");

if (logoutButton) {

    logoutButton.addEventListener("click", function (event) {

        event.preventDefault();

        localStorage.removeItem("token");

        window.location.href = "/html/login.html";

    });

}