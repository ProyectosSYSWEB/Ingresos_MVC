jQuery(document).ready(function () {

    //funciones de la página about   
    $("#btnAboutRegresar").click(function () {
        location = 'Contact'
    });


    //funciones compartidas entre formularios
    $("#btnNuevaSol").click(function () {
        location = 'Index'
    }); 

    //Funciones de la página index
    $("#btnNuevo").click(function () {
        $("#tablaDetalle").hide();
        $("#descripcion").show();
        if ($("#descripcion").is(":visible")) {
            $("#btnNuevo").hide();
            $("#editar").hide();
        }
    });
    //Funciones de la página Acceso
    $("#mensajeError").hide();
});