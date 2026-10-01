const reviewGrid = document.getElementById('reviewGrid');
const reviewForm = document.getElementById('reviewForm');
const addReviewModal = new bootstrap.Modal(document.getElementById('addReviewModal'));

function openAddReviewModal(e){ 
  if(e) e.preventDefault(); 
  reviewForm.reset(); 
  addReviewModal.show(); 
}

function createStars(r){ 
  return '★'.repeat(Number(r)||5) + '☆'.repeat(5-(Number(r)||5)); 
}

function escapeHtml(t){ 
  return String(t||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); 
}

function renderReviews(list){
  reviewGrid.innerHTML = '';
  if(!list.length){
    reviewGrid.innerHTML = `<div class="col-12 text-center py-5 text-muted">No reviews yet.</div>`;
    return;
  }
  list.forEach(review=>{
    let perc = review.percentage || review.percent || '';
    let year = review.batch_year || review.year || review.batch || review.session_year || '';
    let rClass = review['class'] || review.class_name || review.className || '';
    
    let boardText = review.board || '';
    if(boardText.toLowerCase().includes('hindi')) boardText = 'Hindi Medium';
    else if(boardText.toLowerCase().includes('english')) boardText = 'English Medium';

    reviewGrid.innerHTML += `
      <div class="col-md-6 col-lg-4">
        <div class="review-card">
          <div class="review-top">
            <div class="review-badges">
              ${perc ? `<span class="badge badge-percent">${escapeHtml(perc)}%</span>` : ''}
              ${year ? `<span class="badge badge-batch">Batch ${escapeHtml(year)}</span>` : ''}
              ${rClass ? `<span class="badge badge-class">${escapeHtml(rClass)}</span>` : ''}
              ${boardText ? `<span class="badge badge-medium">${escapeHtml(boardText)}</span>` : ''}
            </div>
            <h2 class="student-name">${escapeHtml(review.student_name)}</h2>
          </div>
          <p class="review-text">"${escapeHtml(review.review_text)}"</p>
          <div class="stars">${createStars(review.rating)}</div>
        </div>
      </div>`;
  });
}

async function loadReviews(){
  try{
    const res = await fetch(getApiUrl(CONFIG.API.REVIEWS));
    const data = await res.json();
    const apiReviews = (data.res && Array.isArray(data.res)) ? data.res : (Array.isArray(data) ? data : []);
    const approved = apiReviews.filter(r => r.approved == 1 || r.is_approved == 1 || r.status == 'approved');
    renderReviews(approved);
  }catch(e){ 
    console.error(e);
    renderReviews([]); 
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

  if(!student_name || !percentage || !batch_year || !reviewClass || !board || !review_text || !rating){
    return alert('Please fill all fields');
  }

  try{
    await fetch(getApiUrl(CONFIG.API.REVIEWS), {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ 
        student_name, 
        percentage, 
        batch_year, 
        class: reviewClass, 
        board, 
        review_text, 
        rating: Number(rating), 
        is_approved: 0, 
        approved: 0 
      })
    });
    addReviewModal.hide();
    alert('Review Submitted! Admin approval के बाद दिखेगा।');
  }catch(err){ 
    alert('Server error'); 
  }
}

if(reviewForm){
  reviewForm.addEventListener('submit', submitReview);
}
window.addEventListener('DOMContentLoaded', loadReviews);