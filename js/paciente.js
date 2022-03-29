var tablepaciente; 

function listar_paciente(){
    tablepaciente = $("#tabla_paciente").DataTable({
       "ordering":false,   
       "bLengthChange":false,
       "searching": { "regex": false },
       "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
       "pageLength": 10,
       "destroy":true,
       "async": false ,
       "processing": true,
       "ajax":{
           "url":"../controlador/paciente/controlador_paciente_listar.php",
           type:'POST'
       },   
       "order":[[1,'asc']], 
       "columns":[
           {"defaultContent":""},
           {"data":"paciente_nrodocumento"},
           {"data":"paciente"},
           {"data":"paciente_direccion"},
           {"data":"paciente_sexo",
           render: function (data, type, row ) {

                if(data=='M'){
                    return "MASCULINO"
                }else{
                    return "FEMENINO"
                }

                }
            },
           {"data":"paciente_movil"},
           {"data":"paciente_estatus",
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
   document.getElementById("tabla_paciente_filter").style.display="none";
   $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    } );

    $('input.column_filter').on( 'keyup click', function () {
        filterColumn( $(this).parents('tr').attr('data-column') );
    });

     /*Columna para hacer el contador*/
      tablepaciente.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_paciente').DataTable().page.info();
        tablepaciente.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            } );
        } );


}

function filterGlobal() {
    $('#tabla_paciente').DataTable().search(
        $('#global_filter').val(),
    ).draw();
}


$('#tabla_paciente').on('click','.modificar',function(){
    /*Trae todos los datos y los almacena en la variable data */
    var data = tablepaciente.row($(this).parents('tr')).data();//captura la lista de datos de esta fila
    if(tablepaciente.row(this).child.isShown()){//cuando esta en tamaño responsivo
        var data = tablepaciente.row(this).data();
    }
    $("#modal_editar").modal({backdrop:'static',keyboard:false})
    $("#modal_editar").modal('show');

    $("#idpaciente").val(data.paciente_id);//jalamos los datos desde el data 
    $("#txt_ndoc_actual_editar").val(data.paciente_nrodocumento);
    $("#txt_ndoc_nuevo_editar").val(data.paciente_nrodocumento);
    $("#txt_nombres_editar").val(data.paciente_nombre);
    $("#txt_apepat_editar").val(data.paciente_apepat);
    $("#txt_apemat_editar").val(data.paciente_apemat);
    $("#txt_direccion_editar").val(data.paciente_direccion);
    $("#txt_movil_editar").val(data.paciente_movil);
    $("#cbm_sexo_editar").val(data.paciente_sexo);
    $("#cbm_estatus").val(data.paciente_estatus).trigger("change");//te obligue a elegir entre las opciones
})


function Registrar_Paciente(){
    var ndoc =$("#txt_ndoc").val();
    var nombres =$("#txt_nombres").val();
    var apepat =$("#txt_apepat").val();
    var apemat =$("#txt_apemat").val();
    var direccion =$("#txt_direccion").val();
    var movil =$("#txt_movil").val();
    var sexo =$("#cbm_sexo").val();


    if(ndoc.length==0 || nombres.length==0 || apepat.length==0 || apemat.length==0 ||direccion.length==0 || movil.length==0 || sexo.length==0){
        Swal.fire("Mensaje De Advertencia","Llene los campos vacios, para completar la accion","warning");
    }

    $.ajax({
        "url":"../controlador/paciente/controlador_paciente_registro.php",
        type:'POST',
        data:{
            ndoc:ndoc,
            nombres:nombres,
            apepat:apepat,
            apemat:apemat,
            direccion:direccion,
            movil:movil,
            sexo:sexo
        }

    }).done(function(resp){
        if(resp>0){

            if(resp!=1)
            {   
                listar_paciente();
                LimpiarCampos()
                Swal.fire("Mensaje De Advertencia","El paciente ya se encuentra registrado","warning");

            }else{
                
                $("#modal_registro").modal('hide');
                listar_paciente();
                LimpiarCampos()
                Swal.fire("Mensaje De Confirmacion","Datos guardados correctamente","success");
            }

        }else{
                 Swal.fire("Mensaje De Error","Lo sentimos el registro no se pudo completar","error");
 
        }
    })

}

function LimpiarCampos(){
    $("#txt_ndoc").val("");
    $("#txt_nombres").val("");
    $("#txt_apepat").val("");
    $("#txt_apemat").val("");
    $("#txt_direccion").val("");
    $("#txt_movil").val("");
    $("#cbm_sexo").val("");

}

function Modificar_Paciente(){
    var id =$("#idpaciente").val();
    var dnia=$("#txt_ndoc_actual_editar").val();
    var dnin=$("#txt_ndoc_nuevo_editar").val();
    var nombre =$("#txt_nombres_editar").val();
    var apepat =$("#txt_apepat_editar").val();
    var apemat=$("#txt_apemat_editar").val();
    var direccion =$("#txt_direccion_editar").val();
    var movil =$("#txt_movil_editar").val();
    var sexo=$("#cbm_sexo_editar").val();
    var estatus=$("#cbm_estatus").val();
    
    if(id.length==0 || dnia.length==0 || dnin.length==0 || nombre.length==0||apepat.length==0 || apemat.length==0 || direccion.length==0 || movil.length==0 ||sexo.length==0 || estatus.length==0 ){
        Swal.fire("Mensaje De Advertencia","Llene los campos vacios, para completar la accion","warning");
    }

    $.ajax({
        "url":"../controlador/paciente/controlador_paciente_modificar.php",
        type:'POST',
        data:{
            id:id,
            dnia:dnia,
            dnin:dnin,
            nombre:nombre,
            apepat:apepat,
            apemat:apemat,
            direccion:direccion,
            movil:movil,
            sexo:sexo,
            estatus:estatus
        }

    }).done(function(resp){
        if(resp>0){
            if(resp!=1)
            {   
                listar_paciente();   
                Swal.fire("Mensaje De Advertencia","El registro del paciente ya existe","warning");

            }else{
                
                $("#modal_registro").modal('hide');
                listar_paciente();
                Swal.fire("Mensaje De Confirmacion","Datos guardados correctamente","success");
            }
        }else{
            Swal.fire("Mensaje De Error","Lo sentimos el registro no se pudo completar","error");

         }

    })
 
}


