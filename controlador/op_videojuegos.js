const { ObjectId } = require('mongodb'); // Importa el ObjectId de MongoDB para trabajar con IDs
const mongodb = require('../bd/conexion.js'); // Importa el módulo de conexión a la base de datos

// Función para listar todos los videojuegos existentes en la base de datos y retornarlos en formato JSON
const listaVideojuegos = async (req, res, next) => {
    try {
        const result = await mongodb.getDb().db().collection('Videojuegos').find();
        console.log('Trayendo Videojuegos');
        result.toArray().then((videojuegos) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(videojuegos);
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los videojuegos', error: error.message });
    }
};

// Función para obtener un videojuego por su ID
const obtenerVideojuegoPorId = async (req, res, next) => {
    const videojuegoId = req.params.id;
    try {
        const result = await mongodb.getDb().db().collection('Videojuegos').findOne({ id: parseInt(videojuegoId) });
        if (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Videojuego no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el videojuego', error: error.message });
    }
};

// Función para crear un nuevo videojuego
const crearVideojuego = async (req, res, next) => {
    const { Nombre_Usuario, Juegos_Favoritos, Genero_Favoritos, Personaje_Favorito } = req.body;
    const nuevoVideojuego = {
        Nombre_Usuario,
        Juegos_Favoritos,
        Genero_Favoritos,
        Personaje_Favorito
    };

    try {
        const response = await mongodb.getDb().db().collection('Videojuegos').insertOne(nuevoVideojuego);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json({ message: 'Error al crear el nuevo Videojuego' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el nuevo Videojuego', error: error.message });
    }
};

// Función para actualizar un videojuego existente por su ID
const actualizarVideojuego = async (req, res, next) => {
    const videojuegoId = req.params.id;
    const { Nombre_Usuario, Juegos_Favoritos, Genero_Favoritos, Personaje_Favorito } = req.body;
    const datosVideojuego = {
        Nombre_Usuario,
        Juegos_Favoritos,
        Genero_Favoritos,
        Personaje_Favorito
    };

    try {
        const response = await mongodb.getDb().db().collection('Videojuegos')
            .updateOne({ id: parseInt(videojuegoId) }, { $set: datosVideojuego });

        if (response.modifiedCount > 0) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ message: 'Videojuego no encontrado o datos no modificados' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el Videojuego', error: error.message });
    }
};

// Función para eliminar un videojuego por su ID
const eliminarVideojuego = async (req, res, next) => {
    const videojuegoId = req.params.id;

    try {
        const response = await mongodb.getDb().db().collection('Videojuegos')
            .deleteOne({ id: parseInt(videojuegoId) });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Videojuego eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Videojuego no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el Videojuego', error: error.message });
    }
};

// Exporta todas las funciones para su uso en otros módulos
module.exports = {listaVideojuegos,obtenerVideojuegoPorId,crearVideojuego,actualizarVideojuego,eliminarVideojuego};