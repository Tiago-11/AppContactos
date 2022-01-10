<?php
    include('conexion.php');

    $db = conectarDB();

    if(isset($_POST['nombreContacto'])){
        session_name('usuario');
        session_start();
        $nombreUsuario = $_SESSION['nombreusuario'];
        $nombreContacto = $_POST['nombreContacto'];
        $telefono = $_POST['telefono'];
        $email = $_POST['email'];
        $descripcion = $_POST['descripcion'];

        $consulta = "insert into contactos (nombre,telefono,email,descripcion,usuario) values (?,?,?,?,?)";
        $resultado = $db->prepare($consulta);
        $resultado->execute([$nombreContacto,$telefono,$email,$descripcion,$nombreUsuario]);

        if($resultado){
            echo "OK";
        }else{
            echo "NO";
        }
    }
?>