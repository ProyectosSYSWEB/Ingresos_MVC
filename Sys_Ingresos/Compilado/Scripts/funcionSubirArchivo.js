$(document).ready(function () {
    $('#btnUpload').click(function () {
        // Checking whether FormData is available in browser  

        var href = $('#linkOficio').attr('href');
        if (href == undefined || href == "") {
            Archivo();
        }
        else {
            var respuesta=confirm("¿Estas seguro de reemplazar este oficio?");
            if (respuesta == true) {
                $("#linkOficio").removeAttr("href");
                Archivo();
                //$('#txtINumOficio').val('');
                //$('#txtIFechaOficio').val('');

            } 
        }
    });

    var Archivo = function () {
        if (window.FormData !== undefined) {

            var fileUpload = $("#FileUpload1").get(0);
            var escuela = $("#cmbIEscuela").val();
            var carrera = $("#cmbCarrera").val();
            var generacion = $("#hddnGeneracion").val();
            var numOficio = $("#txtINumOficio").val();
            var fechOficio = $("#txtIFechaOficio").val();
            var files = fileUpload.files;
            var nombreDocto;
            // Create FormData object  
            var fileData = new FormData();

            // Looping over all files and add it to FormData object  
            for (var i = 0; i < files.length; i++) {
                fileData.append(files[i].name, files[i]);
                nombreDocto = files[i].name;
            }


            // Adding one more key to FormData object  
            fileData.append('username', "UNACH-DSIA");

            $.ajax({
                url: urlServer + 'SIAE/UploadFiles',
                type: "POST",
                contentType: false, // Not to set any content header  
                processData: false, // Not to process data  
                //data: escuela, carrera, generacion, numOficio, fechOficio, fileData,
                data: fileData,
                success: function (result) {
                    if (result == true) {
                        $.ajax({
                            url: urlServer + 'SIAE/GuardarDatosOficio',
                            type: "GET",
                            data: { escuela, carrera, generacion, numOficio, fechOficio, nombreDocto },
                            success: function (respuesta) {
                                if (respuesta == true) {
                                    alert("El archivo fue guardado correctamente.");
                                    //this.nombre_ofic = nombreDocto;                                            
                                    $("#Adjuntar").modal("hide");
                                    $("#bttnVerOficio").attr("onclick", "VerOficio(" + nombreDocto+")");
                                    //$('#bttnVerOficio').val('');
                                    
                                    //$("#linkOficio").attr("href", "../ArchivosAdj/OficiosPosgrado/" + nombreDocto);
                                    //$("#linkOficio").attr("title", nombreDocto);
                                }
                                else
                                    alert("Error al guardar el archivo.");
                            },
                            error: function (err) {
                                alert(err.statusText);
                            }
                        });

                    }
                },
                error: function (err) {
                    alert(err.statusText);
                }
            });


        }
        else {
            alert("FormData is not supported.");
        }

    }
});  