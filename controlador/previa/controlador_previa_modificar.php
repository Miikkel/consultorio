<?php
    require '../../modelo/modelo_previa_cita.php';

    $MC = new Modelo_Previa();
    $id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
    $dni = htmlspecialchars($_POST['DNI'],ENT_QUOTES,'UTF-8');
    $nombre = htmlspecialchars($_POST['nombre'],ENT_QUOTES,'UTF-8');
    $fecha = htmlspecialchars($_POST['fecha'],ENT_QUOTES,'UTF-8');
    $esp = htmlspecialchars($_POST['esp'],ENT_QUOTES,'UTF-8');
    $celular = htmlspecialchars($_POST['celular'],ENT_QUOTES,'UTF-8');
    $horario = htmlspecialchars($_POST['horario'],ENT_QUOTES,'UTF-8');
    $estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');
    $consulta = $MC->Modificar_Previa($id,$dni,$nombre,$fecha,$esp,$celular,$horario,$estatus);
    echo $consulta;

?>