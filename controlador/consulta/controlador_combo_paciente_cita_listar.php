<?php
    require '../../modelo/modelo_consulta.php';
    $MC = new Modelo_Consulta();//instanciamos
    $consulta = $MC->listar_paciente_cita_combo();
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