function ajustarAltura() {
  const alturaVisible = window.innerHeight;
  document.documentElement.style.setProperty('--altura-real', `${alturaVisible}px`);
}

ajustarAltura();
window.addEventListener('resize', ajustarAltura);
