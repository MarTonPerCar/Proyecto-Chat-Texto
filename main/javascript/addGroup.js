import { cargarEstructura, getAbsolutePath } from '../../js/loadTemplate.js';
import { cargarImagenPorId } from '/js/cargarImagenes';

async function init() {
  // Configura las rutas de los enlaces antes de cargar la estructura
  document.getElementById("cssAddGroup").href = getAbsolutePath("main/css/addGroup.css");
  document.getElementById("cssColorsLink").href = getAbsolutePath("colors.css");
  document.getElementById("startLink").href = getAbsolutePath("main/html/start.html");
  document.getElementById("startLink2").href = getAbsolutePath("main/html/start.html");
  document.getElementById("editProfile").href = getAbsolutePath("main/html/profile.html");

}

// Ejecutar init() cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  await init();
}
