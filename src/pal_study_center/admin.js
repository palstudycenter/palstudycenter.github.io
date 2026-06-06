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

/* OPEN PROFILE */
function openProfile(i) {
  currentIndex = i;
  let u = students[i];

  document.getElementById("profileOverlay").classList.remove("hidden");
  document.getElementById("pName").innerText = u.name;
  document.getElementById("pPhone").innerText = u.phone;
  document.getElementById("pBoard").innerText = u.board ? u.board : "Board not set";
  document.getElementById("pClass").innerText = u.class;

  document.getElementById("pImg").src =
    u.profile_link || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  renderSubjects();
}

/* CLOSE PROFILE */
function closeProfile() {
  document.getElementById("profileOverlay").classList.add("hidden");
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