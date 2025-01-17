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