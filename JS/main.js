onload = function(){
    document.getElementsByTagName("button")[4].addEventListener("click",function(){
        anadirContacto();
    });
    recibirContactos2();
}

async function recibirContactos2(){
    try{
        const respuesta = await fetch('/CLIENTE/AppContactos/PHP/app.php');
        const datos = await respuesta.json();
        verContactos(datos);
    }catch(err){
        console.log("error de async");
    }
}


function recibirContactos(){
    $.get('/CLIENTE/AppContactos/PHP/app.php',{},function(dato){
        if(dato == "NO CONTACTOS"){
            document.getElementById("vistaContactos").innerHTML = "<b>NO TIENES CONTACTOS TDV</b>";
        }else{
            var listaContactos = JSON.parse(dato);
            verContactos(listaContactos);
        }
    })
}


function verContactos(lista){
    if(document.getElementById("vistaContactos") != undefined){
        document.getElementById("vistaContactos").remove();
    }
    var divContactos = document.createElement("div");
    document.getElementsByClassName("row")[0].appendChild(divContactos);
    divContactos.id = "vistaContactos";
    divContactos.setAttribute("class","col-lg-8 col-md-8 col-sm-12");

    var h3 = document.createElement("h3");
    divContactos.appendChild(h3);
    h3.innerText = "AGENDA";

    lista.forEach(element => {
        var div = document.createElement("div");
        document.getElementById("vistaContactos").appendChild(div);
        div.setAttribute("class","card col-lg-4 col-md-4 col-sm-6");
        div.style.width = "14rem";
        div.style.margin = "10px";
        var divBody = document.createElement("div");
        div.appendChild(divBody);
        divBody.setAttribute("class","card-body");
        var h5 = document.createElement("h5");
        h5.setAttribute("class","card-title");
        h5.innerHTML = `${element.nombre}`;
        divBody.appendChild(h5);
        for(propiedad in element){
            if(propiedad != "id"){
                var p = document.createElement("p");
                divBody.appendChild(p);
                p.setAttribute("class","card-text");
                p.innerHTML = `${element[propiedad]}`;
            }
        }
        var boton = document.createElement("button");
        divBody.appendChild(boton);
        boton.setAttribute("class","btn btn-primary");
        boton.innerText = "EDITAR";
        boton.setAttribute("data-bs-toggle","modal");
        boton.setAttribute("data-bs-target","#exampleModal");
        boton.style.marginRight = "5px";
        boton.onclick = () => mostrarModal(element);

        var boton2 = document.createElement("button");
        divBody.appendChild(boton2);
        boton2.setAttribute("class","btn btn-primary");
        boton2.innerText = "ELIMINAR";
        boton2.onclick = () => eliminarContacto(element.id);
        
    });
}


function anadirContacto(){
    var nombreContacto = document.getElementById("nombreContacto").value;
    var telefonoContacto = document.getElementById("telefono").value;
    var emailContacto = document.getElementById("email").value;
    var descripcionContacto = document.getElementById("descripcion").value;
    
    $.post('/CLIENTE/AppContactos/PHP/anadir.php',{
        nombreContacto:nombreContacto,
        telefono:telefonoContacto,
        email:emailContacto,
        descripcion:descripcionContacto
    },function(dato){
        if(dato == "OK"){
            mostrarAlerta("Contacto añadido correctamente");
            recibirContactos();
        }
    });
}

function eliminarContacto(idContacto){
    $.post("/CLIENTE/AppContactos/PHP/eliminar.php",{id:idContacto},function(dato){
        console.log(dato);
        if(dato == "OK"){
            mostrarAlerta("Contacto eliminado correctamente");
            recibirContactos();
        }else{
            mostrarAlerta("Contacto no eliminado");
        }
    });
}

function editarContacto(idContacto){
    var nombreContacto = document.getElementById("nombreContactoEditar").value;
    var telefonoContacto = document.getElementById("telefonoContactoEditar").value;
    var emailContacto = document.getElementById("emailContactoEditar").value;
    var descripcionContacto = document.getElementById("descripcionContactoEditar").value;

    $.post("/CLIENTE/AppContactos/PHP/editar.php",{
        id:idContacto,
        nombre:nombreContacto,
        telefono:telefonoContacto,
        email:emailContacto,
        descripcion: descripcionContacto
    },function(dato){
        if(dato == "OK"){
            mostrarAlerta("Contacto editado correctamente");
            recibirContactos();
        }else{
            mostrarAlerta("Contacto no editado");
        }
    });
}


function mostrarModal(contacto){
    document.getElementById("exampleModalLabel").innerHTML = `${contacto.nombre}`;
    document.getElementById("nombreContactoEditar").value = `${contacto.nombre}`;
    document.getElementById("telefonoContactoEditar").value = `${contacto.telefono}`;
    document.getElementById("emailContactoEditar").value = `${contacto.email}`;
    document.getElementById("descripcionContactoEditar").value = `${contacto.descripcion}`;

    document.getElementById("btnEditarContacto").addEventListener("click", () => editarContacto(contacto.id));
}




function mostrarAlerta(dato){
    var div = document.createElement("div");
    document.getElementById("central").insertAdjacentElement("afterbegin",div);
    div.innerHTML = `<div style='margin:5px 20px' class="alert alert-success" role="success">
    ${dato}
    </div>`;

    setTimeout(function(){
        document.getElementById("central").firstChild.remove();
    },4000);
}