// Import from config.js
let students = [];
let currentIndex = null;

/* LOAD STUDENTS FROM API */
async function loadStudents() {
  try {
    const response = await fetch(getApiUrl(CONFIG.API.GET_STUDENTS));
    const json = await response.json();
    
    if (json.status && Array.isArray(json.res)) {
      students = json.res.filter(s => s && s.usertype === 'student');
      displayStudents();
    } else {
      console.error('Failed to load students:', json.msg);
      alert('Unable to load students from server');
    }
  } catch (error) {
    console.error('Error loading students:', error);
    alert('Unable to connect to the server. Please try again later.');
  }
}

/* DISPLAY STUDENTS */
function displayStudents() {
  let list = document.getElementById("studentList");
  list.innerHTML = "";

  let board = document.getElementById("filterBoard")?.value || "";
  let cls = document.getElementById("filterClass")?.value || "";

  students.forEach((u, i) => {
    let okClass = cls === "" || u.class === cls;
    let okBoard = board === "" || u.board === board;

    if (okClass && okBoard) {
      list.innerHTML += `
        <div class="student-card" onclick="openProfile(${i})">
          <b>${u.name}</b><br>
          <small>${u.class} ${u.board ? '| ' + u.board : ''}</small>
        </div>
      `;
    }
  });
}

/* FILTER */
function filterStudents() {
  displayStudents();
}

/* NOTICE PUBLISH */
const TEST_SERIES_LINKS = {
  'Class 12th': 'https://docs.google.com/spreadsheets/d/13NXpZ63gQ3iGfL9JmVlhVTlUgeLJP-IRt7f1D_hO2c4/edit?gid=1510681143#gid=1510681143',
  'Class 11th': 'https://docs.google.com/spreadsheets/d/1vcGUNyIZ5n_lQXFWmsbfyGN-S9U8rGOQ/edit?gid=1827286670#gid=1827286670'
};

async function publishNotice() {
  const board = document.getElementById('filterBoard')?.value || '';
  const cls = document.getElementById('filterClass')?.value || '';
  const message = document.getElementById('noticeMessage')?.value.trim() || '';

  if (!message) {
    return alert('Please enter a notice message first.');
  }

  try {
    const response = await fetch(getApiUrl(CONFIG.API.NOTICES), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, board: board || null, class: cls || null })
    });

    const json = await response.json();
    if (json.status) {
      document.getElementById('noticeMessage').value = '';
      alert('Notice published successfully.');
      displayStudents();
    } else {
      console.error('Publish notice failed:', json);
      alert(json.msg || 'Unable to publish notice.');
    }
  } catch (error) {
    console.error('Error publishing notice:', error);
    alert('Unable to publish notice. Please try again later.');
  }
}

function openTestSeriesPopup(event) {
  if (event) event.preventDefault();
  const content = document.getElementById('testSeriesModalContent');
  const rows = Object.entries(TEST_SERIES_LINKS).map(([cls, url]) => `
    <div class="mb-3">
      <h6 class="mb-1">${cls}</h6>
      <a href="${url}" target="_blank" rel="noreferrer" class="link-primary">Open Link</a>
    </div>
  `).join('');

  content.innerHTML = rows || '<p class="text-muted">No test series links available.</p>';
  const modal = new bootstrap.Modal(document.getElementById('testSeriesModal'));
  modal.show();
}

/* NOTICE LIST AND DELETE */
async function openNoticesPopup(event) {
  if (event) event.preventDefault();
  await loadNoticesForAdmin();
  const noticeModal = new bootstrap.Modal(document.getElementById('noticeModal'));
  noticeModal.show();
}

async function loadNoticesForAdmin() {
  const content = document.getElementById('noticeModalContent');
  content.innerHTML = 'Loading notices...';

  try {
    const response = await fetch(getApiUrl(CONFIG.API.NOTICES));
    const json = await response.json();

    if (json.status && Array.isArray(json.res)) {
      if (json.res.length === 0) {
        content.innerHTML = '<p class="text-muted">No notices have been published yet.</p>';
        return;
      }

      const rows = json.res.map(notice => {
        const boardText = notice.board ? notice.board : 'All Boards';
        const classText = notice.class ? notice.class : 'All Classes';
        return `
          <tr>
            <td>${notice.id}</td>
            <td>${escapeHtml(notice.message)}</td>
            <td>${escapeHtml(boardText)}</td>
            <td>${escapeHtml(classText)}</td>
            <td>${new Date(notice.created_at).toLocaleString()}</td>
            <td>
              <button class="btn btn-sm btn-danger" onclick="deleteNotice(${notice.id})">
                Delete
              </button>
            </td>
          </tr>
        `;
      }).join('');

      content.innerHTML = `
        <div class="table-responsive">
          <table class="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Message</th>
                <th>Board</th>
                <th>Class</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      `;
    } else {
      content.innerHTML = '<p class="text-danger">Unable to load notices.</p>';
    }
  } catch (error) {
    console.error('Error loading notices:', error);
    content.innerHTML = '<p class="text-danger">Failed to load notices. Please try again later.</p>';
  }
}

async function deleteNotice(id) {
  if (!confirm('Delete this notice permanently?')) {
    return;
  }

  try {
    const response = await fetch(getApiUrl(`${CONFIG.API.NOTICES}/${id}`), {
      method: 'DELETE'
    });
    const json = await response.json();

    if (json.status) {
      await loadNoticesForAdmin();
      displayStudents();
      alert('Notice deleted successfully.');
    } else {
      console.error('Delete notice failed:', json);
      alert(json.msg || 'Unable to delete notice.');
    }
  } catch (error) {
    console.error('Error deleting notice:', error);
    alert('Unable to delete notice. Please try again later.');
  }
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* OPEN PROFILE */
function openProfile(i) {
  currentIndex = i;
  let u = students[i];
  
  // Store student data and redirect to profile.html
  localStorage.setItem("viewingStudent", JSON.stringify(u));
  localStorage.setItem("viewingStudentIndex", i);
  window.location.href = "profile.html";
}

/* CLOSE PROFILE */
function closeProfile() {
  window.location.href = "dashboard.html";
}

/* SUBJECTS */
function getSubjects(cls) {
  if (cls && (cls.includes('11') || cls.includes('12'))) {
    return ["Physics", "Chemistry", "Mathematics", "Biology", "English", "Hindi"];
  }
  return ["Science", "Social Science", "Mathematics", "English", "Hindi"];
}

/* RENDER SUBJECTS */
function renderSubjects() {
  let u = students[currentIndex];

  if (!u.subjects) u.subjects = {};

  let box = document.getElementById("subjectBox");
  box.innerHTML = "";

  let subs = getSubjects(u.class);

  subs.forEach(s => {
    let checked = u.subjects[s] ? "checked" : "";

    box.innerHTML += `
      <div class="subject-row">
        <span>${s}</span>

        <label class="switch">
          <input type="checkbox" ${checked} onchange="toggleSub('${s}', this.checked)">
          <span class="slider"></span>
          <span class="switch-text">${checked ? "ON" : "OFF"}</span>
        </label>
      </div>
    `;
  });
}

/* TOGGLE */
function toggleSub(sub, status) {
  students[currentIndex].subjects[sub] = status;
}

/* TOGGLE DASHBOARD LOCK */
function toggleDashboardLock() {
  let status = document.getElementById("dashToggle").checked;
  students[currentIndex].dashboardLocked = status;
  document.getElementById("dashStatus").innerText = status ? "Locked" : "Unlocked";
}

/* INITIALIZE */
window.addEventListener('DOMContentLoaded', loadStudents);