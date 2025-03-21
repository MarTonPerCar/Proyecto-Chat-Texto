import { getAbsolutePath } from '../js/loadTemplate.js';

// cargarImagenes.js (versión actualizada y robusta)
export function cargarImagenPorId(id, contenedorID) {
  const jsonURL = getAbsolutePath("json/images.json");
  fetch(jsonURL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Estado: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const imagen = data.images.find(img => img.nombre === id);

      if (imagen) {
        const contenedor = document.getElementById(contenedorID);

        if (!contenedor) {
          console.error(`El contenedor con id "${contenedorID}" no existe.`);
          return;
        }

        if (contenedor.tagName === 'IMG') {
          contenedor.src = imagen.url;
          contenedor.alt = imagen.alt;
          contenedor.classList.add('imagen-cargada');
        } else {
          contenedor.innerHTML = '';
          const imgElement = document.createElement('img');
          imgElement.src = imagen.url;
          imgElement.alt = imagen.alt;
          imgElement.classList.add('imagen-cargada');
          contenedor.appendChild(imgElement);
        }
      } else {
        console.error(`No existe una imagen con nombre "${id}".`);
      }
    })
    .catch(error => {
      console.error('Error al cargar el JSON:', error);
    });
}
