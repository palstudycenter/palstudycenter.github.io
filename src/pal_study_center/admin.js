let students = [];
let currentIndex = null;

async function loadStudents() {
  try {
    const response = await fetch(getApiUrl(CONFIG.API.GET_STUDENTS));
    const json = await response.json();
    if (json.status && Array.isArray(json.res)) {
      students = json.res.filter(s => s && s.usertype === 'student');
      displayStudents();
    }
  } catch (error) { console.error(error); }
}
function displayStudents() {
  let list = document.getElementById("studentList");
  if(!list) return;
  list.innerHTML = "";
  let board = document.getElementById("filterBoard")?.value || "";
  let cls = document.getElementById("filterClass")?.value || "";
  students.forEach((u, i) => {
    let okClass = cls === "" || u.class === cls;
    let okBoard = board === "" || u.board === board;
    if (okClass && okBoard) {
      list.innerHTML += `<div class="student-card" onclick="openProfile(${i})"><b>${u.name}</b><br><small>${u.class} ${u.board ? '| ' + u.board : ''}</small></div>`;
    }
  });
}
function filterStudents() { displayStudents(); }
function escapeHtml(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function openProfile(i) {
  currentIndex = i;
  let u = students[i];
  localStorage.setItem("viewingStudent", JSON.stringify(u));
  localStorage.setItem("viewingStudentIndex", i);
  window.location.href = "profile.html";
}
window.addEventListener('DOMContentLoaded', loadStudents);

/* ====== REVIEW ADMIN - FIXED ====== */
function parseReviewAdmin(review){
  let text = review.review_text || '';
  let percent = review.percentage || '';
  let batch = review.batch_year || review.batch || '';
  if(text.includes('@@')){
    const m = text.match(/@@([^@]+)@@/);
    if(m){
      const parts = m[1].split('|');
      if(!percent) percent = parts[0] || '';
      if(!batch) batch = parts[1] || '';
    }
    text = text.replace(/@@[^@]+@@/g,'').trim();
  }
  return {cleanText: text, percent, batch};
}
function createStars(rating) {
  const count = Number(rating) || 0;
  return '★'.repeat(Math.min(Math.max(count, 0), 5)) + '☆'.repeat(Math.max(5 - count, 0));
}
function renderReviewCard(review) {
  const {cleanText, percent, batch} = parseReviewAdmin(review);
  return `
    <div class="card mb-3 review-admin-card" id="review-card-${review.id}">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <div>
            <h5 class="mb-1">${escapeHtml(review.student_name)} <small class="text-muted">${escapeHtml(review.board)} | ${escapeHtml(review.class)} | ${percent? percent+'%':''} | Batch ${batch}</small></h5>
            <div class="text-muted small mb-2">Created: ${new Date(review.created_at).toLocaleString()}</div>
            <div class="mb-2"><strong>Rating:</strong> ${createStars(Number(review.rating))}</div>
            <div><span class="badge bg-warning text-dark">Status: ${review.approved? 'Approved' : 'Pending'}</span></div>
          </div>
          <div class="btn-group align-self-start">
            <button class="btn btn-sm btn-outline-primary" onclick="enableReviewEdit(${review.id})">Edit</button>
            <button class="btn btn-sm btn-outline-success" onclick="approveReview(${review.id})">Approve</button>
            <button class="btn btn-sm btn-outline-danger" onclick="unapproveReview(${review.id})">Delete</button>
          </div>
        </div>
        <div class="mt-3">
          <label class="form-label mb-1">Review Text</label>
          <p class="border rounded-2 p-3" id="review-text-${review.id}">${escapeHtml(cleanText)}</p>
          <textarea class="form-control d-none" id="review-edit-${review.id}" rows="4">${escapeHtml(cleanText)}</textarea>
          <div class="row g-2 mt-2 d-none" id="review-extra-${review.id}">
            <div class="col-6"><input type="text" id="review-percent-${review.id}" class="form-control" value="${escapeHtml(percent)}" placeholder="Percentage"></div>
            <div class="col-6"><input type="text" id="review-batch-${review.id}" class="form-control" value="${escapeHtml(batch)}" placeholder="Batch Year"></div>
          </div>
        </div>
        <div class="mt-2" id="review-actions-${review.id}"></div>
      </div>
    </div>`;
}
async function loadReviewsForAdmin() {
  const content = document.getElementById('reviewModalContent');
  if (!content) return 0;
  content.innerHTML = '<div class="text-center py-4">Loading reviews...</div>';
  try {
    const response = await fetch(getApiUrl(`${CONFIG.API.REVIEWS}?approved=0`));
    const json = await response.json();
    const reviews = json.res || [];
    if (reviews.length === 0) {
      content.innerHTML = '<div class="text-center py-4 text-muted">No pending reviews found.</div>';
      return 0;
    }
    content.innerHTML = reviews.map(renderReviewCard).join('');
    return reviews.length;
  } catch (error) {
    content.innerHTML = '<div class="text-danger py-4">Unable to load reviews.</div>';
    return 0;
  }
}
function enableReviewEdit(reviewId) {
  document.getElementById(`review-text-${reviewId}`).classList.add('d-none');
  document.getElementById(`review-edit-${reviewId}`).classList.remove('d-none');
  document.getElementById(`review-extra-${reviewId}`).classList.remove('d-none');
  document.getElementById(`review-actions-${reviewId}`).innerHTML = `<button class="btn btn-sm btn-success me-2" onclick="saveReviewEdit(${reviewId})">Save</button><button class="btn btn-sm btn-secondary" onclick="cancelReviewEdit(${reviewId})">Cancel</button>`;
}
function cancelReviewEdit(reviewId) {
  document.getElementById(`review-text-${reviewId}`).classList.remove('d-none');
  document.getElementById(`review-edit-${reviewId}`).classList.add('d-none');
  document.getElementById(`review-extra-${reviewId}`).classList.add('d-none');
  document.getElementById(`review-actions-${reviewId}`).innerHTML = '';
}
async function saveReviewEdit(reviewId) {
  const review_text = document.getElementById(`review-edit-${reviewId}`).value.trim();
  const percentage = document.getElementById(`review-percent-${reviewId}`).value.trim();
  const batch_year = document.getElementById(`review-batch-${reviewId}`).value.trim();
  if (!review_text) return alert('Review text cannot be empty.');
  try {
    const res = await fetch(getApiUrl(`${CONFIG.API.REVIEWS}/${reviewId}`), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ review_text, percentage, batch_year })
    });
    const json = await res.json();
    if (!json.status) throw new Error();
    document.getElementById(`review-text-${reviewId}`).textContent = review_text;
    cancelReviewEdit(reviewId);
    alert('Review updated!');
  } catch (e) { alert('Update failed'); }
}
async function unapproveReview(reviewId) {
  if (!confirm('Delete this review?')) return;
  try {
    const res = await fetch(getApiUrl(`${CONFIG.API.REVIEWS}/${reviewId}`), { method: 'DELETE' });
    const json = await res.json();
    if (json.status) document.getElementById(`review-card-${reviewId}`).remove();
  } catch (e) { alert('Delete failed'); }
}
async function approveReview(reviewId) {
  try {
    const editEl = document.getElementById(`review-edit-${reviewId}`);
    const review_text = editEl && !editEl.classList.contains('d-none') ? editEl.value.trim() : document.getElementById(`review-text-${reviewId}`).textContent.trim();
    const percentage = document.getElementById(`review-percent-${reviewId}`)?.value.trim() || '';
    const batch_year = document.getElementById(`review-batch-${reviewId}`)?.value.trim() || '';
    await fetch(getApiUrl(`${CONFIG.API.REVIEWS}/${reviewId}`), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ review_text: review_text.replace(/@@[^@]+@@/g,'').trim(), percentage, batch_year, approved: true, is_approved: 1 })
    });
    document.getElementById(`review-card-${reviewId}`).remove();
    alert('Review Approved!');
  } catch (e) { alert('Approve failed'); }
}
async function openReviewsPopup(event) {
  if (event) event.preventDefault();
  await loadReviewsForAdmin();
  const modal = new bootstrap.Modal(document.getElementById('reviewModal'));
  modal.show();
}


