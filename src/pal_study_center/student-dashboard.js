const TEST_RECORD_LINKS = {
  'Class 12th': 'https://docs.google.com/spreadsheets/d/13NXpZ63gQ3iGfL9JmVlhVTlUgeLJP-IRt7f1D_hO2c4/edit?gid=1510681143#gid=1510681143',
  'Class 11th': 'https://docs.google.com/spreadsheets/d/1vcGUNyIZ5n_lQXFWmsbfyGN-S9U8rGOQ/edit?gid=1827286670#gid=1827286670'
};

const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user) {
    window.location.href = "../login.html";
}

const studentName = document.getElementById("studentName");
const studentInfo = document.getElementById("studentInfo");
const container = document.getElementById("subjectsContainer");

studentName.innerText = `Welcome ${user.name || 'Student'}`;
studentInfo.innerText = `${user.board || 'Unknown Board'} | ${user.class || 'Unknown Class'}`;

/* ── Subject card visual config ─────────────────────────────────────── */
const SUBJECT_CONFIG = {
    'physics':     { icon: 'bi-lightning-charge-fill', gradient: 'linear-gradient(135deg,#1e3a8a,#2563eb)' },
    'chemistry':   { icon: 'bi-eyedropper',            gradient: 'linear-gradient(135deg,#4f46e5,#7c3aed)' },
    'mathematics': { icon: 'bi-calculator-fill',       gradient: 'linear-gradient(135deg,#0f172a,#1e3a8a)' },
    'maths':       { icon: 'bi-calculator-fill',       gradient: 'linear-gradient(135deg,#0f172a,#1e3a8a)' },
    'biology':     { icon: 'bi-flower1',               gradient: 'linear-gradient(135deg,#065f46,#059669)' },
    'english':     { icon: 'bi-translate',             gradient: 'linear-gradient(135deg,#1e40af,#3b82f6)' },
    'hindi':       { icon: 'bi-journal-text',          gradient: 'linear-gradient(135deg,#7c2d12,#dc2626)' },
    'history':     { icon: 'bi-hourglass-split',       gradient: 'linear-gradient(135deg,#78350f,#d97706)' },
    'geography':   { icon: 'bi-globe2',                gradient: 'linear-gradient(135deg,#134e4a,#0d9488)' },
    'economics':   { icon: 'bi-graph-up-arrow',        gradient: 'linear-gradient(135deg,#1e3a8a,#0891b2)' },
    'accountancy': { icon: 'bi-cash-coin',             gradient: 'linear-gradient(135deg,#14532d,#16a34a)' },
    'accounts':    { icon: 'bi-cash-coin',             gradient: 'linear-gradient(135deg,#14532d,#16a34a)' },
    'computer':    { icon: 'bi-pc-display-horizontal', gradient: 'linear-gradient(135deg,#312e81,#4f46e5)' },
    'science':     { icon: 'bi-cpu-fill',              gradient: 'linear-gradient(135deg,#0c4a6e,#0369a1)' },
    'social':      { icon: 'bi-people-fill',           gradient: 'linear-gradient(135deg,#831843,#db2777)' },
    'political':   { icon: 'bi-bank2',                 gradient: 'linear-gradient(135deg,#1e3a8a,#6366f1)' },
    'business':    { icon: 'bi-briefcase-fill',        gradient: 'linear-gradient(135deg,#0f172a,#374151)' },
    'default':     { icon: 'bi-book-fill',             gradient: 'linear-gradient(135deg,#1e3a8a,#2563eb)' }
};

function getSubjectConfig(name) {
    const key = name.toLowerCase();
    for (const [k, v] of Object.entries(SUBJECT_CONFIG)) {
        if (k !== 'default' && key.includes(k)) return v;
    }
    return SUBJECT_CONFIG['default'];
}

