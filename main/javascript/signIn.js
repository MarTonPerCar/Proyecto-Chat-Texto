import { cargarEstructura, getAbsolutePath } from '../../js/loadTemplate.js';

async function init() {
  document.getElementById("cssLink").href = getAbsolutePath("main/css/signIn.css");
  document.getElementById("startLink").href = getAbsolutePath("main/html/start.html");
  document.getElementById("recoverPasswordEmail").href = getAbsolutePath("main/html/recoverPassword(Email).html");
  await cargarEstructura();
}

// Ejecutar init() dependiendo del estado del DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  await init(); // Si el DOM ya está cargado, ejecutarlo inmediatamente
}


// Configura el evento submit para el formulario de login
function setupLogin() {
  // Se obtiene el enlace que contiene el botón de iniciar sesión.
  const loginButtonLink = document.getElementById('startLink');
  if (!loginButtonLink) {
    console.error("No se encontró el enlace de inicio de sesión.");
    return;
  }

  // Se agrega listener para el clic en el botón/enlace
  loginButtonLink.addEventListener('click', function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace

    // Se obtienen los inputs por sus nombres (deben venir de la plantilla cargada)
    const emailInput = document.querySelector('[name="email"]');
    const passwordInput = document.querySelector('[name="password"]');

    if (!emailInput || !passwordInput) {
      console.error("No se encontraron los campos de email o password.");
      return;
    }

    const email = emailInput.value;
    const password = passwordInput.value;

    // Se realiza la validación leyendo el archivo db.json
    fetch('db.json')
      .then(response => response.json())
      .then(data => {
        const users = data.persona;
        // Se busca el usuario que coincida con el email y contraseña ingresados
        const user = users.find(u => u.email === email && u.contraseña === password);

        if (user) {
          // Credenciales correctas: muestra un mensaje y actualiza el href del enlace
          alert(`¡Bienvenido, ${user.nombre}!`);
          // Cambio 2: se asigna la nueva URL mediante getAbsolutePath
          loginButtonLink.href = getAbsolutePath("main/html/start.html");
          // Opcional: puedes simular el clic para redirigir inmediatamente:
          // loginButtonLink.click();
        } else {
          // Credenciales incorrectas: muestra un mensaje de error
          const errorMessage = document.getElementById('error-message');
          errorMessage.textContent = "Correo o contraseña incorrectos.";
          errorMessage.style.display = "block";
        }
      })
      .catch(err => console.error("Error al cargar db.json:", err));
  });
}

