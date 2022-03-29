<?php
    require '../../modelo/modelo_cita.php';

    $MC = new Modelo_Cita();
    $idcita = htmlspecialchars($_POST['idcita'],ENT_QUOTES,'UTF-8');
    $idpaciente = htmlspecialchars($_POST['idpaciente'],ENT_QUOTES,'UTF-8');
    $idespecialidad = htmlspecialchars($_POST['idespecialidad'],ENT_QUOTES,'UTF-8');
    $iddoctor = htmlspecialchars($_POST['iddoctor'],ENT_QUOTES,'UTF-8');
    $fecha = htmlspecialchars($_POST['fecha'],ENT_QUOTES,'UTF-8');
    $descripcion = htmlspecialchars($_POST['descripcion'],ENT_QUOTES,'UTF-8');
    $estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');
    $consulta = $MC->Modificar_Cita($idcita,$idpaciente,$idespecialidad,$iddoctor,$fecha,$descripcion,$estatus);
    echo $consulta;

?>