/**
 * ============================================================
 * BRIGHTSTART LANDING PAGE - MAIN SCRIPT
 * ============================================================
 * This script controls all interactive features of the BrightStart landing page.
 * It includes:
 *  - Theme toggle (light/dark mode)
 *  - Smooth transitions for theme changes
 *  - User preference persistence using localStorage
 *  - Accessibility support for better usability
 * 
 * THEME TOGGLE FUNCTIONALITY
 * ==========================
 * Handles switching between light and dark modes
 * Persists user preference in localStorage
 * Updates button icon dynamically
 */
const themeBtn = document.getElementById("themeToggle");
themeBtn.addEventListener("click", () => {
  // Toggle dark class on document element
  document.documentElement.classList.toggle("dark");
  // Determine current mode and update button
  const mode = document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
  localStorage.setItem("theme", mode);
  themeBtn.textContent = mode === "dark" ? "🌚" : "🌞";
});
// Load saved theme preference on page load
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
  themeBtn.textContent = "🌚";
}
// 🎯 Scroll to About Section
const scrollBtn = document.getElementById('scrollBtn');
scrollBtn.addEventListener('click', () => {
  document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

// 📈 Counter Animation
const counters = [
  { id: 'count1', end: 150 },
  { id: 'count2', end: 80 },
  { id: 'count3', end: 25 },
];

counters.forEach(counter => {
  let count = 0;
  const element = document.getElementById(counter.id);
  const interval = setInterval(() => {
    count++;
    element.textContent = count;
    if (count >= counter.end) clearInterval(interval);
  }, 20);
});

// 📚 Favorite Courses (LocalStorage)
const buttons = document.querySelectorAll('.course-btn');
const listContainer = document.getElementById('favoritesList');

function renderFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  listContainer.innerHTML = '';
  favorites.forEach((course, index) => {
    const div = document.createElement('div');
    div.className = 'flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-2';
    div.innerHTML = `
      <span>${course}</span>
      <button data-index="${index}" class="delete-btn text-red-500 hover:text-red-700">❌</button>
    `;
    listContainer.appendChild(div);
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = e.target.getAttribute('data-index');
      favorites.splice(idx, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      renderFavorites();
    });
  });
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const course = btn.dataset.course;
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(course)) favorites.push(course);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderFavorites();
  });
});

renderFavorites();

// 📨 Newsletter Subscription
const subscribeBtn = document.getElementById('subscribeBtn');
const alertBox = document.getElementById('alertBox');

subscribeBtn.addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  
  if (!name || !email) {
    alertBox.textContent = '❌ Please fill out all fields.';
    alertBox.className = 'mt-4 text-red-600 font-semibold';
  } else {
    alertBox.textContent = '✅ You’ve been subscribed!';
    alertBox.className = 'mt-4 text-green-600 font-semibold';
  }
});
