<?php
    class Modelo_Reg_Pac{
        private $conexion;
        function __construct(){
            require_once 'modelo_conexion.php';
            $this->conexion = new conexion();
            $this->conexion->conectar();
        }
  

        function Registrar_Pac($nombres,$ndoc,$fecha,$Especialidad,$celular,$horario){
            $sql = "call SP_REGISTRAR_CITA_PREVIA('$nombres','$ndoc','$fecha','$Especialidad','$celular','$horario')";
			if ($consulta = $this->conexion->conexion->query($sql)) {
				$this->conexion->cerrar();
			}
        }

    }

?>