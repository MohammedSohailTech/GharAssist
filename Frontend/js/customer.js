// =========================================
// CUSTOMER ACCESS CHECK
// =========================================

const checkCustomerAccess = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "/html/login.html";
        return false;
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

            window.location.href = "/html/login.html";

            return false;
        }

        if (data.user.role !== "customer") {

            if (data.user.role === "admin") {
                window.location.href = "/html/admin.html";
            }

            else if (data.user.role === "provider") {
                window.location.href = "/html/provider.html";
            }

            return false;
        }

        return true;

    } catch (error) {

        console.error("Customer access error:", error);

        return false;
    }
};


// =========================================
// GET CUSTOMER BOOKINGS
// =========================================

const getCustomerDashboardBookings = async () => {

    try {

        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        const response = await fetch(
            "http://localhost:3000/api/bookings/my-bookings",
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        const bookings = data.bookings || [];


        // =========================================
        // STATISTICS
        // =========================================

        document.getElementById("total-bookings").textContent =
            bookings.length;

        document.getElementById("pending-bookings").textContent =
            bookings.filter(
                booking => booking.status === "pending"
            ).length;

        document.getElementById("accepted-bookings").textContent =
            bookings.filter(
                booking => booking.status === "accepted"
            ).length;

        document.getElementById("completed-bookings").textContent =
            bookings.filter(
                booking => booking.status === "completed"
            ).length;


        // =========================================
        // RECENT BOOKINGS TABLE
        // =========================================

        const tableBody =
            document.getElementById("customer-bookings-body");

        if (!tableBody) {
            return;
        }

        tableBody.innerHTML = "";


        // Show latest 5 bookings
        const recentBookings =
            bookings.slice(-5).reverse();


        // No bookings
        if (recentBookings.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="3">
                        No bookings found
                    </td>
                </tr>
            `;

            return;
        }


        // Display bookings
        recentBookings.forEach((booking) => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>
                    ${booking.service}
                </td>

                <td>
                    ${new Date(booking.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            })}
                </td>

                <td>
                    <span class="status-badge status-${booking.status}">
                        ${booking.status}
                    </span>
                </td>
                <td>
                 ${booking.providerId?.name || "Not Assigned"}
                </td>
            `;

            tableBody.appendChild(row);

        });

    } catch (error) {

        console.error(
            "Customer Dashboard Error:",
            error
        );

    }
};


// =========================================
// START CUSTOMER DASHBOARD
// =========================================

const startCustomerDashboard = async () => {

    const allowed =
        await checkCustomerAccess();

    if (!allowed) {
        return;
    }

    await getCustomerDashboardBookings();

};

startCustomerDashboard();