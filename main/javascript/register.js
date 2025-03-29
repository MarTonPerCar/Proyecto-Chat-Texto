import { cargarEstructura, getAbsolutePath } from '../../js/loadTemplate.js';

async function init() {
  document.getElementById("cssRegisterLink").href = getAbsolutePath("main/css/register.css");
  document.getElementById("signIn").href = getAbsolutePath("main/html/signIn.html");
  document.getElementById("cssColorsLink").href = getAbsolutePath("colors.css");

  await cargarEstructura();

  // Ahora que la estructura se ha cargado, asignamos el listener
  document.getElementById("btn-registrar").addEventListener("click", function(event) {
    event.preventDefault(); // Prevenir comportamiento por defecto
    if (validateRegistrationForm()) {
      const urlDestino = getAbsolutePath("main/html/signIn.html");
      console.log("Redirigiendo a:", urlDestino);
      window.location.href = urlDestino;
    }
  });
}

// Ejecutar init() dependiendo del estado del DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  await init();
}

// Funciones de validación (no se modifican)
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^\+?\d{7,15}$/;
  return re.test(phone);
}

function validateRegistrationForm() {
  // Se asume que los inputs han sido creados dinámicamente por cargarEstructura()
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const repeatPassword = document.getElementById("repeat-password");
  const nameField = document.getElementById("name");
  const surname = document.getElementById("surname");
  const phone = document.getElementById("phonenumber");
  let isValid = true;
  let errors = [];

  // Validar email: no vacío y formato correcto
  if (!email || email.value.trim() === "") {
    isValid = false;
    errors.push("El email es obligatorio.");
  } else if (!validateEmail(email.value.trim())) {
    isValid = false;
    errors.push("El formato del email no es válido.");
  }

  // Validar password: no vacío y mínimo 8 caracteres
  if (!password || password.value.trim() === "") {
    isValid = false;
    errors.push("La contraseña es obligatoria.");
  } else if (password.value.trim().length < 8) {
    isValid = false;
    errors.push("La contraseña debe tener al menos 8 caracteres.");
  }

  // Validar que la repetición de la contraseña coincida
  if (!repeatPassword || repeatPassword.value.trim() === "") {
    isValid = false;
    errors.push("Debes repetir la contraseña.");
  } else if (password.value.trim() !== repeatPassword.value.trim()) {
    isValid = false;
    errors.push("Las contraseñas no coinciden.");
  }

  // Validar nombre
  if (!nameField || nameField.value.trim() === "") {
    isValid = false;
    errors.push("El nombre es obligatorio.");
  }

  // Validar apellido
  if (!surname || surname.value.trim() === "") {
    isValid = false;
    errors.push("El apellido es obligatorio.");
  }

  // Validar número de teléfono
  if (!phone || phone.value.trim() === "") {
    isValid = false;
    errors.push("El número de teléfono es obligatorio.");
  } else if (!validatePhone(phone.value.trim())) {
    isValid = false;
    errors.push("El número de teléfono no es válido.");
  }

  if (!isValid) {
    alert(errors.join("\n"));
    return false;
  }
  return true;
}
