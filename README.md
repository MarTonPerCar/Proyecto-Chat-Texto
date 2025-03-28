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

## Formularios incluidos y su adaptacion para su validacion
El formulario de registro de InstantMessage está diseñado para que el usuario pueda crear una cuenta ingresando datos personales esenciales, tales como email, contraseña, nombre, apellido y número de teléfono. Se ha implementado utilizando una combinación de HTML y JavaScript que permite tanto la carga dinámica de los elementos del formulario como su validación antes de proceder a la redirección a la página de inicio de sesión.

# Register

## Email:

Comprueba que el campo no esté vacío.

Verifica el formato correcto mediante la función validateEmail(), que utiliza una expresión regular para asegurar que el email ingresado cumpla con la estructura típica.

## Contraseña y Repetición:

Se valida que la contraseña no sea vacía y que tenga al menos 8 caracteres.

Se verifica que el campo de repetir la contraseña no esté vacío y que coincida exactamente con la contraseña original.

## Nombre y Apellido:

Se comprueba que ambos campos tengan contenido y no sean nulos, garantizando la captura de datos personales básicos.

## Número de Teléfono:

Se valida que el número no esté vacío y que cumpla con un formato adecuado, permitiendo números con o sin el signo '+' y que tenga entre 7 y 15 dígitos, utilizando la función validatePhone().

# SignIn

La página de inicio de sesión permite a los usuarios acceder a la aplicación ingresando sus credenciales (email y contraseña). Se ha diseñado para ofrecer una experiencia sencilla y segura, combinando validación nativa del navegador con una verificación asíncrona en JavaScript. La implementación utiliza un sistema de carga dinámica de plantillas y rutas absolutas para garantizar la correcta visualización y funcionalidad de los recursos.

## Formulario de inicio de sesion

## Email
Se presenta un campo de entrada de tipo email acompañado de su etiqueta, el cual utiliza el atributo required para garantizar la validación básica nativa del navegador.

## Contraseña
Similarmente, se utiliza un campo de entrada de tipo password con su etiqueta correspondiente y el atributo required para asegurar que el usuario ingrese su contraseña.

## Verificacion de datos

## Carga de usuarios simulados
La función cargarUsuarios() realiza una llamada asíncrona mediante fetch para obtener un archivo JSON que simula la base de datos de usuarios. Esto permite tener un entorno controlado para la autenticación.

## Validacion de credenciales
Utilizando el método find(), se busca en el JSON un usuario que coincida con el email y la contraseña ingresados. Si se encuentra un usuario que cumpla con las condiciones, se considera que la autenticación es exitosa.

## Redireccion y mensajes
En caso de coincidencia, se muestra una alerta indicando el inicio de sesión exitoso y se redirige al usuario a la página principal (start.html).

Si los datos no coinciden, se alerta al usuario con un mensaje de error indicando que el email o la contraseña son incorrectos.
