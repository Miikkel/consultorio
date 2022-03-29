var tablecita;

function listar_cita() {
    tablecita = $("#tabla_cita").DataTable({
        "ordering": false,
        "bLengthChange": false,
        "searching": { "regex": false },
        "lengthMenu": [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"]
        ],
        "pageLength": 10,
        "destroy": true,
        "async": false,
        "processing": true,
        "ajax": {
            "url": "../controlador/cita/controlador_cita_listar.php",
            type: 'POST'
        },
        "order": [
            [1, 'asc']
        ],
        "columns": [
            { "defaultContent": "" },
            { "data": "cita_nroatencion" },
            { "data": "cita_feregistro" },
            { "data": "paciente" },
            { "data": "medico" },
            { "data": "agenda_fecha" },
            { "data": "cita_estatus",
                render: function(data, type, row) {
                    if (data == 'PENDIENTE') {
                        return "<span class='label label-primary'>" + data + "</span>";
                    }
                    
                    if (data == 'ATENDIDA') {
                        return "<span class='label label-success'>" + data + "</span>";
                    }

                    if (data == 'CANCELADA') {
                        return "<span class='label label-danger'>" + data + "</span>";
                    }
                }
            },
            { "defaultContent": "<button style='font-size:13px;' type='button' class='modificar btn btn-primary'><i class='fa fa-edit'></i></button>&nbsp;" }
        ],

        "language": idioma_espanol,
        select: true
    });
    document.getElementById("tabla_cita_filter").style.display = "none";
    $('input.global_filter').on('keyup click', function() {
        filterGlobal();
    });

    $('input.column_filter').on('keyup click', function() {
        filterColumn($(this).parents('tr').attr('data-column'));
    });

    /*Columna para hacer el contador*/
    tablecita.on('draw.dt', function() {
        var PageInfo = $('#tabla_cita').DataTable().page.info();
        tablecita.column(0, { page: 'current' }).nodes().each(function(cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });


}


$('#tabla_cita').on('click', '.modificar', function() {
    /*Trae todos los datos y los almacena en la variable data */
    var data = tablecita.row($(this).parents('tr')).data(); //captura la lista de datos de esta fila
    if (tablecita.row(this).child.isShown()) { //cuando esta en tamaño responsivo
        var data = tablecita.row(this).data();
    }
    $("#modal_editar").modal({ backdrop: 'static', keyboard: false })
    $("#modal_editar").modal('show');
    listar_paciente_combo_editar();
    listar_especialidad_combo_editar();


    $("#cbm_paciente_editar").val(data.paciente_id).trigger("change"); //jalamos los datos desde el data 
    $("#cbm_especialidad_editar").val(data.especialidad_id).trigger("change");
    $("#cbm_doctor_editar").val(data.medico_id).trigger("change");
    $("#txt_descripcion_editar").val(data.cita_descripcion);
    $("#txt_cita_id").val(data.cita_id); //te obligue a elegir entre las opciones   
    $("#txt_fecha_cita_editar").val(data.agenda_fecha);
    $("#cbm_especialidad_editar").change(function() {
        var idda = $("#cbm_especialidad_editar").val();
        var med = $("#cbm_doctor_editar").val();
        listar_doctor_combo_editar(idda, med);
    });
})



function filterGlobal() {
    $('#tabla_cita').DataTable().search(
        $('#global_filter').val(),
    ).draw();
}

function AbrirModalRegistro() {
    $("#modal_registro").modal({ backdrop: 'static', keyboard: false })
    $("#modal_registro").modal('show');
}


function listar_paciente_combo() {
    $.ajax({
        "url": "../controlador/cita/controlador_combo_paciente_listar.php",
        type: 'POST'
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i][0] + "'>" + data[i][1] + "</option>";
            }
            $("#cbm_paciente").html(cadena);
            // $("#cbm_paciente_editar").html(cadena);


        } else {
            cadena += "<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_paciente_editar").html(cadena);
            //$("#cbm_paciente").html(cadena);


        }
    })
}

function listar_especialidad_combo() {
    $.ajax({
        "url": "../controlador/cita/controlador_combo_especialidad_listar.php",
        type: 'POST'
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i][0] + "'>" + data[i][1] + "</option>";
            }
            $("#cbm_especialidad").html(cadena);
            var id = $("#cbm_especialidad").val();
            listar_doctor_combo(id);

        } else {
            cadena += "<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_especialidad").html(cadena);

        }
    })
}

function listar_doctor_combo(id) {
    $.ajax({
        "url": "../controlador/cita/controlador_combo_doctor_listar.php",
        type: 'POST',
        data: {
            id: id
        }
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i][0] + "'>" + data[i][1] + "</option>";
            }
            $("#cbm_doctor").html(cadena);


        } else {
            cadena += "<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_doctor").html(cadena);

        }
    })
}

