// --- Booking Form Submission ---
document.getElementById('booking-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const checkin = this.checkin.value;
  const checkout = this.checkout.value;
  const roomType = this.roomType.value;

  if (new Date(checkout) <= new Date(checkin)) {
    showMessage('booking-message', 'Check-out date must be after check-in date.', true);
    return;
  }

  showMessage('booking-message', `Thank you, ${name}! Your ${roomType} room is booked from ${checkin} to ${checkout}.`);
  this.reset();
});

// --- Food Order Form Submission ---
document.getElementById('food-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = this.name.value.trim();
  const roomNumber = this.roomNumber.value;
  const foodItems = Array.from(this.foodItems.selectedOptions).map(opt => opt.value);

  if (foodItems.length === 0) {
    showMessage('food-message', 'Please select at least one food item.', true);
    return;
  }

  showMessage('food-message', `Thank you, ${name}! Your food order for room ${roomNumber} has been placed: ${foodItems.join(', ')}.`);
  this.reset();
});

// --- Utility to show messages ---
function showMessage(id, msg, isError = false) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.style.color = isError ? '#e74c3c' : '#27ae60';
  setTimeout(() => {
    el.textContent = '';
  }, 5000);
}

// --- Food Gallery Filtering ---
const filterButtons = document.querySelectorAll('.filter-buttons button');
const foodItems = document.querySelectorAll('.food-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    foodItems.forEach(item => {
      if (filter === 'all' || item.classList.contains(filter)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// --- Lightbox Modal ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDesc = document.getElementById('lightbox-desc');
const closeBtn = document.querySelector('.close');

foodItems.forEach(item => {
  item.addEventListener('click', () => {
    const bg = item.style.backgroundImage;
    const url = bg.slice(5, -2);

    lightboxImg.src = url;
    lightboxImg.alt = item.getAttribute('data-title');
    lightboxTitle.textContent = item.getAttribute('data-title');
    lightboxDesc.textContent = item.getAttribute('data-desc');

    lightbox.style.display = 'block';
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});

// --- Smooth Fade-in Animation ---
const fadeIns = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.3 });

fadeIns.forEach(element => {
  observer.observe(element);
});

// --- Button Hover Effect (Adding a Dynamic Glow) ---
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.classList.add('glow');
  });

  button.addEventListener('mouseleave', () => {
    button.classList.remove('glow');
  });
});