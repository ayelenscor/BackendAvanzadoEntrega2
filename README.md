# Backend Avanzado - Entrega 2

Proyecto de backend desarrollado con Express.js, MongoDB y Mongoose. Incluye autenticación, carrito de compras, productos y sistema de generación de datos mockeados.

## Instalación

### Requisitos previos
- Node.js (v14 o superior)
- MongoDB (en ejecución localmente en puerto 27017)
- npm o yarn

### Pasos de instalación

1. Clonar o descargar el repositorio
2. Navegar a la carpeta del proyecto
3. Instalar dependencias:
```bash
npm install
```

4. Iniciar el servidor:
```bash
npm start
```

El servidor se ejecutará en `http://localhost:8080`

## Estructura del Proyecto

```
src/
├── app.js                 # Archivo principal
├── websocket.js          # Configuración de Socket.IO
├── routes/               # Rutas de la aplicación
│   ├── authRouter.js
│   ├── cartRouter.js
│   ├── productRouter.js
│   ├── sessionsRouter.js
│   ├── viewsRouter.js
│   └── mocksRouter.js    # Router de datos mockeados
├── dao/                  # Acceso a datos
│   ├── models/
│   │   ├── userModel.js
│   │   ├── cartModel.js
│   │   ├── productModel.js
│   │   ├── ticketModel.js
│   │   └── petModel.js
│   ├── userRepository.js
│   ├── petRepository.js
│   ├── cartRepository.js
│   ├── productRepository.js
│   └── ticketRepository.js
├── middlewares/          # Middlewares
│   └── authorize.js
├── utils/                # Utilidades
│   ├── mockingUtil.js    # Generador de datos mockeados
│   ├── multerUtil.js
│   ├── passportUtil.js
│   └── constantsUtil.js
└── views/                # Templates Handlebars
```

## Endpoints de Mocks

### Generar e Insertar Datos

**POST** `/api/mocks/generateData`

Genera e inserta usuarios y mascotas en la base de datos.

**Body:**
```json
{
  "users": 50,
  "pets": 30
}
```

**Response:**
```json
{
  "success": true,
  "message": "Datos generados e insertados correctamente",
  "usersGenerated": 50,
  "petsGenerated": 30
}
```

### Generar Usuarios Mockeados

**GET** `/api/mocks/mockingusers?quantity=50`

Genera usuarios mockeados sin insertarlos en la base de datos.

**Response:**
```json
{
  "success": true,
  "quantity": 50,
  "payload": [
    {
      "first_name": "Juan",
      "last_name": "García",
      "email": "juan.garcia0@gmail.com",
      "age": 35,
      "password": "coder123",
      "role": "user"
    }
  ]
}
```

### Generar Mascotas Mockeadas

**GET** `/api/mocks/mockingpets?quantity=10`

Genera mascotas mockeadas sin insertarlas en la base de datos.

**Response:**
```json
{
  "success": true,
  "quantity": 10,
  "payload": [
    {
      "name": "Max45",
      "type": "dog",
      "age": 5,
      "breed": "Labrador",
      "owner": "María González"
    }
  ]
}
```

### Obtener Usuarios de la Base de Datos

**GET** `/api/mocks/users`

Obtiene todos los usuarios insertados en la base de datos.

### Obtener Mascotas de la Base de Datos

**GET** `/api/mocks/pets`

Obtiene todas las mascotas insertadas en la base de datos.

## Características

- ✅ Autenticación con Passport (local y JWT)
- ✅ Gestión de productos con paginación
- ✅ Carrito de compras
- ✅ Generación de datos mockeados
- ✅ Sistema de tickets
- ✅ WebSockets con Socket.IO
- ✅ Vistas con Handlebars
- ✅ Encriptación de contraseñas con bcrypt
- ✅ Validación y manejo de errores

## Tecnologías

- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **Bcrypt** - Encriptación de contraseñas
- **Passport** - Autenticación
- **Socket.IO** - Comunicación en tiempo real
- **Express Handlebars** - Motor de plantillas
- **Multer** - Carga de archivos
- **JWT** - Tokens de autenticación

## Variables de Entorno

MongoDB se conecta a: `mongodb://127.0.0.1:27017/entrega-final`

Para cambiar la configuración, editar en `src/app.js`

## Autor

Desarrollado para el curso de Programación Backend Avanzado de Coderhouse.

## Licencia

ISC
