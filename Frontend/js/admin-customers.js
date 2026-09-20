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
    currentDate.textContent =
        date.toLocaleDateString("en-GB", options);
}

showDate();


// =========================================
// FETCH ALL CUSTOMERS
// =========================================

const fetchCustomers = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            "http://localhost:3000/api/users/all",
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        // console.log("Customers:", data);

        if (!response.ok) {
            alert(data.message || "Unable to fetch customers");
            return;
        }

        const customersTable =
            document.getElementById("customers-table-body");

        customersTable.innerHTML = "";


        data.users.forEach((user, index) => {

            const row = document.createElement("tr");

            row.innerHTML = `

                <td>${index + 1}</td>

                <td>
                    <div class="customer-info">

                        <div class="customer-icon">
                            <i class="fa-solid fa-user"></i>
                        </div>

                        <span>${user.name}</span>

                    </div>
                </td>

                <td>${user.email}</td>

                <td>${user.phone}</td>

                <td>${user.role}</td>

                <td>

                    <div class="customer-action">

                        <button onclick="viewCustomer('${user._id}')">

                            <i class="fa-solid fa-eye customer-view"></i>

                        </button>

                        <button onclick="deleteCustomer('${user._id}')">

                            <i class="fa-solid fa-trash customer-delete"></i>

                        </button>

                    </div>

                </td>

            `;

            customersTable.appendChild(row);

        });

    } catch (error) {

        console.log("Error fetching customers:", error);

    }

};

// =========================================
// VIEW CUSTOMER
// =========================================

async function viewCustomer(id) {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:3000/api/users/${id}`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Unable to fetch customer");
            return;
        }

        const customer = data.user;

        document.getElementById("customer-name").textContent =
            customer.name;

        document.getElementById("customer-email").textContent =
            customer.email;

        document.getElementById("customer-phone").textContent =
            customer.phone;

        document.getElementById("customer-role").textContent =
            customer.role;

        document.getElementById("customer-modal").style.display =
            "flex";

    } catch (error) {

        console.log("Error viewing customer:", error);

    }

}


// =========================================
// CLOSE CUSTOMER MODAL
// =========================================

const closeCustomerModal =
    document.getElementById("close-customer-modal");

const customerModal =
    document.getElementById("customer-modal");


if (closeCustomerModal && customerModal) {

    closeCustomerModal.addEventListener("click", function () {

        customerModal.style.display = "none";

    });


    customerModal.addEventListener("click", function (event) {

        if (event.target === customerModal) {

            customerModal.style.display = "none";

        }

    });

}
// =========================================
// DELETE CUSTOMER
// =========================================

async function deleteCustomer(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this customer?");

    if (!confirmDelete) {
        return;
    }

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:3000/api/users/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("Customer deleted successfully");

            fetchCustomers();

        } else {

            alert(data.message || "Unable to delete customer");

        }

    } catch (error) {

        console.log("Error deleting customer:", error);

    }

}

// =========================================
// REFRESH CUSTOMERS
// =========================================

const refreshButton =
    document.getElementById("refresh-customers");

if (refreshButton) {

    refreshButton.addEventListener("click", function () {

        fetchCustomers();

    });

}

// =========================================
// INITIAL LOAD
// =========================================

fetchCustomers();