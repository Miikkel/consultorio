<script type="text/javascript" src="../js/medico.js?rev=<?php echo time();?>"></script>

<form autocomplete="false" onsubmit="return false"></form>
<div class="col-md-12">
    <div class="box box-warning box-solid">
        <div class="box-header with-border">
              <h3 class="box-title">MANTENIMIENTO DE MEDICOS</h3>

            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
            </div>
              <!-- /.box-tools -->
        </div>
            <!-- /.box-header -->
            <div class="box-body">
            <div class="form-group">
                <div class="col-lg-10">
                    <div class="input-group">
                        <input type="text" class="global_filter form-control" id="global_filter" placeholder="Ingresar dato a buscar">
                        <span class="input-group-addon"><i class="fa fa-search"></i></span>
                    </div>
                </div>
                <div class="col-lg-2">
                    <button class="btn btn-danger" style="width:100%" onclick="AbrirModalRegistro()"><i class="glyphicon glyphicon-plus"></i>Nuevo Registro</button>
                </div>
            </div>
            <table id="tabla_medico" class="display responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>DNI</th>
                        <th>Medico</th>
                        <th>N° Colegiatura</th>
                        <th>Especialidad</th>
                        <th>Sexo</th>
                        <th>Celular</th>
                        <th>Acci&oacute;n</th>
                        <th>Atenciones</th>
                    </tr>
                </thead >
                <tfoot>
                    <tr>
                    <th>#</th>
                        <th>DNI</th>
                        <th>Medico</th>
                        <th>N° Colegiatura</th>
                        <th>Especialidad</th>
                        <th>Sexo</th>
                        <th>Celular</th>
                        <th>Acci&oacute;n</th>
                        <th>Atenciones</th>

                    </tr>
                </tfoot>
            </table>
            </div>
            <!-- /.box-body -->
    </div>
          <!-- /.box -->
</div>
</form>

<div class="modal fade" id="modal_registro" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title"><b>Registro De medico</b></h4>
            </div>
                <div class="modal-body">
                    <div class="row">
                               <div class="col-lg-12">
                                   <label for="">Nombre</label>
                                   <input type="text" class="form-control" id="txt_nombres" placeholder="Ingrese nombre del medico"><br>
                               </div>
                               <div class="col-lg-6">
                                   <label for="">Apellido Paterno</label>
                                   <input type="text" class="form-control" id="txt_apepat" placeholder="Ingrese apellido paterno"><br>
                               </div>
                               <div class="col-lg-6">
                                   <label for="">Apellido Materno</label>
                                   <input type="text" class="form-control" id="txt_apemat" placeholder="Ingrese apellido materno"><br>
                               </div>
                               <div class="col-lg-12">
                                   <label for="">Direcci&oacute;n</label>
                                   <input type="text" class="form-control" id="txt_direccion" placeholder="Ingresa la direccion"><br>
                               </div>
                               <div class="col-lg-4">
                                   <label for="">Movil</label>
                                   <input type="text" class="form-control" id="txt_movil" placeholder="Ingrese el movil" onkeypress="return soloNumeros(event)"><br>
                               </div>
                               <div class="col-lg-4">
                                   <label for="">Sexo</label>
                                   <select class="js-example-basic-single" name="state" id="cbm_sexo" style="width:100%;">
                                       <option value="M">MASCULINO</option>
                                       <option value="F">FEMENINO</option>
                                   </select><br><br>
                               </div>
                               <div class="col-lg-4">
                                   <label for="">Fecha nacimiento</label>
                                   <input type="date" class="form-control" id="txt_fnac" placeholder="Ingrese fecha de nacimiento"><br>
                               </div>
                               <div class="col-lg-12"></div>
                               <div class="col-lg-4">
                                   <label for="">DNI</label>
                                   <input type="text" class="form-control" id="txt_ndoc" placeholder="Ingrese el dni" onkeypress="return soloNumeros(event)"><br>
                               </div>
                               <div class="col-lg-4">
                                   <label for="">Nro Colegiatura</label>
                                   <input type="text" class="form-control" id="txt_ncol" placeholder="Ingrese numero de colegiatura" onkeypress="return soloNumeros(event)"><br>
                               </div>
                               <div class="col-lg-4">
                                   <label for="">Especialidad</label>
                                   <select class="js-example-basic-single" name="state" id="cbm_especialidad" style="width:100%;"></select><br><br>
                               </div>

                               <div class="col-lg-12" style="text-align:center">
                                   <b>DATOS DEL USUARIO</b><br><br>
                               </div>
                               <div class="col-lg-4">
                                   <label for="">Usuario</label>
                                   <input type="text" class="form-control" id="txt_usu" placeholder="Ingrese el usuario"><br>
                               </div>
                               <div class="col-lg-4">
                                   <label for="">Contrase&ntilde;a</label>
                                   <input type="text" class="form-control" id="txt_contra" placeholder="Ingrese una contraseña"><br>
                               </div>
                               <div class="col-lg-4">
                                   <label for="">Rol</label>
                                   <select class="js-example-basic-single" name="state" id="cbm_rol" style="width:100%;"></select><br><br>
                               </div>
                               <div class="col-lg-12">
                                   <label for="">Email</label>
                                   <input type="text" class="form-control" id="txt_email" placeholder="Ingrese un email">
                                   <label for="" id="emailOK" style="color:red;"></label>
                                   <input type="text" id="validar_email" hidden>
                                   <br><br>
                               </div>
                               <div class="col-lg-12"></div>
                       </div>
                       <div class="modal-footer">
                           <button class="btn btn-primary" onclick="Registrar_medico()"><i class="fa fa-check"><b>&nbsp;Registrar</b></i></button>
                           <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
                       </div>
                    </div>
                </div>
        </div>
    </div>
