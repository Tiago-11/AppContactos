<?php
    include('conexion.php');

    $db = conectarDB();

    // $consulta = "select * from usuarios";
    // $resultado = $db->query($consulta);
    // $arrayUsuarios = array();
    // if($resultado){
    //     while($columna = $resultado->fetch(PDO::FETCH_ASSOC)){
    //         $arrayUsuarios[] = array_map('utf8_encode',$columna);
    //     }
    //     echo json_encode($arrayUsuarios);
    // }else{
    //     echo "La consulta fue mal";
    // }

    
    session_name("usuario");
    session_start();
    $nombreUsuario = $_SESSION['nombreusuario'];

    $consulta = "select id,nombre,telefono,email,descripcion from contactos where usuario = ?";
    $resultado = $db->prepare($consulta);
    $resultado->execute([$nombreUsuario]);
    if($resultado){
        if($resultado->rowCount() > 0){
            $listaContactos = array();
            while($columna = $resultado->fetch(PDO::FETCH_ASSOC)){
                $listaContactos[] = array_map('utf8_encode',$columna);
            }
            echo json_encode($listaContactos);
        }else{
            echo "NO CONTACTOS";
        }
    }else{
        echo "CONSULTA MALA";
    }

?>