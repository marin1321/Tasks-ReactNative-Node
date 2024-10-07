# Task Manager App

## Descripción

Task Manager es una aplicación de gestión de tareas que permite a los usuarios crear, compartir y gestionar sus tareas. La aplicación está dividida en dos partes: un backend construido con Node.js y Express, y un frontend desarrollado con React Native.

## Tecnologías utilizadas

### Backend
- Node.js
- Express
- MySQL
- JWT (JSON Web Tokens) para autenticación
- bcrypt para el hash de contraseñas
- cors para permitir solicitudes cross-origin
- dotenv para la gestión de variables de entorno

### Frontend
- React Native
- AsyncStorage para la gestión del estado local
- React Navigation para la navegación entre pantallas
- Expo para facilitar el desarrollo y la visualización de la aplicación

## Instalación

    ```bash
    https://github.com/marin1321/Tasks-ReactNative-Node.git
    cd Tasks-ReactNative-Node
    ```

### Backend

1. Entra a la carpeta:

    ```bash
    cd Tasks-ReactNative-Node/server
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Configura el archivo `.env` en la raíz del proyecto con las variables necesarias, como la configuración de la base de datos y el secreto JWT:

    ```plaintext
    DB_HOST=tu_host
    DB_USER=tu_usuario
    DB_PASSWORD=tu_contraseña
    DB_NAME=tu_nombre_de_base_de_datos
    JWT_SECRET=tu_secreto_jwt
    ```

4. Inicia el servidor:

    ```bash
    npm run dev
    ```

### Frontend

1. Entra a la carpeta:

    ```bash
    cd Tasks-ReactNative-Node/server
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Inicia la aplicación:

    ```bash
    npm start
    ```

4. Escanea el código QR con la aplicación Expo Go para ver la aplicación en tu dispositivo móvil.

## Uso

1. **Registro de Usuario**: Los usuarios pueden registrarse proporcionando su nombre, correo electrónico y contraseña.
2. **Inicio de Sesión**: Los usuarios pueden iniciar sesión para acceder a sus tareas.
3. **Gestión de Tareas**: Los usuarios pueden crear, checkear y eliminar tareas.
4. **Compartir Tareas**: Los usuarios pueden compartir tareas con otros usuarios.


## Contacto

Para cualquier pregunta o comentario, por favor contacta a [marinmolinao@gmail.com](mailto:marinmolinao@gmail.com).
