var tablehistorial; 
function listar_historial(){
    var finicio=$("#txt_fechainicio").val();
    var ffin=$("#txt_fechafin").val();
    tablehistorial = $("#tabla_historial").DataTable({
       "ordering":false,   
       "bLengthChange":true,
       "searching": { "regex": true },
       "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
       "pageLength": 10,
       "destroy":true,
       "async": false ,
       "processing": true,
       "ajax":{
           "url":"../controlador/historial/controlador_historial_listar.php",
           type:'POST',
           data:{
              fechainicio:finicio,
              fechafin:ffin 
           }
       },   
       "order":[[1,'asc']], 
       "columns":[
           {"defaultContent":""},
           {"data":"fua_fregistro"},
           {"data":"paciente_nrodocumento"},
           {"data":"paciente"},
           {"defaultContent":"<button style='font-size:13px;' type='button' class='diagnostico btn btn-default' title='diagnostico'><i class='fa fa-eye'></i></button>&nbsp;"},
           {"defaultContent":"<button style='font-size:13px;' type='button' class='verdetalle btn btn-default' title='detalle'><i class='fa fa-eye'></i></button>&nbsp;"}
       ],

       "language":idioma_espanol,
       select: true
   });
   /*
   document.getElementById("tabla_historial_filter").style.display="none";
   $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    } );

    $('input.column_filter').on( 'keyup click', function () {
        filterColumn( $(this).parents('tr').attr('data-column') );
    });
*/
     /*Columna para hacer el contador*/
      tablehistorial.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_historial').DataTable().page.info();
        tablehistorial.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            } );
        } );

}

function AbrirModalRegistro(){
    $("#modal_registro").modal({backdrop:'static',keyboard:false})
    $("#modal_registro").modal('show');
}


$('#tabla_historial').on('click','.modificar',function(){
    /*Trae todos los datos y los almacena en la variable data */
    var data = tablehistorial.row($(this).parents('tr')).data();//captura la lista de datos de esta fila
    if(tablehistorial.row(this).child.isShown()){//cuando esta en tama??o responsivo
        var data = tablehistorial.row(this).data();
    }
    $("#modal_editar").modal({backdrop:'static',keyboard:false})
    $("#modal_editar").modal('show');

    $("#txt_historial_id").val(data.historial_id);
    $("#txt_paciente_editar").val(data.paciente);
    $("#txt_descripcion_historial_editar").val(data.historial_descripcion);
    $("#txt_diagnostico_historial_editar").val(data.historial_diagnostico);
})

///////////////////////////////////////FUNCIONES DE REGISTRO HISTORIAL
function AbrirModalConsulta(){
    $("#modal_consultas").modal({backdrop:'static',keyboard:false})
    $("#modal_consultas").modal('show');
    listar_historial_consulta();
}


var tablaconsultahistorial;
function listar_historial_consulta(){
   
    tablaconsultahistorial = $("#tabla_consulta_historial").DataTable({
       "ordering":false,   
       "bLengthChange":true,
       "searching": { "regex": true },
       "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
       "pageLength": 10,
       "destroy":true,
       "async": false ,
       "processing": true,
       "ajax":{
           "url":"../controlador/historial/controlador_historial_consulta_listar.php",
           type:'POST',
       },   
       "order":[[1,'asc']], 
       "columns":[
           {"defaultContent":""},
           {"data":"consulta_feregistro"},
           {"data":"paciente_nrodocumento"},
           {"data":"paciente"},
           {"defaultContent":"<button style='font-size:13px;' type='button' class='enviar btn btn-success' title='Enviar'><i class='fa fa-sign-in'></i>&nbsp;Enviar</button>&nbsp;"},
       ],

       "language":idioma_espanol,
       select: true
   });
   /*
   document.getElementById("tabla_consulta_historial_filter").style.display="none";
   $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    } );

    $('input.column_filter').on( 'keyup click', function () {
        filterColumn( $(this).parents('tr').attr('data-column') );
    });
*/
     /*Columna para hacer el contador*/
     tablaconsultahistorial.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_consulta_historial').DataTable().page.info();
        tablaconsultahistorial.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            } );
        } );
}


