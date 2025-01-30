window.onload = function () {
    listarCoches();
}

let listarCoches = async () => {
    const peticion = await fetch("http://localhost:8080/api/coches",
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

    const coches = await peticion.json();

    let contenidoTabla = "";

    for (let coche of coches) {
        let contenidoFila = `<tr>
        <td>${coche.id}</td>
        <td>${coche.marca}</td>
        <td>${coche.modelo}</td>
        <td>${coche.color}</td>
        <td>
      <i onClick="mostrarForm(${coche.id})"class="material-icons button edit">edit</i>
      <i onClick="borrarCoche(${coche.id})" class="material-icons button delete">delete</i>
     </td>
     </tr>`

        contenidoTabla += contenidoFila;
    }

    document.querySelector("#tabla tbody").outerHTML = contenidoTabla;
}

let borrarCoche = async (id) => {
    const peticion = await fetch("http://localhost:8080/api/coches/" + id,
        {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

    listarCoches();
}

let mostrarForm = async (id) => {

    globalId = id;

    let formulario = `<h1>Modificar Coches</h1>
    <div class="formbold-main-wrapper">
        <div class="formbold-form-wrapper">
            <form method="POST">
                <div class="formbold-input-flex">
                    <div>
                        <input type="text" name="marca" id="marca" placeholder="Marca" class="formbold-form-input" />
                        <label for="marca" class="formbold-form-label"> Marca </label>
                    </div>
                    <div>
                        <input type="text" name="modelo" id="modelo" placeholder="Modelo"
                            class="formbold-form-input" />
                        <label for="modelo" class="formbold-form-label"> Modelo</label>
                    </div>
                </div>
                <div class="formbold-input-flex">
                    <div>
                        <input type="text" name="color" id="color" placeholder="Color"
                            class="formbold-form-input" />
                        <label for="color" class="formbold-form-label"> Color </label>
                    </div>
                </div>
                <button type="button" onClick="modificarCoche(${id})" id="btnModificar" class="formbold-btn">
                    Modificar coche
                </button>
            </form>
        </div>
    </div>`;

    document.querySelector("#modificar").innerHTML = formulario;

}

let cerrarForm = async () => {
    let formulario = ``;

    document.querySelector("#modificar").innerHTML = formulario;

}

let modificarCoche = async (id) => {
    let campos = {};

    campos.id = id;
    campos.marca = document.getElementById("marca").value;
    campos.modelo = document.getElementById("modelo").value;
    campos.color = document.getElementById("color").value;

    const peticion = await fetch("http://localhost:8080/api/coches/" + id,
        {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campos)
        });

    listarCoches();
    cerrarForm();
}
