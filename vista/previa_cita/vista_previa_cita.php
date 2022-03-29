<script type="text/javascript" src="../js/previa.js?rev=<?php echo time();?>"></script>
<form autocomplete="false" onsubmit="return false">
<div class="col-md-12">
    <div class="box box-warning box-solid">
        <div class="box-header with-border">
              <h3 class="box-title">PACIENTES PREVIA CITA</h3>

            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
            </div>
              <!-- /.box-tools -->
        </div>
            <!-- /.box-header -->
            <div class="box-body">
           
            <table id="tabla_previa" class="display responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>DNI</th>
                        <th>Fecha</th>
                        <th>Especialidad</th>
                        <th>Celular</th>
                        <th>Horario</th>
                        <th>Estatus</th>
                        <th>Acci&oacute;n</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>DNI</th>
                        <th>Fecha</th>
                        <th>Especialidad</th>
                        <th>Celular</th>
                        <th>Horario</th>
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

<div class="modal fade" id="modal_editar" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title"><b>Actualizar Paciente</b></h4>
            </div>
                <div class="modal-body">
                    <div class="row">
                            <div class="col-lg-4">
                                <input type="text" id="idpaciente" hidden>
                                <label for="">DNI</label>
                                <input type="text"  id="txt_ndoc_actual_editar" hidden>
                                <input type="text" class="form-control" id="txt_ndoc_nuevo_editar" placeholder="Ingrese el dni" onkeypress="return soloNumeros(event)"><br>
                            </div>
                            <div class="col-lg-12">
                                <label for="">Nombre</label>
                                <input type="text" class="form-control" id="txt_nombres_editar" placeholder="Ingrese nombre del medico"><br>
                            </div>
                            <div class="col-lg-6">
                                <label for="">Fecha</label>
                                <input type="date" class="form-control" id="txt_fecha" placeholder="Ingresa la direccion"><br>
                            </div>
                            <div class="col-lg-6">
                                <label for="">Celular</label>
                                <input type="text" class="form-control" id="txt_celular" placeholder="Ingrese el movil" onkeypress="return soloNumeros(event)"><br>
                            </div>
                            <div class="col-lg-4">
                                <label for="">Especialidad</label>
                                <input type="text" class="js-example-basic-single" name="state" id="cbm_especialidad" style="width:100%;">
                            </div>
                            <div class="col-lg-4">
                                <label for="">Horario</label>
                                <select class="js-example-basic-single" name="state" id="cbm_horario" style="width:100%;">
                                    <option value="MAÑANA">Mañana</option>
                                    <option value="TARDE">Tarde</option>
                                    <option value="NOCHE">Noche</option>
                                </select><br><br>
                            </div>
                            <div class="col-lg-4">
                                <label for="">Estatus</label>
                                <select class="js-example-basic-single" name="state" id="cbm_estatus" style="width:100%;">
                                    <option value="PENDIENTE">Pendiente</option>
                                    <option value="ATENDIDO">Atendido</option>
                                    <option value="CANCELADO">Cancelado</option>
                                </select><br><br>
                            </div>
                            <div class="col-lg-12"></div>     
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" onclick="Modificar_Previo()"><i class="fa fa-check"><b>&nbsp;Registrar</b></i></button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
                    </div>
                </div>
        </div>
    </div>
</div>



<script>
$(document).ready(function() {
    listar_cita();
    Modificar_Previo();
    $('.js-example-basic-single').select2();
    $("#modal_registro").on('shown.bs.modal',function(){
        //realiza focus al input cuando el modal se abre
        $("#txt_ndoc").focus();  
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


