const reviewGrid = document.getElementById('reviewGrid');
const reviewForm = document.getElementById('reviewForm');
const addReviewModal = new bootstrap.Modal(document.getElementById('addReviewModal'));

// Local Storage Key - ताकि बिना Backend के भी दिखे
const LOCAL_KEY = 'pal_local_reviews';

function openAddReviewModal(e){ if(e) e.preventDefault(); reviewForm.reset(); addReviewModal.show(); }
function createStars(r){ return '★'.repeat(r) + '☆'.repeat(5-r); }
function escapeHtml(t){ return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }

function getLocalReviews(){ try{ return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]'); }catch{ return []; } }
function saveLocalReview(obj){
  const arr = getLocalReviews();
  arr.unshift(obj);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(arr));
}

function renderReviews(allReviews){
  reviewGrid.innerHTML = '';
  if(!allReviews.length){
    reviewGrid.innerHTML = `<div class="col-12 text-center py-5 text-muted">No reviews yet.</div>`;
    return;
  }
  allReviews.forEach(review => {
    // Backend में % और Batch नहीं है तो हम review_text में से या local data से निकालेंगे
    let percent = review.percentage || '';
    let batch = review.batch_year || review.batch || '';

    // अगर पुराना data है (board में छुपा हुआ), तो parse कर लो
    if(!percent && review.review_text && review.review_text.includes('@@')){
        // Format: @@96%|2026@@ Real Review
        const m = review.review_text.match(/@@(.*?)@@/);
        if(m){ const parts = m[1].split('|'); percent = parts[0]||''; batch = parts[1]||''; }
    }

    let displayText = review.review_text.replace(/@@.*?@@/g,'').trim();
    let boardText = review.board || '';
    if(boardText.toLowerCase().includes('hindi')) boardText = 'Hindi Medium';
    else if(boardText.toLowerCase().includes('english')) boardText = 'English Medium';

    reviewGrid.innerHTML += `
      <div class="col-md-6 col-lg-4">
        <div class="review-card">
          <div class="review-top">
            <div class="review-badges">
              ${percent? `<span class="badge badge-percent">${escapeHtml(percent)}%</span>` : ''}
              ${batch? `<span class="badge badge-batch">Batch ${escapeHtml(batch)}</span>` : ''}
              <span class="badge badge-class">${escapeHtml(review.class)}</span>
              <span class="badge badge-medium">${escapeHtml(boardText)}</span>
            </div>
            <h2 class="student-name">${escapeHtml(review.student_name)}</h2>
          </div>
          <p class="review-text">${escapeHtml(displayText)}</p>
          <div class="stars">${createStars(Number(review.rating))}</div>
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
    // Local वाले सबसे ऊपर दिखेंगे
    renderReviews([...localReviews,...apiReviews]);
  }catch(e){
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

  if(!student_name ||!percentage ||!batch_year ||!reviewClass ||!board ||!review_text ||!rating) return alert('Please fill all fields');

  // Trick: % और Batch को review_text के अंदर छुपा कर भेजेंगे ताकि Backend बिना change के भी save कर ले
  const hiddenText = `@@${percentage}|${batch_year}@@ ${review_text}`;

  const localObj = { student_name, percentage, batch_year, class: reviewClass, board, review_text: hiddenText, rating };

  try{
    // Backend को भेजने की कोशिश (अगर fail भी हो तो local में तो save होगा ही)
    await fetch(getApiUrl(CONFIG.API.REVIEWS), {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ student_name, class: reviewClass, board, review_text: hiddenText, rating: Number(rating) })
    });
  }catch(err){ console.log('API fail, saving locally'); }

  saveLocalReview(localObj);
  addReviewModal.hide();
  await loadReviews();
  alert('Review Added Successfully!');
}

reviewForm.addEventListener('submit', submitReview);
window.addEventListener('DOMContentLoaded', loadReviews);