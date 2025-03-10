import { cargarEstructura } from '../../js/loadTemplate.js';

document.addEventListener('DOMContentLoaded', init);

async function init() {
  await cargarEstructura();
}