</div>    



<div class="modal fade" id="modal_editar" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title"><b>Actualizar Datos Medico</b></h4>
            </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-12">
                            <input type="text" id="id_medico" hidden>
                            <label for="">Nombre</label>
                            <input type="text" class="form-control" id="txt_nombres_editar" placeholder="Ingrese nombre del medico"><br>
                        </div>
                        <div class="col-lg-6">
                            <label for="">Apellido Paterno</label>
                            <input type="text" class="form-control" id="txt_apepat_editar" placeholder="Ingrese apellido paterno"><br>
                        </div>
                        <div class="col-lg-6">
                            <label for="">Apellido Materno</label>
                            <input type="text" class="form-control" id="txt_apemat_editar" placeholder="Ingrese apellido materno"><br>
                        </div>
                        <div class="col-lg-12">
                            <label for="">Direcci&oacute;n</label>
                            <input type="text" class="form-control" id="txt_direccion_editar" placeholder="Ingresa la direccion"><br>
                        </div>
                        <div class="col-lg-4"> 
                            <label for="">Movil</label>
                            <input type="text" class="form-control" id="txt_movil_editar" placeholder="Ingrese el movil" onkeypress="return soloNumeros(event)"><br>
                        </div>
                        <div class="col-lg-4">
                            <label for="">Sexo</label>
                            <select class="js-example-basic-single" name="state" id="cbm_sexo_editar" style="width:100%;">
                                <option value="M">MASCULINO</option>
                                <option value="F">FEMENINO</option>
                            </select><br><br>
                        </div>
                        <div class="col-lg-4">
                            <label for="">Fecha nacimiento</label>
                            <input type="date" class="form-control" id="txt_fnac_editar" placeholder="Ingrese fecha de nacimiento"><br>
                        </div>
                        <div class="col-lg-12"></div>
                        <div class="col-lg-4">
                            <label for="">DNI</label>
                            <input type="text" id="txt_ndoc_editar_actual" hidden><br>
                            <input type="text" class="form-control" id="txt_ndoc_editar_nuevo" placeholder="Ingrese el dni" onkeypress="return soloNumeros(event)"><br>
                        </div>
                        <div class="col-lg-4">
                            <label for="">Nro Colegiatura</label>
                            <input type="text" id="txt_ncol_editar_actual" hidden>
                            <input type="text" class="form-control" id="txt_ncol_editar_nuevo" placeholder="Ingrese numero de colegiatura" onkeypress="return soloNumeros(event)"><br>
                        </div>

                        <div class="col-lg-4">
                            <label for="">Especialidad</label>
                            <select class="js-example-basic-single" name="state" id="cbm_especialidad_editar" style="width:100%;"></select><br><br>
                        </div>
                    
                        <div class="col-lg-12" style="text-align:center">
                            <b>DATOS DEL USUARIO</b><br><br>
                        </div>
                        <div class="col-lg-6">
                            <input type="text" id="id_usuario" hidden>
                            <label for="">Usuario</label>
                            <input type="text" class="form-control" id="txt_usu_editar" placeholder="Ingrese el usuario" disabled><br>
                        </div>
                        <div class="col-lg-6">
                            <label for="">Rol</label>
                            <select class="js-example-basic-single" name="state" id="cbm_rol_editar" style="width:100%;" disabled></select><br><br>
                        </div>
                        <div class="col-lg-12">
                            <label for="">Email</label>
                            <input type="text" class="form-control" id="txt_email_editar" placeholder="Ingrese un email">
                            <label for="" id="emailOK_editar" style="color:red;"></label>
                            <input type="text" id="validar_email_editar" hidden>
                            <br><br>
                        </div>
                        <div class="col-lg-12"></div>
                    </div>
                </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="Editar_Medico()"><i class="fa fa-check"><b>&nbsp;Registrar</b></i></button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>     
        </div>
    </div>
</div>


<div class="modal lg" id="modal_consultas" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header" style="text-align:center;">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title"><b>Pacientes Atendidos</b></h4>    
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-12 table-responsive">
                        <table id="tabla_pacientes_atendidos" class="display responsive nowrap" style="width:100%">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>FECHA</th>
                                    <th>PACIENTE</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>    
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>
        </div>
    </div>
</div>



<script>

    
$(document).ready(function() {
    listar_medico();
    listar_combo_especialidad();
    listar_combo_rol();
    $('.js-example-basic-single').select2();
    $("#modal_registro").on('shown.bs.modal',function(){
        //realiza focus al input cuando el modal se abre
        $("#txt_medico").focus();  
    })
} );
$('.box').boxWidget({
    animationSpeed : 500,
    collapseTrigger:'[data-widget="collapse"]',
    removeTrigger  :'[data-widget="remove"]',
    collapseIcon   :'fa-minus',
    expandIcon     :'fa-plus',
    removeIcon     :'fa-times'
})

</script>
<script>

document.getElementById('txt_email').addEventListener('input',function(){
    campo=event.target;
    //alert(campo);
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
    if(emailRegex.test(campo.value)){
        $(this).css("border","");
        $("#emailOK").html("");
        $("#validar_email").val("correcto"); 
    }else{
        $( this).css("border","1px solid red");
        $("#emailOK").html("Email incorrecto");
        $("#validar_email").val("incorrecto"); 
    }  
});

document.getElementById('txt_email_editar').addEventListener('input',function(){
    campo=event.target;
    //alert(campo);
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
    if(emailRegex.test(campo.value)){
        $(this).css("border","");
        $("#emailOK_editar").html("");
        $("#validar_email_editar").val("correcto"); 
    }else{
        $(this).css("border","1px solid red");
        $("#emailOK_editar").html("Email incorrecto");
        $("#validar_email_editar").val("incorrecto"); 
    }  
});
</script>




