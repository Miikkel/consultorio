-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-03-2022 a las 20:30:44
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_misalud`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_INTENTO_USUARIO` (IN `USUARIO` VARCHAR(50))  BEGIN
DECLARE INTENTO INT;
SET @INTENTO=(SELECT usu_intento FROM usuario WHERE usu_nombre=USUARIO);
IF @INTENTO= 2 THEN
	SELECT @INTENTO;
ELSE
	UPDATE usuario set usu_intento=@INTENTO+1 WHERE usu_nombre=USUARIO;
    SELECT @INTENTO;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_CITA` ()  SELECT c.cita_id,c.cita_nroatencion,c.cita_estatus,c.cita_feregistro,c.agenda_fecha,p.paciente_id,
CONCAT_WS(' ',p.paciente_nombre,p.paciente_apepat,p.paciente_apemat) as paciente,c.cita_descripcion, c.medico_id,CONCAT_WS(' ',m.medico_nombre,m.medico_apepat,m.medico_apemat) as medico FROM cita as c INNER JOIN paciente as p on c.paciente_id=p.paciente_id INNER JOIN medico as m ON c.medico_id=m.medico_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_CITA_PREVIA` ()  SELECT * FROM previa_cita$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_COMBO_ESPECIALIDAD` ()  SELECT * FROM especialidad WHERE especialidad_estatus='ACTIVO'$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_COMBO_INSUMO` ()  SELECT
i.insumo_id,
i.insumo_nombre
FROM insumo AS i$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_COMBO_MEDICAMENTO` ()  SELECT
m.medicamento_id,
m.medicamento_nombre
FROM
medicamento as m$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_COMBO_PROCEDIMIENTO` ()  SELECT
p.procedimiento_id,
p.procedimiento_nombre
FROM
procedimiento AS p$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_COMBO_ROL` ()  SELECT
rol.rol_id,
rol.rol_nombre
FROM
rol$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_CONSULTA` (IN `FECHAINICIO` DATE, IN `FECHAFIN` DATE)  SELECT
 cm.consulta_id,
 cm.consulta_descripcion,
 cm.consulta_diagnostico,
 cm.consulta_feregistro,
 cm.consulta_estatus,
 c.cita_nroatencion,
 c.cita_feregistro,
 c.medico_id,
 c.especialidad_id,
 c.paciente_id,
 c.cita_estatus,
 c.cita_descripcion,
 c.usu_id,
 CONCAT_WS(' ',p.paciente_nombre,p.paciente_apepat,p.paciente_apemat) as paciente,
 p.paciente_nombre,
 p.paciente_apepat,
 p.paciente_apemat,
 p.paciente_nrodocumento,
 p.paciente_id,
 CONCAT_WS(' ',m.medico_nombre,m.medico_apepat,m.medico_apemat) as medico,
 m.medico_nombre,
 m.medico_apepat,
 m.medico_apemat,
 e.especialidad_nombre
 FROM
 consulta_medica as cm
 INNER JOIN
 cita as c
 ON	
 	cm.cita_id=c.cita_id
 INNER JOIN
 paciente as p
 ON
 	c.paciente_id=p.paciente_id
 INNER JOIN
 medico as m
 ON
 	c.medico_id=m.medico_id
 INNER JOIN
 especialidad as e
 ON
 	c.especialidad_id=e.especialidad_id
    WHERE cm.consulta_feregistro BETWEEN FECHAINICIO AND FECHAFIN$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_CONSULTA_HISTORIAL` ()  SELECT 
cm.consulta_id,
cm.consulta_descripcion,
cm.consulta_diagnostico,
cm.consulta_feregistro,
CONCAT_WS(' ',p.paciente_nombre,p.paciente_apepat,p.paciente_apemat) AS paciente,
h.historia_id,
p.paciente_nrodocumento,
c.cita_feregistro
FROM
	consulta_medica as cm
    INNER JOIN
    cita AS c
    ON cm.cita_id=c.cita_id
    INNER JOIN
    paciente as p
    ON
    c.paciente_id=p.paciente_id
    INNER JOIN
    historia as h
    ON
    p.paciente_id=h.paciente_id
    WHERE c.agenda_fecha=CURRENT_DATE$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_DOCTOR_COMBO` (IN `ID` INT)  SELECT medico_id,CONCAT_WS(' ',medico_nombre,medico_apepat,medico_apemat) FROM medico WHERE especialidad_id=ID$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_ESPECIALIDAD` ()  SELECT * FROM especialidad$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_ESPECIALIDAD_COMBO` ()  SELECT especialidad_id,especialidad_nombre FROM especialidad$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_HISTORIAL` (IN `FECHAINICIO` DATE, IN `FECHAFIN` DATE)  SELECT 
f.fua_id,
f.fua_fregistro,
f.historia_id,
f.consulta_id,
cm.consulta_diagnostico,
CONCAT_WS(' ',p.paciente_nombre,p.paciente_apepat,p.paciente_apemat) as paciente,
p.paciente_nombre,
p.paciente_apepat,
p.paciente_apemat,
p.paciente_nrodocumento,
CONCAT_WS(' ',m.medico_nombre,m.medico_apepat,m.medico_apemat) as medico,
m.medico_nombre,
m.medico_apepat,
m.medico_apemat
FROM fua AS f
INNER JOIN
	consulta_medica as cm
    ON f.consulta_id=cm.consulta_id
INNER JOIN
	cita as c
    ON cm.cita_id=c.cita_id
INNER JOIN
	paciente as p
    ON c.paciente_id=p.paciente_id
INNER JOIN
	medico as m
    ON c.medico_id=m.medico_id
WHERE f.fua_fregistro BETWEEN FECHAINICIO AND FECHAFIN$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_INSUMOS` ()  SELECT * FROM insumo$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_INSUMO_DETALLE` (IN `IDFUA` INT)  SELECT
	i.insumo_nombre,
    di.detain_cantidad
FROM 
	detalle_insumo as di
    INNER JOIN
    insumo as i
    ON
    di.insumo_id=i.insumo_id
    WHERE di.fua_id=IDFUA$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_MEDICAMENTO_DETALLE` (IN `IDFUA` INT)  SELECT
