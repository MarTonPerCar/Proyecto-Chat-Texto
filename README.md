# Sprint 4: Adaptacion Instant Message a Ionic


---

## Interfaces de datos (src/app/interfaces)

* **Grupo** (`grupo.interfaces.ts`)

  ```ts
  export interface Grupo {
    nombre: string;         // Nombre del grupo
    url: string;            // URL de la imagen o ícono del grupo
    descripcion: string;    // Descripción breve
    contactos: string[];    // UIDs de usuarios miembros
    gid: string;            // Identificador único
  }
  ```

* **Imagen** (`imagenes.interfaces.ts`)

  ```ts
  export interface Imagen {
    url: string;            // URL de la imagen
  }
  ```

* **Usuario** (`usuario.interfaces.ts`)

  ```ts
  export interface Usuario {
    nombre: string;         // Nombre
    apellido: string;       // Apellido
    telefono: string;       // Teléfono de contacto
    email: string;          // Correo electrónico
    url: string;            // URL de avatar
    estado: string;         // Estado o mensaje personal
    contactos: string[];    // UIDs de contactos
    grupos: string[];       // UIDs de grupos
    uid?: string;           // UID opcional (Firebase)
  }
  ```

---

## Componentes / Páginas

### ContactDetailPage (`src/app/pages/contact-detail/contact-detail.page.ts`)

Muestra la información de un usuario y permite marcar/desmarcar como favorito.

* **Lógica**:

  * Obtiene `uid` de la ruta y solicita datos mediante `AuthService.getDatosUsuarioPorUID(uid)`.
  * Control de estados: `cargando`, `error`, `esFavorito`.
  * `toggleFavorito()`: usa `FavoritesService` para añadir o eliminar del almacenamiento local.

* **Template** (`contact-detail.page.html`):

  ```html
  <ion-spinner *ngIf="cargando"></ion-spinner>
  <ion-text *ngIf="error">{{ error }}</ion-text>
  <ng-container *ngIf="!cargando && contacto as c">
    <ion-avatar><img [src]="c.url" /></ion-avatar>
    <h2>{{ c.nombre }} {{ c.apellido }}</h2>
    <p>Email: {{ c.email }}</p>
    <p>Teléfono: {{ c.telefono }}</p>
    <p>Estado: {{ c.estado }}</p>
    <ion-button (click)="toggleFavorito()">
      {{ esFavorito ? 'Quitar de Favoritos' : 'Agregar a Favoritos' }}
    </ion-button>
  </ng-container>
  ```

### ContactsPage (`src/app/pages/contacts/contacts.page.ts`)

Lista los contactos del usuario y sus favoritos.

* **Lógica**:

  * En `ionViewWillEnter()` llama a `cargarContactos()`.
  * `cargarContactos()`:

    1. Obtiene UIDs de favoritos de SQLite.
    2. Carga datos de cada UID favorito desde Firestore.
    3. Recupera datos del usuario actual y su lista de contactos.
    4. Fusiona ambos conjuntos en un `Map` para evitar duplicados.
  * `verDetalle(uid)`: navega a `ContactDetailPage`.

* **Template** (`contacts.page.html`):

  ```html
  <ion-spinner *ngIf="cargando"></ion-spinner>
  <ion-text *ngIf="error">{{ error }}</ion-text>
  <ion-list *ngIf="!cargando && contactos.length">
    <ion-item *ngFor="let c of contactos" (click)="verDetalle(c.uid)">
      <ion-avatar slot="start"><img [src]="c.url"/></ion-avatar>
      <ion-label>
        <h2>{{ c.nombre }} {{ c.apellido }} <span *ngIf="c.esFavorito">★</span></h2>
        <p>{{ c.email }}</p>
      </ion-label>
    </ion-item>
  </ion-list>
  <p *ngIf="!cargando && !error && !contactos.length">No tienes contactos registrados.</p>
  ```

### HomePage (`src/app/pages/home/home.page.ts`)

Pantalla de bienvenida con botones para registro o login.

```html
<ion-content>
  <h1>Bienvenido</h1>
  <ion-button routerLink="/register">REGISTRARSE</ion-button>
  <ion-button routerLink="/login">INICIAR SESIÓN</ion-button>
</ion-content>
```

### LoginPage (`src/app/pages/login/login.page.ts`)

Formulario de inicio de sesión.

* **Lógica**:

  * Campos `email`, `password`, estado `cargando`.
  * `login()`: llama a `AuthService.login()`, muestra `Toast` en error y redirige a `ContactsPage`.
  * En `ionViewWillEnter()` cierra sesión previa.

* **Template** (`login.page.html`):

  ```html
  <form (ngSubmit)="login()">
    <ion-input [(ngModel)]="email" name="email" type="email" required></ion-input>
    <ion-input [(ngModel)]="password" name="password" type="password" required></ion-input>
    <ion-button type="submit" [disabled]="cargando || !email || !password">
      {{ cargando ? 'Ingresando...' : 'Iniciar sesión' }}
    </ion-button>
  </form>
  ```

### RegisterPage (`src/app/pages/register/register.page.ts`)

Formulario de registro de usuarios.

* **Lógica**:

  * Campos `nombre`, `apellido`, `telefono`, `email`, `password`, estado `cargando`.
  * `registrar()`: usa `AuthService.register()`, muestra `Toast` y redirige a login.

* **Template** (`register.page.html`):

  ```html
  <form (ngSubmit)="registrar()">
    <!-- Inputs para nombre, apellido, teléfono, email, password -->
    <ion-button type="submit" [disabled]="cargando || !nombre || !apellido || !telefono || !email || !password">
      {{ cargando ? 'Registrando...' : 'Registrarse' }}
    </ion-button>
  </form>
  ```

---

## Servicio de Favoritos (`src/app/services/favorites.service.ts`)

Gestiona un SQLite local para almacenar UIDs de usuarios favoritos.

```ts
@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private db: SQLiteDBConnection | null = null;

  private async initDB(): Promise<void> {
    // crea conexión y tabla 'favoritos(uid TEXT PRIMARY KEY)'
  }

  async esFavorito(uid: string): Promise<boolean>;
  async agregar(uid: string): Promise<void>;
  async eliminar(uid: string): Promise<void>;
  async getTodosFavoritos(): Promise<string[]>;
}
```

* **Operaciones**:

  * `esFavorito`: consulta si existe el UID.
  * `agregar` / `eliminar`: inserta o borra.
  * `getTodosFavoritos`: devuelve array de UIDs.

---
