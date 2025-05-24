function ajustarAltura() {
  const alturaVisible = window.innerHeight;
  document.documentElement.style.setProperty('--altura-real', `${alturaVisible}px`);
}

ajustarAltura();
window.addEventListener('resize', ajustarAltura);

// Función modo oscuro
const botonModoOscuro = document.getElementById('modoOscuroBtn');

botonModoOscuro.addEventListener('click', () => {
  document.body.classList.toggle('modo-oscuro');
  
  // Cambiar icono según el modo
  if(document.body.classList.contains('modo-oscuro')) {
    botonModoOscuro.textContent = '₊⋆ ☀︎ ⋆⁺'; // Sol para modo claro
  } else {
    botonModoOscuro.textContent = '⋆｡˚☽˚｡⋆'; // Luna para modo oscuro
  }

 function actualizarAlturaViewport() {
  const alturaReal = window.innerHeight + 'px';
  document.documentElement.style.setProperty('--altura-viewport', alturaReal);
}

// Actualiza al cargar
actualizarAlturaViewport();

// También al redimensionar (por si rotan pantalla o cambian tamaño)
window.addEventListener('resize', actualizarAlturaViewport);

});

