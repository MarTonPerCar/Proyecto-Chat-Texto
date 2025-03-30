# Instant Message

## Componentes del grupo
Jesus Santacruz Martín-Delgado \
Enrique Espino González \
Mario Perez Carmona

## Descripcion del proyecto
InstantMessage es una plataforma de mensajería instantánea inspirada en WhatsApp, diseñada para ofrecer una experiencia de comunicación rápida, segura y accesible. Permite a los usuarios enviar mensajes de texto, compartir archivos y crear grupos de conversación en una interfaz intuitiva y moderna.

## Características principales
- Envío de mensajes de texto en tiempo real.
- Compartición de archivos.
- Creación y administración de grupos de conversación.
- Interfaz intuitiva y moderna.
- Recuperación de cuenta mediante email.
- Personalización del perfil de usuario.

## Requisitos funcionales
- Registro y autenticación de usuarios.
- Gestión de contactos.
- Intercambio de mensajes individuales y grupales.
- Interfaz adaptable a dispositivos móviles y de escritorio.

## Mockups y Storyboard
El diseño visual de la aplicación ha sido desarrollado en Figma. Puedes acceder a los mockups y storyboard en el siguiente enlace:
[Figma - Diseño del Proyecto](https://www.figma.com/design/xbDr84zH0yrJSF8FPdAco3/Proyecto-%22WhatsApp%22-Grupo-5?node-id=0-1&p=f&t=zk0DIsBe4xZwLh80-0)

## Templates
Se han definido los siguientes componentes clave en la interfaz de usuario:
1. Conversación (incluido en la página start.html)
2. Header inicial (incluido en todas las páginas de N)
3. Header cuando el usuario inicia sesión (incluido en todas las páginas de Login)
4. Footer (incluido en todas las páginas)
5. Mensaje de grupo (incluido en la página start.html)
6. Mensaje de contacto (incluido en la página start.html)
7. Input de información de usuario (incluido en las páginas sigIn.html, register.html y las págians de recoverPassword.hmtl)
8. Estado del usuario (incluido en la página profile.html)
9. Selección desplegable del usuario (incluido en la página settings.html)
10. Botones generales (incluido en la página addGroup.html)

## Páginas HTML
Las páginas creadas se dividen en dos grupos, sesión no iniciada (NoLogin) y sesión iniciada (Login). La página de inicio de la aplicación es index.html.

### NoLogin
1. <span style="color: gold;">index.html</span> (MainPage)
2. recoverPassword(Email).html (ResetPasswordEmailPage)
3. recoverPassword(Password).html (ResetPasswordPage)
4. register.html (RegisterPage)
5. sigIn.html (SigInPage)
### Login
1. start.html (AppPage)
2. profile.html (UserInfo)
3. addContact.html (AddContactPage)
4. addGroup.html (CreateGroupPage)
5. settings.html (SettingsPage)
6. editProfile.html (EditProfilePage)
7. recoverPassword(Password).html (ResetPasswordSettingsPage)

## Gestión del Proyecto
Para la organización y seguimiento de tareas se ha utilizado Trello. [Trello - Proyecto Instant Message](https://trello.com/b/gTr3wfG4)

## Enlace al Repositorio
El código fuente del proyecto está disponible en GitHub:
[GitHub - Proyecto Instant Message](https://github.com/MarTonPerCar/Proyecto-Chat-Texto)

# Sprint 2

## Formularios incluidos y su adaptación para su validación

El formulario de registro de **InstantMessage** está diseñado para que el usuario pueda crear una cuenta ingresando datos personales esenciales, tales como email, contraseña, nombre, apellido y número de teléfono. Se ha implementado utilizando una combinación de HTML y JavaScript, lo que permite la carga dinámica de los elementos y su validación antes de proceder a la redirección a la página de inicio de sesión.

# Register

## Email

- Comprueba que el campo no esté vacío.
- Verifica el formato correcto mediante la función `validateEmail()`, que utiliza una expresión regular para asegurar que el email ingresado cumpla con la estructura típica.

## Contraseña y Repetición

- **Contraseña:**
  - Se valida que la contraseña no sea vacía.
  - Debe tener al menos 8 caracteres.
- **Repetición de Contraseña:**
  - Se verifica que el campo no esté vacío.
  - Debe coincidir exactamente con la contraseña original.

## Nombre y Apellido

- Se comprueba que ambos campos tengan contenido y no sean nulos, garantizando la captura de datos personales básicos.

## Número de Teléfono

- Se valida que el campo no esté vacío.
- Se comprueba que el número cumpla con un formato adecuado:
  - Permite números con o sin el signo '+'.
  - Debe tener entre 7 y 15 dígitos, validado mediante la función `validatePhone()`.

# SignIn

La página de inicio de sesión permite a los usuarios acceder a la aplicación ingresando sus credenciales (email y contraseña). Está diseñada para ofrecer una experiencia sencilla y segura, combinando la validación nativa del navegador con una verificación asíncrona en JavaScript. La implementación utiliza un sistema de carga dinámica de plantillas y rutas absolutas para garantizar la correcta visualización y funcionalidad de los recursos.

## Formulario de inicio de sesión

### Email

- Se presenta un campo de entrada de tipo email acompañado de su etiqueta.
- Se utiliza el atributo `required` para garantizar la validación básica nativa del navegador.

### Contraseña

- Se utiliza un campo de entrada de tipo password con su respectiva etiqueta.
- También se emplea el atributo `required` para asegurar que el usuario ingrese su contraseña.

## Verificación de datos

### Carga de usuarios simulados

- La función `cargarUsuarios()` realiza una llamada asíncrona mediante `fetch` para obtener un archivo JSON que simula la base de datos de usuarios, permitiendo tener un entorno controlado para la autenticación.

### Validación de credenciales

- Se utiliza el método `find()` para buscar en el JSON un usuario que coincida con el email y la contraseña ingresados.
- Si se encuentra un usuario que cumple con las condiciones, la autenticación se considera exitosa.

### Redirección y mensajes

- En caso de coincidencia:
  - Se muestra una alerta indicando el inicio de sesión exitoso.
  - Se redirige al usuario a la página principal (`start.html`).
- Si los datos no coinciden:
  - Se alerta al usuario con un mensaje de error indicando que el email o la contraseña son incorrectos.
## Cambios realizados para implementar un diseño responsive

Se han introducido diversas modificaciones en el código CSS (y en la estructura HTML en casos necesarios) para lograr que la interfaz se adapte correctamente a diferentes dispositivos y resoluciones. A continuación, se detallan los principales cambios realizados:

### 1. Uso de Flexbox y estructura de contenedores

- **Diseño flexible del layout:**
  Se utiliza `display: flex` junto con `flex-direction: column` en el `body` y otros contenedores clave para garantizar que el contenido se distribuya de manera vertical y ocupe al menos el 100% de la altura de la pantalla (con `min-height: 100vh`).

- **Crecimiento del contenido principal:**
  La propiedad `flex: 1` en el `main` permite que este elemento crezca para empujar el `footer` hacia la parte inferior, asegurando una distribución adecuada del espacio en pantallas de diferentes tamaños.

### 2. Ajuste de anchos y centrado de elementos

- **Anchos relativos:**
  Se especifican anchos relativos, como `width: 100%` o `width: 50vw`, en formularios y contenedores para que se adapten de forma proporcional al ancho de la pantalla.

- **Centrado de elementos:**
  Se emplean propiedades como `justify-content: center` y `align-items: center` para centrar tanto horizontal como verticalmente los elementos, mejorando la presentación en dispositivos móviles y de escritorio.

### 3. Media Queries

- **Adaptación a dispositivos móviles:**
  Se incorpora la regla `@media (max-width: 768px)` para ajustar el tamaño y el espaciado de elementos críticos. Por ejemplo, en la sección "hero", se reduce el tamaño de la imagen y se ajusta el tamaño de la fuente para mantener la legibilidad en pantallas pequeñas.

### 4. Reset y configuración global

- **Normalización de estilos:**
  Se utiliza un reset de estilos global con la regla `* { margin: 0; padding: 0; box-sizing: border-box; }` para eliminar márgenes y paddings por defecto y lograr una base consistente entre navegadores.

- **Uso de variables y hojas de estilo externas:**
  Se importa una hoja de colores (`colors.css`) para mantener una paleta coherente en todo el diseño y facilitar la actualización de la estética.

### 5. Adaptación de formularios y botones

- **Formularios flexibles:**
  Los formularios están diseñados para adaptarse a distintos tamaños de pantalla mediante el uso de `flex-direction: column` y anchos relativos. Esto asegura que los inputs y contenedores se escalen adecuadamente.

- **Interacción y transiciones:**
  Se han añadido transiciones y efectos de hover en botones, garantizando una experiencia de usuario interactiva y moderna sin comprometer la adaptabilidad del diseño.

### 6. Elementos específicos de la interfaz

- **Componentes de chat y listas de usuarios:**
  Se implementaron contenedores flexibles para la barra lateral, chat y mensajes. Estos elementos utilizan propiedades como `overflow-y: auto` para gestionar el contenido en pantallas pequeñas, asegurando que los usuarios puedan desplazarse fácilmente por listas y mensajes.

- **Ajuste de imágenes y elementos visuales:**
  Imágenes, avatares y otros elementos visuales se han configurado con dimensiones relativas y estilos (por ejemplo, `border-radius` y `object-fit`) para adaptarse correctamente a diferentes resoluciones sin perder calidad o proporción.

---

Estos cambios en el CSS, junto con ajustes correspondientes en el HTML para estructurar contenedores y utilizar atributos responsivos, aseguran que la aplicación ofrezca una experiencia de usuario consistente, tanto en dispositivos móviles como en pantallas de escritorio.

## Carga dinámica con JSON

Esta sección se encarga de obtener datos externos en formato JSON para inyectarlos en la aplicación.
Por ejemplo, la función **`cargarImagenPorId`** realiza lo siguiente:
- **Obtención del JSON de imágenes:** Utiliza la función `getAbsolutePath` para construir la ruta absoluta del archivo `json/images.json`.
- **Búsqueda y carga de la imagen:**
  - Se realiza una petición `fetch` para obtener el JSON.
  - Se busca, mediante el método `find()`, la imagen cuyo atributo `nombre` coincida con el parámetro `id`.
  - Dependiendo del elemento contenedor (si es un `<img>` o un contenedor genérico), se establece la URL de la imagen y se añaden clases y atributos (como `alt`).
- **Manejo de errores:** Si la imagen o el contenedor no se encuentran, se muestran mensajes de error en la consola.

---

## Código para realizar carga de Templates

El código implementa la carga dinámica de fragmentos HTML (templates) en áreas específicas de la aplicación. Las funciones principales son:

- **`cargarTemplate(url, id, scriptPath = "")`:**
  - **Propósito:** Cargar el contenido HTML desde la URL del template y colocarlo en el contenedor cuyo `id` se especifica.
  - **Funcionamiento:**
    - Realiza una petición `fetch` para obtener el HTML.
    - Inserta el contenido obtenido en el elemento del DOM identificado por `id`.
    - Si se proporciona un `scriptPath`, se llama a `cargarScript` para cargar y ejecutar el script relacionado.

- **`cargarScript(scriptPath)`:**
  - **Propósito:** Cargar un archivo JavaScript de forma dinámica.
  - **Funcionamiento:**
    - Crea un elemento `<script>` con la ruta absoluta obtenida mediante `getAbsolutePath`.
    - Se configura el script para que se ejecute en orden (`async = false`) y se añade al `<body>`.

- **Integración en la aplicación:**
  La función **`cargarEstructura`** utiliza `cargarTemplate` para insertar dinámicamente diversas secciones como el header, footer, avatar, conversaciones, mensajes, y otros elementos especiales (por ejemplo, textos no modificables y selectores de petición) en función de la existencia de contenedores en el DOM.

---

## Código para realizar carga de datos

Para cargar y personalizar datos en los templates, se utiliza la función **`cargarElementoDinamico`** junto con un archivo JSON que contiene la configuración y valores de los elementos.
El proceso es el siguiente:

- **Obtención del JSON de templates:**
  Se utiliza `getAbsolutePath` para construir la ruta absoluta del archivo `json/templates.json` y se realiza una petición `fetch` para obtener sus datos.

- **Selección del template a cargar:**
  Según el parámetro `tipo` (por ejemplo, `"request"`, `"notChangeableText"` o `"requestSelector"`), se determina cuál archivo HTML se cargará (por ejemplo, `request.html`, `notChangeableText.html` o `requestSelector.html`).

- **Reemplazo de valores en el template:**
  La función **`reemplazarValores`** toma el HTML del template y realiza reemplazos de marcadores de posición por los datos obtenidos del JSON:
  - Por ejemplo, se reemplaza el texto del `label`, el `placeholder`, el tipo de input y otros atributos para personalizar el elemento de acuerdo a la configuración definida en el JSON.

- **Inyección en el DOM:**
  Finalmente, el HTML modificado se inserta en el contenedor cuyo `id` se ha especificado, permitiendo que la interfaz se actualice de manera dinámica con datos configurables.

---

### Resumen de Flujo

1. **Carga dinámica de JSON:**
   Se obtienen datos externos (imágenes, configuración de templates) mediante peticiones `fetch`.
2. **Carga de Templates:**
   Se insertan fragmentos HTML en el DOM y, si es necesario, se cargan scripts asociados.
3. **Personalización de elementos:**
   Se reemplazan valores en los templates utilizando datos del JSON para adaptar formularios y otros componentes de la interfaz de usuario.

Este enfoque modular y basado en JSON facilita la actualización y el mantenimiento de la aplicación, permitiendo cambiar la apariencia o el contenido sin modificar directamente el código HTML o JavaScript.
