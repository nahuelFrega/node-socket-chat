class Usuarios {

    constructor() {
        this.personas = [];
    }

    // Permite agregar personas al chat
    agregarPersona(id, nombre, sala) {

        let persona = {
            id,
            nombre,
            sala
        };

        this.personas.push(persona);

        return this.personas;

    }

    // Obtener una persona por su id
    getPersona(id) {

        let persona = this.personas.filter(persona => persona.id === id)[0];

        return persona;

    }

    // Obtener a todas las personas
    getPersonas() {
        return this.personas;
    }

    // Obtener las personas de una sala especifica
    getPersonasPorSala(sala) {

        let personasEnSala = this.personas.filter(persona => persona.sala === sala);

        return personasEnSala;

    }

    // Eliminar a una persona del array personas
    borrarPersona(id) {

        let personaBorrada = this.getPersona(id);

        // Se re-define el valor de personas, filtrando por el ID que se esta buscando al utilizar !=
        this.personas = this.personas.filter(persona => persona.id != id);

        return personaBorrada;

    }

}


module.exports = {
    Usuarios
}