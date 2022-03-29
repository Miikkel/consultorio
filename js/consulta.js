var tableconsulta; 

function listar_consulta(){
    var finicio=$("#txt_fechainicio").val();
    var ffin=$("#txt_fechafin").val();
    tableconsulta = $("#tabla_consulta").DataTable({
       "ordering":false,   
       "bLengthChange":true,
       "searching": { "regex": true },
       "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
       "pageLength": 10,
       "destroy":true,
       "async": false ,
       "processing": true,
       "ajax":{
           "url":"../controlador/consulta/controlador_consulta_listar.php",
           type:'POST',
           data:{
              fechainicio:finicio,
              fechafin:ffin 
           }
       },   
       "order":[[1,'asc']], 
       "columns":[
           {"defaultContent":""},
           {"data":"paciente_nrodocumento"},
           {"data":"paciente"},
           {"data":"consulta_feregistro"},
           {"data":"medico"},
           {"data":"especialidad_nombre"},
           {"data":"consulta_estatus",
            render: function (data, type, row ) {

                if(data=='PENDIENTE'){
                    return "<span class='label label-primary'>"+data+"</span>";               
                }

                if(data=='ATENDIDA'){
                    return "<span class='label label-success'>"+data+"</span>";               
                }

                if(data=='CANCELADA'){
                    return "<span class='label label-danger'>"+data+"</span>";               
                }
        }
            },
           {"defaultContent":"<button style='font-size:13px;' type='button' class='modificar btn btn-primary'><i class='fa fa-edit'></i></button>&nbsp;"}
       ],

       "language":idioma_espanol,
       select: true
   });
   /*
   document.getElementById("tabla_consulta_filter").style.display="none";
   $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    } );

    $('input.column_filter').on( 'keyup click', function () {
        filterColumn( $(this).parents('tr').attr('data-column') );
    });
*/
     /*Columna para hacer el contador*/
      tableconsulta.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_consulta').DataTable().page.info();
        tableconsulta.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            } );
        } );

}

function filterGlobal() {

    $('#tabla_consulta').DataTable().search(
        $('#global_filter').val(),
    ).draw();
}

function AbrirModalRegistro(){
    $("#modal_registro").modal({backdrop:'static',keyboard:false})
    $("#modal_registro").modal('show');
    listar_paciente_combo_consulta();
}


$('#tabla_consulta').on('click','.modificar',function(){
    /*Trae todos los datos y los almacena en la variable data */
    var data = tableconsulta.row($(this).parents('tr')).data();//captura la lista de datos de esta fila
    if(tableconsulta.row(this).child.isShown()){//cuando esta en tamaño responsivo
        var data = tableconsulta.row(this).data();
    }
    $("#modal_editar").modal({backdrop:'static',keyboard:false})
    $("#modal_editar").modal('show');

    $("#txt_consulta_id").val(data.consulta_id);
    $("#txt_paciente_editar").val(data.paciente);
    $("#txt_descripcion_consulta_editar").val(data.consulta_descripcion);
    $("#txt_diagnostico_consulta_editar").val(data.consulta_diagnostico);
})

function Registrar_Consulta(){

    var idpaciente =$("#cbm_paciente_consulta").val();
    var descripcion=$("#txt_descripcion_consulta").val();
    var diagnostico=$("#txt_diagnostico_consulta").val();

    if(idpaciente.length==0 ||  descripcion.length==0 ||  diagnostico.length==0){
       return Swal.fire("Mensaje De Advertencia","Llene los campos vacios, para completar la accion","warning");
    }

    $.ajax({
        "url":"../controlador/consulta/controlador_consulta_registro.php",
        type:'POST',
        data:{
            idpaciente:idpaciente,
            descripcion:descripcion,
            diagnostico:diagnostico
        }

    }).done(function(resp){
        
        if(resp>0){
                $("#modal_registro").modal('hide');
                listar_consulta();
                LimpiarCampos();
                return Swal.fire("Mensaje De Confirmacion","Se ah registrado la consulta","success");
        }else{
                 return Swal.fire("Mensaje De Error","Lo sentimos el registro no se pudo completar","error");
 
        }
    })

}
function Modificar_Consulta(){
    var idconsulta =$("#txt_consulta_id").val();
    var descripcion=$("#txt_descripcion_consulta_editar").val();
    var diagnostico=$("#txt_diagnostico_consulta_editar").val();

    if(idconsulta.length==0 ||  descripcion.length==0 ||  diagnostico.length==0){
       return Swal.fire("Mensaje De Advertencia","Llene los campos vacios, para completar la accion","warning");
    }

    $.ajax({
        "url":"../controlador/consulta/controlador_consulta_modificar.php",
        type:'POST',
        data:{
            idconsulta:idconsulta,
            descripcion:descripcion,
            diagnostico:diagnostico
        }

    }).done(function(resp){
        if(resp>0){
                $("#modal_editar").modal('hide');
                listar_consulta();
                LimpiarCampos();
                return Swal.fire("Mensaje De Confirmacion","Se ah registrado la consulta","success");
        }else{
                 return Swal.fire("Mensaje De Error","Lo sentimos el registro no se pudo completar","error");
 
        }
    })

}
function  LimpiarCampos(){
    $("#cbm_paciente_consulta").val("");
    $("#txt_descripcion_consulta").val("");
    $("#txt_diagnostico_consulta").val("");
}

function listar_paciente_combo_consulta(){
    $.ajax({
        "url":"../controlador/consulta/controlador_combo_paciente_cita_listar.php",
        type:'POST'  
    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena="";
        if(data.length>0){
        
            for(var i=0; i < data.length; i++){
                cadena+="<option value='"+data[i][0]+"'>N° Atencion: "+data[i][1]+"- Paciente:"+data[i][2]+"</option>";
            }
            $("#cbm_paciente_consulta").html(cadena);
        }else{
            cadena+="<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_paciente_consulta").html(cadena);


        }
    })
}

