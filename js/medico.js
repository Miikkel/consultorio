var tablemedico; 

function listar_medico(){
    tablemedico = $("#tabla_medico").DataTable({
       "ordering":false,   
       "bLengthChange":false,
       "searching": { "regex": false },
       "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
       "pageLength": 10,
       "destroy":true,
       "async": false ,
       "processing": true,
       "ajax":{
           "url":"../controlador/medico/controlador_medico_listar.php",
           type:'POST'
       },   
       "order":[[1,'asc']], 
       "columns":[
           {"defaultContent":""},
           {"data":"medico_nrodocumento"},
           {"data":"medico"},
           {"data":"medico_colegiatura"}, 
           {"data":"especialidad_nombre"},
           {"data":"medico_sexo",
                render: function (data, type, row ) {
                    if(data=='M'){
                        return "MASCULINO";                   
                    }else{
                        return "FEMENINO";                 
                    }
                }
           }, 
           {"data":"medico_movil"},
           {"defaultContent":"<button style='font-size:13px;' type='button' class='modificar btn btn-primary'><i class='fa fa-edit'></i></button>&nbsp;"},
           {"defaultContent":"<button style='font-size:13px;' type='button' class='atenciones btn btn-primary'><i class='fa fa-file'></i></button>&nbsp;"}
       ],

       "language":idioma_espanol,
       select: true
   });
   document.getElementById("tabla_medico_filter").style.display="none";
   $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    } );

    $('input.column_filter').on( 'keyup click', function () {
        filterColumn( $(this).parents('tr').attr('data-column') );
    });

     /*Columna para hacer el contador*/
      tablemedico.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_medico').DataTable().page.info();
        tablemedico.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            } );
        } );
}

$('#tabla_medico').on('click','.modificar',function(){
    /*Trae todos los datos y los almacena en la variable data */
    var data = tablemedico.row($(this).parents('tr')).data();//captura la lista de datos de esta fila
    if(tablemedico.row(this).child.isShown()){//cuando esta en tamaño responsivo
        var data = tablemedico.row(this).data();
    }
    $("#modal_editar").modal({backdrop:'static',keyboard:false})
    $("#modal_editar").modal('show');
    listar_combo_especialidad_editar();
    $("#id_medico").val(data.medico_id);
    $("#txt_nombres_editar").val(data.medico_nombre);
    $("#txt_apepat_editar").val(data.medico_apepat);
    $("#txt_apemat_editar").val(data.medico_apemat);
    $("#txt_direccion_editar").val(data.medico_direccion);
    $("#txt_movil_editar").val(data.medico_movil);
    $("#cbm_sexo_editar").val(data.medico_sexo).trigger("change");
    $("#txt_fnac_editar").val(data.medico_fnac);
    $("#txt_ndoc_editar_actual").val(data.medico_nrodocumento);
    $("#txt_ndoc_editar_nuevo").val(data.medico_nrodocumento);
    $("#txt_ncol_editar_actual").val(data.medico_colegiatura);
    $("#txt_ncol_editar_nuevo").val(data.medico_colegiatura);
  //  $("#cbm_especialidad_editar").val(data.especialidad_id);
    //DATOS USUARIO
    $("#id_usuario").val(data.usu_id);
    $("#txt_usu_editar").val(data.usu_nombre);
    $("#cbm_rol_editar").val(data.rol_id);
    $("#txt_email_editar").val(data.usu_email);
    
})

var tableatendidos;
function listar_atencion_paciente(id){
    tableatendidos = $("#tabla_pacientes_atendidos").DataTable({
       "ordering":false,   
       "bLengthChange":false,
       "searching": { "regex": false },
       "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
       "pageLength": 10,
       "destroy":true,
       "async": false ,
       "processing": true,
       "ajax":{
           "url":"../controlador/medico/controlador_medico_atenciones_listar.php",
           type:'POST',
           data:{
               id:id
           }
       },   
       "order":[[1,'asc']], 
       "columns":[
           {"defaultContent":""},
           {"data":"agenda_fecha"},
           {"data":"paciente"}
       ],
       "language":idioma_espanol,
       select: true
   });

     /*Columna para hacer el contador*/
     tableatendidos.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_pacientes_atendidos').DataTable().page.info();
        tableatendidos.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            } );
        } );


}
$('#tabla_medico').on('click','.atenciones',function(){
    /*Trae todos los datos y los almacena en la variable data */
    var data = tablemedico.row($(this).parents('tr')).data();//captura la lista de datos de esta fila
    if(tablemedico.row(this).child.isShown()){//cuando esta en tamaño responsivo
        var data = tablemedico.row(this).data();
    }
    $("#modal_consultas").modal({backdrop:'static',keyboard:false})
    $("#modal_consultas").modal('show');
    listar_atencion_paciente(data.medico_id);
    

})


