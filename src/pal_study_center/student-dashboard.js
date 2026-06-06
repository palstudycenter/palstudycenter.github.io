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
loadNotices();

async function loadNotices() {
    const noticeContainer = document.getElementById('noticeContainer');
    if (!noticeContainer) return;

    noticeContainer.innerHTML = `
        <div class="notice-card notice-loading">
            <div class="spinner-border text-primary" role="status"></div>
            <span>Loading notices...</span>
        </div>
    `;

    if (!user.id || typeof CONFIG === 'undefined') {
        noticeContainer.innerHTML = `
            <div class="notice-card notice-empty">
                <p>No notices available.</p>
            </div>
        `;
        return;
    }

    try {
        const response = await fetch(`${CONFIG.BASE_URL}/students/${user.id}/notices`);
        const data = await response.json();

        if (!response.ok || !data.status || !Array.isArray(data.res)) {
            throw new Error(data.msg || 'Unable to load notices');
        }

        const notices = data.res;
        if (!notices.length) {
            noticeContainer.innerHTML = `
                <div class="notice-card notice-empty">
                    <p>आपके लिए कोई नया नोटिस नहीं है।</p>
                </div>
            `;
            return;
        }

        noticeContainer.innerHTML = notices.map(notice => `
            <div class="notice-card">
                <div class="notice-header">
                    <strong>Notice</strong>
                </div>
                <p>${notice.message}</p>
            </div>
        `).join('');
    } catch (error) {
        console.warn('Error loading notices:', error);
        noticeContainer.innerHTML = `
            <div class="notice-card notice-empty">
                <p>Unable to load notices at this time.</p>
            </div>
        `;
    }
}

async function openFeesModal(event) {
    event.preventDefault();
    const feesModal = new bootstrap.Modal(document.getElementById('feesModal'));
    feesModal.show();
    await loadFeesData();
}

async function loadFeesData() {
    const feesContent = document.getElementById('feesContent');
    feesContent.innerHTML = `
        <div class="text-center text-muted">
            <div class="spinner-border" role="status"></div>
            <p>Loading fees...</p>
        </div>
    `;

    let fees = [];

    if (user.id && typeof CONFIG !== 'undefined') {
        try {
            const response = await fetch(`${CONFIG.BASE_URL}/students/${user.id}/fees`);
            const data = await response.json();

            if (response.ok && data.status && Array.isArray(data.res)) {
                fees = data.res;
            } else {
                console.warn('Unable to load fees from server:', data.msg || data.err);
            }
        } catch (error) {
            console.warn('Error fetching fees:', error);
        }
    }

    if (!fees.length) {
        feesContent.innerHTML = `
            <div class="text-center py-4 text-muted">
                No fees data available.
            </div>
        `;
        return;
    }

    // Group fees by status
    const groupedFees = {
        'Paid': [],
        'Unpaid': []
    };

    fees.forEach(fee => {
        if (fee.status === 'Paid') {
            groupedFees['Paid'].push(fee.month);
        } else if (fee.status === 'Unpaid') {
            groupedFees['Unpaid'].push(fee.month);
        }
    });

    let html = '';

    // Render Paid section
    if (groupedFees['Paid'].length > 0) {
        html += `
            <div class="fees-status-group">
                <div class="fees-status-header fees-status-paid">
                    <i class="bi bi-check-circle-fill"></i>
                    Paid (${groupedFees['Paid'].length})
                </div>
                <div class="fees-month-grid">
                    ${groupedFees['Paid'].map(month => `
                        <div class="fees-month-item">
                            <span class="fees-month-label">Month</span>
                            <span class="fees-month-name">${month.substring(0, 3)}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Render Unpaid section
    if (groupedFees['Unpaid'].length > 0) {
        html += `
            <div class="fees-status-group">
                <div class="fees-status-header fees-status-unpaid">
                    <i class="bi bi-exclamation-circle-fill"></i>
                    Unpaid (${groupedFees['Unpaid'].length})
                </div>
                <div class="fees-month-grid">
                    ${groupedFees['Unpaid'].map(month => `
                        <div class="fees-month-item">
                            <span class="fees-month-label">Month</span>
                            <span class="fees-month-name">${month.substring(0, 3)}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    feesContent.innerHTML = html;
}