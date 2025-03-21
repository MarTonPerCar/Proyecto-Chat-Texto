import { getAbsolutePath } from '../../js/loadTemplate.js';
import { cargarImagenPorId } from '../../js/cargarImagenes.js';

console.log("Arriba España");

const jsonURL = getAbsolutePath("json/images.json");
fetch(jsonURL)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Estado: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("JSON leído correctamente:", data);

    // Comprobamos la estructura imprimiendo lo primero que encontramos:
    if (data.images && data.images.length > 0) {
      console.log("Primer elemento:", data.images[0]);
    } else {
      console.error("La estructura del JSON no tiene un array 'imagenes'.");
    }
  })
  .catch(error => {
    console.error('Error cargando JSON:', error);
  });


async function init() {
  document.getElementById("cssHeaderLink").href = getAbsolutePath("Templates/css/header.css");
  document.getElementById("indexLink").href = getAbsolutePath("main/html/index.html");
  document.getElementById("signInLink").href = getAbsolutePath("main/html/signIn.html");
  document.getElementById("registerLink").href = getAbsolutePath("main/html/register.html");

  cargarImagenPorId('Main_Icon', 'Main_Icon');
}

// Ejecutar init() dependiendo del estado del DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  await init(); // Si el DOM ya está cargado, ejecutarlo inmediatamente
}
