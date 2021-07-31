"use strict";
window.addEventListener("load", () => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    (_a = document.getElementById("Agregar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", Guardar);
    Manejadora.MostrarClientes();
    let boton = document.getElementById("idAlta");
    boton === null || boton === void 0 ? void 0 : boton.addEventListener("click", form);
    (_b = document.getElementById("selectFiltro")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", recargar);
    (_c = document.getElementById("Id")) === null || _c === void 0 ? void 0 : _c.addEventListener("change", recargar);
    (_d = document.getElementById("Nombre")) === null || _d === void 0 ? void 0 : _d.addEventListener("change", recargar);
    (_e = document.getElementById("Apellido")) === null || _e === void 0 ? void 0 : _e.addEventListener("change", recargar);
    (_f = document.getElementById("Edad")) === null || _f === void 0 ? void 0 : _f.addEventListener("change", recargar);
    (_g = document.getElementById("Limpiar")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", () => {
        localStorage.clear();
    });
    (_h = document.getElementById("Eliminar")) === null || _h === void 0 ? void 0 : _h.addEventListener("click", EliminarCliente);
    (_j = document.getElementById("botonPromedio")) === null || _j === void 0 ? void 0 : _j.addEventListener('click', CalcularPromedio);
});
function EliminarCliente() {
    let id = document.getElementById("labelId").value;
    Manejadora.EliminarClientes(Number(id));
}
function CalcularPromedio() {
    Manejadora.CalcularPromedio()
        .then(promedio => {
        document.getElementById("promedio").textContent = promedio.toString();
    });
}
function recargar() {
    let tbody = document.getElementById("tbody");
    while (tbody === null || tbody === void 0 ? void 0 : tbody.hasChildNodes()) {
        tbody.removeChild(tbody.lastChild);
    }
    let thead = document.getElementById("thead");
    while (thead === null || thead === void 0 ? void 0 : thead.hasChildNodes()) {
        thead.removeChild(thead.lastChild);
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
                    form.className = "invisible";
                }
            };
        }
    }
}
function Guardar() {
    Manejadora.AgregarClientes(document.getElementById("idNombre").value, document.getElementById("idApellido").value, Number(document.getElementById("idEdad").value), document.getElementById("idSexo").value);
}