dm.detame_cantidad,
m.medicamento_nombre
FROM
	detalle_medicamento as dm
    INNER JOIN
    medicamento as m
    ON
    dm.medicamento_id=m.medicamento_id
    WHERE dm.fua_id=IDFUA$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_MEDICO` ()  SELECT 
m.medico_nombre,
m.medico_apepat,
m.medico_apemat,
m.medico_id,
CONCAT_WS('',medico_nombre,' ',medico_apepat,' ',medico_apemat) as medico,
m.medico_direccion,
m.medico_movil,
m.medico_sexo,
m.medico_fnac,
m.medico_nrodocumento,
m.medico_colegiatura,
m.usu_id,
e.especialidad_nombre,
u.usu_nombre,
u.rol_id,
u.usu_email
FROM
medico as m INNER JOIN especialidad as e ON m.especialidad_id=e.especialidad_id INNER JOIN usuario as u ON m.usu_id=u.usu_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_MEDICO_ATENCIONES` (IN `ID` INT)  SELECT
CONCAT_WS(' ',p.paciente_nombre,p.paciente_apepat,p.paciente_apemat) as paciente,
c.agenda_fecha
 FROM
  medico as m
 INNER JOIN
  cita as c
 ON 
 	m.medico_id=c.medico_id
 INNER JOIN
 	paciente as p
  ON
 	c.paciente_id=p.paciente_id
 WHERE m.medico_id=ID$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_PACIENTE` ()  SELECT CONCAT_WS(' ', paciente_nombre,paciente_apepat,paciente_apemat) as paciente,
p.paciente_id,
p.paciente_nombre,
p.paciente_apepat,
p.paciente_apemat,
p.paciente_direccion,
p.paciente_movil,
p.paciente_sexo,
p.paciente_nrodocumento,
p.paciente_estatus
FROM paciente as p$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_PACIENTE_CITA` ()  SELECT
c.cita_id,
c.cita_nroatencion,
CONCAT_WS(' ',p.paciente_nombre,p.paciente_apepat,p.paciente_apemat)
as paciente
FROM
cita as c INNER JOIN paciente as p
ON
c.paciente_id=p.paciente_id
WHERE c.agenda_fecha=CURRENT_DATE AND c.cita_estatus='PENDIENTE'$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_PACIENTE_COMBO` ()  SELECT paciente_id,CONCAT_WS(' ',paciente_nombre,paciente_apepat,paciente_apemat) from paciente$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_PACIENTE_MEDICAMENTO` (IN `ID` INT)  SELECT
f.fua_fregistro as fecha,
CONCAT_WS(' ',p.paciente_nombre,p.paciente_apepat,p.paciente_apemat) as paciente,
CONCAT_WS(' ',me.medico_nombre,me.medico_apepat,me.medico_apemat) as medico,
dm.detame_cantidad as cantidad,
m.medicamento_nombre as medicamento
 FROM
  medicamento as m
 INNER JOIN
  detalle_medicamento as dm
 ON	
 	m.medicamento_id=dm.medicamento_id
 INNER JOIN
	fua as f
 ON
 	dm.fua_id=f.fua_id
 INNER JOIN
 	historia as h
 ON 
 	f.historia_id=h.historia_id
 INNER JOIN
 	paciente as p
 ON 
 	h.paciente_id=p.paciente_id
 INNER JOIN
 	cita as c
 ON 
 	p.paciente_id=c.cita_id
 INNER JOIN
 	medico as me
 ON c.medico_id=me.medico_id
