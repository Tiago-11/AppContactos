<?php
    include("conexion.php");

    $db = conectarDB();

    if(isset($_POST['id'])){
        $id = $_POST['id'];


        $consulta = "delete from contactos where id = ?";
        $resultado = $db->prepare($consulta);
        $resultado -> execute([$id]);

        if($resultado){
            echo "OK";
        }else{
            echo "NO OK";
        }
    }else{
        echo "MAL";
    }
?>