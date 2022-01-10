<?php
//EN ESTE SCRIPT NOS CONECTAREMOS A LA BASE DE DATOS DE LA APP
function conectarDB(){
    try{
        $dsn = "mysql:host=localhost;dbname=appcontactos";
        $dbh = new PDO($dsn,"root","");
        return $dbh;
    }catch (PDOException $e){
        print "<p>No se pudo conectar a la base de datos</p>";
        echo $e -> getMessage();
    }
}

//$conexion = conectarDB();

?>