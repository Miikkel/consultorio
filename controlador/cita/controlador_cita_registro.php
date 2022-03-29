<?php
    require '../../modelo/modelo_cita.php';

    $MC = new Modelo_Cita();
    
    $paciente = htmlspecialchars($_POST['paciente'],ENT_QUOTES,'UTF-8');
    $doctor = htmlspecialchars($_POST['doctor'],ENT_QUOTES,'UTF-8');
    $fecha = htmlspecialchars($_POST['fecha'],ENT_QUOTES,'UTF-8');
    $descripcion = htmlspecialchars($_POST['descripcion'],ENT_QUOTES,'UTF-8');
    $idusuario = htmlspecialchars($_POST['idusuario'],ENT_QUOTES,'UTF-8');
    $consulta = $MC->Registrar_Cita($paciente,$doctor,$fecha,$descripcion,$idusuario);
    echo $consulta;

?>