WHERE m.medicamento_id=ID$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_PROCEDIMIENTO` ()  SELECT * FROM procedimiento$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_PROCEDIMIENTO_DETALLE` (IN `IDFUA` INT)  SELECT
p.procedimiento_nombre
FROM
	detalle_procedimiento as dp
    INNER JOIN
    procedimiento as p
    ON
    dp.procedimiento_id=p.procedimiento_id
    WHERE dp.fua_id=IDFUA$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_USUARIO` ()  BEGIN
DECLARE CANTIDAD INT;
SET @CANTIDAD:=0;
    SELECT 
    @CANTIDAD:=@CANTIDAD+1 AS posicion,
    usuario.usu_id,
    usuario.usu_nombre,
    usuario.usu_sexo,
    usuario.rol_id,
    usuario.usu_estatus,
    rol.rol_nombre,
    usuario.usu_email
    FROM
    usuario
    INNER JOIN rol ON usuario.rol_id=rol.rol_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MEDICAMENTO_LISTAR` ()  SELECT * FROM medicamento$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_CITA` (IN `IDCITA` INT, IN `IDPACIENTE` INT, IN `IDESPECIALIDAD` INT, IN `IDDOCTOR` INT, IN `FECHA` DATE, IN `DESCRIPCION` TEXT, IN `ESTATUS` CHAR(12))  BEGIN
DECLARE VALIDARF INT;
DECLARE F DATE;
SET @VALIDARF=(SELECT COUNT(*) FROM cita WHERE agenda_fecha=FECHA AND paciente_id=IDPACIENTE);
SET @F=(SELECT cita.agenda_fecha FROM cita WHERE agenda_fecha=FECHA);
IF @VALIDARF=0 THEN
    UPDATE cita SET 
    paciente_id=IDPACIENTE,
    medico_id=IDDOCTOR,
    especialidad_id=IDESPECIALIDAD,
    agenda_fecha=FECHA,
    cita_descripcion=DESCRIPCION,
    cita_estatus=ESTATUS
    WHERE cita_id=IDCITA;
    SELECT 1;
ELSE
	IF @VALIDARF=1 AND @F=FECHA THEN
    	UPDATE cita SET 
        paciente_id=IDPACIENTE,
        medico_id=IDDOCTOR, 
        especialidad_id=IDESPECIALIDAD,
        cita_descripcion=DESCRIPCION,
        cita_estatus=ESTATUS
        WHERE cita_id=IDCITA;
        SELECT 1;
    ELSE 
    	SELECT 2;
    END IF;
	SELECT 1;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_CONSULTA` (IN `IDCONSULTA` INT, IN `DESCRIPCION` TEXT, IN `DIAGNOSTICO` TEXT)  UPDATE consulta_medica SET
consulta_descripcion=DESCRIPCION,
consulta_diagnostico=DIAGNOSTICO
WHERE consulta_id=IDCONSULTA$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_CONTRA_USUARIO` (IN `IDUSUARIO` INT, IN `CONTRA` VARCHAR(250))  UPDATE usuario SET
usu_contrasena=CONTRA
WHERE usu_id=IDUSUARIO$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_DATOS_USUARIO` (IN `IDUSUARIO` INT, IN `SEXO` CHAR(1), IN `IDROL` INT, IN `EMAIL` VARCHAR(250))  UPDATE usuario SET
usu_sexo=SEXO,
rol_id=IDROL,
usu_email=EMAIL
WHERE usu_id=IDUSUARIO$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_ESPECIALIDAD` (IN `ID` INT, IN `ESPECIALIDADACTUAL` VARCHAR(50), IN `ESPECIALIDADNUEVA` VARCHAR(50), IN `ESTATUS` VARCHAR(10))  BEGIN
DECLARE CANTIDAD INT;

IF ESPECIALIDADACTUAL=ESPECIALIDADNUEVA THEN
	UPDATE especialidad
    SET
    especialidad_estatus=ESTATUS
    WHERE especialidad_id=ID;
    SELECT 1;
ELSE
	SET @CANTIDAD=
    (SELECT COUNT(*) FROM especialidad 
     WHERE especialidad_nombre=ESPECIALIDADNUEVA);
     IF @CANTIDAD=0 THEN
     	UPDATE especialidad SET
     	especialidad_nombre=ESPECIALIDADNUEVA,
        especialidad_estatus=ESTATUS
        WHERE especialidad_id=ID;
        SELECT 1;
	 ELSE
     	SELECT 2;
     END IF;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_ESTATUS_USUARIO` (IN `IDUSUARIO` INT, IN `ESTATUS` VARCHAR(20))  UPDATE usuario SET