//revisar el buscar
function filterGlobal() {
    $('#tabla_medico').DataTable().search(
        $('#global_filter').val(),
    ).draw();
}
function AbrirModalRegistro(){
    $("#modal_registro").modal({backdrop:'static',keyboard:false})
    $("#modal_registro").modal('show');
}
function listar_combo_rol(){
    $.ajax({
        "url":"../controlador/usuario/controlador_combo_rol_listar.php",
        type:'POST'  
    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena="";
        if(data.length>0){
            for(var i=0; i < data.length; i++){
                    
                if(data[i][0]=='3'){
                     cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
                }
            }
            $("#cbm_rol").html(cadena);
            $("#cbm_rol_editar").html(cadena);

          
        }else{
            cadena+="<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_rol").html(cadena);
            $("#cbm_rol_editar").html(cadena);

        }
    })
}
function listar_combo_especialidad(){
    $.ajax({ 
        "url":"../controlador/medico/controlador_combo_especialidad_listar.php",
        type:'POST'  
    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena="";
        if(data.length>0){
            for(var i=0; i < data.length; i++){
                cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
            }

            $("#cbm_especialidad").html(cadena);      
        }else{
            cadena+="<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_especialidad").html(cadena);      
        }
    })
}

function listar_combo_especialidad_editar(){
    $.ajax({ 
        "url":"../controlador/medico/controlador_combo_especialidad_listar.php",
        type:'POST'  
    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena="";
        if(data.length>0){
            for(var i=0; i < data.length; i++){
                cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
            }
            $("#cbm_especialidad_editar").html(cadena);
          
        }else{
            cadena+="<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_especialidad_editar").html(cadena);
        }
    })
}

function Registrar_medico(){
    var nombre = $("#txt_nombres").val();
    var apepat = $("#txt_apepat").val();
    var apemat = $("#txt_apemat").val();
    var direccion = $("#txt_direccion").val();
    var movil = $("#txt_movil").val();
    var sexo= $("#cbm_sexo").val();
    var fenac = $("#txt_fnac").val();
    var nrodocumento = $("#txt_ndoc").val();
    var colegiatura = $("#txt_ncol").val();
    var especialidad = $("#cbm_especialidad").val();
    var usu = $("#txt_usu").val();
    var contra= $("#txt_contra").val();
    var rol = $("#cbm_rol").val();
    var email = $("#txt_email").val();
    var validaremail=$("#validar_email").val();
    if(validaremail=="incorrecto"){
        return Swal.fire('Mensaje De Advertencia','El email ingresado es incorrecto','warning');
    }
    
    if(nombre.length==0 || apepat.length==0 || apemat.length==0 || direccion.length==0 || movil.length==0 || sexo.length==0 ||fenac.length==0 || nrodocumento.length==0 || colegiatura.length==0 || especialidad.length==0 || usu.length==0 || contra.length==0 || rol.length==0 || email.length==0){
        return Swal.fire("Mensaje De Advertencia","Llene los campos vacios","warning");
    }

        
    $.ajax({
        "url":"../controlador/medico/controlador_medico_registro.php",
        type:'POST',
        data:{
            nombre:nombre,
            apepat:apepat,
            apemat:apemat,
            direccion:direccion,
            movil:movil,
            sexo:sexo,
            fenac:fenac,
            nrodocumento:nrodocumento,
            colegiatura:colegiatura,
            especialidad:especialidad,
            usu:usu,
            contra:contra,
            rol:rol,
            email:email
        }
    }).done(function(resp){
       if(resp>0){
            if(resp==1){
                $("#modal_registro").modal('hide');
                listar_medico();
                return Swal.fire("Mensaje De Confirmacion","Datos correctamente, Nuevo medico Registrado","success")            
                .then ( ( value ) =>  {
                    LimpiarRegistro();
                    table.ajax.reload();
                }); 
            }else{
                listar_medico();
                return Swal.fire("Mensaje De Advertencia","Lo sentimos, el nombre del medico ya se encuentra en nuestra base de datos","warning"); 
            }
        }else{
            Swal.fire("Mensaje De Error","Lo sentimos, no se pudo completar el registro","error");
        }
    })


}

