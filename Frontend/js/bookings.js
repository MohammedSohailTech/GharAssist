// =========================================
// CURRENT DATE
// =========================================

const options = {
    day: "2-digit",
    month: "short",
    year: "numeric"
};

const currentDate = document.getElementById("current-date");

function showDate() {
    const date = new Date();
    currentDate.textContent = date.toLocaleDateString("en-GB", options);
}

showDate();


// =========================================
// FETCH ALL BOOKINGS
// =========================================

let allBookings = [];
let allProviders = [];
// =========================================
// FETCH ALL SERVICE PROVIDERS
// =========================================

const fetchProviders = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            "http://localhost:3000/api/users/providers",
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Unable to fetch providers");
            return;
        }

        allProviders = data.users || data.providers || [];

        console.log("Providers:", allProviders);

    } catch (error) {

        console.log("Error fetching providers:", error);

    }

};

const fetchBookings = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            "http://localhost:3000/api/bookings/all",
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        // console.log("Bookings:", data);

        if (!response.ok) {
            alert(data.message || "Unable to fetch bookings");
            return;
        }

        allBookings = data.bookings;

        applyFilters();

    } catch (error) {

        console.log("Error fetching bookings:", error);

    }

};


// =========================================
// DISPLAY BOOKINGS
// =========================================

function displayBookings(bookings) {

    const bookingsTable =
        document.getElementById("all-bookings-table-body");

    bookingsTable.innerHTML = "";

    if (bookings.length === 0) {

        bookingsTable.innerHTML = `
            <tr>
                <td colspan="10" style="text-align:center;">
                    No bookings found
                </td>
            </tr>
        `;

        document.getElementById("booking-count").textContent =
            "Showing 0 bookings";

        return;
    }


    bookings.forEach((booking, index) => {

        const providerOptions = allProviders.map(provider => `
    <option value="${provider._id}"
        ${booking.providerId === provider._id ? "selected" : ""}>
        ${provider.name}
    </option>
`).join("");
        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${index + 1}</td>

            <td>
                <div class="booking-customer">

                    <div class="booking-customer-icon">
                        <i class="fa-solid fa-user"></i>
                    </div>

                    <div class="booking-customer-info">
                        <span>${booking.name}</span>
                    </div>

                </div>
            </td>

            <td>${booking.phone}</td>

            <td>${booking.email}</td>

            <td>
                <span class="booking-service">
                    ${booking.service}
                </span>
            </td>

            <td>${booking.location}</td>

            <td>
                ${new Date(booking.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })}
            </td>

           <td>
    <select
    class="provider-select"
    onchange="assignProvider('${booking._id}', this.value)"
>
    <option value="">Not Assigned</option>
    ${providerOptions}
</select>
</td>

            <td>
                <select
                    class="booking-status"
                    onchange="updateBookingStatus('${booking._id}', this.value)"
                >

                    <option value="pending"
                        ${booking.status === "pending" ? "selected" : ""}>
                        Pending
                    </option>

                    <option value="accepted"
                        ${booking.status === "accepted" ? "selected" : ""}>
                        Accepted
                    </option>

                    <option value="rejected"
                        ${booking.status === "rejected" ? "selected" : ""}>
                        Rejected
                    </option>

                    <option value="completed"
                        ${booking.status === "completed" ? "selected" : ""}>
                        Completed
                    </option>

                </select>
            </td>

            <td>

                <div class="booking-action">

                    <button onclick="viewBooking('${booking._id}')">
                        <i class="fa-solid fa-eye booking-view"></i>
                    </button>

                    <button onclick="deleteBooking('${booking._id}')">
                        <i class="fa-solid fa-trash booking-delete"></i>
                    </button>

                </div>

            </td>

        `;

        bookingsTable.appendChild(row);

    });


    document.getElementById("booking-count").textContent =
        `Showing ${bookings.length} bookings`;

}


// =========================================
// VIEW BOOKING
// =========================================

async function viewBooking(id) {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:3000/api/bookings/${id}`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Unable to fetch booking");
            return;
        }

        const booking = data.booking;

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
            new Date(booking.date).toLocaleDateString("en-GB");

        document.getElementById("booking-status").textContent =
            booking.status;

        document.getElementById("booking-modal").style.display =
            "flex";

    } catch (error) {

        console.log("Error viewing booking:", error);

    }

}


