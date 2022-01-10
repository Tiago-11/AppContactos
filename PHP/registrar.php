<?php
    include('conexion.php');

    $db = conectarDB();

    if(isset($_POST['nombreusuario']) && isset($_POST['nombre']) && isset($_POST['apellido']) && isset($_POST['contrasena'])){
        $nombreUsuario = $_POST['nombreusuario'];
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $contrasena = $_POST['contrasena'];

        $consulta = "select * from usuarios where nombre_usuario = ? && contrasena = ?";
        $resultado = $db->prepare($consulta);

        $resultado -> execute([$nombreUsuario,$contrasena]);
    
        if($resultado){
            if($resultado->rowCount() > 0){
                echo "NO OK 1";
            }else{
                $consulta = "insert into usuarios values (?,?,?,?)";
                $resultado = $db -> prepare($consulta);
                $resultado->execute([$nombreUsuario,$nombre,$apellido,$contrasena]);

                if($resultado){
                    echo "OK";
                    session_name("usuario");
                    session_start();
                    $_SESSION['nombreusuario'] = $nombreUsuario;
                }else{
                    echo "NO OK 2";
                }

            }
        }else{
            echo "NO OK 3";
        }

    }else{
        echo "Faltan parametros";
    }

?>