function Registrar_cita() {
    var paciente = $("#cbm_paciente").val();
    var doctor = $("#cbm_doctor").val();
    var fecha = $("#txt_fecha_cita").val();
    var descripcion = $("#txt_descripcion").val();
    var idusuario = $("#txtidprincipal").val();

    if (paciente.length == 0 || descripcion.length == 0 || fecha.length == 0) {
        return Swal.fire("Mensaje De Advertencia", "Llene los campos vacios, para completar la accion", "warning");
    }

    $.ajax({
        "url": "../controlador/cita/controlador_cita_registro.php",
        type: 'POST',
        data: {
            paciente: paciente,
            doctor: doctor,
            fecha: fecha,
            descripcion: descripcion,
            idusuario: idusuario
        }

    }).done(function(resp) {

        if (resp > 0) {

            $("#modal_registro").modal('hide');
            listar_cita();
            LimpiarCampos();
            return Swal.fire("Mensaje De Confirmacion", "La cita se agendo exitosamente", "success");


        } else {
            return Swal.fire("Mensaje De Error", "Lo sentimos el registro no se pudo completar", "error");

        }
    })

}

function Registrar_previacita(){
    var paciente = $("#txtnombre").val();
    var dni = $("#txtdni").val();
    var fecha = $("#txtfecha").val();
    var especialidad = $("#txtespecialidad").val();
    var cel = $("#txtcelular").val();
    var horario = $("#txthorario").val();


    if (paciente.length == 0 || dni.length == 0 || fecha.length == 0 ||  especialidad.length==0 || cel.length==0 || horario.length==0) {
        return Swal.fire("Mensaje De Advertencia", "Llene los campos vacios, para completar la accion", "warning");
    }

    $.ajax({
        "url": "../controlador/cita/controlador_cita_previa.php",
        type: 'POST',
        data: {
            paciente: paciente,
            dni: dni,
            fecha: fecha,
            especialidad: especialidad,
            cel: cel,
            horario:horario
        }

    }).done(function(resp) {
        if (resp > 0) {
            return Swal.fire("Mensaje De Confirmacion", "La cita se agendo exitosamente", "success");
        } else {
            return Swal.fire("Mensaje De Error", "Lo sentimos el registro no se pudo completar", "error");
        }
    })

}
function LimpiarCampos() {
    $("#txt_descripcion").val("");
}

function Modificar_Cita() {
    var idcita = $("#txt_cita_id").val();
    var idpaciente = $("#cbm_paciente_editar").val();
    var iddoctor = $("#cbm_doctor_editar").val();
    var fecha = $("#txt_fecha_cita_editar").val();
    var descripcion = $("#txt_descripcion_editar").val();
    var idespecialidad = $("#cbm_especialidad_editar").val();
    var estatus = $("#cbm_estatus").val();

    if (idcita.length == 0 || idpaciente.length == 0 || iddoctor.length == 0 || idespecialidad.length == 0 || descripcion.length == 0) {
        return Swal.fire("Mensaje De Advertencia", "Llene los campos vacios, para completar la accion", "warning");
    }

    $.ajax({
        "url": "../controlador/cita/controlador_cita_modificar.php",
        type: 'POST',
        data: {
            idcita: idcita,
            idpaciente: idpaciente,
            idespecialidad: idespecialidad,
            iddoctor: iddoctor,
            fecha: fecha,
            descripcion: descripcion,
            estatus: estatus
        }

    }).done(function(resp) {

        if (resp > 0) {
            if (resp != 1) {
                $("#modal_editar").modal('hide');
                listar_cita();
                return Swal.fire("Mensaje De Advertencia", "Ya cuenta con una cita registrada para ese dia", "warning");

            } else {
                listar_cita();
                return Swal.fire("Mensaje De Confirmacion", "Datos guardados correctamente", "success");
            }
        } else {
            Swal.fire("Mensaje De Error", "Lo sentimos el registro no se pudo completar", "error");

        }
    })

}


function listar_paciente_combo_editar() {
    $.ajax({
        "url": "../controlador/cita/controlador_combo_paciente_listar.php",
        type: 'POST'
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i][0] + "'>" + data[i][1] + "</option>";
            }
            $("#cbm_paciente_editar").html(cadena);
        } else {
            cadena += "<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_paciente_editar").html(cadena);

        }
    })
}

function listar_especialidad_combo_editar() {
    $.ajax({
        "url": "../controlador/cita/controlador_combo_especialidad_listar.php",
        type: 'POST'
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i][0] + "'>" + data[i][1] + "</option>";
            }
            $("#cbm_especialidad_editar").html(cadena);
            var id = $("#cbm_especialidad_editar").val();
            listar_doctor_combo_editar(id);

        } else {
            cadena += "<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_especialidad_editar").html(cadena);

        }
    })
}

function listar_doctor_combo_editar(id, idmedico) {
    $.ajax({
        "url": "../controlador/cita/controlador_combo_doctor_listar.php",
        type: 'POST',
        data: {
            id: id
        }
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i][0] + "'>" + data[i][1] + "</option>";
            }
            $("#cbm_doctor_editar").html(cadena);
            if (idmedico != "") {
                $("cbm_doctor_editar").val(idmedico).trigger("change");
            }

        } else {
            cadena += "<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_doctor_editar").html(cadena);

        }
    })
}