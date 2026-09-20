// ===============================
// GET PROVIDER BOOKINGS
// ===============================

let providerBookings = [];

const getProviderBookings = async () => {

    try {

        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/html/login.html";
            return;
        }

        const response = await fetch(
            "https://gharassist.onrender.com/api/bookings/provider-bookings",
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {

            providerBookings = [];

            renderBookings([]);

            return;
        }

        providerBookings = data.bookings || [];

        renderBookings(providerBookings);

    } catch (error) {

        console.error("Provider Bookings Error:", error);

    }
};


// ===============================
// DISPLAY BOOKINGS
// ===============================

const renderBookings = (bookings) => {

    const tableBody =
        document.getElementById("provider-bookings-table-body");

    const bookingCount =
        document.getElementById("booking-count");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (bookings.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="9">
                    No bookings found
                </td>
            </tr>
        `;

        if (bookingCount) {
            bookingCount.textContent = "Showing 0 bookings";
        }

        return;
    }


    bookings.forEach((booking, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${index + 1}</td>

            <td>${booking.name}</td>

            <td>${booking.phone}</td>

            <td>${booking.email}</td>

            <td>${booking.service}</td>

            <td>${booking.location}</td>

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
        class="view-booking"
        data-id="${booking._id}"
    >
        <i class="fa-solid fa-eye"></i>
        View
    </button>

    ${booking.status === "pending" ? `
        <button
            class="booking-action"
            data-id="${booking._id}"
            data-status="accepted"
        >
            Accept
        </button>

        <button
            class="booking-action"
            data-id="${booking._id}"
            data-status="rejected"
        >
            Reject
        </button>
    ` : ""}

    ${booking.status === "accepted" ? `
        <button
            class="booking-action"
            data-id="${booking._id}"
            data-status="completed"
        >
            Complete
        </button>
    ` : ""}

</td>
        `;

        tableBody.appendChild(row);

    });


    if (bookingCount) {

        bookingCount.textContent =
            `Showing ${bookings.length} bookings`;

    }

};




// ===============================
// APPLY SEARCH + FILTERS
// ===============================

const applyFilters = () => {

    let filteredBookings = [...providerBookings];


    // SEARCH

    const searchValue =
        document.getElementById("booking-search")
            ?.value
            .toLowerCase()
            .trim();

    if (searchValue) {

        filteredBookings = filteredBookings.filter(booking =>

            booking.name.toLowerCase().includes(searchValue) ||

            booking.phone.includes(searchValue) ||

            booking.email.toLowerCase().includes(searchValue) ||

            booking.service.toLowerCase().includes(searchValue)

        );

    }


    // SERVICE FILTER

    const selectedService =
        document.getElementById("service-filter")?.value;

    if (selectedService && selectedService !== "all") {

        filteredBookings =
            filteredBookings.filter(
                booking => booking.service === selectedService
            );

    }


    // STATUS FILTER

    const selectedStatus =
        document.getElementById("status-filter")?.value;

    if (selectedStatus && selectedStatus !== "all") {

        filteredBookings =
            filteredBookings.filter(
                booking => booking.status === selectedStatus
            );

    }


    // SORT

    const selectedSort =
        document.getElementById("sort-filter")?.value;

    if (selectedSort === "newest") {

        filteredBookings.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );

    } else if (selectedSort === "oldest") {

        filteredBookings.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );

    }


    renderBookings(filteredBookings);

};
// ===============================
// SEARCH BOOKINGS
// ===============================

const searchInput =
    document.getElementById("booking-search");

if (searchInput) {

    searchInput.addEventListener("input", applyFilters);

}


// ===============================
// SERVICE FILTER
// ===============================

const serviceFilter =
    document.getElementById("service-filter");

if (serviceFilter) {

    serviceFilter.addEventListener("change", applyFilters);

}


// ===============================
// STATUS FILTER
// ===============================

const statusFilter =
    document.getElementById("status-filter");

if (statusFilter) {

    statusFilter.addEventListener("change", applyFilters);

}


// ===============================
// SORT BOOKINGS
// ===============================

const sortFilter =
    document.getElementById("sort-filter");

if (sortFilter) {

    sortFilter.addEventListener("change", applyFilters);

}

// ===============================
// BOOKING ACTION BUTTONS
// ===============================

document.addEventListener("click", function (event) {

    const actionButton = event.target.closest(".booking-action");

    if (!actionButton) return;

    const bookingId = actionButton.dataset.id;
    const status = actionButton.dataset.status;

    updateProviderBookingStatus(bookingId, status);

});

// ===============================
// VIEW BOOKING
// ===============================

document.addEventListener("click", function (event) {

    const viewButton =
        event.target.closest(".view-booking");

    if (!viewButton) return;

    const bookingId =
        viewButton.dataset.id;

    const booking =
        providerBookings.find(
            booking => booking._id === bookingId
        );

    if (!booking) return;


    document.getElementById("booking-name").textContent =
        booking.name;

    document.getElementById("booking-phone").textContent =
        booking.phone;

    document.getElementById("booking-email").textContent =
        booking.email;

    document.getElementById("booking-service").textContent =
        booking.service;

    document.getElementById("booking-location").textContent =
        booking.location;

    document.getElementById("booking-date").textContent =
        new Date(booking.date).toLocaleString();

    document.getElementById("booking-status").textContent =
        booking.status;


    document.getElementById("booking-modal").style.display =
        "flex";

});


// ===============================
// CLOSE BOOKING MODAL
// ===============================

const closeBookingModal =
    document.getElementById("close-booking-modal");

if (closeBookingModal) {

    closeBookingModal.addEventListener("click", function () {

        document.getElementById("booking-modal").style.display =
            "none";

    });

}


// ===============================
// REFRESH BOOKINGS
// ===============================

const refreshButton =
    document.getElementById("refresh-provider-bookings");

if (refreshButton) {

    refreshButton.addEventListener("click", function () {

        getProviderBookings();

    });

}


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
// UPDATE BOOKING STATUS
// ===============================

const updateProviderBookingStatus = async (bookingId, status) => {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            `https://gharassist.onrender.com/api/bookings/provider-status/${bookingId}`,
            {
                method: "PATCH",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify({
                    status: status
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.message || "Unable to update booking status");

            return;

        }

        alert(`Booking ${status} successfully`);

        getProviderBookings();

    } catch (error) {

        console.error("Update Provider Status Error:", error);

    }

};


// ===============================
// LOAD BOOKINGS
// ===============================

getProviderBookings();