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


// ===============================
// REFRESH BUTTON
// ===============================

const refreshButton =
    document.getElementById("refresh-services");

if (refreshButton) {

    refreshButton.addEventListener("click", function () {

        showDate();

    });

}