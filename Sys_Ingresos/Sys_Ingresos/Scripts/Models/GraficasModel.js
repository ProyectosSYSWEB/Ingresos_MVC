/// <reference path="../global.js"/>

var graficasContext = {
    
    listDatosPagados: [],

    ObtenerDatosGraficaPagados: function (Dependencia, Ciclo_Escolar,callBackResult) {
        var self = this;
        self.listDatosPagados.length = 0;
        $.ajax({
            type: "GET",
            cache: false,
            url: urlServer + "Graficas/ObtenerDatosGraficaPagados",
            data: {
                Dependencia, Ciclo_Escolar             
            },
            success: function (resp) {
                if (resp.ERROR === false) {
                    for (var i = 0; i < resp.RESULTADO.length; i++) {
                        self.listDatosPagados.push({
                            Dato1: resp.RESULTADO[i].DATO1, Dato2: resp.RESULTADO[i].DATO2
                        });
                    }
                    callBackResult({ ressult: 'tgp' });
                }
                else {
                    $("#loading").hide();
                    callBackResult({ ressult: 'notgp', message: resp });
                }
            },
            error: function (ex) {
                if (callBackResult !== undefined) {
                    callBackResult({ ressult: 'notgp', message: ex.statusText });
                }
            }
        });
    }


};