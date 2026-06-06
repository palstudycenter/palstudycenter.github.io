const reviewGrid = document.getElementById('reviewGrid');
const reviewForm = document.getElementById('reviewForm');
const addReviewModalElement = document.getElementById('addReviewModal');
const addReviewModal = new bootstrap.Modal(addReviewModalElement);

function openAddReviewModal(event) {
  if (event) event.preventDefault();
  reviewForm.reset();
  addReviewModal.show();
}

function createStars(rating) {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

async function loadReviews() {
  const reviewLoading = document.getElementById('reviewLoading');
  if (reviewLoading) {
    reviewLoading.style.display = 'block';
  }

  try {
    const response = await fetch(getApiUrl(CONFIG.API.REVIEWS));
    const data = await response.json();

    if (!response.ok || !data.status || !Array.isArray(data.res)) {
      throw new Error(data.msg || 'Unable to load reviews');
    }

    const reviews = data.res;
    reviewGrid.innerHTML = '';

    if (!reviews.length) {
      reviewGrid.innerHTML = `
        <div class="col-12 text-center py-5 text-muted">
          No reviews yet. Be the first to add one.
        </div>
      `;
      return;
    }

    reviews.forEach(review => {
      reviewGrid.innerHTML += `
        <div class="col-md-4">
          <div class="review-card">
            <h2>${escapeHtml(review.student_name)}</h2>
            <p class="student-info">${escapeHtml(review.board)} | ${escapeHtml(review.class)}</p>
            <p class="review-text">${escapeHtml(review.review_text)}</p>
            <div class="stars">${createStars(Number(review.rating))}</div>
          </div>
        </div>
      `;
    });
  } catch (error) {
    console.error('Error loading reviews:', error);
    reviewGrid.innerHTML = `
      <div class="col-12 text-center py-5 text-danger">
        Unable to load reviews at this time.
      </div>
    `;
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

async function submitReview(event) {
  event.preventDefault();

  const student_name = document.getElementById('reviewStudentName').value.trim();
  const reviewClass = document.getElementById('reviewClass').value;
  const board = document.getElementById('reviewBoard').value;
  const review_text = document.getElementById('reviewText').value.trim();
  const rating = document.getElementById('reviewRating').value;

  if (!student_name || !reviewClass || !board || !review_text || !rating) {
    alert('Please fill all the fields before submitting.');
    return;
  }

  try {
    const response = await fetch(getApiUrl(CONFIG.API.REVIEWS), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        student_name,
        class: reviewClass,
        board,
        review_text,
        rating: Number(rating)
      })
    });

    const data = await response.json();
    if (!data.status) {
      throw new Error(data.msg || 'Failed to save review');
    }

    addReviewModal.hide();
    await loadReviews();
    alert('Review submitted successfully.');
  } catch (error) {
    console.error('Submit review error:', error);
    alert('Unable to save review at this time.');
  }
}

reviewForm.addEventListener('submit', submitReview);
window.addEventListener('DOMContentLoaded', loadReviews);
