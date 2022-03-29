<?php
    class Modelo_Historial{
        private $conexion;
        function __construct(){
            require_once 'modelo_conexion.php';
            $this->conexion = new conexion();
            $this->conexion->conectar();
        }
  

        function listar_historial($fechainicio,$fechafin){
            $sql = "call SP_LISTAR_HISTORIAL('$fechainicio','$fechafin')";
			$arreglo = array();
			if ($consulta = $this->conexion->conexion->query($sql)) {
				while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                    $arreglo["data"][]=$consulta_VU;

				}
                $this->conexion->cerrar();
				return $arreglo;
			}
        }

        function listar_historial_consulta(){
            $sql = "call SP_LISTAR_CONSULTA_HISTORIAL()";
			$arreglo = array();
			if ($consulta = $this->conexion->conexion->query($sql)) {
				while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                    $arreglo["data"][]=$consulta_VU;

				}
                $this->conexion->cerrar();
				return $arreglo;
			}
        }

        function listar_insumo_combo(){
            $sql = "call SP_LISTAR_COMBO_INSUMO()";
			$arreglo = array();
			if ($consulta = $this->conexion->conexion->query($sql)) {
				while ($consulta_VU = mysqli_fetch_array($consulta)) {
                    $arreglo[]=$consulta_VU;
				}
                $this->conexion->cerrar();
				return $arreglo;
			}
        }

        function listar_procedimiento_combo(){
            $sql = "call SP_LISTAR_COMBO_PROCEDIMIENTO";
			$arreglo = array();
			if ($consulta = $this->conexion->conexion->query($sql)) {
				while ($consulta_VU = mysqli_fetch_array($consulta)) {
                    $arreglo[]=$consulta_VU;
				}
                $this->conexion->cerrar();
				return $arreglo;
			}
        }
        function listar_medicamento_combo(){
            $sql = "call SP_LISTAR_COMBO_MEDICAMENTO()";
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

        function TraerStockMedicamento($idmedicamento){
            $sql = "call SP_TRAER_STOCK_MEDICAMENTO('$idmedicamento')";
			$arreglo = array();
			if ($consulta = $this->conexion->conexion->query($sql)) {
				while ($consulta_VU = mysqli_fetch_array($consulta)) {
                    $arreglo[]=$consulta_VU;
				}
                $this->conexion->cerrar();
				return $arreglo;
			}
        }

        function TraerStockInsumo($idmedicamento){
            $sql = "call SP_TRAER_STOCK_INSUMO('$idmedicamento')";
			$arreglo = array();
			if ($consulta = $this->conexion->conexion->query($sql)) {
				while ($consulta_VU = mysqli_fetch_array($consulta)) {
                    $arreglo[]=$consulta_VU;
				}
                $this->conexion->cerrar();
				return $arreglo;
			}
        }
        

        function Registrar_Fua($idhistorial,$idconsulta){
            $sql = "call SP_REGISTRAR_FUA('$idhistorial','$idconsulta')";
			$arreglo = array();
			if ($consulta = $this->conexion->conexion->query($sql)) {
				while ($consulta_VU = mysqli_fetch_array($consulta)) {
                    $arreglo[]=$consulta_VU;
				}
                $this->conexion->cerrar();
				return $arreglo;
			}

        }

        function Registrar_Detalle_Procedimiento($id,$arreglo_procedimiento){
            $sql = "call SP_REGISTRAR_DETALLE_PROCEDIMIENTO('$id','$arreglo_procedimiento')";
				if ($consulta = $this->conexion->conexion->query($sql)) {
                    return 1;
    
                }else{
                    return 0;
                }

        }

        function Registrar_Detalle_Medicamento($id,$arreglo_medicamento,$cantidad){ 
            $sql = "call SP_REGISTRAR_DETALLE_MEDICAMENTO('$id','$arreglo_medicamento','$cantidad')";
				if ($consulta = $this->conexion->conexion->query($sql)) {
                    return 1;
    
                }else{
                    return 0;
                }

        }
        function Registrar_Detalle_Insumo($id,$arreglo_insumo,$cantidad){ 
            $sql = "call SP_REGISTRAR_DETALLE_INSUMO('$id','$arreglo_insumo','$cantidad')";
				if ($consulta = $this->conexion->conexion->query($sql)) {
                    return 1;
    
                }else{
                    return 0;
                }

        }
        
        function listar_detalle_procedimiento($id){
            $sql = "call SP_LISTAR_PROCEDIMIENTO_DETALLE('$id')";
			$arreglo = array();
			if ($consulta = $this->conexion->conexion->query($sql)) {
				while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                    $arreglo["data"][]=$consulta_VU;

				}
                $this->conexion->cerrar();
				return $arreglo;
			}
        }

        function listar_detalle_insumo($id){
            $sql = "call SP_LISTAR_INSUMO_DETALLE('$id')";
			$arreglo = array();
			if ($consulta = $this->conexion->conexion->query($sql)) {
				while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                    $arreglo["data"][]=$consulta_VU;

				}
                $this->conexion->cerrar();
				return $arreglo;
			}
        }

        function listar_detalle_medicamento($id){
            $sql = "call SP_LISTAR_MEDICAMENTO_DETALLE('$id')";
			$arreglo = array();
			if ($consulta = $this->conexion->conexion->query($sql)) {
				while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                    $arreglo["data"][]=$consulta_VU;

				}
                $this->conexion->cerrar();
				return $arreglo;
			}
        }
       

    }

?>