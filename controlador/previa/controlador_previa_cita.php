<?php
    require '../../modelo/modelo_previa_cita.php';
    $MC = new Modelo_Previa();//instanciamos
    $consulta = $MC->listar_cita();
    if($consulta){
        echo json_encode($consulta);
    }else{
        echo '{
		    "sEcho": 1,
		    "iTotalRecords": "0",
		    "iTotalDisplayRecords": "0",
		    "aaData": []
		}';
    }

?> 