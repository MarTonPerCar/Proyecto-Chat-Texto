import { getAbsolutePath } from '../../js/loadTemplate.js';

console.log("Header Sign In cargado correctamente");

async function init() {
  // Asignar rutas absolutas a los enlaces y estilos
  document.getElementById("cssHeaderSignInLink").href = getAbsolutePath("Templates/css/headerSignIn.css");

  document.getElementById("indexLink").href = getAbsolutePath("main/html/index.html");
  document.getElementById("startLink").href = getAbsolutePath("main/html/start.html");
  document.getElementById("settingsLink").href = getAbsolutePath("main/html/settings.html");
  document.getElementById("profileLink").href = getAbsolutePath("main/html/profile.html");

  document.getElementById("avatarImg").src = getAbsolutePath("Templates/externalSources/avatar.jpg");
  document.getElementById("configImg").src = getAbsolutePath("Templates/externalSources/Configuración.png");
  document.getElementById("startImg").src = getAbsolutePath("Templates/externalSources/Inicio.png");
}

// Ejecutar init() dependiendo del estado del DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  await init(); // Si el DOM ya está cargado, ejecutarlo inmediatamente
}
