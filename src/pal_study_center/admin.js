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
function createStars(rating) {
  const count = Number(rating) || 0;
  return '★'.repeat(Math.min(Math.max(count, 0), 5)) + '☆'.repeat(Math.max(5 - Math.min(Math.max(count, 0), 5), 0));
}

function renderReviewCard(review) {
  return `
    <div class="card mb-3 review-admin-card" id="review-card-${review.id}">
      <div class="card-body">
        <div class="d-flex flex-column flex-sm-row justify-content-between gap-3">
          <div>
            <h5 class="mb-1">${escapeHtml(review.student_name)} <small class="text-muted">${escapeHtml(review.board)} | ${escapeHtml(review.class)}</small></h5>
            <div class="text-muted small mb-2">Created: ${new Date(review.created_at).toLocaleString()}</div>
            <div class="mb-2"><strong>Rating:</strong> ${createStars(Number(review.rating))}</div>
            <div><span class="badge bg-warning text-dark">Status: ${review.approved ? 'Approved' : 'Pending'}</span></div>
          </div>
          <div class="btn-group align-self-start">
            <button class="btn btn-sm btn-outline-primary" onclick="enableReviewEdit(${review.id})">Edit</button>
            <button class="btn btn-sm btn-outline-success" onclick="approveReview(${review.id})">Approve</button>
            <button class="btn btn-sm btn-outline-danger" onclick="unapproveReview(${review.id})">Unapprove</button>
          </div>
        </div>

        <div class="mt-3">
          <label class="form-label mb-1">Review Text</label>
          <p class="border rounded-2 p-3" id="review-text-${review.id}">${escapeHtml(review.review_text)}</p>
          <textarea class="form-control d-none" id="review-edit-${review.id}" rows="4">${escapeHtml(review.review_text)}</textarea>
        </div>

        <div class="mt-2" id="review-actions-${review.id}"></div>
      </div>
    </div>
  `;
}

async function loadReviewsForAdmin() {
  const content = document.getElementById('reviewModalContent');
  if (!content) return 0;
  content.innerHTML = '<div class="text-center py-4">Loading reviews...</div>';

  try {
    const response = await fetch(getApiUrl(`${CONFIG.API.REVIEWS}?approved=0`));
    const json = await response.json();

    if (!json.status || !Array.isArray(json.res)) {
      throw new Error(json.msg || 'Unable to load reviews');
    }

    const reviews = json.res;
    if (reviews.length === 0) {
      content.innerHTML = '<div class="text-center py-4 text-muted">No pending reviews found.</div>';
      return 0;
    }

    content.innerHTML = reviews.map(renderReviewCard).join('');
    return reviews.length;
  } catch (error) {
    console.error('Error loading reviews:', error);
    content.innerHTML = '<div class="text-danger py-4">Unable to load reviews at this time.</div>';
    return 0;
  }
}

function enableReviewEdit(reviewId) {
  const textEl = document.getElementById(`review-text-${reviewId}`);
  const editEl = document.getElementById(`review-edit-${reviewId}`);
  const actionEl = document.getElementById(`review-actions-${reviewId}`);
  if (!textEl || !editEl || !actionEl) return;

  textEl.classList.add('d-none');
  editEl.classList.remove('d-none');
  actionEl.innerHTML = `
    <button class="btn btn-sm btn-success me-2" onclick="saveReviewEdit(${reviewId})">Save</button>
    <button class="btn btn-sm btn-secondary" onclick="cancelReviewEdit(${reviewId})">Cancel</button>
  `;
}

function cancelReviewEdit(reviewId) {
  const textEl = document.getElementById(`review-text-${reviewId}`);
  const editEl = document.getElementById(`review-edit-${reviewId}`);
  const actionEl = document.getElementById(`review-actions-${reviewId}`);
  if (!textEl || !editEl || !actionEl) return;

  editEl.classList.add('d-none');
  textEl.classList.remove('d-none');
  actionEl.innerHTML = '';
}

async function saveReviewEdit(reviewId) {
  const editEl = document.getElementById(`review-edit-${reviewId}`);
  const textEl = document.getElementById(`review-text-${reviewId}`);
  const actionEl = document.getElementById(`review-actions-${reviewId}`);
  if (!editEl || !textEl || !actionEl) return;

  const review_text = editEl.value.trim();
  if (!review_text) {
    alert('Review text cannot be empty.');
    return;
  }

  try {
    const response = await fetch(getApiUrl(`${CONFIG.API.REVIEWS}/${reviewId}`), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ review_text })
    });

    const json = await response.json();
    if (!json.status) {
      throw new Error(json.msg || 'Unable to update review');
    }

    textEl.textContent = review_text;
    cancelReviewEdit(reviewId);
    alert('Review updated successfully.');
  } catch (error) {
    console.error('Error saving review edit:', error);
    alert('Unable to update review. Please try again later.');
  }
}

async function unapproveReview(reviewId) {
  if (!confirm('Unapprove this review and delete it from the database?')) {
    return;
  }

  try {
    const response = await fetch(getApiUrl(`${CONFIG.API.REVIEWS}/${reviewId}`), {
      method: 'DELETE'
    });
    const json = await response.json();

    if (!json.status) {
      throw new Error(json.msg || 'Unable to delete review');
    }

    const card = document.getElementById(`review-card-${reviewId}`);
    if (card) card.remove();
    alert('Review deleted successfully.');
  } catch (error) {
    console.error('Error deleting review:', error);
    alert('Unable to delete review. Please try again later.');
  }
}

async function approveReview(reviewId) {
  try {
    const response = await fetch(getApiUrl(`${CONFIG.API.REVIEWS}/${reviewId}`), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approved: true })
    });

    const json = await response.json();
    if (!json.status) {
      throw new Error(json.msg || 'Unable to approve review');
    }

    const card = document.getElementById(`review-card-${reviewId}`);
    if (card) {
      card.remove();
    }
    alert('Review approved and hidden from admin view.');
  } catch (error) {
    console.error('Error approving review:', error);
    alert('Unable to approve review. Please try again later.');
  }
}

async function openReviewsPopup(event) {
  if (event) event.preventDefault();
  await loadReviewsForAdmin();
  const modal = new bootstrap.Modal(document.getElementById('reviewModal'));
  modal.show();
}

window.addEventListener('DOMContentLoaded', async () => {
  const pendingCount = await loadReviewsForAdmin();
  if (pendingCount > 0) {
    const modal = new bootstrap.Modal(document.getElementById('reviewModal'));
    modal.show();
  }
});
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
    // subjects hash stores 1 (enabled) or 0 (disabled)
    let isEnabled = u.subjects[s] === 1;
    let checked = isEnabled ? "checked" : "";

    box.innerHTML += `
      <div class="subject-row">
        <span>${s}</span>

        <label class="switch">
          <input type="checkbox" ${checked} onchange="toggleSub('${s}', this.checked)">
          <span class="slider"></span>
          <span class="switch-text">${isEnabled ? "ON" : "OFF"}</span>
        </label>
      </div>
    `;
  });
}

/* TOGGLE */
function toggleSub(sub, status) {
  // Store 1 for enabled, 0 for disabled
  students[currentIndex].subjects[sub] = status ? 1 : 0;
}

/* TOGGLE DASHBOARD LOCK */
function toggleDashboardLock() {
  let status = document.getElementById("dashToggle").checked;
  students[currentIndex].dashboardLocked = status;
  document.getElementById("dashStatus").innerText = status ? "Locked" : "Unlocked";
}

/* INITIALIZE */
window.addEventListener('DOMContentLoaded', loadStudents);