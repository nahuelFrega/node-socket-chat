const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('ingresoChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre o sala son necesarios'
            });
        }

        client.join(data.sala);

        let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala);
        let personaConectada = usuarios.getPersona(client.id);
        let personasEnSala = usuarios.getPersonasPorSala(data.sala);

        client.broadcast.to(data.sala).emit('crearMensaje', { usuario: 'Administrador', mensaje: `${ personaConectada.nombre } ingresó al chat` });
        client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonasPorSala(data.sala));

        callback(personasEnSala);

    });

    client.on('crearMensaje', (data) => {

        let usuario = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(usuario.nombre, data.mensaje);

        console.log('Mensaje usuarios:', mensaje);
        client.broadcast.to(usuario.sala).emit('crearMensaje', mensaje);

    });

    // Mensajes privados
    client.on('mensajePrivado', (data) => {

        let persona = usuarios.getPersona(client.id);

        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona, data.mensaje));

    });

    // Disconnect
    client.on('disconnect', () => {

        let personaDesconectada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaDesconectada.sala).emit('crearMensaje', crearMensaje('Admin', `${ personaDesconectada.nombre } se desconectó del chat`))
        client.broadcast.to(personaDesconectada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaDesconectada.sala));

    });

});