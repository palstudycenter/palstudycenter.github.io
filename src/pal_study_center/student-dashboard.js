const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user) {
    window.location.href = "../login.html";
}

// Student Name
document.getElementById("studentName").innerText =
    `Welcome ${user.name}`;

// Board + Class
document.getElementById("studentInfo").innerText =
    `${user.board} | ${user.class}`;

let subjects = [];

// MP Board Hindi Medium
if (
    user.board === "MP Board (Hindi Medium)" &&
    (user.class === "Class 11th" || user.class === "Class 12th")
) {
    subjects = [
        "Physics",
        "Chemistry",
        "Mathematics",
        "Biology",
        "English",
        "Hindi"
    ];
}

else if (
    user.board === "MP Board (Hindi Medium)" &&
    (user.class === "Class 9th" || user.class === "Class 10th")
) {
    subjects = [
        "Science",
        "Social Science",
        "Mathematics",
        "English",
        "Hindi"
    ];
}

const container = document.getElementById("subjectsContainer");

subjects.forEach(subject => {
    container.innerHTML += `
        <div class="col-md-4 col-6">
            <div class="subject-card"
                 style="background:linear-gradient(to right,#2563eb,#4f46e5)">
                <h5>${subject}</h5>
                <small>Open Subject</small>
            </div>
        </div>
    `;
});