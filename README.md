## Descripción
  Este proyecto tiene como proposito poder crear una API REST para poder manejar la informacion de una app de "Tareas" similar a un "Microsoft To Do", donde el usuario pueda inicar sesión, crear listar actualizar el estado y eliminar sus tareas.

## Requisitos previos
  ```
    1.- tener node js instalado de manera global v18 o superior
    2.- tener docker desktop instalado para levantar la imagen 
        de la base de datos postgres
    3.- instalar el CLI de Nest de manera global 
        $ npm i -g @nestjs/cl
  ```

## Instalación

ejecutar
```bash
# para instalar las dependencias de NodeJs (node_modules)
$ npm install
```

## Running the app

```bash
# para levantar la base de datos en ambiente docker
$ docker-compose up -d
# en caso de no levantar la instancia de docker y conectar la base de datos de otra manera basta con cambiar las variables de entorno y agregar las credenciales correspondientes

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