async function loadSubjects() {
    container.innerHTML = `
        <div class="subjects-empty">
            <i class="bi bi-hourglass-split"></i>
            Loading subjects…
        </div>
    `;

    let enabledSubjects = [];

    if (user.id && typeof CONFIG !== 'undefined') {
        try {
            const response = await fetch(`${CONFIG.BASE_URL}/students/${user.id}/subjects`);
            const data = await response.json();

            if (response.ok && data.status && data.res && typeof data.res === 'object' && !Array.isArray(data.res)) {
                // data.res is a hash: { "Science": 1, "Mathematics": 0, ... }
                enabledSubjects = Object.entries(data.res)
                    .filter(([, value]) => value === 1)
                    .map(([subject]) => subject);
            } else {
                console.warn('Unable to load subjects from server:', data.msg || data.err);
            }
        } catch (error) {
            console.warn('Error fetching subjects:', error);
        }
    }

    if (!enabledSubjects.length) {
        container.innerHTML = `
            <div class="subjects-empty">
                <i class="bi bi-lock-fill"></i>
                <strong>Access Restricted</strong><br>
                <span style="font-size:.85rem;">Please contact your teacher or administrator to enable subjects for your account.</span>
            </div>
        `;

        const marquee = document.getElementById('marqueeText');
        if (marquee) {
            marquee.innerHTML = '⚠️ <b>Student Access Suspended</b> &nbsp;|&nbsp; Your account is currently Inactive (OFF). Please contact the administration for further assistance. &nbsp;|&nbsp; <b>Contact: 91-9425123350</b>';
        }

        const navTestRecord = document.getElementById('navTestRecord');
        if (navTestRecord) navTestRecord.style.display = 'none';

        return;
    }

    container.innerHTML = enabledSubjects.map(subject => {
        const subjectSlug = subject.toLowerCase().replace(/\s+/g, '-') + '.html';
        const cfg = getSubjectConfig(subject);
        return `
            <a href="${subjectSlug}" class="subject-card" style="background:${cfg.gradient}">
                <i class="bi ${cfg.icon} subject-card-icon"></i>
                <div class="subject-card-body">
                    <h5>${subject}</h5>
                    <small>Open Subject</small>
                </div>
            </a>
        `;
    }).join('');
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

function openTestRecord(event) {
    if (event) event.preventDefault();
    const className = user.class || '';
    const url = TEST_RECORD_LINKS[className];

    if (url) {
        window.open(url, '_blank');
        return;
    }

    alert('Test record link is not available for your class.');
}

async function loadFeesData() {
    const feesContent = document.getElementById('feesContent');
    feesContent.innerHTML = `
        <div class="text-center text-muted">
            <div class="spinner-border" role="status"></div>
            <p>Loading fees...</p>
        </div>
    `;

    // fees hash: { "January": "paid", "February": "unpaid", "March": "not_applicable", ... }
    let feesHash = null;

    if (user.id && typeof CONFIG !== 'undefined') {
        try {
            const response = await fetch(`${CONFIG.BASE_URL}/students/${user.id}/fees`);
            const data = await response.json();

            if (response.ok && data.status && data.res && typeof data.res === 'object' && !Array.isArray(data.res)) {
                feesHash = data.res;
            } else {
                console.warn('Unable to load fees from server:', data.msg || data.err);
            }
        } catch (error) {
            console.warn('Error fetching fees:', error);
        }
    }

    if (!feesHash || !Object.keys(feesHash).length) {
        feesContent.innerHTML = `
            <div class="text-center py-4 text-muted">
                No fees data available.
            </div>
        `;
        return;
    }

    // Group fees by status (lowercase keys from hash)
    const groupedFees = {
        'paid': [],
        'unpaid': []
    };

    Object.entries(feesHash).forEach(([month, status]) => {
        if (status === 'paid') {
            groupedFees['paid'].push(month);
        } else if (status === 'unpaid') {
            groupedFees['unpaid'].push(month);
        }
        // 'not_applicable' months are intentionally skipped in display
    });

    let html = '';

    // Render Paid section
    if (groupedFees['paid'].length > 0) {
        html += `
            <div class="fees-status-group">
                <div class="fees-status-header fees-status-paid">
                    <i class="bi bi-check-circle-fill"></i>
                    Paid (${groupedFees['paid'].length})
                </div>
                <div class="fees-month-grid">
                    ${groupedFees['paid'].map(month => `
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
    if (groupedFees['unpaid'].length > 0) {
        html += `
            <div class="fees-status-group">
                <div class="fees-status-header fees-status-unpaid">
                    <i class="bi bi-exclamation-circle-fill"></i>
                    Unpaid (${groupedFees['unpaid'].length})
                </div>
                <div class="fees-month-grid">
                    ${groupedFees['unpaid'].map(month => `
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