<?php
    require '../../modelo/modelo_cita.php';

    $MC = new Modelo_Cita();
    
    $paciente = htmlspecialchars($_POST['paciente'],ENT_QUOTES,'UTF-8');
    $dni = htmlspecialchars($_POST['dni'],ENT_QUOTES,'UTF-8');
    $fecha = htmlspecialchars($_POST['fecha'],ENT_QUOTES,'UTF-8');
    $especialidad = htmlspecialchars($_POST['especialidad'],ENT_QUOTES,'UTF-8');
    $cel = htmlspecialchars($_POST['cel'],ENT_QUOTES,'UTF-8');
    $horario = htmlspecialchars($_POST['horario'],ENT_QUOTES,'UTF-8');

    $consulta = $MC->Registrar_Previa($paciente,$dni,$fecha,$especialidad,$cel,$horario);
    
?>