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


// ===============================
// FETCH ALL SERVICE PROVIDERS
// ===============================

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

            alert(data.message || "Unable to fetch service providers");

            return;
        }

        const providersTable =
            document.getElementById("providers-table-body");

        providersTable.innerHTML = "";


        data.providers.forEach((provider, index) => {

            const row = document.createElement("tr");

            row.innerHTML = `

                <td>${index + 1}</td>

                <td>

                    <div class="provider-info">

                        <div class="provider-icon">

                            <i class="fa-solid fa-user"></i>

                        </div>

                        <span>${provider.name}</span>

                    </div>

                </td>

                <td>${provider.email}</td>

                <td>${provider.phone}</td>

                <td>${provider.role}</td>

                <td>

                    <div class="provider-action">

                        <button onclick="viewProvider('${provider._id}')">

                            <i class="fa-solid fa-eye provider-view"></i>

                        </button>

                        <button onclick="deleteProvider('${provider._id}')">

                            <i class="fa-solid fa-trash provider-delete"></i>

                        </button>

                    </div>

                </td>

            `;

            providersTable.appendChild(row);

        });

    }

    catch (error) {

        console.log(
            "Error fetching service providers:",
            error
        );

    }

};



// ===============================
// VIEW PROVIDER
// ===============================

async function viewProvider(id) {

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

            alert(
                data.message ||
                "Unable to fetch provider"
            );

            return;
        }

        const provider = data.user;


        document.getElementById("provider-name").textContent =
            provider.name;

        document.getElementById("provider-email").textContent =
            provider.email;

        document.getElementById("provider-phone").textContent =
            provider.phone;

        document.getElementById("provider-role").textContent =
            provider.role;


        document.getElementById("provider-modal").style.display =
            "flex";

    }

    catch (error) {

        console.log(
            "Error viewing provider:",
            error
        );

    }

}



// ===============================
// CLOSE PROVIDER MODAL
// ===============================

const closeProviderModal =
    document.getElementById("close-provider-modal");

const providerModal =
    document.getElementById("provider-modal");


if (closeProviderModal && providerModal) {

    closeProviderModal.addEventListener(
        "click",
        () => {

            providerModal.style.display = "none";

        }
    );


    providerModal.addEventListener(
        "click",
        (event) => {

            if (event.target === providerModal) {

                providerModal.style.display = "none";

            }

        }
    );

}



// ===============================
// DELETE PROVIDER
// ===============================

async function deleteProvider(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this service provider?"
    );


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

            alert(
                "Service provider deleted successfully"
            );

            fetchProviders();

        }

        else {

            alert(
                data.message ||
                "Unable to delete service provider"
            );

        }

    }

    catch (error) {

        console.log(
            "Error deleting provider:",
            error
        );

    }

}



// ===============================
// REFRESH BUTTON
// ===============================

const refreshButton =
    document.getElementById("refresh-providers");


if (refreshButton) {

    refreshButton.addEventListener(
        "click",
        () => fetchProviders()
    );

}



// ===============================
// LOAD PROVIDERS
// ===============================

fetchProviders();