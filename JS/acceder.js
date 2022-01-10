onload = function(){
    document.getElementsByTagName("button")[0].addEventListener("click",enviarDatos)
}

function enviarDatos(){
    var nombreusuario = document.getElementById("nombreusuario").value;
    var contrasena = document.getElementById("contrasena").value;

    if(!nombreusuario == "" || !contrasena == ""){
        $.post("/CLIENTE/AppContactos/PHP/acceder.php",{
            nombreusuario:nombreusuario,
            contrasena:contrasena
        },function(dato){
            if(dato == "USUARIO EXISTENTE"){
                location.href = "./app.html";
            }else{
                alert(dato);
            }
        });
        
    }else{
        mostrarAlerta("Rellene todos los campos");
    }
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