usu_estatus=ESTATUS
WHERE usu_id=IDUSUARIO$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_INSUMO` (IN `ID` INT, IN `INSUMOACTUAL` VARCHAR(50), IN `INSUMONUEVO` VARCHAR(50), IN `STOCK` INT, IN `ESTATUS` VARCHAR(10))  BEGIN
DECLARE CANTIDAD INT;

IF INSUMOACTUAL=INSUMONUEVO THEN
	UPDATE insumo SET insumo_stock=STOCK,
    insumo_estatus=ESTATUS WHERE insumo_id=ID;
    SELECT 1;
ELSE
SET @CANTIDAD=(SELECT COUNT(*) FROM insumo WHERE 	 insumo_nombre=INSUMONUEVO);
    IF @CANTIDAD=0 THEN
        UPDATE insumo SET insumo_nombre=INSUMONUEVO,
        insumo_stock=STOCK,
        insumo_estatus=ESTATUS WHERE insumo_id=ID;
        SELECT 1;
	ELSE
    	SELECT 2; 
	END IF;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_MEDICAMENTO` (IN `ID` INT, IN `MEDICAMENTOACTUAL` VARCHAR(50), IN `MEDICAMENTONUEVO` VARCHAR(50), IN `ALIAS` VARCHAR(50), IN `STOCK` INT, IN `ESTATUS` VARCHAR(10))  BEGIN
DECLARE CANTIDAD INT;
IF MEDICAMENTOACTUAL = MEDICAMENTONUEVO THEN
	UPDATE medicamento SET
    medicamento_alias=ALIAS,
    medicamento_stock=STOCK,
    medicamento_estatus=ESTATUS
    WHERE medicamento_id=ID;
    SELECT 1;
ELSE
	SET @CANTIDAD=(SELECT COUNT(*) FROM medicamento 
    WHERE medicamento_nombre=MEDICAMENTONUEVO);
    IF @CANTIDAD=0 THEN
    	UPDATE medicamento SET
        medicamento_nombre=MEDICAMENTONUEVO,
        medicamento_alias=ALIAS,
        medicamento_stock=STOCK,
        medicamento_estatus=ESTATUS
        WHERE medicamento_id=ID;
        SELECT 1;
	ELSE 
        IF @CANTIDAD=1 THEN 		
                SELECT 2;
        END IF;
    END IF;
 
