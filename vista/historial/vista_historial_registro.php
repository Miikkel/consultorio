<script type="text/javascript" src="../js/historial.js?rev=<?php echo time();?>"></script>
<form autocomplete="false" onsubmit="return false">
    <div class="col-md-12">
        <div class="box box-warning box-solid">
            <div class="box-header with-border">
                <h3 class="box-title">REGISTRO DE HISTORIAL MEDICO</h3>

                <div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                    </button>
                </div>
                <!-- /.box-tools -->
            </div>
                <!-- /.box-header -->
            <div class="box-body">
                <div class="col-lg-2"> 
                    <label for="">C&oacute;digo historial</label>
                    <input type="text" id="txt_codhistorial" class="form-control" disabled>
                </div>
                <div class="col-lg-8">
                    <lable for="">Paciente</lable>
                    <input type="text" id="txt_paciente" class="form-control" disabled>
                </div><br>
                <div class="col-lg-2">
                    <lable for="">&nbsp;</lable>
                    <button class="btn btn-success" onclick="AbrirModalConsulta()"><i class="fa fa-search"></i> Buscar Consultas</button>
                </div><br><br><br>
                <div class="col-lg-6">
                    <lable for="">Descripci&oacute;n De La Consulta</lable>
                    <textarea id="txt_desconsulta" cols="30"  rows="3" class="form-control" disabled></textarea>
                </div>
                <div class="col-lg-6">
                    <lable for="">Diagnostico De La Consulta</lable>
                    <textarea id="txt_diagconsulta" cols="30"  rows="3" class="form-control" disabled></textarea>
                </div>
            
                <input type="text" id="txt_idconsulta" hidden>

                <div class="col-md-12"><br>
                <!-- Custom Tabs -->
                    <div class="nav-tabs-custom">
                        <ul class="nav nav-tabs">
                            <li class="active"><a href="#tab_1" data-toggle="tab">Procedimiento</a></li>
                            <li><a href="#tab_2" data-toggle="tab">Insumo</a></li>
                            <li><a href="#tab_3" data-toggle="tab">Medicamentos</a></li>
                        </ul>
                        <div class="tab-content">
                        <div class="tab-pane active" id="tab_1">
                            <div class="row">
                                <div class="col-lg-10">
                                    <label for="">Seleccionar Procedimientos</label>
                                    <select class="js-example-basic-single" name="state" id="cbm_procedimiento" style="width:100%;">
                                    </select>
                                </div>
                                <div class="col-lg-2">
                                    <label for="">&nbsp;</label>
                                    <button class="btn btn-primary" style="width:100%;" onclick="Agregar_Procedimiento()"><i class="fa fa-plus-square"></i>&nbsp;Agregar</button>
                                </div>
                                <div class="col-lg-12 table-responsive">
                                    <table id="tabla_procedimiento" style="width:100%" class="table">
                                        <thead bgcolor="black" style="color:#FFFFFF;">
                                            <th>ID</th>
                                            <th>PROCEDIMIENTO</th>
                                            <th>Acci&oacute;n</th>
                                        </thead>
                                        <tbody id="tbody_tabla_procedimiento">

                                        </tbody>
                                    </table>
                                </div> 
                            </div>   
                        </div>
                        <!-- /.tab-pane -->
                        <div class="tab-pane" id="tab_2">
                            <div class="row">
                                <div class="col-lg-6">
                                    <label for="">Seleccionar Insumos</label>
                                    <select class="js-example-basic-single" name="state" id="cbm_insumos" style="width:100%;">
                                    </select>
                                </div>
                                <div class="col-lg-2">
                                    <label for="">Stock Actual</label>
                                    <input type="text" class="form-control" id="stock_insumo" disabled>
                                </div>
                                <div class="col-lg-2">
                                    <label for="">Cantidad Agregar</label>
                                    <input type="text" class="form-control" id="txt_cantidad_agregar">
                                </div>
                                <div class="col-lg-2">
                                    <label for="">&nbsp;</label>
                                    <button class="btn btn-primary" style="width:100%;" onclick="Agregar_Insumo()"><i class="fa fa-plus-square"></i>&nbsp;Agregar</button>
                                </div>
                                <div class="col-lg-12 table-responsive">
                                    <table id="tabla_insumo" style="width:100%" class="table">
                                        <thead bgcolor="black" style="color:#FFFFFF;">
                                            <th>ID</th>
                                            <th>INSUMOS</th>
                                            <th>CANTIDAD</th>
                                            <th>Acci&oacute;n</th>
                                        </thead>
                                        <tbody id="tbody_tabla_insumo">

                                        </tbody>
                                    </table>
                                </div> 
                            </div>   
                        </div>
                        <!-- /.tab-pane -->
                        <div class="tab-pane" id="tab_3">
                            <div class="row">
                                <div class="col-lg-6">
                                    <label for="">Seleccionar Medicamentos</label>
                                    <select class="js-example-basic-single" name="state" id="cbm_medicamento" style="width:100%;">
                                    </select>
                                </div>
                                <div class="col-lg-2">
                                    <label for="">Stock Actual</label>
                                    <input type="text" class="form-control" id="stock_medicamento" disabled>
                                </div>
                                <div class="col-lg-2">
                                    <label for="">Cantidad Agregar</label>
                                    <input type="text" class="form-control" id="txt_medicantidad_agregar">
                                </div>
                                <div class="col-lg-2">
                                <label for="">&nbsp;</label>
                                <button class="btn btn-primary" style="width:100%;" onclick="Agregar_Medicamento()"><i class="fa fa-plus-square"></i>&nbsp;Agregar</button>
                                </div> 
                                <div class="col-lg-12 table-responsive">
                                    <table id="tabla_medicamento" style="width:100%" class="table">
                                        <thead bgcolor="black" style="color:#FFFFFF;">
                                            <th>ID</th>
                                            <th>MEDICAMENTO</th>
                                            <th>CANTIDAD</th>
                                            <th>Acci&oacute;n</th>
                                        </thead>
                                        <tbody id="tbody_tabla_medicamento">
                                        </tbody>
                                    </table>
                                </div> 
                            </div>   
                        </div>
                        <!-- /.tab-pane -->
                        </div>
                        <!-- /.tab-content -->
                    </div><!-- nav-tabs-custom -->
                </div>
                <div class="col-lg-12" style="text-align:center">
                    <button class="btn btn-success btn-lg" onclick="RegistrarHistorial()">REGISTRAR</button>
                </div>
            </div><!-- /.box-body -->
        </div><!-- /.box -->
    </div>
