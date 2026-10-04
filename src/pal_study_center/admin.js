let students = [];
let currentIndex = null;
let studentMode = localStorage.getItem('pal_student_mode') || 'active';
let inactiveIds = JSON.parse(localStorage.getItem('pal_inactive_ids') || '[]').map(String);
let TC = parseInt(localStorage.getItem('tc')||'100',10);
let TM = JSON.parse(localStorage.getItem('tm')||'{}');
let pendingTestRecords = {};

function dedupeStudentsById(list = []) {
  const map = new Map();
  list.forEach((student) => {
    if (!student || !student.id && !student.student_id) return;
    const sid = String(student.id ?? student.student_id ?? '');
    if (!sid) return;
    if (!map.has(sid)) {
      map.set(sid, student);
    }
  });
  return Array.from(map.values());
}

async function loadStudents() {
  try {
    const response = await fetch(getApiUrl(CONFIG.API.GET_STUDENTS));
    const json = await response.json();
    if (json.status && Array.isArray(json.res)) {
      students = dedupeStudentsById(json.res.filter(s => s && s.usertype === 'student'));
      localStorage.setItem('pal_students_list_cache', JSON.stringify(students));
      await loadTestRecordsFromBackend();
      renderAll();
    }
  } catch (e) { console.error(e); students = dedupeStudentsById(JSON.parse(localStorage.getItem('pal_students_list_cache')||'[]')); renderAll(); }
}

function normalizeTestMap(rawTests = {}) {
  const map = {};
  Object.entries(rawTests || {}).forEach(([key, value]) => {
    const label = String(key || '').trim();
    let numKey = Number(label);

    if (Number.isNaN(numKey) && /^T\d+$/i.test(label)) {
      numKey = Number(label.replace(/^T/i, ''));
    }

    const cleanValue = Number(value);
    if (!Number.isNaN(numKey) && !Number.isNaN(cleanValue)) {
      map[numKey] = cleanValue;
    }
  });
  return map;
}

async function loadTestRecordsFromBackend() {
  try {
    const response = await fetch(getApiUrl(CONFIG.API.TEST_RECORDS));
    const json = await response.json();
    if (!json.status || !Array.isArray(json.res)) return;

    const loadedTm = {};
    let maxTest = 0;

    json.res.forEach((student) => {
      const sid = String(student.id || student.student_id || '');
      const tests = student.tests || student.test_records || {};
      const byTest = normalizeTestMap(tests);

      if (Object.keys(byTest).length) {
        loadedTm[sid] = byTest;
        Object.keys(byTest).forEach((key) => {
          const n = Number(key);
          if (!Number.isNaN(n) && n > maxTest) maxTest = n;
        });
      }

      if (student.name && !loadedTm[student.name] && Object.keys(byTest).length) {
        loadedTm[student.name] = { ...byTest };
      }
    });

    TM = loadedTm;
    if (maxTest > 0) TC = maxTest;
    localStorage.setItem('tm', JSON.stringify(TM));
    localStorage.setItem('tc', String(TC));
  } catch (e) {
    console.error('Failed to load test records from backend', e);
  }
}

