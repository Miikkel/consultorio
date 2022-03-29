

    function Registrar_previacita(){
        var paciente = $("#txtnombre").val();
        var dni = $("#txtdni").val();
        var fecha = $("#txtfecha").val();
        var especialidad = $("#txtespecialidad").val();
        var cel = $("#txtcelular").val();
        var horario = $("#txthorario").val();
     alert(paciente +"-"+dni);
    
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
                limpiar();
                return Swal.fire("Mensaje De Confirmacion", "La cita se agendo exitosamente", "success");
           
        })
    
    }
  


    function limpiar(){
        $("#txtnombre").val(" ");
        $("#txtdni").val(" ");
        $("#txtfecha").val(" ");
        $("#txtespecialidad").val(" ");
        $("#txtcelular").val(" ");
        $("#txthorario").val(" ");
    }