</form>


<div class="modal lg" id="modal_consultas" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header" style="text-align:center;">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title"><b>Listado De Consultas Medicas</b></h4>    
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-12 table-responsive">
                        <table id="tabla_consulta_historial" class="display responsive nowrap" style="width:100%">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>FECHA</th>
                                    <th>CODIGO HISTORIAL</th>
                                    <th>PACIENTE</th>
                                    <th>ACCION</th>
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

<div class="modal lg" id="modal_diagnostico" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header" style="text-align:center;">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title"><b>Diagnostico de la cita</b></h4>    
            </div>
            <div class="modal-body">
                <div class="row">
                    <textarea name="" id="txt_diagnostico_fua" rows="3"></textarea>
                </div>    
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="Registrar_historial()"><i class="fa fa-check"><b>&nbsp;Registrar</b></i></button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>
        </div>
    </div>
</div>












<script>

    
$(document).ready(function() {

    $('.js-example-basic-single').select2();
    listar_insumo();
    listar_procedimiento();
    listar_medicamento();

   // listar_historial();

   $("#cbm_medicamento").change(function(){
        var idm=$("#cbm_medicamento").val();
        TraerStockMedicamento(idm);
    });
    
    $("#cbm_insumos").change(function(){
        var idi=$("#cbm_insumos").val();
        TraerStockInsumo(idi);
    });
   
});
$('.box').boxWidget({
    animationSpeed : 500,
    collapseTrigger:'[data-widget="collapse"]',
    removeTrigger  :'[data-widget="remove"]',
    collapseIcon   :'fa-minus',
    expandIcon     :'fa-plus',
    removeIcon     :'fa-times'
})

</script>


