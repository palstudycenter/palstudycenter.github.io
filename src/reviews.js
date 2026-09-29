const reviewGrid = document.getElementById('reviewGrid');
const reviewForm = document.getElementById('reviewForm');
const addReviewModal = new bootstrap.Modal(document.getElementById('addReviewModal'));

function openAddReviewModal(e){ if(e) e.preventDefault(); reviewForm.reset(); addReviewModal.show(); }
function createStars(r){ return '★'.repeat(Number(r)||5) + '☆'.repeat(5-(Number(r)||5)); }
function escapeHtml(t){ return String(t||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }

// Local backup
const LOCAL_KEY = 'pal_local_reviews';
function getLocalReviews(){ try{ return JSON.parse(localStorage.getItem(LOCAL_KEY)||'[]'); }catch{return [];} }
function saveLocalReview(o){ const a=getLocalReviews(); a.unshift(o); localStorage.setItem(LOCAL_KEY, JSON.stringify(a)); }

function parseExtra(review){
  let percent = review.percentage || review.percent || review.marks || '';
  let batch = review.batch_year || review.batch || review.year || '';

  // अगर API ने review_text में @@94.2|2026@@ के रूप में भेजा है तो
  if(review.review_text && review.review_text.includes('@@')){
    const m = review.review_text.match(/@@([^@]+)@@/);
    if(m){
      const parts = m[1].split('|');
      if(!percent) percent = parts[0] || '';
      if(!batch) batch = parts[1] || '';
    }
  }
  let cleanText = (review.review_text||'').replace(/@@[^@]+@@/g,'').trim();
  return {percent, batch, cleanText};
}

function renderReviews(list){
  reviewGrid.innerHTML = '';
  if(!list.length){
    reviewGrid.innerHTML = `<div class="col-12 text-center py-5 text-muted">No reviews yet.</div>`;
    return;
  }
  list.forEach(review=>{
    const {percent, batch, cleanText} = parseExtra(review);
    let boardText = review.board || '';
    if(boardText.toLowerCase().includes('hindi')) boardText = 'Hindi Medium';
    else if(boardText.toLowerCase().includes('english')) boardText = 'English Medium';

    reviewGrid.innerHTML += `
      <div class="col-md-6 col-lg-4">
        <div class="review-card">
          <div class="review-top">
            <div class="review-badges">
              ${percent? `<span class="badge badge-percent">${escapeHtml(percent)}%</span>` : `<span class="badge badge-percent">N/A%</span>`}
              ${batch? `<span class="badge badge-batch">Batch ${escapeHtml(batch)}</span>` : ''}
              <span class="badge badge-class">${escapeHtml(review.class)}</span>
              <span class="badge badge-medium">${escapeHtml(boardText)}</span>
            </div>
            <h2 class="student-name">${escapeHtml(review.student_name)}</h2>
          </div>
          <p class="review-text">"${escapeHtml(cleanText)}"</p>
          <div class="stars">${createStars(review.rating)}</div>
        </div>
      </div>`;
  });
}

async function loadReviews(){
  try{
    const res = await fetch(getApiUrl(CONFIG.API.REVIEWS));
    const data = await res.json();
    const apiReviews = (data.res && Array.isArray(data.res))? data.res : [];
    const localReviews = getLocalReviews();
    renderReviews([...localReviews,...apiReviews]);
  }catch(e){
    console.error(e);
    renderReviews(getLocalReviews());
  }
}

async function submitReview(e){
  e.preventDefault();
  const student_name = document.getElementById('reviewStudentName').value.trim();
  const percentage = document.getElementById('reviewPercentage').value.trim();
  const batch_year = document.getElementById('reviewBatch').value;
  const reviewClass = document.getElementById('reviewClass').value;
  const board = document.getElementById('reviewBoard').value;
  const review_text = document.getElementById('reviewText').value.trim();
  const rating = document.getElementById('reviewRating').value;

  if(!student_name ||!percentage ||!batch_year ||!reviewClass ||!board ||!review_text ||!rating){
    return alert('Please fill all fields');
  }

  const hiddenText = '@@'+percentage+'|'+batch_year+'@@ '+review_text;
  const newObj = { student_name, percentage, batch_year, class: reviewClass, board, review_text: hiddenText, rating };

  try{
    await fetch(getApiUrl(CONFIG.API.REVIEWS), {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        student_name,
        percentage: percentage,
        batch_year: batch_year,
        class: reviewClass,
        board,
        review_text: hiddenText,
        rating: Number(rating)
      })
    });
  }catch(err){ console.log('API save failed, using local'); }

  saveLocalReview(newObj);
  addReviewModal.hide();
  await loadReviews();
  alert('Review Added! Percentage और Batch अब कार्ड पर दिखेगा।');
}

reviewForm.addEventListener('submit', submitReview);
window.addEventListener('DOMContentLoaded', loadReviews);