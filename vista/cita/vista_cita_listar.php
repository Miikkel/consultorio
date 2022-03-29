<script type="text/javascript" src="../js/cita.js?rev=<?php echo time();?>"></script>
<form autocomplete="false" onsubmit="return false">
<div class="col-md-12">
    <div class="box box-warning box-solid">
        <div class="box-header with-border">
              <h3 class="box-title">MANTENIMIENTO CITA</h3>

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
            <table id="tabla_cita" class="display responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nro</th>
                        <th>Fecha Registro</th>
                        <th>Paciente</th>
                        <th>Medico</th>
                        <th>Fecha de Cita</th>
                        <th>Estatus</th>
                        <th>Acci&oacute;n</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>#</th>
                        <th>Nro</th>
                        <th>Fecha Registro</th>
                        <th>Paciente</th>
                        <th>Medico</th>
                        <th>Fecha de Cita</th>
                        <th>Estatus</th>
                        <th>Acci&oacute;n</th>
                    </tr>
                </tfoot>
            </table>
            </div>
            <!-- /.box-body -->
    </div>
          <!-- /.box -->
</div>
</form>
<div class="modal lg" id="modal_registro" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header" style="text-align:center;">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title"><b>Registro De cita</b></h4>    
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-12">
                        <label for="">Paciente</label>
                        <select class="js-example-basic-single" name="state" id="cbm_paciente" style="width:100%;">
                        </select><br><br><br>
                    </div> 
                    <div class="col-lg-4">
                        <label for="">Especialidad</label>
                        <select class="js-example-basic-single" name="state" id="cbm_especialidad" style="width:100%;">
                        </select><br><br><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Doctor</label>
                        <select class="js-example-basic-single" name="state" id="cbm_doctor" style="width:100%;">
                        </select><br><br><br>   
                    </div>
                    <div class="col-lg-4">
                        <label for="">Fecha de cita</label>
                        <input type="date" class="form-control" id="txt_fecha_cita" placeholder="Ingrese fecha de nacimiento"><br>
                    </div>
                    <div class="col-lg-12">
                        <label for="">Descripcion</label>
                        <textarea id="txt_descripcion" rows="10" class="form-control" style="resize:none"></textarea>
                    </div>
                    
                </div>    
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="Registrar_cita()"><i class="fa fa-check"><b>&nbsp;Registrar</b></i></button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>
        </div>
    </div>
</div>

<div class="modal lg" id="modal_editar" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header" style="text-align:center;">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title"><b>Actualizar cita</b></h4>    
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-12">
                        <input type="text" id="txt_cita_id" hidden>
                        <label for="">Paciente</label>
                        <select class="js-example-basic-single" name="state" id="cbm_paciente_editar" style="width:100%;">
                        </select><br><br><br>
                    </div> 
                

                    <div class="col-lg-4">
                        <label for="">Especialidad</label>
                        <select class="js-example-basic-single" name="state" id="cbm_especialidad_editar" style="width:100%;">
                        </select><br><br><br>
                    </div>
                    
                    <div class="col-lg-4">
                        <label for="">Doctor</label>
                        <select class="js-example-basic-single" name="state" id="cbm_doctor_editar" style="width:100%;">
                        </select><br><br><br>   
                    </div>
                    <div class="col-lg-4">
                        <label for="">Fecha de cita</label>
                        <input type="date" class="form-control" id="txt_fecha_cita_editar" placeholder="Ingrese fecha de nacimiento"><br>
                    </div>
                    <div class="col-lg-12">
                        <label for="">Descripcion</label>
                        <textarea id="txt_descripcion_editar" rows="10" class="form-control" style="resize:none"></textarea>
                    </div>
                    <div class="col-lg-8">
                        <label for="">Estatus</label>
                        <select class="js-example-basic-single" name="state" id="cbm_estatus" style="width:100%;">
                            <option value="PENDIENTE">PENDIENTE</option>
                            <option value="ATENDIDA">ATENDIDA</option>
                            <option value="CANCELADA">CANCELADA</option>
                        </select><br><br>
                    </div>
                </div>    
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="Modificar_Cita()"><i class="fa fa-check"><b>&nbsp;Registrar</b></i></button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>
        </div>
    </div>
</div>
<script>

    
$(document).ready(function() {
    listar_especialidad_combo();
    listar_cita();
    listar_paciente_combo();

    $("#cbm_especialidad").change(function(){
        var idd=$("#cbm_especialidad").val();
        listar_doctor_combo(idd);
    });

    $('.js-example-basic-single').select2();
    $("#modal_registro").on('shown.bs.modal',function(){
        //realiza focus al input cuando el modal se abre
        $("#txt_cita").focus();  
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


