<?php
session_start();
if(isset($_SESSION['S_IDUSUARIO'])){
	header('Location: ../vista/index.php');
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Login MiSalud</title>
	<link rel="shortcut icon" href="../img/favicon.png" />
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
<!--===============================================================================================-->	
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="fonts/iconic/css/material-design-iconic-font.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/animate/animate.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="vendor/css-hamburgers/hamburgers.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/animsition/css/animsition.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="vendor/daterangepicker/daterangepicker.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="css/util.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">
<!--===============================================================================================-->
</head>
<body>
	
	<div class="limiter">
		<div class="container-login100" style="background-image: url('images/bg-01.jpeg');">
			<div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
					<span class="login100-form-title p-b-49" style="color:#aa1a8d"; >
                                            
						INICIAR SESI&Oacute;N
					</span>

					<div class="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
                                            <span class="label-input100"><b>Usuario</b></span>
						<input class="input100" type="text" name="username" placeholder="Escriba el usuario" id="txt_usu" autocomplete="new-password">
						<span class="focus-input100" data-symbol="&#xf206;"></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate="Password is required">
                                            <span class="label-input100"><b>Contrase&ntilde;a</b></span>
						<input class="input100" type="password" name="pass" placeholder="Escriba la contrase&ntilde;a" id="txt_con">
						<span class="focus-input100" data-symbol="&#xf190;"></span>
					</div>
					
					<div class="text-right p-t-8 p-b-31">
						<a href="#" onclick="AbrirModalRestablecer()">
							Olvidaste la contrase&ntilde;a?
						</a>
					</div>
					
					<div class="container-login100-form-btn">
						<div class="wrap-login100-form-btn">
							<div class="login100-form-bgbtn"></div>
							<button class="login100-form-btn" onclick="VerificarUsuario()">
								ENTRAR
							</button>
						</div>
					</div><br>
                   
					<div class="container-login100-form-btn">
						<div class="wrap-login100-form-btn">
							<div class="login100-form-bgbtn"></div>
							<a class="login100-form-btn" href="../index.html">
								SALIR
                            </a>
                        </div>	
					</div><br>

			</div>
		</div>
	</div>
	
	<div id="dropDownSelect1"></div>

	<div class="modal fade" id="modal_restablecer_contra" role="dialog">
        <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title"><b>Restablecer Contrase&ntilde;a</b></h4>
            </div>
            <div class="modal-body">
                <div class="col-lg-12">
                    <label for=""><b>Ingrese el email registrado en el usuario para enviarle su contraseña  </b></label>
                    <input type="text" class="form-control" id="txt_email" placeholder="Ingrese Email" ><br>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="Restablecer_Contra()"><i class="fa fa-check"><b>&nbsp;Enviar</b></i></button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>
        </div>
        </div>
    </div>



<!--===============================================================================================-->
	<script src="vendor/sweetalert2/sweetalert2.js"></script>
<!--===============================================================================================-->
	
<!--===============================================================================================-->
	<script src="vendor/jquery/jquery-3.2.1.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/animsition/js/animsition.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/bootstrap/js/popper.js"></script>
	<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/select2/select2.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/daterangepicker/moment.min.js"></script>
	<script src="vendor/daterangepicker/daterangepicker.js"></script>
<!--===============================================================================================-->
	<script src="vendor/countdowntime/countdowntime.js"></script>
<!--===============================================================================================-->
	<!--<script src="js/main.js"></script>-->
	<script src="../js/usuario.js"></script>

</body>
<script>
txt_usu.focus();
</script>
</html>