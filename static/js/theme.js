(function () {
  var KEY = 'an-theme';
  var sun = '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>';
  var moon = '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"></path>';
  function current() {
    var d = document.documentElement.getAttribute('data-theme');
    if (d) return d;
    return window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  }
  function paintIcon() {
    var el = document.getElementById('theme-icon');
    if (el) el.innerHTML = current() === 'dark' ? moon : sun;
  }
  window.toggleTheme = function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem(KEY, next); } catch (e) {}
    paintIcon();
  };
  paintIcon();
})();