// =========================================
// CLOSE BOOKING MODAL
// =========================================

const closeBookingModal =
    document.getElementById("close-booking-modal");

const bookingModal =
    document.getElementById("booking-modal");


if (closeBookingModal && bookingModal) {

    closeBookingModal.addEventListener("click", function () {

        bookingModal.style.display = "none";

    });


    bookingModal.addEventListener("click", function (event) {

        if (event.target === bookingModal) {

            bookingModal.style.display = "none";

        }

    });

}


// =========================================
// DELETE BOOKING
// =========================================

async function deleteBooking(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this booking?");

    if (!confirmDelete) {
        return;
    }

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:3000/api/bookings/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("Booking deleted successfully");

            fetchBookings();

        } else {

            alert(data.message || "Unable to delete booking");

        }

    } catch (error) {

        console.log("Error deleting booking:", error);

    }

}

// =========================================
// ASSIGN PROVIDER
// =========================================

async function assignProvider(bookingId, providerId) {

    if (!providerId) {
        return;
    }

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:3000/api/bookings/assign-provider/${bookingId}`,
            {
                method: "PATCH",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify({
                    providerId: providerId
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("Provider assigned successfully");

            fetchBookings();

        } else {

            alert(
                data.message ||
                "Unable to assign provider"
            );

        }

    } catch (error) {

        console.log(
            "Error assigning provider:",
            error
        );

    }

}

// =========================================
// UPDATE BOOKING STATUS
// =========================================

async function updateBookingStatus(id, status) {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:3000/api/bookings/status/${id}`,
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

        if (response.ok) {

            alert("Booking status updated successfully");

            fetchBookings();

        } else {

            alert(data.message || "Unable to update status");

        }

    } catch (error) {

        console.log("Error updating booking status:", error);

    }

}


// =========================================
// REFRESH BUTTON
// =========================================

const refreshButton =
    document.getElementById("refresh-bookings");

if (refreshButton) {

    refreshButton.addEventListener("click", function () {

        fetchBookings();

    });

}


// =========================================
// INITIAL LOAD
// =========================================

fetchProviders();
fetchBookings();

// =========================================
// BOOKING FILTERS + SORT
// =========================================

const searchInput = document.getElementById("booking-search");
const serviceFilter = document.getElementById("service-filter");
const statusFilter = document.getElementById("status-filter");
const sortFilter = document.getElementById("sort-filter");

function applyFilters() {

    let filteredBookings = [...allBookings];

    // SEARCH
    const searchText =
        searchInput.value.toLowerCase().trim();

    if (searchText) {

        filteredBookings = filteredBookings.filter((booking) => {

            return (
                booking.name.toLowerCase().includes(searchText) ||
                booking.phone.toLowerCase().includes(searchText) ||
                booking.email.toLowerCase().includes(searchText) ||
                booking.service.toLowerCase().includes(searchText)
            );

        });

    }


    // SERVICE FILTER
    const selectedService = serviceFilter.value;

    if (selectedService !== "all") {

        filteredBookings = filteredBookings.filter((booking) => {

            return booking.service === selectedService;

        });

    }


    // STATUS FILTER
    const selectedStatus = statusFilter.value;

    if (selectedStatus !== "all") {

        filteredBookings = filteredBookings.filter((booking) => {

            return booking.status === selectedStatus;

        });

    }


    // SORT
    const selectedSort = sortFilter.value;

    if (selectedSort === "newest") {

        filteredBookings.sort((a, b) => {

            return new Date(b.date) - new Date(a.date);

        });

    }

    if (selectedSort === "oldest") {

        filteredBookings.sort((a, b) => {

            return new Date(a.date) - new Date(b.date);

        });

    }


    // DISPLAY FINAL RESULT
    displayBookings(filteredBookings);
}


// =========================================
// LISTEN FOR CHANGES
// =========================================

searchInput.addEventListener("input", applyFilters);

serviceFilter.addEventListener("change", applyFilters);

statusFilter.addEventListener("change", applyFilters);

sortFilter.addEventListener("change", applyFilters);



