function documentHeight() {
  document.documentElement.style.setProperty('--dash-doc-height', window.innerHeight + 'px');
}
window.addEventListener('resize', documentHeight);
documentHeight();
