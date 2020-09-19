
/// <reference path="../global.js"/>

var adminContext =
{
    referencias: [],

    ObtenerReferencias: function (fecha_dispersado, callBackResult) {
        var self = this;
        self.referencias.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Administracion/ListarReferencias',
                data: { Fecha_Dispersado: fecha_dispersado },
                success: function (resp) {
                    if (resp.ERROR === false) {
                        for (var i = 0; i < resp.RESULTADO.length; i++) {

                            self.referencias.push({ Fecha_Factura: resp.RESULTADO[i].FECHA_FACTURA, Fecha_Dispersado: resp.RESULTADO[i].FECHA_DISPERSADO, Escuela: resp.RESULTADO[i].DEPENDENCIA, Nombre: resp.RESULTADO[i].RECEPTOR_NOMBRE, Banco: resp.RESULTADO[i].BANCO, Importe: resp.RESULTADO[i].IMPORTE, Referencia: resp.RESULTADO[i].REFERENCIA });
                        }
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    }
                    else
                        callBackResult({ ressult: "notgp", message: resp.MENSAJE_ERROR });

                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ListarEscuelas." });
                    }
                }
            });
    },
    CambiarFechaDispersado: function (fecha_dispersado, nueva_fecha_dispersado, callBackResult) {
        var self = this;
        self.referencias.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Administracion/ModificarFechaDispersado',
                data: { Fecha_Dispersado_Old: fecha_dispersado, Fecha_Dispersado_New: nueva_fecha_dispersado },
                success: function (resp) {
                    if (resp.ERROR === false) {
                        for (var i = 0; i < resp.RESULTADO.length; i++) {

                            self.referencias.push({ Fecha_Factura: resp.RESULTADO[i].FECHA_FACTURA, Fecha_Dispersado: resp.RESULTADO[i].FECHA_DISPERSADO, Escuela: resp.RESULTADO[i].DEPENDENCIA, Nombre: resp.RESULTADO[i].RECEPTOR_NOMBRE, Banco: resp.RESULTADO[i].BANCO, Importe: resp.RESULTADO[i].IMPORTE, Referencia: resp.RESULTADO[i].REFERENCIA });
                        }
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    }
                    else
                        callBackResult({ ressult: "notgp", message: resp.MENSAJE_ERROR });

                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ListarEscuelas." });
                    }
                }
            });
    },

}