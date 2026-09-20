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
// Fetch all contacts
const fetchContacts = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3000/api/contacts/", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        const contactsTable = document.getElementById("contacts-table-body");

        contactsTable.innerHTML = "";

        data.contacts.forEach((contact) => {

            const row = document.createElement("tr");

            row.innerHTML = `
        <td>${contact.name}</td>
        <td>${contact.email}</td>
        <td>${contact.phone}</td>
        <td>${contact.message}</td>
        <td>
            <div class="action">
                <button onclick="viewContact('${contact._id}')">
                    <i class="fa-solid fa-eye"></i>
                </button>

                <button onclick="deleteContact('${contact._id}')">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </td>
    `;

            contactsTable.appendChild(row);
        });

    } catch (error) {
        console.log("Error fetching contacts:", error);
    }
};
async function viewContact(id) {
    console.log("VIEW BUTTON CLICKED", id);
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:3000/api/contacts/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();
        console.log("API DATA:", data);
        const contact = data.contact;
        console.log("MODAL:", document.getElementById("view-modal"));

        document.getElementById("view-name").textContent = contact.name;
        document.getElementById("view-email").textContent = contact.email;
        document.getElementById("view-phone").textContent = contact.phone;
        document.getElementById("view-message").textContent = contact.message;

        document.getElementById("view-modal").style.display = "flex";

    } catch (error) {
        console.log("Error viewing contact:", error);
    }
}
const closeModal = document.getElementById("close-modal");
const viewModal = document.getElementById("view-modal");

closeModal.addEventListener("click", function () {
    viewModal.style.display = "none";
});
viewModal.addEventListener("click", function (event) {
    if (event.target === viewModal) {
        viewModal.style.display = "none";
    }
});
async function deleteContact(id) {
    const confirmDelete = confirm("Are you sure you want to delete this contact?");

    if (!confirmDelete) {
        return;
    }
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:3000/api/contacts/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        console.log(data);

        fetchContacts();

    } catch (error) {
        console.log("Error deleting contact:", error);
    }
}

fetchContacts();

let allProviders = [];
//Fetch Providers
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

        if (response.ok) {
            allProviders = data.providers;
        } else {
            console.log(data.message);
        }

    } catch (error) {
        console.log("Error fetching providers:", error);
    }
};

//Fetch Bookings
const fetchBookings = async () => {

    try {
        await fetchProviders();
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3000/api/bookings/all", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();
        //total card status
        document.getElementById("total-bookings").textContent = data.bookings.length;

        //pending card status
        const pendingCount = data.bookings.filter(
            booking => booking.status === "pending"
        ).length;
        document.getElementById("pending-bookings").textContent = pendingCount;
        //completed card status
        const completedCount = data.bookings.filter(booking => booking.status === "completed").length
        document.getElementById("completed-bookings").textContent = completedCount;


        const bookingsTable = document.getElementById("bookings-table-body");

        bookingsTable.innerHTML = "";

        data.bookings.forEach((booking) => {

            const row = document.createElement("tr");

            const providerOptions = allProviders.map(provider => `
        <option value="${provider._id}"
            ${booking.providerId === provider._id ? "selected" : ""}>
            ${provider.name}
        </option>
    `).join("");

            row.innerHTML = `
        <td>
            <div class="customer-details">
                <div class="customer-logo">
                    <i class="fa-solid fa-user custmr"></i>
                </div>

                <div class="customer-nn">
                    <span>${booking.name}</span>
                    <span>${booking.phone}</span>
                </div>
            </div>
        </td>

        <td>
            <div class="service-t">
                <span>${booking.service}</span>
            </div>
        </td>

        <td>${new Date(booking.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            })}</td>

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
        <div class="status">
            <select onchange="updateBookingStatus('${booking._id}', this.value)">
            <option value="pending" ${booking.status === "pending" ? "selected" : ""}>Pending</option>
            <option value="accepted" ${booking.status === "accepted" ? "selected" : ""}>Accepted</option>
            <option value="rejected" ${booking.status === "rejected" ? "selected" : ""}>Rejected</option>
            <option value="completed" ${booking.status === "completed" ? "selected" : ""}>Completed</option>
             </select>
        </div>
    </td>

        <td>
            <div class="action">
                <button  onclick="viewBooking('${booking._id}')">
                    <i class="fa-solid fa-eye"></i>
                </button>

                <button onclick="deleteBookingById('${booking._id}')">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </td>
    `;

            bookingsTable.appendChild(row);
        });

        // console.log("Bookings:", data);

    } catch (error) {
        console.log("Error fetching bookings:", error);
    }
};
async function viewBooking(id) {
    // console.log("VIEW BOOKING CLICKED:", id);
    // console.log("BOOKING ID:", id);
    // console.log("URL:", `http://localhost:3000/api/bookings/${id}`);
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

        // console.log("Booking:", data);

        const booking = data.booking;

        document.getElementById("booking-name").textContent = booking.name;
        document.getElementById("booking-phone").textContent = booking.phone;
        document.getElementById("booking-email").textContent = booking.email;
        document.getElementById("booking-service").textContent = booking.service;
        document.getElementById("booking-location").textContent = booking.location;
        document.getElementById("booking-date").textContent =
            new Date(booking.date).toLocaleDateString("en-GB");
        document.getElementById("booking-status").textContent = booking.status;

        document.getElementById("booking-modal").style.display = "flex";

    } catch (error) {

        console.log("Error viewing booking:", error);

    }
}
const closeBookingModal = document.getElementById("close-booking-modal");

const bookingModal = document.getElementById("booking-modal");

closeBookingModal.addEventListener("click", function () {

    bookingModal.style.display = "none";

});
bookingModal.addEventListener("click", function (event) {

    if (event.target === bookingModal) {

        bookingModal.style.display = "none";

    }

});
async function deleteBookingById(id) {
    const confirmDelete = confirm("Are you sure you want to delete this booking?");

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

        console.log(data);

        if (response.ok) {
            alert("Booking deleted successfully");
            fetchBookings();
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.log("Error deleting booking:", error);
    }
}
fetchBookings();

async function assignProvider(bookingId, providerId) {

    if (!providerId) return;

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

            alert(data.message || "Unable to assign provider");

        }

    } catch (error) {

        console.log("Error assigning provider:", error);

    }
}

// Fetch all users
const fetchUsers = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3000/api/users/all", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        document.getElementById("total-users").textContent = data.users.length;

    } catch (error) {
        console.log("Error fetching users:", error);
    }
};

fetchUsers();

// Update booking status
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
            alert(data.message);
        }

    } catch (error) {
        console.log("Error updating booking status:", error);
    }
}


// Logout
// const logoutButton = document.getElementById("logout-button");

// if (logoutButton) {
//     logoutButton.addEventListener("click", function (event) {
//         event.preventDefault();

//         localStorage.removeItem("token");

//         window.location.href = "/html/login.html";
//     });
// }