function LimpiarRegistro(){

    $("#txt_nombres").val("");
    $("#txt_apepat").val("");
    $("#txt_apemat").val("");
    $("#txt_direccion").val("");
    $("#txt_movil").val("");
    $("#txt_usu").val("");
    $("#txt_fnac").val("");
    $("#txt_ndoc").val("");
    $("#txt_contra").val("");
    $("#txt_email").val("");
    $("#txt_ncol").val("");

    $("#txt_con1").val("");
    $("#txt_con2").val("");
}


function Editar_Medico(){
    var idmedico = $("#id_medico").val();
    var nombre = $("#txt_nombres_editar").val();
    var apepat = $("#txt_apepat_editar").val();
    var apemat = $("#txt_apemat_editar").val();
    var direccion = $("#txt_direccion_editar").val();
    var movil = $("#txt_movil_editar").val();
    var sexo= $("#cbm_sexo_editar").val();
    var fenac = $("#txt_fnac_editar").val();
    var nrodocumentoactual = $("#txt_ndoc_editar_actual").val();
    var nrodocumentonuevo = $("#txt_ndoc_editar_nuevo").val();
    var colegiaturaactual = $("#txt_ncol_editar_actual").val();
    var colegiaturanuevo = $("#txt_ncol_editar_nuevo").val();
    var especialidad = $("#cbm_especialidad_editar").val();
    var idusuario=$("#id_usuario").val();
    var txtusu=$("#txt_usu_editar").val();
    var email = $("#txt_email_editar").val();
    var rol = $("#cbm_rol_editar").val();
    var validaremail=$("#validar_email_editar").val();

    /*alert(idmedico+"-"+nombre+"-"+apepat+"-"+apemat+"-"+direccion +"-"+movil+"-"+sexo+"-"+fenac+"-"+nrodocumentoactual+"-"+nrodocumentonuevo+"-"+colegiaturaactual+"-"+colegiaturanuevo+"-"+especialidad+"-"+idusuario+"-"+txtusu+"-"+email+"-"+validaremail+"-"+cbm_rol_editar);*/
    /*if(validaremail=="incorrecto"){
        return Swal.fire('Mensaje De Advertencia','El email ingresado es incorrecto','warning');
    }*/
    
    if(idmedico.length==0 || nombre.length==0 || apepat.length==0 || apemat.length==0 || direccion.length==0 || movil.length==0 || sexo.length==0 ||fenac.length==0 ||nrodocumentoactual.length==0 ||nrodocumentoactual.length==0 ){
        return Swal.fire("Mensaje De Advertencia","Llene los campos vacios","warning");
    }

        
    $.ajax({
        "url":"../controlador/medico/controlador_medico_modificar.php",
        type:'POST',
        data:{
            idmedico:idmedico,
            nombre:nombre,
            apepat:apepat,
            apemat:apemat,
            direccion:direccion,
            movil:movil,
            sexo:sexo,
            fenac:fenac,
            nrodocumentoactual:nrodocumentoactual,
            nrodocumentonuevo:nrodocumentonuevo,
            colegiaturaactual:colegiaturaactual,
            colegiaturanuevo:colegiaturanuevo,
            especialidad:especialidad,
            idusuario:idusuario,
            email:email
        }
    }).done(function(resp){
    
        if(resp>0){
            if(resp==1){
                Swal.fire("Mensaje De Confirmacion","Datos correctamente, Nuevo medico Registrado","success")            
                .then ( ( value ) =>  {
                    listar_medico();
                    $("#modal_registro").modal('hide');
                    table.ajax.reload();
                }); 
            }else{
                return Swal.fire("Mensaje De Advertencia","Lo sentimos, el nombre del medico ya se encuentra en nuestra base de datos","warning");
            }
        }else{
            Swal.fire("Mensaje De Error","Lo sentimos, no se pudo completar el registro","error");
        }
    })


}

function filterGlobal() {
    $('#tabla_medico').DataTable().search(
        $('#global_filter').val(),
    ).draw();
}