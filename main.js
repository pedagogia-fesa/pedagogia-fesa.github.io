document.addEventListener("DOMContentLoaded", () => {
  // --- LÓGICA DE OPCIÓN MÚLTIPLE ---
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

  // --- LÓGICA DE PRIMER EMPAREJAMIENTO (autores → teorías) ---
  const autores = document.querySelectorAll('.autor');
  const teorias1 = document.querySelectorAll('.matching-container .teoria');
  const respuestasAutorTeoria = {
    'Piaget': 'Constructivismo',
    'Skinner': 'Conductismo',
    'Maslow': 'Humanismo',
    'Köhler': 'Gestalt'
  };
  let autorSeleccionado = null;
  let emparejamientos1 = {};

  autores.forEach(btnAutor => {
    btnAutor.addEventListener('click', () => {
      if (autorSeleccionado) autorSeleccionado.classList.remove('seleccionado');
      autorSeleccionado = btnAutor;
      autorSeleccionado.classList.add('seleccionado');
    });
  });

  teorias1.forEach(btnTeoria => {
    btnTeoria.addEventListener('click', () => {
      if (!autorSeleccionado) return;
      const autor = autorSeleccionado.dataset.autor;
      const teoria = btnTeoria.dataset.teoria;

      // Limpiar emparejamiento previo de ese autor
      if (emparejamientos1[autor]) {
        const prev = emparejamientos1[autor];
        const btnPrev = Array.from(teorias1).find(t => t.dataset.teoria === prev);
        if (btnPrev) btnPrev.classList.remove('correcto', 'incorrecto');
        if (autorSeleccionado.classList.contains('incorrecto')) {
          autorSeleccionado.classList.remove('incorrecto');
        }
      }
      emparejamientos1[autor] = teoria;

      // Marcar correcto/incorrecto
      if (respuestasAutorTeoria[autor] === teoria) {
        autorSeleccionado.classList.add('correcto');
        autorSeleccionado.classList.remove('incorrecto');
        btnTeoria.classList.add('correcto');
        btnTeoria.classList.remove('incorrecto');
      } else {
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

  // --- LÓGICA DE SEGUNDO EMPAREJAMIENTO (teorías → palabras) ---
  const teorias2 = document.querySelectorAll('.relacion-teoria-palabra .teoria');
  const palabras = document.querySelectorAll('.relacion-teoria-palabra .palabra');
  const respuestasTeoriaPalabra = {
    'Cognitivismo': 'Procesos mentales',
    'Conductismo': 'Reforzamiento',
    'Gestalt': 'Percepción',
    'Humanismo': 'Autonomía'
  };
  let teoriaSeleccionada = null;
  let emparejamientos2 = {};

  teorias2.forEach(btnTeoria => {
    btnTeoria.addEventListener('click', () => {
      if (teoriaSeleccionada) teoriaSeleccionada.classList.remove('seleccionado');
      teoriaSeleccionada = btnTeoria;
      teoriaSeleccionada.classList.add('seleccionado');
    });
  });

  palabras.forEach(btnPalabra => {
    btnPalabra.addEventListener('click', () => {
      if (!teoriaSeleccionada) return;
      const teoria = teoriaSeleccionada.dataset.teoria;
      const palabra = btnPalabra.dataset.palabra;

      // Limpiar emparejamiento previo de esa teoría
      if (emparejamientos2[teoria]) {
        const prev = emparejamientos2[teoria];
        const btnPrev = Array.from(palabras).find(p => p.dataset.palabra === prev);
        if (btnPrev) btnPrev.classList.remove('correcto', 'incorrecto');
        if (teoriaSeleccionada.classList.contains('incorrecto')) {
          teoriaSeleccionada.classList.remove('incorrecto');
        }
      }
      emparejamientos2[teoria] = palabra;

      // Marcar correcto/incorrecto
      if (respuestasTeoriaPalabra[teoria] === palabra) {
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

  // --- LÓGICA DE EVALUACIÓN FINAL ---
  // --- LÓGICA DE EVALUACIÓN FINAL ---
const evaluarBtn = document.getElementById('evaluar-btn');
const resultadoEl = document.getElementById('resultado');

evaluarBtn.addEventListener('click', () => {
  const aciertosOpciones = document.querySelectorAll('.opcion.correcta').length;
  const aciertosEmp1    = document.querySelectorAll('.matching-container .autor.correcto').length;
  const aciertosEmp2    = document.querySelectorAll('.relacion-teoria-palabra .teoria.correcto').length;

  // Ajusta estos números si cambias el número de ítems
  const totalOpciones  = 7;
  const totalEmparej1  = Object.keys(respuestasAutorTeoria).length;
  const totalEmparej2  = Object.keys(respuestasTeoriaPalabra).length;
  const totalPosible   = totalOpciones + totalEmparej1 + totalEmparej2;
  const totalAciertos  = aciertosOpciones + aciertosEmp1 + aciertosEmp2;

  // Mensaje según rango de aciertos
  let mensaje;
  if (totalAciertos <= 5) {
    mensaje = 'Ánimo, ¡puedes mejorar!';
  } else if (totalAciertos <= 10) {
    mensaje = 'Hay talento, sólo falta apoyo, ¡sigue así!';
  } else {
    mensaje = '¡Excelente trabajo, pedagogo brillante!';
  }

  // Mostrar resultado y mensaje
  resultadoEl.style.display = "block";
  resultadoEl.innerHTML = `
    <strong>Obtuviste ${totalAciertos} de 16 aciertos.</strong><br>
    ${mensaje}
  `;
  document.getElementById('reintentar-btn').style.display = 'block';
  document.getElementById('reintentar-btn').addEventListener('click', () => {
  location.reload();
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

