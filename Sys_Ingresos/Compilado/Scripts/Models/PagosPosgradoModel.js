
/// <reference path="../global.js"/>

var posgradoPagosContext =
    {
        pagos: [],
        PagosPosgrado: function (Matricula, Escuela, callBackResult) {
            var self = this;
            self.pagos.length = 0;
            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'SIAE/ListarPagos',
                    data: { Matricula, Escuela },
                    success: function (resp) {
                        for (var i = 0; i < resp.length; i++) {
                            self.pagos.push({ Concepto: resp[i].CONCEPTO, NoPago: resp[i].NO_PAGO, Importe: resp[i].IMPORTE, Referencia: resp[i].REFERENCIA, FechaPago: resp[i].FECHA_PAGO, Semestre: resp[i].SEMESTRE });
                        }
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    },
                    error: function (ex) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                        }
                    }
                });
        }
    }