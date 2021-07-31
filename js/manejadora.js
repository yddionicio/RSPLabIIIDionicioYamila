"use strict";
class Manejadora {
    static AgregarClientes(nombre, apellido, edad, sexo) {
        let Clientes = localStorage.getItem("Clientes");
        let arrayClientes = new Array();
        if (Clientes) {
            arrayClientes = JSON.parse(Clientes);
        }
        let id = arrayClientes.reduce((id, obj) => {
            if (id > obj.id) {
                return id;
            }
            else {
                return obj.id + 1;
            }
        }, 0);
        let cliente = new Cliente(id, nombre, apellido, edad, sexo);
        arrayClientes.push(cliente);
        localStorage.setItem("Clientes", JSON.stringify(arrayClientes));
    }
    static TraerClientes() {
        return new Promise((resolve) => {
            let Clientes = localStorage.getItem("Clientes");
            let arrayClientes = new Array();
            if (Clientes) {
                arrayClientes = JSON.parse(Clientes);
                let filtro = document.getElementById("selectFiltro");
                arrayClientes = arrayClientes.filter((datos) => datos.sexo == filtro.value || filtro.value == "Todos");
            }
            resolve(arrayClientes);
        });
    }
    static CalcularPromedio() {
        return new Promise((resolve) => {
            this.TraerClientes()
                .then(arrayClientes => {
                let promedio = arrayClientes.reduce((edad, Cliente) => {
                    return edad + Cliente.edad;
                }, 0) / arrayClientes.length;
                resolve(promedio);
            });
        });
    }
    static MostrarClientes() {
        this.TraerClientes()
            .then(arrayClientes => {
            //traigo los checkbox
            let inputs = document.getElementsByTagName('input');
            let cbx = [];
            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].type == 'checkbox') {
                    cbx.push(inputs[i]);
                }
            }
            //creo y agrego headers
            let thead = document.getElementById("thead");
            let trowHead = document.createElement("tr");
            let idHeader = document.createElement("th");
            let nombreHeader = document.createElement("th");
            let apellidoHeader = document.createElement("th");
            let edadHeader = document.createElement("th");
            if (this.ObtenerCheckBoxSeleccionado(cbx, "Id")) {
                idHeader.appendChild(document.createTextNode("Id"));
                trowHead === null || trowHead === void 0 ? void 0 : trowHead.appendChild(idHeader);
            }
            if (this.ObtenerCheckBoxSeleccionado(cbx, "Nombre")) {
                nombreHeader.appendChild(document.createTextNode("Nombre"));
                trowHead === null || trowHead === void 0 ? void 0 : trowHead.appendChild(nombreHeader);
            }
            if (this.ObtenerCheckBoxSeleccionado(cbx, "Apellido")) {
                apellidoHeader.appendChild(document.createTextNode("Apellido"));
                trowHead === null || trowHead === void 0 ? void 0 : trowHead.appendChild(apellidoHeader);
            }
            if (this.ObtenerCheckBoxSeleccionado(cbx, "Edad")) {
                edadHeader.appendChild(document.createTextNode("Edad"));
                trowHead === null || trowHead === void 0 ? void 0 : trowHead.appendChild(edadHeader);
            }
            thead === null || thead === void 0 ? void 0 : thead.appendChild(trowHead);
            //agrego rows
            for (let i = 0; i < arrayClientes.length; i++) {
                let ClienteObj = arrayClientes[i];
                //defino los elementos 
                let tbody = document.getElementById("tbody");
                let trow = document.createElement("tr");
                let id = document.createElement("td");
                let nombre = document.createElement("td");
                let apellido = document.createElement("td");
                let edad = document.createElement("td");
                //otorgo valores
                id.appendChild(document.createTextNode(ClienteObj.id.toString()));
                nombre.appendChild(document.createTextNode(ClienteObj.nombre));
                apellido.appendChild(document.createTextNode(ClienteObj.apellido));
                edad.appendChild(document.createTextNode(ClienteObj.edad.toString()));
                if (this.ObtenerCheckBoxSeleccionado(cbx, "Id")) {
                    trow.appendChild(id);
                }
                if (this.ObtenerCheckBoxSeleccionado(cbx, "Nombre")) {
                    trow.appendChild(nombre);
                }
                if (this.ObtenerCheckBoxSeleccionado(cbx, "Apellido")) {
                    trow.appendChild(apellido);
                }
                if (this.ObtenerCheckBoxSeleccionado(cbx, "Edad")) {
                    trow.appendChild(edad);
                }
                trow.addEventListener("click", () => {
                    this.MostrarEnForm(ClienteObj);
                });
                tbody === null || tbody === void 0 ? void 0 : tbody.appendChild(trow);
            }
        });
    }
    static MostrarEnForm(cliente) {
        console.log(cliente);
        document.getElementById("labelId").value = cliente.id.toString();
        document.getElementById("idNombre").value = cliente.nombre;
        document.getElementById("idApellido").value = cliente.apellido;
        document.getElementById("idEdad").value = cliente.edad.toString();
        document.getElementById("idSexo").value = cliente.sexo.toString();
    }
    static ObtenerCheckBoxSeleccionado(array, id) {
        let filtro = array.filter(checkbox => (checkbox.id == id && checkbox.checked));
        return filtro.length > 0;
    }
    static EliminarClientes(i) {
        let Cliente = localStorage.getItem("Clientes");
        if (Cliente) {
            let arrayClientes = JSON.parse(Cliente);
            arrayClientes = arrayClientes.filter((c) => c.id != i);
            localStorage.setItem("Clientes", JSON.stringify(arrayClientes));
        }
        let tabla = document.getElementById("tbody");
        while (tabla === null || tabla === void 0 ? void 0 : tabla.hasChildNodes()) {
            tabla.removeChild(tabla.lastChild);
        }
        this.MostrarClientes();
    }
}
