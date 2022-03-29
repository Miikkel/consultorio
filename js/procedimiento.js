var tableprocedimiento; 

function listar_procedimiento(){
   tableprocedimiento = $("#tabla_procedimiento").DataTable({
       "ordering":false,   
       "bLengthChange":false,
       "searching": { "regex": false },
       "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
       "pageLength": 10,
       "destroy":true,
       "async": false ,
       "processing": true,
       "ajax":{
           "url":"../controlador/procedimiento/controlador_procedimiento_listar.php",
           type:'POST'
       },
       "order":[[1,'asc']], 
       "columns":[
           {"defaultContent":""},
           {"data":"procedimiento_nombre"},
           {"data":"procedimiento_fecregistro"},
           {"data":"procedimiento_estatus",
            render: function (data, type, row ) {
                if(data=='ACTIVO'){
                    return "<span class='label label-success'>"+data+"</span>";               
                }else{
                    return "<span class='label label-danger'>"+data+"</span>";              
                }
        }
            },
           {"defaultContent":"<button style='font-size:13px;' type='button' class='modificar btn btn-primary'><i class='fa fa-edit'></i></button>&nbsp;"}
       ],

       "language":idioma_espanol,
       select: true
   });
   document.getElementById("tabla_procedimiento_filter").style.display="none";
   $('input.global_filter').on( 'keyup click', function () {
        filterGlobal();
    } );
    $('input.column_filter').on( 'keyup click', function () {
        filterColumn( $(this).parents('tr').attr('data-column') );
    });
     /*Columna para hacer el contador*/
     tableprocedimiento.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_procedimiento').DataTable().page.info();
        tableprocedimiento.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            } );
        } );


}

function filterGlobal() {
    $('#tabla_procedimiento').DataTable().search(
        $('#global_filter').val(),
    ).draw();
}

function AbrirModalRegistro(){
    $("#modal_registro").modal({backdrop:'static',keyboard:false})
    $("#modal_registro").modal('show');
}

function Registro_Procedimiento(){
    var procedimiento=$("#txt_procedimiento").val();
    var estatus=$("#cbm_estatus").val();

    if(procedimiento.length==0){
        Swal.fire("Mensaje De Advertencia","El campo nombre del procedimiento debe contar con datos","warning");
    }

    $.ajax({
        url:'../controlador/procedimiento/controlador_procedimiento_registro.php',
        type:'post',
        data:{
            p:procedimiento,
            e:estatus
        }
        
    }).done(function(resp){
        if(resp>0){
            $("#modal_registro").modal('hide');
            listar_procedimiento();
            LimpiarCampos();
            return Swal.fire("Mensaje De Confirmacion","El procedimiento se agrego correctamente","success");
        }else{
            LimpiarCampos();
            return Swal.fire("Mensaje De Advertencia","El procedimiento ya esta registrado","warning");
        }
    })

}

$('#tabla_procedimiento').on('click','.modificar',function(){
    /*Trae todos los datos y los almacena en la variable data */
    var data = tableprocedimiento.row($(this).parents('tr')).data();//captura la lista de datos de esta fila
    if(tableprocedimiento.row(this).child.isShown()){//cuando esta en tamaño responsivo
        var data = tableprocedimiento.row(this).data();
    }
    $("#modal_editar").modal({backdrop:'static',keyboard:false})
    $("#modal_editar").modal('show');
    $("#txt_idprocedimiento").val(data.procedimiento_id);//jalamos los datos desde el data 
    $("#txt_procedimiento_actual_editar").val(data.procedimiento_nombre);
    $("#txt_procedimiento_nuevo_editar").val(data.procedimiento_nombre);
    $("#txt_estatus_editar").val(data.procedimiento_estatus).trigger("change");//te obligue a elegir entre las opciones
})

function Modificar_Procedimiento(){

    //vamos a llevar el actual y el nuyevo para luego en nuesstor procedure hacer una condicional., de si rle proced actual == al nuevo entonces no actualice es estatuso si es diferente que me busque en la bd si existe o no, 
    var id=  $("#txt_idprocedimiento").val();
    var procedimientoactual= $("#txt_procedimiento_actual_editar").val();
    var procedimientonuevo= $("#txt_procedimiento_nuevo_editar").val();
    var estatus= $("#txt_estatus_editar").val();

    if(id.length==0){
        Swal.fire("Mensaje de Advertencia","El id del campo esta vacio","warning");
    }
    if(procedimientonuevo.length==0){
        Swal.fire("Mensaje de Advertencia","Debe ingresar un procedimiento","warning");
    }
    


    $.ajax({
        url:'../controlador/procedimiento/controlador_procedimiento_modificar.php',
        type:'POST',
        data:{
            id:id,
            procedimientoactual:procedimientoactual,
            procedimientonuevo:procedimientonuevo,
            estatus:estatus
        }
    }).done(function(resp){
        $("#modal_editar").modal('hide');


        if(resp>0){
            if(resp==1){
                listar_procedimiento();
                LimpiarCampos();
                return Swal.fire("Mensaje de Confirmacion","Los datos se actualizaron","success");
            }else{
                LimpiarCampos();
                return Swal.fire("Mensaje de Advertencia","El nombre del procedimiento ya se encuentra registrado","warning");
            }
        }else{
            Swal.fire("Mensaje de ERROR","No se puede actualizar el procedimiento","error");
        }
    })

}

function LimpiarCampos(){
    $("#txt_procedimiento").val(" ");
}
