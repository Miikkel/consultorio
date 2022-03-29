<?php
    require '../../modelo/modelo_historial.php';
    $MH = new Modelo_Historial();//instanciamos
    $idmedicamento = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
    $consulta = $MH->TraerStockMedicamento($idmedicamento);

    echo json_encode($consulta);
 
?>