END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_MEDICO` (IN `IDMEDICO` INT, IN `NOMBRES` VARCHAR(50), IN `APEPAT` VARCHAR(50), IN `APEMAT` VARCHAR(50), IN `DIRECCION` VARCHAR(200), IN `MOVIL` CHAR(12), IN `SEXO` CHAR(2), IN `FECHANACIMIENTO` DATE, IN `NRODOCUMENTOACTUAL` CHAR(12), IN `NRODOCUMENTONUEVO` CHAR(12), IN `COLEGIATURAACTUAL` CHAR(12), IN `COLEGIATURANUEVO` CHAR(12), IN `ESPECIALIDAD` INT, IN `IDUSUARIO` INT, IN `EMAIL` VARCHAR(255))  BEGIN 

DECLARE CANTIDAD INT;
IF NRODOCUMENTOACTUAL=NRODOCUMENTONUEVO OR COLEGIATURAACTUAL=COLEGIATURANUEVO THEN
	UPDATE usuario SET
    usu_email=EMAIL,usu_sexo=SEXO WHERE usu_id=IDUSUARIO;
    UPDATE medico SET
 	medico_nombre=NOMBRES,
    medico_apepat=APEPAT,
    medico_apemat=APEMAT,
    medico_direccion=DIRECCION,
    medico_movil=MOVIL,
    medico_sexo=SEXO,
    medico_fnac=FECHANACIMIENTO,
    medico_nrodocumento=NRODOCUMENTONUEVO,
    medico_colegiatura=COLEGIATURANUEVO,
    especialidad_id=ESPECIALIDAD
    WHERE medico_id=IDMEDICO;
    SELECT 1;
    
ELSE
	SET @CANTIDAD=(SELECT COUNT(*) FROM medico WHERE medico_nrodocumento=NRODOCUMENTONUEVO OR medico_colegiatura=COLEGIATURANUEVO);
    IF @CANTIDAD=0 THEN
    	UPDATE usuario SET
    	usu_email=EMAIL,usu_sexo=SEXO WHERE 
        usu_id=IDUSUARIO;
		UPDATE medico SET
 		medico_nombre=NOMBRES,
    	medico_apepat=APEPAT,
        medico_apemat=APEMAT,
        medico_direccion=DIRECCION,
        medico_movil=MOVIL,
        medico_sexo=SEXO,
        medico_fnac=FECHANACIMIENTO,
        medico_nrodocumento=NRODOCUMENTONUEVO,
        medico_colegiatura=COLEGIATURANUEVO,
        especialidad_id=ESPECIALIDAD
        WHERE medico_id=IDMEDICO;
        SELECT 1;
    ELSE
    	SELECT 2;
    END IF;
    
END IF;


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_PACIENTE` (IN `ID` INT, IN `DNIA` CHAR(12), IN `DNIN` CHAR(12), IN `NOMBRE` VARCHAR(50), IN `APEPAT` VARCHAR(50), IN `APEMAT` VARCHAR(50), IN `DIRECCION` VARCHAR(200), IN `MOVIL` CHAR(12), IN `SEXO` CHAR(1), IN `ESTATUS` CHAR(10))  BEGIN
DECLARE CANTIDAD INT;

IF DNIA=DNIN THEN
	UPDATE paciente SET
    paciente_nombre=NOMBRE,
    paciente_apepat=APEPAT,
    paciente_apemat=APEMAT,
    paciente_direccion=DIRECCION,
    paciente_movil=MOVIL,
    paciente_sexo=SEXO,
    paciente_estatus=ESTATUS
    WHERE paciente_id=ID;
    SELECT 1;
ELSE
	SET @CANTIDAD=(SELECT COUNT(*) 
                   FROM paciente_nrodocumento=DNIN);
    IF @CANTIDAD=0 THEN
    	UPDATE paciente SET
        paciente_nombre=NOMBRE,
        paciente_apepat=APEMAT,
        paciente_apemat=DIRECCION,
        paciente_movil=MOVIL,
        paciente_sexo=SEXO,
        paciente_nrodocumento=DNIN,
        paciente_estatus=ESTATUS
        WHERE paciente_id=ID;
        SELECT 1;
	ELSE
    	SELECT 2;
    END IF;
END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_PREVIA` (IN `id` INT, IN `dni` INT, IN `nombre` VARCHAR(100), IN `fecha` DATE, IN `esp` CHAR(11), IN `celular` INT, IN `horario` CHAR(11), IN `estatus` CHAR(11))  UPDATE `previa_cita` SET `NombreCom`=nombre,`DNI`=dni,`Fecha`=fecha,`Especialidad`=esp,`Celular`=celular,`Horario`=horario,`Estatus`=estatus WHERE ID=id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_PROCEDIMIENTO` (IN `ID` INT, IN `PROCEDIMIENTOACTUAL` VARCHAR(50), IN `PROCEDIMIENTONUEVO` VARCHAR(50), IN `ESTATUS` VARCHAR(10))  BEGIN
DECLARE CANTIDAD INT;
IF PROCEDIMIENTOACTUAL=PROCEDIMIENTONUEVO THEN
	UPDATE procedimiento SET
	procedimiento_estatus=ESTATUS WHERE procedimiento_id=ID;
    SELECT 1;
