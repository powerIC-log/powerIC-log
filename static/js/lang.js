const STORAGE_KEY = 'powerIC-lang';

function setLang(lang) {
  localStorage.setItem(STORAGE_KEY, lang);
  applyLang(lang);
}

function applyLang(lang) {
  document.documentElement.lang = lang;
  const btnKo = document.getElementById('btn-ko');
  const btnEn = document.getElementById('btn-en');
  if (btnKo) btnKo.classList.toggle('active', lang === 'ko');
  if (btnEn) btnEn.classList.toggle('active', lang === 'en');
  document.querySelectorAll('[data-ko]').forEach(el => {
    const text = lang === 'ko' ? el.dataset.ko : el.dataset.en;
    if (text !== undefined) el.innerHTML = text;
  });
  document.querySelectorAll('[data-lang-body]').forEach(el => {
    el.hidden = el.getAttribute('data-lang-body') !== lang;
  });
}

const saved = localStorage.getItem(STORAGE_KEY) || 'ko';
applyLang(saved);
