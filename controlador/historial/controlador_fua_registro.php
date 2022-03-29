<?php
    require '../../modelo/modelo_historial.php';
    $MH = new Modelo_Historial();//instanciamos
    $idhistorial = htmlspecialchars($_POST['idhistorial'],ENT_QUOTES,'UTF-8');
    $idconsulta = htmlspecialchars($_POST['idconsulta'],ENT_QUOTES,'UTF-8');
    $consulta = $MH->Registrar_Fua($idhistorial,$idconsulta);
    echo json_encode($consulta);
   

?> 