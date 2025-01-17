# Contenido

1.   Requisitos previos
2.   Configuración del proyecto
3.   Configuración de postgresSQL
4.   Estrcutura del proyecto
5.   Uso del microservicio
6.   Prueba del Api con postman
7.   Rutas del API
8.   Tecnologías usadas
9.   Arquitectura usada
10.   Notas Adicionales

# Desarrollo de un microservicio con Node.js express y ps(Conexión a la base datos)
El objetivo es desarrollar un microservicio que se conecte a una base de datos postgres y traiga los datos de una tabla usuarios para ser consumidos por un frontend por medio de una petición **GET**, el microservicio debe emplear librerias como pg para la conexión a la base de datos y salir por el puerto 3000 devolviendo los datos en formato JSON.


## Requisitos previos
Antes de empezar debes tener lo siguiente intalado

1.   Debe tener Node.js instalado en este caso **Node.js V22.13.0 y npm V10.9.2**
2.   Instalado postgresSQL como gestor de bases de datos
3.   Editor de codigo en este caso Visual Studio Code
4.   Postman para realizar la prueba GET del API 


## Configuración del proyecto

*   **Clonar el proyecto:** git clone https://github.com/Jhonatan1523/Desarrollo.git
*   **Asegurarse de intalar las dependencias:** npm install
*   **Instalación de las librerias necesarias para el desarrollo**: 
express (Framework web), ps (para conexión a la base de datos), dotenv (cargar variables de entorno desde un .env), nodamon (para poder tener un reinicio del servicio durante el desarrollo) y cors (para poder hacer las diferentes peticiones GET, POST, PUT, ect al API)
*   **Comando para instalación general**: npm install express cors pg dotenv
### Creación de un archivo .env para las varaibles de entorno
Se crea en la raiz un archivo .env con lo siguiente 



```
PORT=3000     #puerto que se vaya a usar 
DB_USER=postgres      #usuario de la base de datos
DB_HOST=localhost     #servidor en este caso como es local localhost
DB_NAME=PruebaTecnica     #Nombre de la base de datos
DB_PASSWORD=123456    #contraseña del servidor de base de datos
DB_PORT=5432        #puerto por defecto que usa postgresSQL
CORS_ORIGIN=http://localhost:4200       #URL del servicio de angular en este caso se ejuta desde el puerto 4200 que es el estandar que trae angular por defecto

```


### Configuración de nodamoon 


*   npm install nodemon --save-dev
*   npm install --save-dev nodemon
*   npm install -g nodemon
*   y en las dependencias del archivo package.json buscamos el apartado de "start" y se pone "nodemon index.js" para que se inicie desde el index.js

## Configuración de postgresSQL 

Para la configuración de postgres se debe contar con algun entorno visual, en este caso se usa **pg 4** que se incluye en la instalación esto nos permite tener una interfaz grafica, durante la instalación tener presente la contraseña que se ingresa.

### Creación de la base de datos
Para crear la base de datos se ingresan las credenciales del servidor y se le da click derecho y se selecciona create y ahi se crea la base de datos con el nombre que se prefiera, luego dentro de la base de datos se despliega y se busca la opción public y ahi el apartado para ingresar comandos SQL 

### Creacion de la tabla usuarios



```
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  correo VARCHAR(100),
  edad INT
);
```
Con esto se crea la tabla de usuarios y para insertar registros de prueba se usa la siguiente consulta



```
INSERT INTO usuarios (nombre, correo, edad) 
VALUES 
('Juan Pérez', 'juan.perez@example.com', 30),
('María López', 'maria.lopez@example.com', 25);
('Jhonatan Murcia Posso', 'jhonatanjyyplm@gmail.com', 23),
('Juan Alberto Prilo', 'Pirlo20@gmail.com', 24);
```
## Estrcutura del proyecto 

```
backend/
  ├── config/
  │   └── db.js                # Lógica de conexión a la base de datos
  ├── controllers/
  │   └── userController.js    # Lógica de control para usuarios
  ├── middleware/
  │   └── corsMiddleware.js    # Lógica de control para las peticiones del API con cors
  ├── models/
  │   └── userModel.js         # Lógica de modelos para los usuarios
  ├── routes/
  │   └── usersRoutes.js       # Rutas relacionadas con usuarios
  ├── index.js                 # Archivo principal del servidor
  ├── package.json             # Dependencias y scripts
  ├── .env                     # Variables de entorno (No incluir en producción)
  ├── Dockerfile               # Configuración Docker
  ├── .dockerignore            # configuración de exclusión
  └── README.md                # Documentación
```

## Uso del microservicio 

1.   **Iniciar el servicio**: npm start, si todo esta bien deberia indicar la dirección con el puerto que se le ha asignado
2.   **Comprobar el funcionamiento del Microservicio con la URL**
3.   **Prueba con curl**: curl http://localhost:3000/api/users

##Prueba del microservicio con potsman 

1.   Tener instalado Potsman
2.   **Iniciar el servicio:** npm start
2.   inicar un nuevo proyecto y poner **GET** en solicitud
3.   Comprobar la respuesta que debe ser 200Ok
4.   Verificar que los datos enviados en formato JSON en la parte inferior

## Rutas del APi

**GET /api/users: Obtiene todos los usuarios.**

### Resultado obtenido 


```
[
    {
        "id": 1,
        "nombre": "Juan Pérez",
        "correo": "juan.perez@example.com",
        "edad": 30
    },
    {
        "id": 2,
        "nombre": "María López",
        "correo": "maria.lopez@example.com",
        "edad": 25
    },
    {
        "id": 3,
        "nombre": "Jhonatan Murcia Posso",
        "correo": "jhonatanjyyplm@gmail.com",
        "edad": 23
    },
    {
        "id": 4,
        "nombre": "Juan Alberto Prilo",
        "correo": "Pirlo20@gmail.com",
        "edad": 24
    }
]
```
## Tecnologías usadas 

*   **Node.js:** Entorno de ejecución de JavaScript.
*   **Express:** Framework web para Node.js.
*   **PostgreSQL:** Base de datos relacional.
*   **dotenv:** Gestión de variables de entorno.
*   **pg:** Conector para PostgreSQL.
*   **nodemon:** Herramienta de desarrollo para reiniciar el servidor automáticamente.

## Arquitectura usada

Para este desarrollo del microservicio se guio por una arquitectura MVC pero con algunas alteraciones como lo es middleware y el config lo que permitiendo tener una escalabilidad mas limpia en caso de que se llegase a requerir mas herramientas o el desarrollo de un microservicio mas grande

**Nota final**, para que el servicio este funcionando correctamente se debe seguir el paso a paso que se menciona en la documentación de la misma forma tener presente el archivo .env en donde se debe modificar las variables según se tenga

