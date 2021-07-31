"use strict";
class Cliente extends Persona {
    constructor(id, nombre, apellido, edad, sexo) {
        super(id, nombre, apellido);
        this.edad = edad;
        this.sexo = sexo;
    }
}
