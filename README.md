#Contenido 

1.   Explicación general del proyecto
2.   Estrcutura del proyecto
3.   Comandos necesarios 
4.   Docker

## Explicación general del proyecto

El proposito del proyecto es crear un frontend que consuma un microservicio (backend) el cual es desarrollado en Node.js con express y pg, de la misma forma el frontend esta desarrollado en Angular el cual debe mostrar los datos registrados en una tabla usuarios en un formilario el cual debe estar en solo lectura.

Para cada una de estos el proyecto se parte en dos carpetas llamadas frontend y backend, cada una de estas cuenta con la documentación nececsaria para el entendimiento de las mismas dentro de ellas, se debe leer y comprender al detalle para un buen funcionamiento del proyecto.

### Clonación del repositorio 
Para clonar el repositorio solo se debe ejecutar el siguiente comando 

```
git clone https://github.com/Jhonatan1523/Desarrollo.git
```

## Estrcutura del proyecto 

```
PruebaTecnica/
  ├── backend/              
  ├── frontend/
  ├── docker-compose.yml         # Configuración para el docker                 
  └── README.md                  # Documentación del proyecto 
```


## Comandos necesarios 
Para el correcto funcionamiento del proyecto se deben instalar cada una de las librerias y herramientas que se especifican en cada documentación de las carpetas y seguir al detalle y fundamental siempre tener presente la instalación de las diferentes dependencias con el comando **npm install**

## Docker 

Para empezar se debe tener instalado y configurado docker desktop en el equipo para que el proceso se haga de la manera correcta, para poder empezar a realizar el proceso en este caso vamos a crear dos contenedores uno para la carpeta frontend y otra para la carpeta backend

El proceso del docker aunque en cada carpeta se encuentra un archivo DockerFile y .dockerignore donde el primero tiene la funcionalidad de definir la version del node y demas parametros que se requieren para el correcto proceso, mientras que el segundo cumple la función de excluir todo lo que se le ponga dentro del mismo.

y el principal archivo que se encuentra en la raiz del proyecto que es el docker-compose.yml que contiene toda la configuración general y hace el llamado a los archivos DockerFile que se encuentran en las carpetas de frontend y backend. 



```
# ejemplo del archivo docker-compose-yml
services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ./backend:/usr/src/app
      - /usr/src/app/node_modules
    environment:
      - NODE_ENV=development
    networks:
      - app-network

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "4200:4200"
    volumes:
      - ./frontend:/usr/src/app
      - /usr/src/app/node_modules
    depends_on:
      - backend
    networks:
      - app-network

networks:
  app-network:

```

una vez se tenga todo esto configurado y el docker de escritorio instalado y configurado correctamente se abre el proyecto desde la raiz y se ejecutan los siguientes comandos 

1) **docker-compose build** Comando para iniciar el proceso de contruir los contenedores. Es importante que este se haga desde la carpeta raiz, este proceso se va a tardas un tiempo considerable dependiendo si es la primera vez que se hace este proceso

2) **docker-compose up** Comando para iniciar los contenedores y para verificar que estos esten funcionando correctamente accedemos al frontend en la dirección de http://localhost:puerto que se haya asignado y de la misma forma para el backend 

3) Verificar la comunicación entre el backend y el frontend revisando cada uno de los archivos y componentes necesarios para su correcta ejecución


**Comandos adicionales para tener en cuenta**
**docker-compose down** Comando para bajar los contenedores 
** docker-compose up --build** Comando para reiniciar los contenedores 

------------------------------------------------------------- Documentación backEnd ---------------------------------------------------------------------------------------------------

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

------------------------------------------------------------------- Documentación FrontEnd -----------------------------------------------------------------------------------------

# Contenido 
## **Tecnologías usadas**


1.   **Arquitectura**
2.   **Estrcutura del proyecto**
3.   **Instalación**
4.   **Configuración**
5.   **Ejecución**
6.   **Estrcutura de los archivos clave** 
7.   **Flujo de datos**
8.   **Caracteristicas**
9.   **interfaz grafica UI**
10.  **Pruebas**
11.  **Mantenimiento**
12.  **recursos adicionales**

# Frontend - Aplicación de Gestión de Usuarios
Este proyecto es un frontend desarrolado en **Angular CLI: 19.0.7** con  **Node: 22.13.0** junto a **Package Manager: npm 10.9.2** en un sistema operativo **windows 10 x64**, el proposito de este
proyecto es consumir un microservicio por medio de un API REST que trae los usuarios que se encuentran en una base de datos Postgres y los muestra en un formulario que se compone de los campos **NOMBRE, CORREO y EDAD**.

## Tecnolgías usadas 



*   **Angular 19**
*   **Bootstrap 5**
*   **TypeScritp**
*   **HttpClient para el consumo del API**
*   **Arquitectura Standalone Components** 

## Arquitectura standalone Components 
El proyecto utiliza la arquitectura de Componentes **Standalone** de Angular, que elimina la necesidad de NgModules y permite una mejor modularización del código.
Este enfoque simplifica la arquitectura de las aplicaciones Angular al reducir la cantidad de archivos y configuraciones necesarias para configurar y organizar los componentes.

