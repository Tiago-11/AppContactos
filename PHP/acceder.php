<?php
    include('conexion.php');


    if(isset($_POST['nombreusuario']) && isset($_POST['contrasena'])){
        $db = conectarDB();

        $nombreUsuario = $_POST['nombreusuario'];
        $contrasena = $_POST['contrasena'];

        $consulta = "select * from usuarios where nombre_usuario = ? && contrasena = ?";
        $resultado = $db->prepare($consulta);
        $resultado -> execute([$nombreUsuario,$contrasena]);
        
        if($resultado){
            if($resultado->rowCount() > 0){
                echo "USUARIO EXISTENTE";
                session_name("usuario");
                session_start();
                $_SESSION['nombreusuario'] = $nombreUsuario;
            }else{
                echo "USUARIO NO EXISTENTE";
            }
        }else{
            echo "mala consulta";
        }
    }else{
        header("Location:/CLIENTE/AppContactos/PHP/index.html");
        exit();
    }

?>