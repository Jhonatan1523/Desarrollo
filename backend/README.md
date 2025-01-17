Comando SQL para la creacion de la tabla de la base de datos

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  correo VARCHAR(100),
  edad INT
);

insersion de datos a la tabla

INSERT INTO usuarios (nombre, correo, edad) 
VALUES 
('Juan Pérez', 'juan.perez@example.com', 30),
('María López', 'maria.lopez@example.com', 25);
('Jhonatan Murcia Posso', 'jhonatanjyyplm@gmail.com', 23),
('Juan Alberto Prilo', 'Pirlo20@gmail.com', 24);

Flujo de pasos para probar el microserrvicio con potsman

1)descargar e instalar potsman en el euqipo
http://postman.com/downloads/
iniciar sesion en el equipo local con la cuenta de postman 
2) abrir postman y crear un nuevo proyecto
Donde aparece el tipo de petición vamos a seleccionar GET 
3) en la barra de direcciones de postman escribir la url "http://localhost:3000/api/data" que es la del api que utiliza el puerto 3000
4) dar click en el boton de enviar
5) si todo salio bien deberiamos ver la respuesta de la api en la parte inferior
6) se debe ver que la respuesta es 200OK y de color verde de lo contrario hay un error