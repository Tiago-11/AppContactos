<?php
    include("conexion.php");

    $db = conectarDB();

    if(isset($_POST['id']) && isset($_POST['nombre']) && isset($_POST['telefono']) && isset($_POST['email']) && isset($_POST['descripcion'])){
        $id = $_POST['id'];
        $nombre = $_POST['nombre'];
        $telefono = $_POST['telefono'];
        $email = $_POST['email'];
        $descripcion = $_POST['descripcion'];

        $consulta = "update contactos set nombre = ?, telefono = ?, email = ?, descripcion = ? where id = ?";
        $resultado = $db -> prepare($consulta);
        $resultado -> execute([$nombre,$telefono,$email,$descripcion,$id]);
        
        if($resultado){
            echo "OK";
        }else{
            echo "NO OK";
        }
    }

?>