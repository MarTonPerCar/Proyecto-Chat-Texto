import { cargarEstructura, getAbsolutePath } from '../../js/loadTemplate.js';

async function init() {
  // Configuración de los enlaces mediante rutas absolutas calculadas
  document.getElementById("cssStartLink").href = getAbsolutePath("main/css/recoverPassword(Email).css");
  document.getElementById("cssColorsLink").href = getAbsolutePath("colors.css");

  // Se asigna la ruta correcta al enlace responsable de la redirección
  document.getElementById("editProfileLink").href = getAbsolutePath("main/html/editProfile.html");

  // Carga el resto de la estructura dinámica (header, footer, etc.)
  await cargarEstructura();
}

// Ejecuta init() al cargar el DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
