var tableespecialidad; 

function listar_especialidad(){
    tableespecialidad = $("#tabla_especialidad").DataTable({
       "ordering":false,   
       "bLengthChange":false,
       "searching": { "regex": false },
       "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
       "pageLength": 10,
       "destroy":true,
       "async": false ,
       "processing": true,
       "ajax":{
           "url":"../controlador/especialidad/controlador_especialidad_listar.php",
           type:'POST'
       },   
       "order":[[1,'asc']], 
       "columns":[
           {"defaultContent":""},
           {"data":"especialidad_nombre"},
           {"data":"especialidad_fregistro"},
           {"data":"especialidad_estatus",
            render: function (data, type, row ) {

                if(data=='ACTIVO'){
                    return "<span class='label label-success'>"+data+"</span>";               
                }

                if(data=='INACTIVO'){
                    return "<span class='label label-danger'>"+data+"</span>";               
                }
        }
            },
           {"defaultContent":"<button style='font-size:13px;' type='button' class='modificar btn btn-primary'><i class='fa fa-edit'></i></button>&nbsp;"}
       ],

       "language":idioma_espanol,
       select: true
   });
   document.getElementById("tabla_especialidad_filter").style.display="none";
   $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    } );

    $('input.column_filter').on( 'keyup click', function () {
        filterColumn( $(this).parents('tr').attr('data-column') );
    });

     /*Columna para hacer el contador*/
      tableespecialidad.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_especialidad').DataTable().page.info();
        tableespecialidad.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            } );
        } );


}

$('#tabla_especialidad').on('click','.modificar',function(){
    /*Trae todos los datos y los almacena en la variable data */
    var data = tableespecialidad.row($(this).parents('tr')).data();//captura la lista de datos de esta fila
    if(tableespecialidad.row(this).child.isShown()){//cuando esta en tamaño responsivo
        var data = tableespecialidad.row(this).data();
    }
    $("#modal_editar").modal({backdrop:'static',keyboard:false})
    $("#modal_editar").modal('show');
    $("#txt_idespecialidad").val(data.especialidad_id);//jalamos los datos desde el data 
    $("#txt_especialidad_actual_editar").val(data.especialidad_nombre);
    $("#txt_especialidad_nuevo_editar").val(data.especialidad_nombre);
    $("#cbm_estatus_editar").val(data.especialidad_estatus).trigger("change");//te obligue a elegir entre las opciones
})
//revisar el buscar
function filterGlobal() {
    $('#tabla_especialidad').DataTable().search(
        $('#global_filter').val(),
    ).draw();
}

function AbrirModalRegistro(){
    $("#modal_registro").modal({backdrop:'static',keyboard:false})
    $("#modal_registro").modal('show');
}


function Registrar_Especialidad(){
    var especialidad =$("#txt_especialidad").val();
    var estatus =$("#cbm_estatus").val();

    if(especialidad.length==0 ||  estatus.length==0){
       return Swal.fire("Mensaje De Advertencia","Llene los campos vacios, para completar la accion","warning");
    }

    $.ajax({
        "url":"../controlador/especialidad/controlador_especialidad_registro.php",
        type:'POST',
        data:{
            especialidad:especialidad,
            estatus:estatus
        }

    }).done(function(resp){
        if(resp>0){
            
            if(resp!=1){
                 listar_especialidad();
                LimpiarCampos()
                Swal.fire("Mensaje De Advertencia","La especialidad ya se encuentra registrado","warning");
            }else{
                $("#modal_registro").modal('hide');
                listar_especialidad();
                LimpiarCampos()
                Swal.fire("Mensaje De Confirmacion","Datos guardados correctamente","success");
               
            }
        }else{
                 Swal.fire("Mensaje De Error","Lo sentimos el registro no se pudo completar","error");
 
        }
    })

}

function LimpiarCampos(){
    $("#txt_especialidad").val("");
}




function Editar_Especialidad(){
    var id =$("#txt_idespecialidad").val();
    var especialidadactual =$("#txt_especialidad_actual_editar").val();
    var especialidadnuevo =$("#txt_especialidad_nuevo_editar").val();
    var estatus =$("#cbm_estatus_editar").val();

    if(id.length==0 || especialidadactual.length==0 || especialidadnuevo.length==0 || estatus.length==0){
        Swal.fire("Mensaje De Advertencia","Llene los campos vacios, para completar la accion","warning");
    }

    $.ajax({
        "url":"../controlador/especialidad/controlador_especialidad_modificar.php",
        type:'POST',
        data:{
            id:id,
            especialidadactual:especialidadactual,
            especialidadnuevo:especialidadnuevo,
            estatus:estatus
        }

    }).done(function(resp){
      
        if(resp>0){
            if(resp!=1){
                Swal.fire("Mensaje De Advertencia","la especialidad ya se encuentra registrada","warning");
                listar_especialidad();       
            } else{     
                    $("#modal_editar").modal('hide');
                 listar_especialidad();
                return Swal.fire("Mensaje De Confirmacion","Datos guardados correctamente","success");   
               
            }
        }else{
                 Swal.fire("Mensaje De Error","Lo sentimos el registro no se pudo completar","error");
 
        }
    })
 
}