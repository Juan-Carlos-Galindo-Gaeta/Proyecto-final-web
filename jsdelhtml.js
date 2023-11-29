// Función para mostrar un mensaje en el contenedor 'resultado'
function mostrarMensaje(resultado) {
    const mensaje = document.getElementById('resultado');
    mensaje.innerHTML = `<p>${resultado}</p>`;
}

// Función para enviar solicitudes al servidor utilizando Fetch
function enviarSolicitud(url, method, bodyData) {
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(data => {
        // Si hay un mensaje en la respuesta, muestra ese mensaje
        if (data.message) {
            mostrarMensaje(data.message);
        } else {
            // Si no hay mensaje, muestra los datos recibidos como string
            mostrarMensaje(JSON.stringify(data));
        }
    })
    .catch(error => {
        // Muestra un mensaje de error en caso de error en la solicitud
        mostrarMensaje('Error: ' + error.message);
    });
}

// Event listener para el formulario de creación de videojuego
document.getElementById('crearVideojuego').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe por defecto
    
    // Obtiene los valores de los campos del formulario
    const nombreUsuario = document.getElementById('nombreUsuario').value;
    const juegosFavoritos = document.getElementById('juegosFavoritos').value;
    const generoFavoritos = document.getElementById('generoFavoritos').value;
    const personajeFavorito = document.getElementById('personajeFavorito').value;

    // Crea un objeto con los datos del formulario
    const bodyData = {
        Nombre_Usuario: nombreUsuario,
        Juegos_Favoritos: juegosFavoritos,
        Genero_Favoritos: generoFavoritos,
        Personaje_Favorito: personajeFavorito
    };

    // Envía la solicitud POST al servidor para crear un nuevo videojuego
    enviarSolicitud('http://localhost:3000/videojuegos', 'POST', bodyData);
});

// Event listener para el formulario de eliminación de videojuego
document.getElementById('eliminarVideojuego').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe por defecto

    // Obtiene el ID del videojuego a eliminar
    const id = document.getElementById('eliminarId').value;

    // Envía la solicitud DELETE al servidor para eliminar un videojuego por su ID
    enviarSolicitud(`http://localhost:3000/videojuegos/${id}`, 'DELETE', {});
});

// Event listener para el formulario de actualización de videojuego
document.getElementById('actualizarVideojuego').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe por defecto

    // Obtiene el ID y los nuevos datos del videojuego a actualizar
    const id = document.getElementById('actualizarId').value;
    const nuevoNombreUsuario = document.getElementById('nuevoNombreUsuario').value;
    const nuevosJuegosFavoritos = document.getElementById('nuevosJuegosFavoritos').value;
    const nuevoGeneroFavorito = document.getElementById('nuevoGeneroFavorito').value;
    const nuevoPersonajeFavorito = document.getElementById('nuevoPersonajeFavorito').value;

    // Crea un objeto con los nuevos datos del videojuego
    const bodyData = {
        Nombre_Usuario: nuevoNombreUsuario,
        Juegos_Favoritos: nuevosJuegosFavoritos,
        Genero_Favoritos: nuevoGeneroFavorito,
        Personaje_Favorito: nuevoPersonajeFavorito
    };

    // Envía la solicitud PUT al servidor para actualizar un videojuego por su ID
    enviarSolicitud(`http://localhost:3000/videojuegos/${id}`, 'PUT', bodyData);
});

// Event listener para el formulario de búsqueda de videojuego por ID
document.getElementById('buscarPorId').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe por defecto

    // Obtiene el ID del videojuego a buscar
    const id = document.getElementById('buscarId').value;

    // Envía la solicitud GET al servidor para buscar un videojuego por su ID
    fetch(`http://localhost:3000/videojuegos/${id}`)
        .then(response => response.json())
        .then(data => {
            // Muestra los datos del videojuego en el contenedor 'resultado'
            const resultado = document.getElementById('resultado');
            resultado.innerHTML = `
                <h2>Datos del videojuego</h2>
                <p>ID: ${data._id}</p>
                <p>Nombre de Usuario: ${data.Nombre_Usuario}</p>
                <p>Juegos Favoritos: ${data.Juegos_Favoritos}</p>
                <p>Género Favorito: ${data.Genero_Favoritos}</p>
                <p>Personaje Favorito: ${data.Personaje_Favorito}</p>
            `;
        })
        .catch(error => {
            // Muestra un mensaje de error en caso de error en la solicitud
            mostrarMensaje('Error al buscar el videojuego: ' + error.message);
        });
});