ELSE
    SET @CANTIDAD=(SELECT COUNT(*) FROM procedimiento WHERE procedimiento_nombre=PROCEDIMIENTONUEVO);
    IF @CANTIDAD=0 THEN
	UPDATE procedimiento SET
    procedimiento_estatus=ESTATUS,
    procedimiento_nombre=PROCEDIMIENTONUEVO WHERE
    procedimiento_id=ID; 
    SELECT 1;
    ELSE
    SELECT 2;
    END IF;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_CITA` (IN `IDPACIENTE` INT, IN `IDDOCTOR` INT, IN `FECHACITA` DATE, IN `DESCRIPCION` TEXT, IN `IDUSUARIO` INT)  BEGIN
DECLARE NUMCITA INT;
DECLARE ESPECIALIDAD INT;
SET @ESPECIALIDAD=(SELECT especialidad_id FROM medico WHERE medico_id=IDDOCTOR);
SET @NUMCITA=(SELECT COUNT(*)+1 FROM cita WHERE cita_feregistro=CURRENT_DATE);
INSERT INTO cita(cita_nroatencion,cita_feregistro,medico_id,paciente_id,cita_estatus,
                cita_descripcion,especialidad_id,usu_id,agenda_fecha) VALUES (@NUMCITA,CURRENT_DATE,IDDOCTOR,IDPACIENTE,'PENDIENTE',DESCRIPCION,@ESPECIALIDAD,IDUSUARIO,FECHACITA);

SELECT LAST_INSERT_ID();
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_CITA_PREVIA` (IN `nombre` VARCHAR(100), IN `DNI` INT, IN `fecha` DATE, IN `Especialidad` VARCHAR(50), IN `Celular` INT, IN `Horario` VARCHAR(50))  insert into previa_cita(Nombrecom,DNI,Fecha,Especialidad,Celular,Horario,Estatus) values(nombre,DNI,fecha,Especialidad,Celular,Horario,'PENDIENTE')$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_CONSULTA` (IN `ID` INT, IN `DESCRIPCION` TEXT, IN `DIAGNOSTICO` TEXT)  BEGIN
INSERT INTO consulta_medica(consulta_descripcion,
           	consulta_diagnostico,consulta_feregistro,
            consulta_estatus,cita_id)
       VALUES
       		(DESCRIPCION,DIAGNOSTICO,CURRENT_DATE,'ATENDIDA',ID);
            
UPDATE cita SET
cita_estatus='ATENDIDA'
WHERE cita_id=ID; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_DETALLE_INSUMO` (IN `IDFUA` INT, IN `IDINSUMO` INT, IN `CANTIDAD` INT)  INSERT INTO detalle_insumo(fua_id,insumo_id,detain_cantidad) VALUES (IDFUA,IDINSUMO,CANTIDAD)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_DETALLE_MEDICAMENTO` (IN `IDFUA` INT, IN `IDMEDICAMENTO` INT, IN `CANTIDAD` INT)  INSERT INTO detalle_medicamento(fua_id,medicamento_id,detame_cantidad) VALUES (IDFUA,IDMEDICAMENTO,CANTIDAD)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_DETALLE_PROCEDIMIENTO` (IN `ID` INT, IN `IDPROCEDIMIENTO` INT)  INSERT INTO detalle_procedimiento(fua_id,procedimiento_id) VALUES (ID,IDPROCEDIMIENTO)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_ESPECIALIDAD` (IN `ESPECIALIDAD` VARCHAR(50), IN `ESTATUS` VARCHAR(10))  BEGIN
DECLARE CANTIDAD INT;

SET @CANTIDAD=(SELECT COUNT(*) FROM especialidad WHERE especialidad_nombre=ESPECIALIDAD);
IF @CANTIDAD=0 THEN
	INSERT INTO especialidad(especialidad_nombre,especialidad_fregistro,especialidad_estatus) VALUES (ESPECIALIDAD,CURRENT_DATE,ESTATUS);
    SELECT 1;
ELSE
	SELECT 2;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_FUA` (IN `IDHISTORIAL` INT, IN `IDCONSULTA` INT)  BEGIN
	INSERT INTO fua(fua_fregistro,historia_id,consulta_id) 	
    VALUES (CURRENT_DATE,IDHISTORIAL,IDCONSULTA);
