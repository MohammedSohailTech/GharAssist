// ===============================
// GET CUSTOMER BOOKINGS
// ===============================
console.log("MY BOOKINGS JS LOADED");
let customerBookings = [];
const getCustomerBookings = async () => {

    try {

        const token = localStorage.getItem("token");

        if (!token) {

            window.location.href = "/html/login.html";

            return;

        }

        const response = await fetch(
            "https://gharassist.onrender.com/api/bookings/my-bookings",
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        customerBookings = data.bookings || [];

        renderBookings(customerBookings);

    } catch (error) {

        console.error("Customer Bookings Error:", error);

    }

};

// ===============================
// DISPLAY CUSTOMER BOOKINGS
// ===============================

const renderBookings = (bookings) => {

    const tableBody =
        document.getElementById("customer-bookings-table-body");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (bookings.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="7">
                    No bookings found
                </td>
            </tr>
        `;

        return;
    }

    bookings.forEach((booking, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>

            <td>${booking.service}</td>

            <td>
                ${new Date(booking.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })}
            </td>

            <td>${booking.location}</td>

<td>
    ${booking.providerId?.name || "Not Assigned"}
</td>

<td>
    <span class="status-badge status-${booking.status}">
        ${booking.status}
    </span>
</td>

            <td>
                <button class="view-booking" data-id="${booking._id}">
    <i class="fa-solid fa-eye"></i>
    View
</button>
            </td>
        `;

        tableBody.appendChild(row);

    });

};


// ===============================
// LOAD BOOKINGS
// ===============================

getCustomerBookings();

document.addEventListener("click", (event) => {

    const button = event.target.closest(".view-booking");
    console.log("VIEW BUTTON CLICKED", button);
    if (!button) {
        return;
    }

    const bookingId = button.dataset.id;

    const booking = customerBookings.find(
        booking => booking._id === bookingId
    );
    console.log("SELECTED BOOKING:", booking);

    if (!booking) {
        return;
    }

    document.getElementById("modal-service").textContent =
        booking.service;

    document.getElementById("modal-name").textContent =
        booking.name;

    document.getElementById("modal-email").textContent =
        booking.email;

    document.getElementById("modal-phone").textContent =
        booking.phone;

    document.getElementById("modal-location").textContent =
        booking.location;

    document.getElementById("modal-date").textContent =
        new Date(booking.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

    document.getElementById("modal-status").textContent =
        booking.status;
    console.log(
        "BOOKING MODAL:",
        document.getElementById("booking-modal")
    );

    document.getElementById("booking-modal").style.display =
        "flex";

});

const closeBookingModal =
    document.getElementById("close-booking-modal");

closeBookingModal.addEventListener("click", () => {

    document.getElementById("booking-modal").style.display =
        "none";

});