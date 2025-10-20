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
// 🎨 Counter Color Toggle
const colorToggle = document.getElementById("colorToggle");
const counterElements = ["count1", "count2", "count3"];
let isBlue = true;
colorToggle.addEventListener("click", () => {
  isBlue = !isBlue;
  counterElements.forEach((id) => {
    const element = document.getElementById(id);
    element.className = isBlue
      ? "text-5xl font-bold text-blue-600 mb-2"
      : "text-5xl font-bold text-green-600 mb-2";
  });
  colorToggle.textContent = isBlue ? "Switch to Green" : "Switch to Blue";
  colorToggle.className = isBlue
    ? "mb-8 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
    : "mb-8 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors";
});

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
   const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  listContainer.innerHTML = "";
  favorites.forEach((course, index) => {
    const div = document.createElement("div");
    div.className =
      "flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-2 opacity-0 transform translate-y-2 transition-all duration-300";
    div.innerHTML = `
      <span>${course}</span>
      <button data-index="${index}" class="delete-btn text-red-500 hover:text-red-700 transition-colors duration-200">❌</button>
    `;
    listContainer.appendChild(div);
    // Trigger animation after DOM insertion
    setTimeout(() => {
      div.classList.remove("opacity-0", "translate-y-2");
    }, index * 100); // Stagger animations
  });
  // Add delete functionality with animation
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = e.target.getAttribute("data-index");
      const item = e.target.closest("div");
      // Animate out
      item.classList.add("opacity-0", "translate-x-4");
      setTimeout(() => {
        favorites.splice(idx, 1);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        renderFavorites();
      }, 300);
    });
  });
}

renderFavorites();
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  listContainer.innerHTML = "";
  favorites.forEach((course, index) => {
    const div = document.createElement("div");
    div.className =
      "flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-2 opacity-0 transform translate-y-2 transition-all duration-300";
    div.innerHTML = `
      <span>${course}</span>
      <button data-index="${index}" class="delete-btn text-red-500 hover:text-red-700 transition-colors duration-200">❌</button>
    `;
    listContainer.appendChild(div);
    // Trigger animation after DOM insertion
    setTimeout(() => {
      div.classList.remove("opacity-0", "translate-y-2");
    }, index * 100); // Stagger animations
  });
  // Add delete functionality with animation
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = e.target.getAttribute("data-index");
      const item = e.target.closest("div");
      // Animate out
      item.classList.add("opacity-0", "translate-x-4");
      setTimeout(() => {
        favorites.splice(idx, 1);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        renderFavorites();
      }, 300);
    });
  });
// Enhanced newsletter validation
subscribeBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Hide alert box first
  alertBox.classList.add("hidden");
  setTimeout(() => {
    if (!name || !email) {
      alertBox.textContent = "❌ Please fill out all fields.";
      alertBox.className =
        "mt-4 text-red-600 font-semibold opacity-0 transition-opacity duration-500";
    } else if (!emailRegex.test(email)) {
      alertBox.textContent = "❌ Please enter a valid email address.";
      alertBox.className =
        "mt-4 text-red-600 font-semibold opacity-0 transition-opacity duration-500";
    } else {
      alertBox.textContent = "✅ You've been subscribed!";
      alertBox.className =
        "mt-4 text-green-600 font-semibold opacity-0 transition-opacity duration-500";
    }
    alertBox.classList.remove("hidden");
    setTimeout(() => {
      alertBox.classList.remove("opacity-0");
    }, 50);
  }, 100);
});
