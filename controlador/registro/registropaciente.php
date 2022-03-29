<?php
use UI\Window;
require '../../modelo/modelo_reg_pa.php';


    $MP = new Modelo_Reg_Pac();
    
    $nombres = htmlspecialchars($_GET['txtnomb'],ENT_QUOTES,'UTF-8');
    $ndoc = htmlspecialchars($_GET['txtdni'],ENT_QUOTES,'UTF-8');
    $fecha = htmlspecialchars($_GET['txtfecha'],ENT_QUOTES,'UTF-8');
    $Especialidad = htmlspecialchars($_GET['txtespe'],ENT_QUOTES,'UTF-8');
    $celular = htmlspecialchars($_GET['txtcelular'],ENT_QUOTES,'UTF-8');
    $horario = htmlspecialchars($_GET['txthorario'],ENT_QUOTES,'UTF-8');
    $consulta = $MP->Registrar_Pac($nombres,$ndoc,$fecha,$Especialidad,$celular,$horario);
    
    //echo $consulta;
    header('Location:../../index.html');
    
   
 
?>