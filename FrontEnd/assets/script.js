let boton = document.getElementById("btnRegistrar");

boton.addEventListener("click", evento => {
    evento.preventDefault();
    registrarAlumno();
});

let registrarAlumno = async () => {

    let campos = {};

    campos.marca = document.getElementById("marca").value.toString();
    campos.modelo = document.getElementById("modelo").value;
    campos.color = document.getElementById("color").value;

    const peticion = await fetch("http://localhost:8080/api/coches",
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campos)
        });
}


/*
DIRECCION EN CLASE: "http://127.0.0.1:5500" (En la API)
DIRECCION EN CASA: "http://192.168.1.78:5500" (En la API)

URL: 
Formulario: http://192.168.1.78:5500/index.html
Tabla: http://192.168.1.78:5500/tabla.html
JSON: http://localhost:8080/api/coches

 
*/ 