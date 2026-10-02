let students = [];
let currentIndex = null;
let studentMode = localStorage.getItem('pal_student_mode') || 'active';
let inactiveIds = JSON.parse(localStorage.getItem('pal_inactive_ids') || '[]').map(String);
let TC = parseInt(localStorage.getItem('tc')||'100',10);
let TM = JSON.parse(localStorage.getItem('tm')||'{}');

async function loadStudents() {
  try {
    const response = await fetch(getApiUrl(CONFIG.API.GET_STUDENTS));
    const json = await response.json();
    if (json.status && Array.isArray(json.res)) {
      students = json.res.filter(s => s && s.usertype === 'student');
      renderAll();
    }
  } catch (e) { console.error(e); }
}
function setStudentFilterMode(mode){
  studentMode = mode;
  localStorage.setItem('pal_student_mode', mode);
  document.getElementById('modeLabel').innerText = 'Mode: ' + mode.toUpperCase();
  renderAll();
}
function toggleStudentActive(id){
  id = String(id);
  if(inactiveIds.includes(id)){
    inactiveIds = inactiveIds.filter(x=>x!=id);
  } else {
    if(!confirm('इस Student को Inactive करना है?')) return;
    inactiveIds.push(id);
  }
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

/*... Reviews Code Same... */
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

/* TEST RECORDS FIX */
function showTests(){
 let fBoard=document.getElementById("filterBoard")?.value||"";
 let fClass=document.getElementById("filterClass")?.value||"";
 let list=students.filter(s=>{ let isI=inactiveIds.includes(String(s.id)); if(studentMode==='active' && isI) return false; if(studentMode==='inactive' && !isI) return false; return (!fClass||s.class==fClass)&&(!fBoard||s.board==fBoard); });
 
 let h=`<th style="position:sticky;left:0;background:#212529;min-width:50px;z-index:4;top:0;">#</th>
        <th style="position:sticky;left:50px;background:#212529;min-width:160px;z-index:4;text-align:left;top:0;">Name</th>
        <th style="position:sticky;left:210px;background:#212529;min-width:80px;z-index:4;top:0;">औसत %</th>
        <th style="position:sticky;left:290px;background:#212529;min-width:80px;z-index:4;top:0;border-right:3px solid #000;">Latest</th>`;
 for(let i=1;i<=TC;i++) h+=`<th style="min-width:65px;top:0;">T${i}</th>`;
 document.getElementById('th').innerHTML=h;

 let rows=list.map(s=>{ let m=TM[s.id]||{}; let tot=0,c=0,lat='-',ln=''; for(let k=1;k<=TC;k++){ if(m[k]!=''&&m[k]!=null&&m[k]!==''){tot+=+m[k];c++;lat=m[k];ln='T'+k;} } return {...s,per:c?tot/(c*20)*100:0,lat,ln,m}; }).sort((a,b)=>b.per-a.per);

 let b=''; 
 rows.forEach((r,i)=>{ 
   b+=`<tr>
   <td style="position:sticky;left:0;background:#fff;z-index:2;font-weight:700;">${i+1}</td>
   <td style="position:sticky;left:50px;background:#fff;z-index:2;text-align:left;font-weight:600;">${r.name}</td>
   <td style="position:sticky;left:210px;background:#e7f0ff;z-index:2;font-weight:700;">${r.per.toFixed(1)}%</td>
   <td style="position:sticky;left:290px;background:#fff8e1;z-index:2;border-right:3px solid #000;">${r.lat!=='-'?r.lat+'/20':''}<small style="display:block;font-size:9px;">${r.ln}</small></td>`;
   for(let k=1;k<=TC;k++) b+=`<td><input value="${r.m[k]||''}" onchange="saveT('${r.id}',${k},this.value)" style="width:55px;text-align:center;border:1px solid #ddd;border-radius:6px;padding:3px;"></td>`;
   b+='</tr>'; 
 });
 document.getElementById('tb').innerHTML=b;
}