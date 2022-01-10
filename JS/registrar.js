function enviarDatosRegistro(){
    var nombreUsuario = document.getElementById("nombreusuario").value;
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var contrasena = document.getElementById("contrasena").value;

    $.post('/CLIENTE/AppContactos/PHP/registrar.php',{
        nombreusuario:nombreUsuario,
        nombre:nombre,
        apellido:apellido,
        contrasena:contrasena
    },function(dato){
        if(dato == "OK"){
            location.href = "app.html";
        }else{
            mostrarAlerta("Usuario ya existente");
            console.log(dato);
        }
    });
}

onload = function(){
    document.getElementById("btnRegistrar").addEventListener("click",enviarDatosRegistro);
}


function mostrarAlerta(dato){
    var div = document.createElement("div");
    document.getElementById("central").insertAdjacentElement("afterbegin",div);
    div.innerHTML = `<div style='margin:5px 20px' class="alert alert-danger" role="alert">
    ${dato}
    </div>`;

    setTimeout(function(){
        document.getElementById("central").firstChild.remove();
    },4000);
}