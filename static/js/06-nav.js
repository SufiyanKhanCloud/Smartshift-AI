/* ==========================================================================
   06-nav.js - SPA navigation
   ========================================================================== */
function initNav() {
  document.querySelectorAll('.nav-item').forEach((item) => {
    item.addEventListener('click',   () => navigateTo(item.dataset.page));
    item.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') navigateTo(item.dataset.page); });
  });
  initMobileSidebar();
}

/* Mobile slide-out drawer: hamburger toggle + backdrop + Escape-to-close.
   Only relevant below the 768px breakpoint (see static/style.css); the
   sidebar and backdrop are always in the DOM, the media query decides
   whether .open has any visual effect. */
function initMobileSidebar() {
  const toggle   = document.getElementById('sidebar-toggle');
  const sidebar  = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (!toggle || !sidebar || !backdrop) return;

  const openSidebar = () => {
    sidebar.classList.add('open');
    backdrop.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  };
  const closeSidebar = () => {
    sidebar.classList.remove('open');
    backdrop.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });
  backdrop.addEventListener('click', closeSidebar);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) closeSidebar();
  });

  // Expose for navigateTo() to close the drawer after picking a page.
  window._closeSidebarDrawer = closeSidebar;
}

function navigateTo(page) {
  document.querySelectorAll('.nav-item').forEach((n) => {
    n.classList.toggle('active', n.dataset.page === page);
  });
  document.querySelectorAll('.page').forEach((p) => p.classList.remove('active'));
  const el = document.getElementById(`page-${page}`);
  if (el) el.classList.add('active');

  if (typeof window._closeSidebarDrawer === 'function') window._closeSidebarDrawer();

  if (page === 'alerts') {
    State.unreadAlerts = 0;
    updateAlertBadge();
  }

  if (page === 'history' && State.pipeline.upload) {
    const btn = document.getElementById('history-load-btn');
    if (btn && !btn.disabled) {
      const trendCard = document.getElementById('history-trend-card');
      if (trendCard && trendCard.style.display === 'none') {
        setTimeout(() => handleLoadHistory(), 150);
      }
    }
  }

  if (page === 'dashboard' && State.pipeline.upload) {
    const card = document.getElementById('dashboard-trend-card');
    if (card && card.style.display === 'none') loadDashboardTrendChart();
  }
}
