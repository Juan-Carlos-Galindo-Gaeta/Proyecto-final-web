const express = require('express'); // Importa Express para el enrutamiento
const router = express.Router(); // Crea un enrutador de Express

const ControladorVideojuegos = require('../controlador/op_videojuegos.js'); // Importa el controlador de operaciones de videojuegos

// Endpoints para operaciones CRUD de la colección Videojuegos

// Endpoint para obtener todos los videojuegos
router.get('/', ControladorVideojuegos.listaVideojuegos);

// Endpoint para obtener un videojuego por su ID
router.get('/:id', ControladorVideojuegos.obtenerVideojuegoPorId);

// Endpoint para crear un nuevo videojuego
router.post('/', ControladorVideojuegos.crearVideojuego);

// Endpoint para actualizar un videojuego existente por su ID
router.put('/:id', ControladorVideojuegos.actualizarVideojuego);

// Endpoint para eliminar un videojuego por su ID
router.delete('/:id', ControladorVideojuegos.eliminarVideojuego);

// Exporta el enrutador para su uso en otras partes de la aplicación
module.exports = router;