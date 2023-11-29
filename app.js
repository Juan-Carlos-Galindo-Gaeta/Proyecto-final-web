const express = require('express'); // Importa Express para la creación del servidor
const bodyParser = require('body-parser'); // Importa bodyParser para analizar datos del cuerpo de las solicitudes
const mongodb = require('./bd/conexion.js'); // Importa el módulo de conexión a la base de datos MongoDB
const cors = require('cors'); // Importa CORS para permitir solicitudes entre dominios diferentes

const port = process.env.PORT || 3000; // Configura el puerto del servidor
const app = express(); // Crea una instancia de la aplicación Express

// Configuración de middleware
app
    .use(bodyParser.json()) // Analiza el cuerpo de las solicitudes como JSON
    .use(cors()) // Habilita CORS para permitir solicitudes entre dominios diferentes
    .use((req, res, next) => {
        res.setHeader('Acces-Control-Allow-Origin', '*'); // Configura las cabeceras para permitir cualquier origen
        next(); // Llama a la siguiente función en el middleware
    })
    .use('/', require('./routes')); // Utiliza las rutas definidas en el archivo 'routes.js'

// Inicializa la conexión a la base de datos MongoDB
mongodb.initDb((error, mongodb) => {
    if (error) {
        console.log(error); // Muestra un mensaje en caso de error en la conexión
    } else {
        // Si la conexión es exitosa, el servidor empieza a escuchar en el puerto especificado
        app.listen(port);
        console.log(`Conexión Exitosa en puerto: ${port}`);
    }
});