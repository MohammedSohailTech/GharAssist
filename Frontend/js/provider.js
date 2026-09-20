// ===============================
// CHECK PROVIDER ACCESS
// ===============================

const checkProviderAccess = async () => {

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

        if (data.user.role !== "provider") {

            if (data.user.role === "admin") {

                window.location.href = "/html/admin.html";

            } else if (data.user.role === "customer") {

                window.location.href = "/html/customer.html";

            }

            return false;
        }

        return true;

    } catch (error) {

        console.error("Provider access error:", error);

        return false;
    }
};


// ===============================
// CHECK ACCESS
// ===============================

checkProviderAccess();

// ===============================
// CURRENT DATE
// ===============================

const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
}

const heroDate = document.getElementById('current-date')
setInterval(function () {
    let date = new Date()
    heroDate.textContent = date.toLocaleDateString('en-GB', options);
})


// ===============================
// GET PROVIDER BOOKINGS
// ===============================

const getProviderBookings = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            "http://localhost:3000/api/bookings/provider-bookings",
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        const tableBody =
            document.getElementById("provider-bookings-body");

        // No bookings
        if (!response.ok) {

            document.getElementById("total-bookings").textContent = "0";
            document.getElementById("pending-bookings").textContent = "0";
            document.getElementById("accepted-bookings").textContent = "0";
            document.getElementById("completed-bookings").textContent = "0";

            if (tableBody) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="5">
                            No bookings found
                        </td>
                    </tr>
                `;
            }

            return;
        }

        const bookings = data.bookings;

        // ===============================
        // BOOKING COUNTS
        // ===============================

        const totalBookings = bookings.length;

        const pendingBookings = bookings.filter(
            booking => booking.status === "pending"
        ).length;

        const acceptedBookings = bookings.filter(
            booking => booking.status === "accepted"
        ).length;

        const completedBookings = bookings.filter(
            booking => booking.status === "completed"
        ).length;


        document.getElementById("total-bookings").textContent =
            totalBookings;

        document.getElementById("pending-bookings").textContent =
            pendingBookings;

        document.getElementById("accepted-bookings").textContent =
            acceptedBookings;

        document.getElementById("completed-bookings").textContent =
            completedBookings;


        // ===============================
        // RECENT BOOKINGS
        // ===============================

        if (!tableBody) return;

        tableBody.innerHTML = "";

        bookings.slice(0, 5).forEach(booking => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${booking.name}</td>

                <td>${booking.service}</td>

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
    <button
        class="view-provider-booking"
        data-id="${booking._id}"
    >
        View
    </button>
</td>
            `;

            tableBody.appendChild(row);

        });

    } catch (error) {

        console.error(
            "Provider Dashboard Error:",
            error
        );

    }

};


// ===============================
// LOAD PROVIDER BOOKINGS
// ===============================

getProviderBookings();


// ===============================
// VIEW BOOKING
// ===============================

document.addEventListener("click", function (event) {

    const viewButton =
        event.target.closest(".view-provider-booking");

    if (!viewButton) return;

    window.location.href = "/html/provider-bookings.html";

});