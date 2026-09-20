const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "/html/login.html";
}

const checkAdmin = async () => {

    try {

        const response = await fetch("http://localhost:3000/api/users/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            localStorage.removeItem("token");
            window.location.href = "/html/login.html";
            return;
        }

        if (data.user.role !== "admin") {
            window.location.href = "/html/home.html";
            return;
        }

    } catch (error) {

        console.log("Authentication error:", error);
        localStorage.removeItem("token");
        window.location.href = "/html/login.html";

    }
};

if (token) {
    checkAdmin();
}