$('#tabla_consulta_historial').on('click','.enviar',function(){
    /*Trae todos los datos y los almacena en la variable data */
    var data = tablaconsultahistorial.row($(this).parents('tr')).data();//captura la lista de datos de esta fila
    if(tablaconsultahistorial.row(this).child.isShown()){//cuando esta en tama??o responsivo
        var data = tablaconsultahistorial.row(this).data();
    }
    $("#txt_codhistorial").val(data.historia_id);
    $("#txt_paciente").val(data.paciente);
    $("#txt_desconsulta").val(data.consulta_descripcion);
    $("#txt_diagconsulta").val(data.consulta_diagnostico);
    $("#txt_idconsulta").val(data.consulta_id);

    $("#modal_consultas").modal('hide');


})


function listar_insumo(){
    $.ajax({
        "url":"../controlador/historial/controlador_combo_insumo_listar.php",
        type:'POST'  
    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena="";
        if(data.length>0){
            for(var i=0; i < data.length; i++){
                cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
            }
            $("#cbm_insumos").html(cadena);
            var id=$("#cbm_insumos").val();
            TraerStockMedicamento(id);
        }else{
            cadena+="<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_insumos").html(cadena);

        }
    })
}

function TraerStockMedicamento(idinsumo){
    $.ajax({
        "url":"../controlador/historial/controlador_traer_stock_insumo.php",
        type:'POST',
        data:{
            id:idinsumo
        } 
    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena="";
        if(data.length>0){
            $("#stock_insumo").val(data[0][1]);
        }else{
            return Swal.fire("Mensaje De Advertencia","No se pudo traer el stock","error");
        }
    })

}

function listar_procedimiento(){
    $.ajax({
        "url":"../controlador/historial/controlador_combo_procedimiento_listar.php",
        type:'POST'  
    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena="";
        if(data.length>0){
            for(var i=0; i < data.length; i++){
                cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
            }
            $("#cbm_procedimiento").html(cadena);
          
        }else{
            cadena+="<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_procedimiento").html(cadena);


        }
    })
}
function listar_medicamento(){
    $.ajax({
        "url":"../controlador/historial/controlador_combo_medicamento_listar.php",
        type:'POST'  
    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena="";
        if(data.length>0){
            for(var i=0; i < data.length; i++){
                cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
            }
            $("#cbm_medicamento").html(cadena);
            var id=$("#cbm_medicamento").val();
            TraerStockMedicamento(id);
        }else{
            cadena+="<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_medicamento").html(cadena);

        }
    })
}

function TraerStockMedicamento(idmedicamento){
    $.ajax({
        "url":"../controlador/historial/controlador_traer_stock_medicamento.php",
        type:'POST',
        data:{
            id:idmedicamento
        } 
    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena="";
        if(data.length>0){
            $("#stock_medicamento").val(data[0][1]);
        }else{
            return Swal.fire("Mensaje De Advertencia","No se pudo traer el stock","error");
        }
    })

}

function listar_insumo(){
    $.ajax({
        "url":"../controlador/historial/controlador_combo_insumo_listar.php",
        type:'POST'  
    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena="";
        if(data.length>0){
            for(var i=0; i < data.length; i++){
                cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
            }
            $("#cbm_insumos").html(cadena);
            var id=$("#cbm_insumos").val();
            TraerStockInsumo(id);
        }else{
            cadena+="<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_insumos").html(cadena);

        }
    })
}

function TraerStockInsumo(idinsumo){
    $.ajax({
        "url":"../controlador/historial/controlador_traer_stock_insumo.php",
        type:'POST',
        data:{
            id:idinsumo
        } 
    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena="";
        if(data.length>0){
            $("#stock_insumo").val(data[0][1]);
        }else{
            return Swal.fire("Mensaje De Advertencia","No se pudo traer el stock","error");
        }
    })

}