SELECT MAX(fua_id) AS id FROM fua;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_INSUMO` (IN `INSUMO` VARCHAR(50), IN `STOCK` INT, IN `ESTATUS` VARCHAR(10))  BEGIN
DECLARE CANTIDAD INT;
SET @CANTIDAD=(SELECT COUNT(*) FROM insumo WHERE insumo_nombre=INSUMO);

IF @CANTIDAD=0 THEN
	INSERT INTO insumo(insumo_nombre,insumo_stock,insumo_feregistro,insumo_estatus) VALUES (INSUMO,STOCK,CURRENT_DATE,ESTATUS);
    SELECT 1;
ELSE
	SELECT 2;
END IF;


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_MEDICAMENTO` (IN `MEDICAMENTO` VARCHAR(50), IN `ALIAS` VARCHAR(50), IN `STOCK` INT, IN `ESTATUS` VARCHAR(10))  BEGIN
DECLARE CANTIDAD INT;
SET @CANTIDAD=(SELECT COUNT(*) FROM medicamento WHERE 	medicamento_nombre=MEDICAMENTO);
    IF @CANTIDAD=0 THEN
        INSERT INTO medicamento
      (medicamento_nombre,medicamento_alias,medicamento_stock,medicamento_fregistro,medicamento_estatus) VALUES (MEDICAMENTO,ALIAS,STOCK,CURRENT_DATE,ESTATUS);
     SELECT 1;
    ELSE
     SELECT 2; 
    END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_MEDICO` (IN `NOMBRES` VARCHAR(50), IN `APEPAT` VARCHAR(50), IN `APEMAT` VARCHAR(50), IN `DIRECCION` VARCHAR(200), IN `MOVIL` CHAR(12), IN `SEXO` CHAR(2), IN `FECHANACIMIENTO` DATE, IN `NRODOCUMENTO` CHAR(12), IN `COLEGIATURA` CHAR(12), IN `ESPECIALIDAD` INT, IN `USUARIO` VARCHAR(20), IN `CONTRA` TEXT, IN `ROL` INT, IN `EMAIL` VARCHAR(255))  BEGIN
DECLARE CANTIDADU INT;
DECLARE CANTIDADME INT;

SET @CANTIDADU=(SELECT COUNT(*) FROM usuario WHERE usu_nombre=USUARIO);
IF @CANTIDADU=0 THEN
    SET @CANTIDADME=(SELECT COUNT(*) FROM medico WHERE medico_nrodocumento=NRODOCUMENTO OR
    medico_colegiatura=COLEGIATURA);
    IF @CANTIDADME=0 THEN
    	INSERT INTO usuario(usu_nombre,usu_contrasena,
                     		usu_sexo,rol_id,usu_estatus,
                            usu_email,usu_intento) VALUES (USUARIO,CONTRA,SEXO,ROL,'ACTIVO',EMAIL,0);
        INSERT INTO medico(medico_nombre, medico_apepat,medico_apemat, medico_direccion, medico_movil, medico_sexo, medico_fnac, medico_nrodocumento, medico_colegiatura, especialidad_id,usu_id) VALUES (NOMBRES,APEPAT,APEMAT,DIRECCION,MOVIL,SEXO,FECHANACIMIENTO,NRODOCUMENTO,COLEGIATURA,ESPECIALIDAD,(SELECT MAX(usu_id) FROM usuario));
    	SELECT 1;
    ELSE
    	SELECT 2;
          
    END IF;
    
ELSE
	SELECT 2;
END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_PACIENTE` (IN `NDOC` CHAR(12), IN `NOMBRE` VARCHAR(50), IN `APEPAT` VARCHAR(50), IN `APEMAT` VARCHAR(50), IN `DIRECCION` VARCHAR(200), IN `MOVIL` CHAR(12), IN `SEXO` CHAR(1))  BEGIN
DECLARE CANTIDAD INT;
SET @CANTIDAD=(SELECT COUNT(*) FROM paciente WHERE paciente_nrodocumento=NDOC);
IF @CANTIDAD=0 THEN
	INSERT INTO 
 paciente(paciente_nombre,paciente_apepat,paciente_apemat,paciente_direccion,
         paciente_movil,paciente_sexo,paciente_nrodocumento,paciente_estatus) VALUES (NOMBRE,APEPAT,APEMAT,DIRECCION,MOVIL,SEXO,NDOC,'ACTIVO');
         SELECT 1;
ELSE
	SELECT 2;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_PROCEDIMIENTO` (IN `PROCEDIMIENTO` VARCHAR(50), IN `ESTATUS` VARCHAR(10))  BEGIN
DECLARE CANTIDAD INT;
SET @CANTIDAD=(SELECT COUNT(*) FROM procedimiento WHERE procedimiento_nombre=PROCEDIMIENTO);

IF @CANTIDAD=0  THEN
	INSERT INTO procedimiento(procedimiento_nombre, procedimiento_fecregistro,procedimiento_estatus) VALUES (PROCEDIMIENTO,CURRENT_DATE(),ESTATUS);
    SELECT 1;
ELSE
	SELECT 2;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_USUARIO` (IN `USU` VARCHAR(20), IN `CONTRA` VARCHAR(250), IN `SEXO` CHAR(1), IN `ROL` INT, IN `EMAIL` VARCHAR(250))  BEGIN