## Ventajas de los Standalone Components
    •   Menor Complejidad: No es necesario crear un módulo para cada conjunto de componentes.
    •   Carga más directa: Los componentes independientes pueden usarse directamente sin necesidad de un módulo contenedor.
    •   Aprovisionamiento más ágil: Ideal para aplicaciones pequeñas o microfrontends, donde un componente puede ser auto-suficiente.
    •   Mejor rendimiento inicial: La estructura simplificada reduce el tiempo de compilación y aumenta la claridad del código

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── app/
│   │   ├── interfaces/
│   │   │   └── user.interface.ts     # Interfaces de tipos de datos
│   │   ├── services/
│   │   │   └── user.service.ts       # Servicios para comunicación con API
│   │   ├── app.component.ts          # Componente principal
│   │   ├── app.component.html        # Template principal
│   │   ├── app.component.css         # Estilos del componente
│   │   ├── app.config.ts             # Configuración de la aplicación
│   │   └── app.routes.ts             # Configuración de rutas
│   ├── environments                  # Exportación de variables de entorno
│   │   ├── environment.prod.ts       # Variables de producción
│   │   ├── footer.component.ts       # Variables de desarrollo                      
│   ├── styles.css                    # Estilos globales
│   ├── index.html                    # Archivo HTML principal
│   └── main.ts                       # Punto de entrada
├── Angular.json                      # configuración de importaciones 
├── Dockerfile                        # configuración Docker
├── .dockerignore                     # configuración de exclusión                  
└── package.json                      # Dependencias del proyecto
```

## Instalación

*    **Clonar el repositorio**: git clone https://github.com/Jhonatan1523/Desarrollo.git
*   **Instalar dependencias**: npm install
*   **Iniciar el servidor**: npm start
*   **npm install bootstrap**: npm install bootstrap


## Configuración

*   Asegurarse de que el backend esté corriendo en http://localhost:3000
*   Verificar la configuración de la apiURL en src/environments/environments.ts
*   Verificar que la importación del componente enviroments se haga correntamente en el archivo src/app/service/user.service.ts 
*   Verificar el llamado de la URL este hecho de forma correctan en la linea private apiUrl = environment.apiURL;

## Ejecución

*   **Comando para iniciar el servidor:** se abre una terminal y se ejecuta **ng serve**, esto ejecutara todo y si no hay errores dara una url en el puerto 4200 que es el que maneja Angular por defecto **"http://localhost:4200/"**
*   Se copia y pega esa URL en el navegador de su preferencia y debe mostrar el contenido del **index.html** que es el principal y ya internamente ejecuta el **app.component.html** que se ha definido como el componente de inicio


# Estructura de archivos que son clave

## Interfaces (src/app/interfaces/user.interface.ts)
    export interface User {
    id: number;
    nombre: string;
    correo: string;
    edad: number;
    }
    Este archivo trae los campos que se van a mostrar en la pagina desde el back y por medio de *ngFor se muestran en el formulario de app.component.html

## Definición de variables de entorno (src/environment/environment.ts)
    export const environment = {
    production: false,
    apiURL: 'URL del api'
    };
    Este archivo exporta las variables de entorno definidas en el mismo a los demas componentes que lo requieran, en este caso se exporta el apiURL al servico que esta en user.service.ts
## Servicios (src/app/services/user.service.ts)
    @Injectable({
        providedIn: 'root'
    })
    export class UserService {
        // Lógica de comunicación con API
    }
    Este archivo es el servicio que se encarga de la comunicación con el api y ahi mismo se usa la variable que anteriormente se definio en enviroment.ts, esto ayuda a no exponer datos sensibles como la url del api
## Componete principal (src/app/app.component.ts)
    @Component({
        standalone: true,
        imports: [CommonModule]
    })
    export class AppComponent implements OnInit {
    // Lógica del componente
    }
    Este archivo es la logica del componente principal en donde se importan el componente html y css para poder mostrar lo visual en el navegador 


## Flujo de Datos

1.   El environments exporta las variables de entorno necesarias
2.   El servicio UserService realiza peticiones HTTP al backend
3.   El componente AppComponent consume el servicio
4.   Los datos se muestran en la vista 


## Características

*   Visualización de usuarios en formato tabla
*   Campos de formulario de solo lectura
*   Diseño responsive con Bootstrap
*   Manejo de errores en peticiones HTTP
*   Tipado fuerte con TypeScript
*   Estilos agradables a la vista con ayuda de codigo css3


## Estilos y UI

*   Utiliza Bootstrap 5 para el diseño responsive
*   Utiliza CSS3 para dar estilo a los elementos de la interfaz de usuario
*   Implementa una tabla con campos de formulario
*   Estilos personalizados para mejor visualización
*   Muestra de imagen coorporativa


## Pruebas
Para ejecutar las pruebas unitarias: **ng test** 


## Mantenimiento

*   **Actualizaciones:** Revisar regularmente las actualizaciones de dependencias **npm install**
*   **API:** Verificar la conexión con el backend esto se puede hacer con alguna herramienta de pruebas como **potsman** o verificandolo desde el navegador con la URL del api 


## Recursos Adicionales

1.   **Documentación Angular** (https://docs.angular.lat/docs)
2.   **Documentación Bootstrap** (https://getbootstrap.com/docs/5.0/getting-started/introduction/)
3.    TypeScript Handbook (https://www.typescriptlang.org/docs/handbook/intro.html)
 

**Recomendaciones finales:** el codigo se encuentra funcional y es de total importancia ejecutar cada uno de los comandos necesarios para instalar lo que se requiere para que este funcione de manera correcta, de la misma forma cuando se clone el repositorio ubicar la carpeta frontend y verificar cada componente importante como se ha especificado en este apartado