function Agregar_Procedimiento(){
    var idprocedimiento=$("#cbm_procedimiento").val();
    var procedimiento=$("#cbm_procedimiento option:selected").text();

    if( idprocedimiento==""){
        return Swal.fire("Mensaje De Advertencia","No hay procedimientos disponibles","warning");
    }

    if(verificarid(idprocedimiento)){
        return Swal.fire("Mensaje De Advertencia","el procedimiento ya se agrego","warning");
    }

    var datos_agregar="<tr>";
    datos_agregar+= "<td for='id'>"+idprocedimiento+"</td>";
    datos_agregar+="<td>"+procedimiento+"</td>";
    datos_agregar+="<td><button class='btn btn-danger' onclick='remove(this)'><i class='fa fa-trash'></button></i></td>";
    datos_agregar+="</tr>";
    $("#tbody_tabla_procedimiento").append(datos_agregar);

}

function verificarid(id){
    let idverificar=document.querySelectorAll('#tabla_procedimiento td[for="id"]');
    return [].filter.call(idverificar,td=>td.textContent=== id).length===1;  
}

function remove(t){
    var td=t.parentNode;
    var tr=td.parentNode;
    var table=tr.parentNode;
    table.removeChild(tr);
}


function Agregar_Insumo(){
    var idinsumo=$("#cbm_insumos").val();
    var insumo=$("#cbm_insumos option:selected").text();
    var cantidadactual=$("#stock_insumo").val();
    var cantidadingresada=$("#txt_cantidad_agregar").val();
    
    if( parseInt(cantidadingresada)>parseInt(cantidadactual)){
        return Swal.fire("Mensaje De Advertencia","No hay stock disponible","warning");
    }

    if( idinsumo==""){
        return Swal.fire("Mensaje De Advertencia","No hay insumos disponibles","warning");
    }

    if(verificaridinsumo(idinsumo)){
        return Swal.fire("Mensaje De Advertencia","El insumo ya se agrego","warning");
    }

    var datos_agregar="<tr>";
    datos_agregar+= "<td for='id'>"+idinsumo+"</td>";
    datos_agregar+="<td>"+insumo+"</td>";
    datos_agregar+="<td>"+cantidadingresada+"</td>";
    datos_agregar+="<td><button class='btn btn-danger' onclick='remove(this)'><i class='fa fa-trash'></button></i></td>";
    datos_agregar+="</tr>";
    $("#tbody_tabla_insumo").append(datos_agregar);

}

function verificaridinsumo(id){
    let idverificar=document.querySelectorAll('#tabla_insumo td[for="id"]');
    return [].filter.call(idverificar,td=>td.textContent=== id).length===1;  
}

function removeinsumo(t){
    var td=t.parentNode;
    var tr=td.parentNode;
    var table=tr.parentNode;
    table.removeChild(tr);
}

function Agregar_Medicamento(){
    var idmedicamento=$("#cbm_medicamento").val();
    var medicamento=$("#cbm_medicamento option:selected").text();
    var cantidadactual=$("#stock_insumo").val();
    var cantidadingresada=$("#txt_medicantidad_agregar").val();
    
    if( parseInt(cantidadingresada)>parseInt(cantidadactual)){
        return Swal.fire("Mensaje De Advertencia","No hay stock disponible","warning");
    }

    if( idmedicamento==""){
        return Swal.fire("Mensaje De Advertencia","No hay medicamentos disponibles","warning");
    }

    if(verificaridmedicamento(idmedicamento)){
        return Swal.fire("Mensaje De Advertencia","El medicamento ya se agrego","warning");
    }

    var datos_agregar="<tr>";
    datos_agregar+= "<td for='id'>"+idmedicamento+"</td>";
    datos_agregar+="<td>"+medicamento+"</td>";
    datos_agregar+="<td>"+cantidadingresada+"</td>";
    datos_agregar+="<td><button class='btn btn-danger' onclick='remove(this)'><i class='fa fa-trash'></button></i></td>";
    datos_agregar+="</tr>";
    $("#tbody_tabla_medicamento").append(datos_agregar);

}

function verificaridmedicamento(id){
    let idverificar=document.querySelectorAll('#tabla_medicamento td[for="id"]');
    return [].filter.call(idverificar,td=>td.textContent=== id).length===1;  
}

