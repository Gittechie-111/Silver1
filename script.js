// --- Lightbox Elements ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDesc = document.getElementById('lightbox-desc');
const closeBtn = document.querySelector('.close');

// --- Open lightbox on clicking any food-item or gallery-item ---
document.querySelectorAll('.food-item, .gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    // Get background-image URL
    let bgImage = item.style.backgroundImage;
    if (!bgImage) return;
    // Extract URL from background-image: url("...")
    const imageUrl = bgImage.slice(5, -2);
    lightboxImg.src = imageUrl;

    // For food-item, show title and desc; for gallery-item, set generic title
    if (item.classList.contains('food-item')) {
      lightboxTitle.textContent = item.dataset.title || '';
      lightboxDesc.textContent = item.dataset.desc || '';
    } else {
      lightboxTitle.textContent = 'Hotel Image';
      lightboxDesc.textContent = '';
    }

    lightbox.classList.add('active');
  });
});

// --- Close lightbox handlers ---
closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('active');
  lightboxImg.src = '';
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
  }
});

// --- Escape key to close lightbox ---
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
  }
});

// --- Booking Form Submission ---
document.getElementById('booking-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = {
    name: this.name.value.trim(),
    email: this.email.value.trim(),
    checkin: this.checkin.value,
    checkout: this.checkout.value,
    roomType: this.roomType.value
  };

  if (new Date(formData.checkout) <= new Date(formData.checkin)) {
    showMessage('booking-message', '❌ Check-out date must be after check-in date.', true);
    return;
  }

  const checkinDate = new Date(formData.checkin);
  const checkoutDate = new Date(formData.checkout);

  const formattedCheckin = checkinDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  const formattedCheckout = checkoutDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  showMessage('booking-message', `✅ Thank you, ${formData.name}! Your ${formData.roomType} room is booked from ${formattedCheckin} to ${formattedCheckout}.`);
  this.reset();
});

// --- Food Order Form Submission ---
document.getElementById('food-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = {
    name: this.name.value.trim(),
    roomNumber: this.roomNumber.value.trim(),
    foodItems: Array.from(this.foodItems.selectedOptions).map(opt => opt.text)
  };

  if (formData.foodItems.length === 0) {
    showMessage('food-message', '❌ Please select at least one food item.', true);
    return;
  }

  if (!formData.roomNumber) {
    showMessage('food-message', '❌ Please enter a valid room number.', true);
    return;
  }

  showMessage('food-message', `✅ Thank you, ${formData.name}! Order for room ${formData.roomNumber} confirmed: ${formData.foodItems.join(', ')}.`);
  this.reset();
});

// --- Utility to show messages ---
function showMessage(id, msg, isError = false) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.style.color = isError ? '#e74c3c' : '#27ae60';
  el.style.fontWeight = '600';
  setTimeout(() => el.textContent = '', 5000);
}

// --- Intersection Observer for fade-in animations ---
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));