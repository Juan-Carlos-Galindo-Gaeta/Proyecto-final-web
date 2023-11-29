const express = require('express'); // Importa Express para el enrutamiento
const router = express.Router(); // Crea un enrutador de Express

// Utiliza el enrutador para manejar las rutas relacionadas con '/Videojuegos' importando el enrutador del archivo 'videojuego.js'
router.use('/Videojuegos', require('./videojuego'));

// Ruta principal '/' que devuelve un mensaje de bienvenida
router.get('/', (req, res) => {
    res.send('¡Bienvenido!');
});

// Exporta el enrutador para su uso en otras partes de la aplicación
module.exports = router;