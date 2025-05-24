//LOGICO DE OTRAS PREGUNTAS
document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".opcion");

  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      const opciones = boton.parentElement.querySelectorAll(".opcion");

      opciones.forEach(op => {
        op.disabled = true;
        op.classList.remove("correcta", "incorrecta");
      });

      if (boton.dataset.correct === "true") {
        boton.classList.add("correcta");
      } else {
        boton.classList.add("incorrecta");
      }
    });
  });
});

//LOGICA DE RELACIONESSSSS

document.addEventListener('DOMContentLoaded', () => {
  const autores = document.querySelectorAll('.autor');
  const teorias = document.querySelectorAll('.teoria');

  const respuestasCorrectas = {
    'Piaget': 'Gestalt',
    'Skinner': 'Humanismo',
    'Maslow': 'Conductismo',
    'Köhler': 'Constructivismo'
  };

  let autorSeleccionado = null;
  let emparejamientos = {}; // autor: teoria seleccionada

  autores.forEach(btnAutor => {
    btnAutor.addEventListener('click', () => {
      if (autorSeleccionado) {
        autorSeleccionado.classList.remove('seleccionado');
      }
      autorSeleccionado = btnAutor;
      autorSeleccionado.classList.add('seleccionado');
    });
  });

  teorias.forEach(btnTeoria => {
    btnTeoria.addEventListener('click', () => {
      if (!autorSeleccionado) return;

      const autor = autorSeleccionado.getAttribute('data-autor');
      const teoria = btnTeoria.getAttribute('data-teoria');

      // Si ya había respuesta para ese autor, limpiamos clases anteriores
      if (emparejamientos[autor]) {
        // Botón de teoría previa
        const teoriaPrev = emparejamientos[autor];
        const btnTeoriaPrev = Array.from(teorias).find(t => t.getAttribute('data-teoria') === teoriaPrev);
        if (btnTeoriaPrev) {
          btnTeoriaPrev.classList.remove('correcto', 'incorrecto');
        }
        // Botón autor solo si estaba marcado incorrecto (en caso de cambiar a correcto)
        // NO quitamos clase correcto para que se quede iluminado
        if (autorSeleccionado.classList.contains('incorrecto')) {
          autorSeleccionado.classList.remove('incorrecto');
        }
      }

      emparejamientos[autor] = teoria;

      // Marca autor y teoría según si es correcto o no
      if (respuestasCorrectas[autor] === teoria) {
        autorSeleccionado.classList.add('correcto');
        autorSeleccionado.classList.remove('incorrecto');
        btnTeoria.classList.add('correcto');
        btnTeoria.classList.remove('incorrecto');
      } else {
        // Solo marcar rojo si no está marcado ya como correcto
        if (!autorSeleccionado.classList.contains('correcto')) {
          autorSeleccionado.classList.add('incorrecto');
        }
        btnTeoria.classList.add('incorrecto');
        btnTeoria.classList.remove('correcto');
      }

      autorSeleccionado.classList.remove('seleccionado');
      autorSeleccionado = null;
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Para esta relación usamos variables independientes
  const teorias = document.querySelectorAll('.relacion-teoria-palabra .teoria');
  const palabras = document.querySelectorAll('.relacion-teoria-palabra .palabra');

  const respuestasCorrectas = {
    'Cognitivismo': 'Autonomía',
    'Conductismo': 'Percepción',
    'Gestalt': 'Reforzamiento',
    'Humanismo': 'Procesos mentales'
  };

  let teoriaSeleccionada = null;
  let emparejamientos = {}; // teoria: palabra seleccionada

  teorias.forEach(btnTeoria => {
    btnTeoria.addEventListener('click', () => {
      if (teoriaSeleccionada) {
        teoriaSeleccionada.classList.remove('seleccionado');
      }
      teoriaSeleccionada = btnTeoria;
      teoriaSeleccionada.classList.add('seleccionado');
    });
  });

  palabras.forEach(btnPalabra => {
    btnPalabra.addEventListener('click', () => {
      if (!teoriaSeleccionada) return;

      const teoria = teoriaSeleccionada.getAttribute('data-teoria');
      const palabra = btnPalabra.getAttribute('data-palabra');

      // Si ya había respuesta para esa teoría, limpiar clases anteriores
      if (emparejamientos[teoria]) {
        const palabraPrev = emparejamientos[teoria];
        const btnPalabraPrev = Array.from(palabras).find(p => p.getAttribute('data-palabra') === palabraPrev);
        if (btnPalabraPrev) {
          btnPalabraPrev.classList.remove('correcto', 'incorrecto');
        }
        if (teoriaSeleccionada.classList.contains('incorrecto')) {
          teoriaSeleccionada.classList.remove('incorrecto');
        }
      }

      emparejamientos[teoria] = palabra;

      if (respuestasCorrectas[teoria] === palabra) {
        teoriaSeleccionada.classList.add('correcto');
        teoriaSeleccionada.classList.remove('incorrecto');
        btnPalabra.classList.add('correcto');
        btnPalabra.classList.remove('incorrecto');
      } else {
        if (!teoriaSeleccionada.classList.contains('correcto')) {
          teoriaSeleccionada.classList.add('incorrecto');
        }
        btnPalabra.classList.add('incorrecto');
        btnPalabra.classList.remove('correcto');
      }

      teoriaSeleccionada.classList.remove('seleccionado');
      teoriaSeleccionada = null;
    });
  });
});


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

