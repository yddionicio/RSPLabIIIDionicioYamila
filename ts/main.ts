
window.addEventListener("load", () => {

    document.getElementById("Agregar")?.addEventListener("click", Guardar);
    Manejadora.MostrarClientes();

    let boton = document.getElementById("idAlta");
    boton?.addEventListener("click", form);

    document.getElementById("selectFiltro")?.addEventListener("change", recargar);
    document.getElementById("Id")?.addEventListener("change", recargar);
    document.getElementById("Nombre")?.addEventListener("change", recargar);
    document.getElementById("Apellido")?.addEventListener("change", recargar);
    document.getElementById("Edad")?.addEventListener("change", recargar);
    document.getElementById("Limpiar")?.addEventListener("click", () => {
        localStorage.clear();
    });
    document.getElementById("Eliminar")?.addEventListener("click", EliminarCliente);

    document.getElementById("botonPromedio")?.addEventListener('click', CalcularPromedio);
})

function EliminarCliente() {
    let id = (document.getElementById("labelId") as HTMLInputElement).value;
    Manejadora.EliminarClientes(Number(id));
}

function CalcularPromedio() {
    Manejadora.CalcularPromedio()
        .then(promedio => {
            (document.getElementById("promedio") as HTMLLabelElement).textContent = promedio.toString();

        });

}

function recargar() {
    let tbody = document.getElementById("tbody");
    while (tbody?.hasChildNodes()) {
        tbody.removeChild((tbody.lastChild as Node));
    }


    let thead = document.getElementById("thead");
    while (thead?.hasChildNodes()) {
        thead.removeChild((thead.lastChild as Node));
    }
    Manejadora.MostrarClientes();
}


function form() {

    var form = document.getElementById("modal");

    if (form) {
        form.className = "visible";

        let Cerrar = document.getElementById("Cerrar");
        if (Cerrar) {
            Cerrar.onclick = (e) => {
                e.preventDefault();
                if (form) {
                    form.className = "invisible"
                }
            }
        }

    }

}

function Guardar() {
    Manejadora.AgregarClientes(
        (document.getElementById("idNombre") as HTMLInputElement).value,
        (document.getElementById("idApellido") as HTMLInputElement).value,
        Number((document.getElementById("idEdad") as HTMLInputElement).value),
        (document.getElementById("idSexo") as HTMLSelectElement).value
    )
}