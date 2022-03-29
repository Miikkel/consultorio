<?php
    class Modelo_Previa{
        private $conexion;
        function __construct(){
            require_once 'modelo_conexion.php';
            $this->conexion = new conexion();
            $this->conexion->conectar();
        }
  

        function listar_cita(){
            $sql = "call SP_LISTAR_CITA_PREVIA()";
			$arreglo = array();
			if ($consulta = $this->conexion->conexion->query($sql)) {
				while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                    $arreglo["data"][]=$consulta_VU;

				}
                $this->conexion->cerrar();
				return $arreglo;
			}
        }
        
        function listar_paciente_combo(){
            $sql = "call SP_LISTAR_PACIENTE_COMBO()";
			$arreglo = array();
			if ($consulta = $this->conexion->conexion->query($sql)) {
				while ($consulta_VU = mysqli_fetch_array($consulta)) {
                    $arreglo[]=$consulta_VU;
				}
                $this->conexion->cerrar();
				return $arreglo;
			}
        }
        
        function listar_especialidad_combo(){
            $sql = "call SP_LISTAR_ESPECIALIDAD_COMBO()";
			$arreglo = array();
			if ($consulta = $this->conexion->conexion->query($sql)) {
				while ($consulta_VU = mysqli_fetch_array($consulta)) {
                    $arreglo[]=$consulta_VU;
				}
                $this->conexion->cerrar();
				return $arreglo;
			}
        }
        
        function listar_doctor_combo($id){
            $sql = "call SP_LISTAR_DOCTOR_COMBO('$id')";
			$arreglo = array();
			if ($consulta = $this->conexion->conexion->query($sql)) {
				while ($consulta_VU = mysqli_fetch_array($consulta)) {
                    $arreglo[]=$consulta_VU;
				}
               
				return $arreglo;
                 $this->conexion->cerrar();
			}
        }
        
        function Registrar_Cita($paciente,$doctor,$fecha,$descripcion,$idusuario)
        {
            $sql = "call SP_REGISTRAR_CITA('$paciente','$doctor','$fecha','$descripcion','$idusuario')";
			if ($consulta = $this->conexion->conexion->query($sql)) {
				if ($row = mysqli_fetch_array($consulta)) {
                        return $id= trim($row[0]);//RETORNA VALORES
				}
				$this->conexion->cerrar();
			}
        }

        function Modificar_Previa($id,$dni,$nombre,$fecha,$esp,$celular,$horario,$estatus){
            $sql="UPDATE previa_cita SET NombreCom ='$nombre', DNI='$dni', Fecha ='$fecha', Especialidad ='$esp', Celular ='$celular', Horario ='$horario', Estatus ='$estatus' WHERE ID='$id';";
			if ($consulta = $this->conexion->conexion->query($sql)) {
                return 1;
			}else{
                return 0;
            }
            $this->conexion->cerrar();
        }


    
    }

?>