<?php
    require '../../modelo/modelo_paciente.php';

    $MP = new Modelo_Paciente();
    $id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
    $dnia = htmlspecialchars($_POST['dnia'],ENT_QUOTES,'UTF-8');
    $dnin = htmlspecialchars($_POST['dnin'],ENT_QUOTES,'UTF-8');
    $nombre = htmlspecialchars($_POST['nombre'],ENT_QUOTES,'UTF-8');
    $apepat = htmlspecialchars($_POST['apepat'],ENT_QUOTES,'UTF-8');
    $apemat = htmlspecialchars($_POST['apemat'],ENT_QUOTES,'UTF-8');
    $direccion = htmlspecialchars($_POST['direccion'],ENT_QUOTES,'UTF-8');
    $movil = htmlspecialchars($_POST['movil'],ENT_QUOTES,'UTF-8');
    $sexo = htmlspecialchars($_POST['sexo'],ENT_QUOTES,'UTF-8');
    $estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');
    $consulta = $MP->Modificar_Paciente($id,$dnia,$dnin,$nombre,$apepat,$apemat,$direccion,$movil,$sexo,$estatus);
    echo $consulta;

?> 