function removemedicamento(t){
    var td=t.parentNode;
    var tr=td.parentNode;
    var table=tr.parentNode;
    table.removeChild(tr);
}

function RegistrarHistorial(){
    var idhistorial=$("#txt_codhistorial").val();
    var idconsulta=$("#txt_idconsulta").val();
    if(idhistorial.length ==0 ||idconsulta.length==0){
        return Swal.fire("Mensaje De Error","Los valores no concuerdan","error");
    }

    $.ajax({
        "url":"../controlador/historial/controlador_fua_registro.php",
        type:'POST',
        data:{
         
            idhistorial:idhistorial,
            idconsulta:idconsulta
        }
    }).done(function(resp){
        var data = JSON.parse(resp);
        var id=data[0][0]; //sacamos el id por medio de un array, si no sale NaN
        if(id>0){
            registrar_detalle_procedimiento(id);
            registrar_detalle_medicamento(id);
            registrar_detalle_insumo(id);
            return Swal.fire("Mensaje De Confirmacion","Datos registrados correctamente","success").then((value)=>{
                $("#contenido_principal").load("historial/vista_historial_listar.php");

            });

        }else{
                return Swal.fire("Mensaje De Error","Lo sentimos el registro no se pudo completar","error");
 
        }
    })
}

function registrar_detalle_procedimiento(id){  
    var count=0;
    var arreglo_idprocedimiento=new Array();
    $("#tabla_procedimiento tbody#tbody_tabla_procedimiento tr").each(function(){
        arreglo_idprocedimiento.push($(this).find('td').eq(0).text());
        count++;
    })
    var idprocedimiento= arreglo_idprocedimiento.toString();
    if(count==0){
        return;
    }

    $.ajax({
        "url":"../controlador/historial/controlador_detalle_procedimiento_registro.php",
        type:'POST',
        data:{
         
            id:id,
            idprocedimiento:idprocedimiento
        }

    }).done(function(resp){
        console.log(resp);
    })
}

function registrar_detalle_medicamento(id){  
    var count=0;
    var arreglo_idmedicamento=new Array();
    var arreglo_cantidad=new Array();

    $("#tabla_medicamento tbody#tbody_tabla_medicamento tr").each(function(){
        arreglo_idmedicamento.push($(this).find('td').eq(0).text());
        arreglo_cantidad.push($(this).find('td').eq(2).text());

        count++;
    })
    var idmedicamento= arreglo_idmedicamento.toString();
    var cantidad= arreglo_cantidad.toString();
    if(count==0){
        return;
    }

    $.ajax({
        "url":"../controlador/historial/controlador_detalle_medicamento_registro.php",
        type:'POST',
        data:{
         
            id:id,
            idmedicamento:idmedicamento,
            cantidad:cantidad
        }

    }).done(function(resp){
        console.log(resp);
    })
}

function registrar_detalle_insumo(id){  
    var count=0;
    var arreglo_idinsumo=new Array();
    var arreglo_cantidad=new Array();

    $("#tabla_insumo tbody#tbody_tabla_insumo tr").each(function(){
        arreglo_idinsumo.push($(this).find('td').eq(0).text());
        arreglo_cantidad.push($(this).find('td').eq(2).text());

        count++;
    })
    var idinsumo= arreglo_idinsumo.toString();
    var cantidad= arreglo_cantidad.toString();
    if(count==0){
        return;
    }

    $.ajax({
        "url":"../controlador/historial/controlador_detalle_insumo_registro.php",
        type:'POST',
        data:{
         
            id:id,
            idinsumo:idinsumo,
            cantidad:cantidad
        }

    }).done(function(resp){
        console.log(resp);
    })
}


$('#tabla_historial').on('click','.diagnostico',function(){
    /*Trae todos los datos y los almacena en la variable data */
    var data = tablehistorial.row($(this).parents('tr')).data();//captura la lista de datos de esta fila
    if(tablehistorial.row(this).child.isShown()){//cuando esta en tama??o responsivo
        var data = tablehistorial.row(this).data();
    }
    $("#modal_diagnostico").modal({backdrop:'static',keyboard:false})
    $("#modal_diagnostico").modal('show');

    $("#txt_diagnostico_fua").val(data.consulta_diagnostico);
    ///revisar por que estas lineas
    $("#txt_paciente_editar").val(data.paciente);
    $("#txt_descripcion_historial_editar").val(data.historial_descripcion);
    $("#txt_diagnostico_historial_editar").val(data.historial_diagnostico);
})

