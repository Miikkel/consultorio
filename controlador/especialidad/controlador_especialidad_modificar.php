<?php
    require '../../modelo/modelo_especialidad.php';

    $ME = new Modelo_Especialidad();
    $id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
    $especialidadactual = htmlspecialchars($_POST['especialidadactual'],ENT_QUOTES,'UTF-8');
    $especialidadnuevo = htmlspecialchars($_POST['especialidadnuevo'],ENT_QUOTES,'UTF-8');
    $estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');
    $consulta = $ME->Modificar_Especialidad($id,$especialidadactual,$especialidadnuevo,$estatus);
    echo $consulta;

?>