DECLARE CANTIDAD INT;
SET @CANTIDAD=(SELECT COUNT(*) FROM usuario WHERE usu_nombre=BINARY USU);
IF @CANTIDAD=0 THEN
	INSERT INTO usuario(usu_nombre,usu_contrasena,usu_sexo,rol_id,usu_estatus,usu_email,usu_intento) VALUES (USU,CONTRA,SEXO,ROL,'ACTIVO',EMAIL,0);
	SELECT 1;
ELSE
	SELECT 2;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_RESTABLECER_CONTRA` (IN `EMAIL` VARCHAR(255), IN `CONTRA` VARCHAR(255))  BEGIN
DECLARE CANTIDAD INT;
SET @CANTIDAD:=(SELECT COUNT(*) FROM usuario WHERE usu_email=EMAIL);
IF @CANTIDAD>0 THEN
	UPDATE usuario SET
    usu_contrasena=CONTRA, usu_intento=0 WHERE usu_email=EMAIL;
    SELECT 1;
ELSE
	SELECT 2;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_TRAER_STOCK_INSUMO` (IN `ID` INT)  SELECT
i.insumo_id,
i.insumo_stock
FROM
	insumo AS i
    WHERE i.insumo_id=ID$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_TRAER_STOCK_MEDICAMENTO` (IN `ID` INT)  SELECT
m.medicamento_nombre,
m.medicamento_stock
FROM
	medicamento as m
    WHERE m.medicamento_id=ID$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_VERIFICAR_USUARIO` (IN `USUARIO` VARCHAR(20))  SELECT
u.usu_id,
u.usu_nombre,
u.usu_contrasena,
u.usu_sexo,
u.rol_id,
u.usu_estatus,
r.rol_nombre,
u.usu_intento
FROM
usuario AS u
INNER JOIN rol AS r ON u.rol_id=r.rol_id
WHERE usu_nombre=BINARY USUARIO$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `usu_id` int(11) NOT NULL,
  `usu_nombre` varchar(20) DEFAULT NULL,
  `usu_contrasena` varchar(255) DEFAULT NULL,
  `usu_sexo` char(1) DEFAULT NULL,
  `rol_id` int(11) DEFAULT NULL,
  `usu_estatus` enum('ACTIVO','INACTIVO') DEFAULT NULL,
  `usu_email` varchar(255) DEFAULT NULL,
  `usu_intento` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`usu_id`, `usu_nombre`, `usu_contrasena`, `usu_sexo`, `rol_id`, `usu_estatus`, `usu_email`, `usu_intento`) VALUES
(1, 'angel', '$2y$10$bAOOoe1DBf.7IfjidZXi5edcFt629ikfb2/kl.Xwv7zf4yxrbZrsW', 'M', 1, 'ACTIVO', 'angel@gmail.com', 1),
(23, 'ANDRE', '$2y$10$aMGpPUX8FhThrL4F1O0BDu2veSZBpKgolHGx0addSVedN0hAMXJyq', 'M', 3, 'ACTIVO', 'LUCIA@GMAIL.COM', 0),
(24, 'WENDY', '$2y$10$XxwP.pTVvqmPCePtipxOReyFVwoDvpdrXkgOemocnu2DrYrtzk/0q', 'F', 3, 'ACTIVO', 'WENDY@GMAIL.COM', 0),
(25, 'ADRIAN', '$2y$10$ywNZd.xsMc2hRrEgPh7D7.t7KbHzcRiJduoCbcrZKBafdujJCkc2O', 'M', 3, 'ACTIVO', 'ADRIAN@GMAIL.COM', 0),
(29, 'NIEVES', '$2y$10$R3cWMb3JsVbFhDIr/SF3me8KYQjOL4S4zCPtqirJJJV0ilKORRX8S', 'F', 3, 'ACTIVO', 'NIEVES@GMAIL.COM', 0),
(31, 'ADMIN', '$2y$10$z/dhBvHe4Vm8fZzXkdaH0e3srNGkpHCCyo75Gl9rk8DZsD6aPEyfu', 'M', 1, 'ACTIVO', 'angelpumaccahua@gmail.com', 1),
(32, 'RECEPSION', '$2y$10$i8aLUpTiTozxl053KTUpMOjtOjgApXt5xlmfZZQcV5sZy6piHLqAK', 'M', 2, 'ACTIVO', 'recepsion@gmail.com', 1),
(33, 'MEDICO', '$2y$10$yoJ0XVIseyhFDNM6y1TYheIcI9ByfW1dfazQfiS7BSokwAL8iGkmC', 'M', 3, 'ACTIVO', 'medico@gmail.com', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`usu_id`),
  ADD KEY `rol_id` (`rol_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `usu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`rol_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