//////////////////////////////////////
function AbrirModalConsulta(){
    $("#modal_consultas").modal({backdrop:'static',keyboard:false})
    $("#modal_consultas").modal('show');
    listar_historial_consulta();
}

$('#tabla_historial').on('click','.verdetalle',function(){
    /*Trae todos los datos y los almacena en la variable data */
    var data = tablehistorial.row($(this).parents('tr')).data();//captura la lista de datos de esta fila
    if(tablehistorial.row(this).child.isShown()){//cuando esta en tama??o responsivo
        var data = tablehistorial.row(this).data();
    }
    $("#modal_detalle").modal({backdrop:'static',keyboard:false})
    $("#modal_detalle").modal('show');

    listar_procedimiento_detalle(data.fua_id);
    listar_insumo_detalle(data.fua_id);
    listar_medicamento_detalle(data.fua_id);
})


var tableprocedimiento; 
function listar_procedimiento_detalle(idfua){
    tableprocedimiento = $("#tabla_procedimiento").DataTable({
       "ordering":false,   
       "bLengthChange":true,
       "searching": { "regex": true },
       "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
       "pageLength": 10,
       "destroy":true,
       "async": false ,
       "processing": true,
       "ajax":{
           "url":"../controlador/historial/controlador_detalleprocedimiento_listar.php",
           type:'POST',
           data:{
               id:idfua
           }
       },   
       "order":[[1,'asc']], 
       "columns":[
           {"defaultContent":""},
           {"data":"procedimiento_nombre"}
          
       ],

       "language":idioma_espanol,
       select: true
   });
   /*
   document.getElementById("tabla_procedimiento_filter").style.display="none";
   $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    } );

    $('input.column_filter').on( 'keyup click', function () {
        filterColumn( $(this).parents('tr').attr('data-column') );
    });
*/
     /*Columna para hacer el contador*/
     tableprocedimiento.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_procedimiento').DataTable().page.info();
     tableprocedimiento.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            } );
        } );

}


var tableinsumo; 
function listar_insumo_detalle(idfua){
    tableinsumo = $("#tabla_insumo").DataTable({
       "ordering":false,   
       "bLengthChange":true,
       "searching": { "regex": true },
       "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
       "pageLength": 10,
       "destroy":true,
       "async": false ,
       "processing": true,
       "ajax":{
           "url":"../controlador/historial/controlador_detalleinsumo_listar.php",
           type:'POST',
           data:{
               id:idfua
           }
       },   
       "order":[[1,'asc']], 
       "columns":[
           {"defaultContent":""},
           {"data":"insumo_nombre"},
           {"data":"detain_cantidad"}
       ],

       "language":idioma_espanol,
       select: true
   });
 
     /*Columna para hacer el contador*/
     tableinsumo.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_insumo').DataTable().page.info();
        tableinsumo.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            } );
        } );

}




var tablemedicamento; 
function listar_medicamento_detalle(idfua){
    tablemedicamento = $("#tabla_medicamento").DataTable({
       "ordering":false,   
       "bLengthChange":true,
       "searching": { "regex": true },
       "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
       "pageLength": 10,
       "destroy":true,
       "async": false ,
       "processing": true,
       "ajax":{
           "url":"../controlador/historial/controlador_detallemedicamento_listar.php",
           type:'POST',
           data:{
               id:idfua
           }
       },   
       "order":[[1,'asc']], 
       "columns":[
           {"defaultContent":""},
           {"data":"medicamento_nombre"},
           {"data":"detame_cantidad"}
       ],

       "language":idioma_espanol,
       select: true
   });
 
     /*Columna para hacer el contador*/
     tablemedicamento.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_medicamento').DataTable().page.info();
        tablemedicamento.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            } );
        } );

}
