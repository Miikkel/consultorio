<?php
    class Modelo_Medicamento{
        private $conexion;
        function __construct(){
            require_once 'modelo_conexion.php';
            $this->conexion = new conexion();
            $this->conexion->conectar();
        }
  

        function listar_medicamento(){
            $sql = "call SP_MEDICAMENTO_LISTAR()";
			$arreglo = array();
			if ($consulta = $this->conexion->conexion->query($sql)) {
				while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                    $arreglo["data"][]=$consulta_VU;

				}
                $this->conexion->cerrar();
				return $arreglo;
				
			}
        }

        function listar_medicamento_paciente($id){
            $sql = "call SP_LISTAR_PACIENTE_MEDICAMENTO('$id')";
			$arreglo = array();
			if ($consulta = $this->conexion->conexion->query($sql)) {
				while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                    $arreglo["data"][]=$consulta_VU;

				}
                $this->conexion->cerrar();
				return $arreglo;
				
			}
        }

        function Registrar_Medicamento($medicamento,$alias,$stock,$estatus){
            $sql = "call SP_REGISTRAR_MEDICAMENTO('$medicamento','$alias','$stock','$estatus')";
			if ($consulta = $this->conexion->conexion->query($sql)) {
				if ($row = mysqli_fetch_array($consulta)) {
                        return $id= trim($row[0]);//RETORNA VALORES
				}
				$this->conexion->cerrar();
			}
        }

        function Modificar_medicamento($id,$medicamentoactual,$medicamentonuevo,$alias,$stock,$estatus){
            $sql = "call SP_MODIFICAR_MEDICAMENTO('$id','$medicamentoactual','$medicamentonuevo','$alias','$stock','$estatus')";
			if ($consulta = $this->conexion->conexion->query($sql)) {
				if ($row = mysqli_fetch_array($consulta)) {
                        return $id= trim($row[0]);//RETORNA VALORES
				}
				$this->conexion->cerrar();
			}

        }




    
    }

?>