<?php
    require '../../modelo/modelo_historial.php';
    $MH = new Modelo_Historial();//instanciamos
    $id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
    $idmedicamento = htmlspecialchars($_POST['idmedicamento'],ENT_QUOTES,'UTF-8');
    $cantidad = htmlspecialchars($_POST['cantidad'],ENT_QUOTES,'UTF-8');

    $arreglo_medicamento=explode(",",$idmedicamento);
    for($i=0; $i<count($arreglo_medicamento);$i++){
        $consulta=$MH->Registrar_Detalle_Medicamento($id,$arreglo_medicamento[$i],$cantidad);
    }

    echo $consulta;
   

?> 