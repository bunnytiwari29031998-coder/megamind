const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}

const counters = document.querySelectorAll("[data-counter]");

const runCounter = (element) => {
  const target = Number(element.dataset.counter);
  const suffix = element.dataset.suffix || "";
  const duration = 1600;
  const start = performance.now();

  const step = (timestamp) => {
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    element.textContent = `${value}${suffix}`;
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

if ("IntersectionObserver" in window && counters.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.started) {
        entry.target.dataset.started = "true";
        runCounter(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach((counter) => counterObserver.observe(counter));
}

const tabButtons = document.querySelectorAll("[data-tab-target]");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tabTarget;
    const wrapper = button.closest("[data-tabs]");
    if (!wrapper) return;

    wrapper.querySelectorAll("[data-tab-target]").forEach((item) => item.classList.remove("active"));
    wrapper.querySelectorAll("[data-tab-panel]").forEach((panel) => panel.classList.remove("active"));

    button.classList.add("active");
    const panel = wrapper.querySelector(`[data-tab-panel="${target}"]`);
    if (panel) panel.classList.add("active");
  });
});

// --- IST Clock Logic ---
const istClockElement = document.getElementById('live-ist-clock');

if (istClockElement) {
  const updateClock = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      minute: '2-digit',
      hour12: false
    });
    istClockElement.textContent = timeString;
  };
  
  updateClock();
  setInterval(updateClock, 1000);
}

// --- Global Search Logic ---
const searchBtn = document.getElementById('global-search-btn');

if (searchBtn) {
  // Inject modal into body
  const modalHTML = `
    <div id="search-overlay" class="search-overlay">
      <div class="search-container">
        <button id="close-search" class="search-close" aria-label="Close search">&times;</button>
        <input type="text" id="search-input" class="search-input" placeholder="Search for pages..." autocomplete="off" />
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const searchOverlay = document.getElementById('search-overlay');
  const closeSearchBtn = document.getElementById('close-search');
  const searchInput = document.getElementById('search-input');

  const openSearch = (e) => {
    if(e) e.preventDefault();
    searchOverlay.classList.add('active');
    setTimeout(() => searchInput.focus(), 100);
  };

  const closeSearch = () => {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
  };

  const executeSearch = () => {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) return;

    const routes = {
      'home': '/',
      'index': '/',
      'solution': '/solutions',
      'product': '/solutions',
      'industry': '/industries',
      'sector': '/industries',
      'data center': '/industries',
      'healthcare': '/industries',
      'banking': '/industries',
      'about': '/about',
      'company': '/about',
      'contact': '/contact',
      'support': '/contact',
      'quote': '/contact'
    };

    let foundNav = null;
    for (const [key, url] of Object.entries(routes)) {
      if (query.includes(key) || key.includes(query)) {
        foundNav = url;
        break;
      }
    }

    if (foundNav) {
      window.location.href = foundNav;
    } else {
      alert("No matching pages found for '" + query + "'. Try terms like 'solutions', 'contact', or 'industries'.");
      searchInput.value = '';
      searchInput.focus();
    }
  };

  searchBtn.addEventListener('click', openSearch);
  closeSearchBtn.addEventListener('click', closeSearch);

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
      closeSearch();
    }
  });

  // Execute on Enter
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
  });
}

// --- Dynamic Background Hover Logic ---
const dynamicCards = document.querySelectorAll('[data-hover-bg]');
dynamicCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const section = card.closest('.story-section');
    if (section) {
      section.style.backgroundImage = `url('${card.dataset.hoverBg}')`;
      section.classList.add('has-dynamic-bg');
    }
  });

  card.addEventListener('mouseleave', () => {
    const section = card.closest('.story-section');
    if (section) {
      section.style.backgroundImage = '';
      section.classList.remove('has-dynamic-bg');
    }
  });
});

