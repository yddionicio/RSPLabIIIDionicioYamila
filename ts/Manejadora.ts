class Manejadora {


    public static AgregarClientes(nombre: string, apellido: string, edad: number, sexo: string) {

        let Clientes = localStorage.getItem("Clientes");
        let arrayClientes = new Array();
        if (Clientes) {
            arrayClientes = JSON.parse(Clientes);
        }

        let id: number = arrayClientes.reduce((id: number, obj: Cliente) => {
            if (id > obj.id) {
                return id;
            }
            else {
                return obj.id + 1;
            }
        }, 0);

        let cliente: Cliente = new Cliente(id, nombre, apellido, edad, sexo);
        arrayClientes.push(cliente);
        localStorage.setItem("Clientes", JSON.stringify(arrayClientes));
    }

    private static TraerClientes() {
        return new Promise<Array<Cliente>>((resolve) => {
            let Clientes = localStorage.getItem("Clientes");
            let arrayClientes = new Array();
            if (Clientes) {
                arrayClientes = JSON.parse(Clientes);

                let filtro = document.getElementById("selectFiltro");
                arrayClientes = arrayClientes.filter((datos: any) => datos.sexo == (filtro as HTMLSelectElement).value || (filtro as HTMLSelectElement).value == "Todos");
            }
            resolve(arrayClientes);
        })

    }

    public static CalcularPromedio() {
        return new Promise<number>((resolve) => {
            this.TraerClientes()
                .then(arrayClientes => {
                    let promedio = arrayClientes.reduce((edad, Cliente) => {
                        return edad + Cliente.edad;
                    }, 0) / arrayClientes.length;
                    resolve(promedio);
                });
        })

    }

    public static MostrarClientes() {

        this.TraerClientes()
            .then(arrayClientes => {

                //traigo los checkbox
                let inputs = document.getElementsByTagName('input');
                let cbx: Array<HTMLInputElement> = [];
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
                    trowHead?.appendChild(idHeader);
                }
                if (this.ObtenerCheckBoxSeleccionado(cbx, "Nombre")) {
                    nombreHeader.appendChild(document.createTextNode("Nombre"));
                    trowHead?.appendChild(nombreHeader);
                }
                if (this.ObtenerCheckBoxSeleccionado(cbx, "Apellido")) {
                    apellidoHeader.appendChild(document.createTextNode("Apellido"));
                    trowHead?.appendChild(apellidoHeader);
                }
                if (this.ObtenerCheckBoxSeleccionado(cbx, "Edad")) {
                    edadHeader.appendChild(document.createTextNode("Edad"));
                    trowHead?.appendChild(edadHeader);
                }

                thead?.appendChild(trowHead);


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
                    tbody?.appendChild(trow);
                }
            });
    }

    private static MostrarEnForm(cliente: Cliente) {
        console.log(cliente);
        (document.getElementById("labelId") as HTMLInputElement).value = cliente.id.toString();
        (document.getElementById("idNombre") as HTMLInputElement).value = cliente.nombre;
        (document.getElementById("idApellido") as HTMLInputElement).value = cliente.apellido;
        (document.getElementById("idEdad") as HTMLInputElement).value = cliente.edad.toString();
        (document.getElementById("idSexo") as HTMLSelectElement).value = cliente.sexo.toString();


    }


    private static ObtenerCheckBoxSeleccionado(array: Array<HTMLInputElement>, id: string) {
        let filtro = array.filter(checkbox => (checkbox.id == id && checkbox.checked));
        return filtro.length > 0;
    }

    public static EliminarClientes(i: number) {

        let Cliente = localStorage.getItem("Clientes");
        if (Cliente) {
            let arrayClientes = JSON.parse(Cliente);
            arrayClientes = arrayClientes.filter((c: Cliente) => c.id != i);
            localStorage.setItem("Clientes", JSON.stringify(arrayClientes));
        }

        let tabla = document.getElementById("tbody");
        while (tabla?.hasChildNodes()) {
            tabla.removeChild((tabla.lastChild as Node));
        }
        this.MostrarClientes();
    }

}