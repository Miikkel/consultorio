<?php
    class Modelo_Consulta{
        private $conexion;
        function __construct(){
            require_once 'modelo_conexion.php';
            $this->conexion = new conexion();
            $this->conexion->conectar();
        }
  

        function listar_consulta($fechainicio,$fechafin){
            $sql = "call SP_LISTAR_CONSULTA('$fechainicio','$fechafin')";
			$arreglo = array();
			if ($consulta = $this->conexion->conexion->query($sql)) {
				while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                    $arreglo["data"][]=$consulta_VU;

				}
                $this->conexion->cerrar();
				return $arreglo;
			}
        }
        function listar_paciente_cita_combo(){
            $sql = "call SP_LISTAR_PACIENTE_CITA()";
			$arreglo = array();
			if ($consulta = $this->conexion->conexion->query($sql)) {
				while ($consulta_VU = mysqli_fetch_array($consulta)) {
                    $arreglo[]=$consulta_VU;
				}
                $this->conexion->cerrar();
				return $arreglo;
			}
        }
        function Registrar_Consulta($idpaciente,$descripcion,$diagnostico){
            $sql = "call SP_REGISTRAR_CONSULTA('$idpaciente','$descripcion','$diagnostico')";
			if ($consulta = $this->conexion->conexion->query($sql)) {
				return 1;

			}else{
                return 0;
            }
        }




        function Modificar_Consulta($idconsulta,$descripcion,$diagnostico){
            $sql = "call SP_MODIFICAR_CONSULTA('$idconsulta','$descripcion','$diagnostico')";
			if ($consulta = $this->conexion->conexion->query($sql)) {
            
                return 1;
			}else{
                return 0;
            }
            $this->conexion->cerrar();
        }

    }

?>