function setStudentFilterMode(mode){
  studentMode = mode;
  localStorage.setItem('pal_student_mode', mode);
  document.getElementById('modeLabel').innerText = 'Mode: ' + mode.toUpperCase();
  renderAll();
}
function toggleStudentActive(id){
  id = String(id);
  if(inactiveIds.includes(id)){ inactiveIds = inactiveIds.filter(x=>x!=id); }
  else { if(!confirm('इस Student को Inactive करना है?')) return; inactiveIds.push(id); }
  localStorage.setItem('pal_inactive_ids', JSON.stringify(inactiveIds));
  renderAll();
}
function renderAll(){ displayStudents(); showTests(); }
function displayStudents() {
  let list = document.getElementById("studentList");
  if(!list) return;
  list.innerHTML = "";
  let board = document.getElementById("filterBoard")?.value || "";
  let cls = document.getElementById("filterClass")?.value || "";
  students.forEach((u, i) => {
    let isInactive = inactiveIds.includes(String(u.id));
    if(studentMode==='active' && isInactive) return;
    if(studentMode==='inactive' &&!isInactive) return;
    if (cls && u.class!== cls) return;
    if (board && u.board!== board) return;
    list.innerHTML += `
      <div class="student-card" style="${isInactive?'background:#ffe0e0;border:1px dashed red;':''}">
        <div onclick="openProfile(${i})" style="cursor:pointer;flex:1;">
          <b>${u.name} ${isInactive?'<span style="color:red;font-size:11px;">(Inactive)</span>':''}</b><br>
          <small>${u.class} ${u.board? '| ' + u.board : ''}</small>
        </div>
        <button class="btn btn-sm ${isInactive?'btn-success':'btn-outline-danger'}" onclick="toggleStudentActive('${u.id}')">
          ${isInactive?'Active करो':'Inactive करो'}
        </button>
      </div>`;
  });
  if(list.innerHTML===""){
    list.innerHTML = `<div class="text-center text-muted py-3">कोई Student नहीं - Mode: ${studentMode}</div>`;
  }
}
function filterStudents() { renderAll(); }
function escapeHtml(text) { return String(text).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
function openProfile(i) {
  localStorage.setItem("viewingStudent", JSON.stringify(students[i]));
  window.location.href = "profile.html";
}
window.addEventListener('DOMContentLoaded', loadStudents);

function parseReviewAdmin(review){ let text=review.review_text||''; let percent=review.percentage||''; let batch=review.batch_year||review.batch||''; if(text.includes('@@')){ const m=text.match(/@@([^@]+)@@/); if(m){ const parts=m[1].split('|'); if(!percent) percent=parts[0]||''; if(!batch) batch=parts[1]||''; } text=text.replace(/@@[^@]+@@/g,'').trim(); } return {cleanText:text,percent,batch}; }
function createStars(rating){ const count=Math.min(Math.max(Number(rating)||0,0),5); return '★'.repeat(count)+'☆'.repeat(5-count); }
function renderReviewCard(review){ const {cleanText,percent,batch}=parseReviewAdmin(review); return `<div class="card mb-3" id="review-card-${review.id}"><div class="card-body"><div class="d-flex justify-content-between"><div><h5>${escapeHtml(review.student_name)} <small class="text-muted">${escapeHtml(review.board)} | ${escapeHtml(review.class)} | ${percent? percent+'%':''} | Batch ${batch}</small></h5><div class="mb-2"><strong>Rating:</strong> ${createStars(Number(review.rating))}</div></div><div class="btn-group"><button class="btn btn-sm btn-outline-primary" onclick="enableReviewEdit(${review.id})">Edit</button><button class="btn btn-sm btn-outline-success" onclick="approveReview(${review.id})">Approve</button><button class="btn btn-sm btn-outline-danger" onclick="unapproveReview(${review.id})">Delete</button></div></div><p id="review-text-${review.id}" class="border p-3 rounded">${escapeHtml(cleanText)}</p><textarea class="form-control d-none" id="review-edit-${review.id}" rows="3">${escapeHtml(cleanText)}</textarea><div class="row g-2 mt-2 d-none" id="review-extra-${review.id}"><div class="col-6"><input id="review-percent-${review.id}" class="form-control" value="${escapeHtml(percent)}"></div><div class="col-6"><input id="review-batch-${review.id}" class="form-control" value="${escapeHtml(batch)}"></div></div><div id="review-actions-${review.id}"></div></div></div>`; }
async function loadReviewsForAdmin(){ const c=document.getElementById('reviewModalContent'); if(!c) return 0; c.innerHTML='Loading...'; try{ const r=await fetch(getApiUrl(`${CONFIG.API.REVIEWS}?approved=0`)); const j=await r.json(); const reviews=j.res||[]; if(!reviews.length){c.innerHTML='No pending reviews'; return 0;} c.innerHTML=reviews.map(renderReviewCard).join(''); return reviews.length; }catch(e){ c.innerHTML='Unable to load'; return 0; } }
function enableReviewEdit(id){ document.getElementById(`review-text-${id}`).classList.add('d-none'); document.getElementById(`review-edit-${id}`).classList.remove('d-none'); document.getElementById(`review-extra-${id}`).classList.remove('d-none'); document.getElementById(`review-actions-${id}`).innerHTML=`<button class="btn btn-sm btn-success me-2" onclick="saveReviewEdit(${id})">Save</button><button class="btn btn-sm btn-secondary" onclick="cancelReviewEdit(${id})">Cancel</button>`; }
function cancelReviewEdit(id){ document.getElementById(`review-text-${id}`).classList.remove('d-none'); document.getElementById(`review-edit-${id}`).classList.add('d-none'); document.getElementById(`review-extra-${id}`).classList.add('d-none'); document.getElementById(`review-actions-${id}`).innerHTML=''; }
async function saveReviewEdit(id){ const t=document.getElementById(`review-edit-${id}`).value.trim(); const p=document.getElementById(`review-percent-${id}`).value.trim(); const b=document.getElementById(`review-batch-${id}`).value.trim(); if(!t) return alert('Empty'); await fetch(getApiUrl(`${CONFIG.API.REVIEWS}/${id}`),{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({review_text:t,percentage:p,batch_year:b})}); document.getElementById(`review-text-${id}`).textContent=t; cancelReviewEdit(id); alert('Updated'); }
async function unapproveReview(id){ if(!confirm('Delete?')) return; const r=await fetch(getApiUrl(`${CONFIG.API.REVIEWS}/${id}`),{method:'DELETE'}); const j=await r.json(); if(j.status) document.getElementById(`review-card-${id}`).remove(); }
async function approveReview(id){ const el=document.getElementById(`review-edit-${id}`); const txt=el&&!el.classList.contains('d-none')?el.value.trim():document.getElementById(`review-text-${id}`).textContent.trim(); const p=document.getElementById(`review-percent-${id}`)?.value.trim()||''; const b=document.getElementById(`review-batch-${id}`)?.value.trim()||''; await fetch(getApiUrl(`${CONFIG.API.REVIEWS}/${id}`),{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({review_text:txt.replace(/@@[^@]+@@/g,'').trim(),percentage:p,batch_year:b,approved:true,is_approved:1})}); document.getElementById(`review-card-${id}`).remove(); alert('Approved'); }
async function openReviewsPopup(e){ if(e) e.preventDefault(); await loadReviewsForAdmin(); new bootstrap.Modal(document.getElementById('reviewModal')).show(); }

/* TEST RECORDS FIX - RANK */
function showTests(){
 let fBoard=document.getElementById("filterBoard")?.value||"";
 let fClass=document.getElementById("filterClass")?.value||"";
 let uniqueStudents = dedupeStudentsById(students);
 let list=uniqueStudents.filter(s=>{
   let isI=inactiveIds.includes(String(s.id));
   if(studentMode==='active' && isI) return false;
   if(studentMode==='inactive' &&!isI) return false;
   return (!fClass|| (s.class||'').trim()==fClass.trim())&&(!fBoard|| (s.board||'').trim()==fBoard.trim());
 });
 if(!TC || TC<100) TC=100;
 let h=`<th style="position:sticky;left:0;top:0;background:#212529;min-width:40px;z-index:10;">#</th>
        <th style="position:sticky;left:40px;top:0;background:#212529;min-width:120px;z-index:10;text-align:left;border-right:2px solid #000;">Name</th>
        <th style="min-width:70px;top:0;background:#212529;">औसत %</th>
        <th style="min-width:70px;top:0;background:#212529;">Latest</th>`;
 for(let i=1;i<=TC;i++) h+=`<th style="min-width:65px;top:0;background:#212529;">T${i}</th>`;
 document.getElementById('th').innerHTML=h;
 let rows=list.map(s=>{
   let sid=String(s.id);
   let m = normalizeTestMap(TM[sid] || TM[s.name] || {});
   let tot=0,c=0,lat='-';
   for(let k=1;k<=TC;k++){ let v = m[k]; if(v!=='' && v!=null &&!isNaN(v)){tot+=parseInt(v);c++;lat=v;} }
   return {...s, _sid:sid, per:c?tot/(c*20)*100:0, lat, m};
 }).sort((a,b)=>b.per-a.per);
 let b='';
 rows.forEach((r,i)=>{
   b+=`<tr><td style="position:sticky;left:0;background:#fff;z-index:2;">${i+1}</td><td style="position:sticky;left:40px;background:#fff;z-index:2;text-align:left;font-weight:600;border-right:2px solid #000;">${r.name}</td><td style="background:#e7f0ff;font-weight:700;">${r.per.toFixed(1)}%</td><td style="background:#fff8e1;">${r.lat!=='-'?r.lat:''}</td>`;
   for(let k=1;k<=TC;k++){ let val = r.m[k] ?? ''; b+=`<td><input type="number" value="${val}" oninput="queueTestValue('${r._sid}','${r.name}',${k},this.value)" style="width:50px;text-align:center;border:1px solid #ddd;border-radius:5px;padding:3px;"></td>`; }
   b+='</tr>';
 });
 document.getElementById('tb').innerHTML=b;
}

function queueTestValue(id, name, t, v){
  id = String(id);
  const numericValue = (v === '' || v === null || v === undefined) ? null : Number(v);
  if (numericValue === null || Number.isNaN(numericValue)) return;

  if(!TM[id]) TM[id]={};
  TM[id][Number(t)] = numericValue;

  if(name){
    if(!TM[name]) TM[name]={};
    TM[name][Number(t)] = numericValue;
  }

  if (!pendingTestRecords[id]) pendingTestRecords[id] = {};
  pendingTestRecords[id][Number(t)] = numericValue;

  localStorage.setItem('tm', JSON.stringify(TM));
  localStorage.setItem('tc', String(TC));
  localStorage.setItem('pal_students_list_cache', JSON.stringify(students));
}

async function submitPendingTestRecords(){
  const entries = Object.entries(pendingTestRecords);
  if (!entries.length) {
    alert('Submit करने के लिए कोई नया Test Record नहीं है।');
    return;
  }

  let submitted = 0;
  for (const [studentId, records] of entries) {
    for (const [testNumber, marks] of Object.entries(records)) {
      const payload = {
        student_id: Number(studentId),
        test_name: `T${Number(testNumber)}`,
        marks: Number(marks)
      };

      try {
        const response = await fetch(getApiUrl(CONFIG.API.TEST_RECORDS), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const json = await response.json();
        if (json.status) {
          submitted++;
        } else {
          console.error('Test record save failed:', json);
        }
      } catch (e) {
        console.error('Failed to save test record to backend:', e);
      }
    }
  }

  pendingTestRecords = {};
  if (submitted > 0) {
    await loadTestRecordsFromBackend();
    renderAll();
    alert(`${submitted} Test Record submitted successfully.`);
  } else {
    alert('No record was submitted successfully.');
  }
}

function addTest(){
  TC++;
  localStorage.setItem('tc', TC);
  showTests();
}


/* ====== NOTICE ADMIN - MISSING PART ====== */
async function openNoticesPopup(event){
  if(event) event.preventDefault();
  await loadNoticesForAdmin();
  const modal = new bootstrap.Modal(document.getElementById('noticeModal'));
  modal.show();
}

async function loadNoticesForAdmin(){
  const content = document.getElementById('noticeModalContent');
  if(!content) return;
  content.innerHTML = '<div class="text-center py-4">Loading notices...</div>';
  try{
    const res = await fetch(getApiUrl(CONFIG.API.NOTICES));
    const json = await res.json();
    const notices = json.res || json.data || [];
    if(notices.length === 0){
      content.innerHTML = '<div class="text-center py-4 text-muted">No notices found.</div>';
      return;
    }
    content.innerHTML = notices.map(n => `
      <div class="card mb-2" id="notice-card-${n.id}">
        <div class="card-body d-flex justify-content-between">
          <div>
            <p class="mb-1">${escapeHtml(n.message || n.notice || '')}</p>
            <small class="text-muted">${n.board||'All'} | ${n.class||'All'} | ${new Date(n.created_at).toLocaleString()}</small>
          </div>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteNotice(${n.id})">Delete</button>
        </div>
      </div>
    `).join('');
  }catch(e){
    content.innerHTML = '<div class="text-danger py-4">Unable to load notices.</div>';
  }
}

async function publishNotice(){
  const msgEl = document.getElementById('noticeMessage');
  const board = document.getElementById('filterBoard')?.value || '';
  const cls = document.getElementById('filterClass')?.value || '';
  const message = msgEl.value.trim();
  if(!message) return alert('कृपया Notice लिखें');
  
  try{
    const res = await fetch(getApiUrl(CONFIG.API.NOTICES),{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ message, board, class: cls })
    });
    const json = await res.json();
    if(json.status){
      alert('Notice Published!');
      msgEl.value = '';
    }else{
      alert('Failed to publish');
    }
  }catch(e){ alert('Error: '+e.message); }
}

async function deleteNotice(id){
  if(!confirm('Delete this notice?')) return;
  try{
    const res = await fetch(getApiUrl(`${CONFIG.API.NOTICES}/${id}`),{method:'DELETE'});
    const json = await res.json();
    if(json.status) document.getElementById(`notice-card-${id}`)?.remove();
  }catch(e){ alert('Delete failed'); }
}