const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user) {
    window.location.href = "../login.html";
}

const studentName = document.getElementById("studentName");
const studentInfo = document.getElementById("studentInfo");
const container = document.getElementById("subjectsContainer");

studentName.innerText = `Welcome ${user.name || 'Student'}`;
studentInfo.innerText = `${user.board || 'Unknown Board'} | ${user.class || 'Unknown Class'}`;

async function loadSubjects() {
    container.innerHTML = `
        <div class="col-12 text-center py-4 text-muted">
            Loading subjects...
        </div>
    `;

    let enabledSubjects = [];

    if (user.id && typeof CONFIG !== 'undefined') {
        try {
            const response = await fetch(`${CONFIG.BASE_URL}/students/${user.id}/subjects`);
            const data = await response.json();

            if (response.ok && data.status && Array.isArray(data.res)) {
                enabledSubjects = data.res
                    .filter(item => item.enabled === 1 || item.enabled === true)
                    .map(item => item.subject);
            } else {
                console.warn('Unable to load subjects from server:', data.msg || data.err);
            }
        } catch (error) {
            console.warn('Error fetching subjects:', error);
        }
    }

    if (!enabledSubjects.length) {
        container.innerHTML = `
            <div class="col-12 text-center py-4 text-muted">
                Access Restricted: Please contact your teacher or administrator to enable subjects for your account.
            </div>
        `;
        return;
    }

    container.innerHTML = '';
    enabledSubjects.forEach(subject => {
        const subjectSlug = subject.toLowerCase().replace(/\s+/g, '-') + '.html';
        container.innerHTML += `
            <div class="col-md-4 col-6">
                <a href="${subjectSlug}" class="subject-card" style="background:linear-gradient(to right,#2563eb,#4f46e5)">
                    <i class="bi bi-book-fill"></i>
                    <h5>${subject}</h5>
                    <small>Enabled Subject</small>
                </a>
            </div>
        `;
    });
}

loadSubjects();