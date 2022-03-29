var tableinsumo; 

function listar_insumo(){
    tableinsumo = $("#tabla_insumo").DataTable({
       "ordering":false,   
       "bLengthChange":false,
       "searching": { "regex": false },
       "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
       "pageLength": 10,
       "destroy":true,
       "async": false ,
       "processing": true,
       "ajax":{
           "url":"../controlador/insumo/controlador_insumo_listar.php",
           type:'POST'
       },   
       "order":[[1,'asc']], 
       "columns":[
           {"defaultContent":""},
           {"data":"insumo_nombre"},
           {"data":"insumo_stock"},
           {"data":"insumo_feregistro"},
           {"data":"insumo_estatus",
            render: function (data, type, row ) {

                if(data=='ACTIVO'){
                    return "<span class='label label-success'>"+data+"</span>";               
                }

                if(data=='INACTIVO'){
                    return "<span class='label label-danger'>"+data+"</span>";               
                }

                if(data=='AGOTADO'){
                    return "<span class='label label-black' style='background:black'>"+data+"</span>";               
                }

        }
            },
           {"defaultContent":"<button style='font-size:13px;' type='button' class='modificar btn btn-primary'><i class='fa fa-edit'></i></button>&nbsp;"}
       ],

       "language":idioma_espanol,
       select: true
   });
   document.getElementById("tabla_insumo_filter").style.display="none";
   $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    } );

    $('input.column_filter').on( 'keyup click', function () {
        filterColumn( $(this).parents('tr').attr('data-column') );
    });

     /*Columna para hacer el contador*/
      tableinsumo.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_insumo').DataTable().page.info();
        tableinsumo.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            } );
        } );


}

function filterGlobal() {
    $('#tabla_insumo').DataTable().search(
        $('#global_filter').val(),
    ).draw();
}


$('#tabla_insumo').on('click','.modificar',function(){
    /*Trae todos los datos y los almacena en la variable data */
    var data = tableinsumo.row($(this).parents('tr')).data();//captura la lista de datos de esta fila
    if(tableinsumo.row(this).child.isShown()){//cuando esta en tamaño responsivo
        var data = tableinsumo.row(this).data();
    }
    $("#modal_editar").modal({backdrop:'static',keyboard:false})
    $("#modal_editar").modal('show');
    $("#txt_idinsumo").val(data.insumo_id);//jalamos los datos desde el data 
    $("#txt_insumo_actual_editar").val(data.insumo_nombre);
    $("#txt_insumo_nuevo_editar").val(data.insumo_nombre);
    $("#txt_stock_editar").val(data.insumo_stock);
    $("#cbm_estatus_editar").val(data.insumo_estatus).trigger("change");//te obligue a elegir entre las opciones
})


function Registrar_Insumo(){
    var insumo =$("#txt_insumo").val();
    var stock =$("#txt_stock").val();
    var estatus =$("#cbm_estatus").val();

    if(stock<0){
        Swal.fire("Mensaje De Advertencia","EL stock no puede ser negativo","warning");
    }

    if(insumo.length==0 || stock.length==0 || estatus.length==0){
        Swal.fire("Mensaje De Advertencia","Llene los campos vacios, para completar la accion","warning");
    }

    $.ajax({
        "url":"../controlador/insumo/controlador_insumo_registro.php",
        type:'POST',
        data:{
            in:insumo,
            st:stock,
            es:estatus
        }

    }).done(function(resp){
        if(resp>0){
            if(resp!=1){
                $("#modal_registro").modal('hide');
                listar_insumo();
                LimpiarCampos()
                return Swal.fire("Mensaje De Advertencia","El insumo ya se encuentra registrado","warning");
                
            }else{
                listar_insumo();
                LimpiarCampos()
                return Swal.fire("Mensaje De Confirmacion","Datos guardados correctamente","success");
            }
        }else{
                 Swal.fire("Mensaje De Error","Lo sentimos el registro no se pudo completar","error");
 
        }
    })

}

function LimpiarCampos(){
    $("#txt_insumo").val("");
    $("#txt_stock").val("");
}

function Modificar_Insumo(){
    var id =$("#txt_idinsumo").val();
    var insumoactual =$("#txt_insumo_actual_editar").val();
    var insumonuevo =$("#txt_insumo_nuevo_editar").val();
    var stock =$("#txt_stock_editar").val();
    var estatus =$("#cbm_estatus_editar").val();

    if(stock<0){
        Swal.fire("Mensaje De Advertencia","EL stock no puede ser negativo","warning");
    }

    if(insumoactual.length==0 || insumonuevo.length==0 || stock.length==0 || estatus.length==0){
        Swal.fire("Mensaje De Advertencia","Llene los campos vacios, para completar la accion","warning");
    }

    $.ajax({
        "url":"../controlador/insumo/controlador_insumo_modificar.php",
        type:'POST',
        data:{
            id:id,
            inac:insumoactual,
            innu:insumonuevo,
            st:stock,
            es:estatus
        }

    }).done(function(resp){
        if(resp>0){
            if(resp!=1){
                $("#modal_editar").modal('hide');       
                Swal.fire("Mensaje De Advertencia","El insumo ya se encuentra registrado","warning");
                listar_insumo();
            }else{         
                Swal.fire("Mensaje De Confirmacion","Datos guardados correctamente","success");
                listar_insumo();
            }
        }else{
                 Swal.fire("Mensaje De Error","Lo sentimos el registro no se pudo completar","error");
 
        }
    })
 
}