let TC = localStorage.getItem('tc')||5; let TM = JSON.parse(localStorage.getItem('tm')||'{}');
function showTests(){
 let fBoard=document.getElementById("filterBoard").value; let fClass=document.getElementById("filterClass").value;
 let list=students.filter(s=>(!fClass||s.class==fClass)&&(!fBoard||s.board==fBoard));
 let h='<th>#</th><th>Name</th><th style="background:#0d6efd;color:#fff;">% </th><th style="background:orange;color:#fff;">Latest</th>';
 for(let i=1;i<=TC;i++) h+=`<th>T${i}</th>`; document.getElementById('th').innerHTML=h;
 let rows=list.map(s=>{
  let m=TM[s.id]||{}; let tot=0,c=0,lat='-'; let ln='';
  for(let k=1;k<=TC;k++){ if(m[k]!=''&&m[k]!=null){tot+=+m[k];c++;lat=m[k];ln='T'+k;} }
  return {...s, per:c?tot/(c*20)*100:0, lat, ln, m};
 }).sort((a,b)=>b.per-a.per);
 let b=''; rows.forEach((r,i)=>{
  b+=`<tr><td>${i+1}</td><td>${r.name}</td><td style="background:#e7f0ff;font-weight:700;">${r.per.toFixed(1)}%</td><td style="background:#fff8e1;font-weight:700;">${r.lat}</td>`;
  for(let k=1;k<=TC;k++) b+=`<td><input value="${r.m[k]||''}" onchange="saveT('${r.id}',${k},this.value)" style="width:55px;text-align:center;"></td>`;
  b+='</tr>';
 }); document.getElementById('tb').innerHTML=b;
}
function saveT(id,t,v){ if(!TM[id]) TM[id]={}; TM[id][t]=v; localStorage.setItem('tm',JSON.stringify(TM)); showTests(); }
function addTest(){ TC++; localStorage.setItem('tc',TC); showTests(); }
let oldD=displayStudents; displayStudents=function(){ oldD(); showTests(); }