/// <reference path="../global.js"/>

var folioContext = {

    listaFolios: [],
    listaDependencias: [],
    listaDocumentos: [],
    listaFolio: [],
    listaAreas: [],
    listaDatosRemitente: [],
    listaDatosFolio: [],
    listaAnexos: [],
    listaStatus: [],
    listaStatusActual: [],
    listaDependenciasTodas: [],
    listaFoliosRecibidos: [],
    listaNumFolios: [],
    listAreasExt: [],
    listFolioRecibido: [],
    obtenerDependencias: function (callBackResult) {
        var self = this;
        self.listaDependencias.length = 0;
        $.ajax({
            type: "GET",
            cache: false,
            url: urlServer + "Folios/ObtenerDependencias",
            data: {
            },
            success: function (resp) {
                if (resp !== null && Array.isArray(resp)) {
                    $("#loading").show();
                    for (var i = 0; i < resp.length; i++) {
                        self.listaDependencias.push({
                            Id: resp[i].ID, Descripcion: resp[i].DESCRIPCION
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

    obtenerDatosInscripcion: function (ciclo_escolar, callBackResult) {
        var self = this;
        self.listaInscripciones.length = 0;
        $.ajax({
            type: "GET",
            cache: false,
            url: urlServer + "Graficas/ObtenerDatosInscripcion",
            data: {
                CicloEscolar: ciclo_escolar
            },
            success: function (resp) {
                if (resp !== null && Array.isArray(resp)) {
                    $("#loading").show();
                    for (var i = 0; i < resp.length; i++) {
                        self.listaInscripciones.push({
                            RefGeneradas: resp[i].DATO1, RefPagadas: resp[i].DATO2
                        });
                    }
                    $("#loading").hide();
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

    opcionGrafica: function (irA, callBackResult) {
        var self = this;
        self.listaNumFolios.length = 0;
        $.ajax({
            type: "GET",
            cache: false,
            url: urlServer + "Folios/OpcionGrafica",
            data: {
                irA: irA
            },
            success: function (resp) {
                if (resp === true) {
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


};