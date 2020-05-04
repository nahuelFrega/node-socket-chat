var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {

    socket.emit('ingresoChat', usuario, function(resp) {

        console.log('Usuarios conectados', resp);

    });
});

socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


/* Enviar información
socket.emit('crearMensaje', {
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});*/

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

socket.on('listaPersonas', function(personas) {

    console.log(personas);

});

// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {

    console.log('Mensaje privado:', mensaje);

})