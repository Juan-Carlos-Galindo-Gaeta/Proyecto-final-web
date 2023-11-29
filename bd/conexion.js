// Importar el módulo dotenv para cargar variables de entorno desde un archivo .env
const dotenv = require('dotenv');

// Importar el módulo MongoClient de la biblioteca MongoDB
const MongoClient = require('mongodb').MongoClient;

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Variable privada para almacenar la conexión a la base de datos
let _db;

// Función para inicializar la base de datos
const initDb = (callback) => {
    // Si la conexión a la base de datos ya está establecida, se llama al callback con la conexión existente
    if (_db) {
        console.log('¡La base de datos está lista!');
        return callback(null, _db);
    }

    // Si no hay una conexión establecida, se intenta conectar a la base de datos utilizando la URI proporcionada en las variables de entorno
    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            // Si la conexión tiene éxito, se asigna a la variable _db y se llama al callback con la conexión
            _db = client;
            callback(null, _db);
        })
        .catch((err) => {
            // Si hay un error en la conexión, se llama al callback con el error
            callback(err);
        });
};
  
// Función para obtener la conexión a la base de datos
const getDb = () => {
    // Si no hay una conexión (_db), se lanza un error indicando que la base de datos no ha sido inicializada
    if (!_db) {
        throw Error('Base de datos no inicializada');
    }
    // Devuelve la conexión a la base de datos (_db)
    return _db;
};
  
// Exportar las funciones para poder utilizarlas desde otros archivos
module.exports = { initDb, getDb };