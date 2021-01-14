/// <reference path="../global.js"/>

var graficasContext = {
    
    listDatosPagados: [],
    ciclos: [],
    escuelas: [],
    ObtenerDatosGraficaPagados: function (Dependencia, Ciclo_Escolar, Tipo, callBackResult) {
        var self = this;
        self.listDatosPagados.length = 0;
        $.ajax({
            type: "GET",
            cache: false,
            url: urlServer + "Graficas/ObtenerDatosGraficaPagados",
            data: {
                Dependencia, Ciclo_Escolar, Tipo           
            },
            success: function (resp) {
                if (resp.ERROR === false) {
                    for (var i = 0; i < resp.RESULTADO.length; i++) {
                        self.listDatosPagados.push({
                            Dato1: resp.RESULTADO[i].DATO1, Dato2: resp.RESULTADO[i].DATO2, Dato3: resp.RESULTADO[i].DATO3
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
    },
    Ciclos: function (callBackResult) {
        var self = this;
        self.ciclos.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'SIAE/ListarCiclosLicenciatura',
                success: function (resp) {
                    if (resp.ERROR === false) {
                        for (var i = 0; i < resp.RESULTADO.length; i++) {
                            self.ciclos.push({ Id: resp.RESULTADO[i].ID, Descripcion: resp.RESULTADO[i].DESCRIPCION });
                        }
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    }
                    else {
                        callBackResult({ ressult: "notgp", message: resp.MENSAJE_ERROR });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ListarEscuelas." });
                    }
                }
            });
    },
    Escuelas: function (callBackResult) {
        var self = this;
        self.escuelas.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'SIAE/ListarEscuelas',
                success: function (resp) {
                    $("#precarga").show();
                    for (var i = 0; i < resp.length; i++) {

                        self.escuelas.push({ Id: resp[i].ID, Descripcion: resp[i].DESCRIPCION });
                    }
                    $("#precarga").hide();
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: 'tgp', message: null });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ListarEscuelas." });
                    }
                }
            });
    },
};