
/// <reference path="../global.js"/>

var pagosContext =
    {
        escuelas: [],
        cuotas: [],
        consulta_cuota: [],
        ciclos: [],
        ref_sysweb: [],
        ref_siae: [],
        Escuelas: function (callBackResult) {
            var self = this;
            self.escuelas.length = 0;
            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'SIAE/ListarEscuelasSYSWEB',
                    success: function (resp) {
                        if (resp.ERROR == false) {
                            for (var i = 0; i < resp.RESULTADO.length; i++) {

                                self.escuelas.push({ Id: resp.RESULTADO[i].ID, Descripcion: resp.RESULTADO[i].DESCRIPCION });
                            }
                            if (callBackResult != undefined) {
                                callBackResult({ ressult: 'tgp', message: null });
                            }
                        }
                        else {
                            callBackResult({ ressult: "notgp", message: resp.MENSAJE_ERROR });
                        }
                    },
                    error: function (ex) {
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ListarEscuelas." });
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
                       if (resp.ERROR == false) {
                            for (var i = 0; i < resp.RESULTADO.length; i++) {
                                self.ciclos.push({ Id: resp.RESULTADO[i].ID, Descripcion: resp.RESULTADO[i].DESCRIPCION });
                            }
                            if (callBackResult != undefined) {
                                callBackResult({ ressult: 'tgp', message: null });
                            }
                        }
                        else {
                            callBackResult({ ressult: "notgp", message: resp.MENSAJE_ERROR });
                        }
                    },
                    error: function (ex) {
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ListarEscuelas." });
                        }
                    }
                });
        },


        ReferenciasSYSWEB: function (Referencia, callBackResult) {
            var self = this;
            self.ref_sysweb.length = 0;
            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'SIAE/ListarReferenciasSYSWEB',
                    data: { Referencia },
                    success: function (resp) {
                       if (resp.ERROR == false) {
                            for (var i = 0; i < resp.RESULTADO.length; i++) {
                                self.ref_sysweb.push({ Matricula: resp.RESULTADO[i].MATRICULA, Dependencia: resp.RESULTADO[i].DEPENDENCIA, Fecha_Pago: resp.RESULTADO[i].FECHA_FACTURA, FolioBanco: resp.RESULTADO[i].BANCO_FOLIO, Nombre: resp.RESULTADO[i].RECEPTOR_NOMBRE, Referencia: resp.RESULTADO[i].REFERENCIA, Nombre: resp.RESULTADO[i].RECEPTOR_NOMBRE });
                            }
                            if (callBackResult != undefined) {
                                callBackResult({ ressult: 'tgp', message: null });
                            }
                        }
                        else {
                            callBackResult({ ressult: "notgp", message: resp.MENSAJE_ERROR });
                        }
                    },
                    error: function (ex) {
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ListarEscuelas." });
                        }
                    }
                });
        },


        ReferenciasSIAE: function (Referencia, callBackResult) {
            var self = this;
            self.ref_siae.length = 0;
            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'SIAE/ListarReferenciasSIAE',
                    data: { Referencia },
                    success: function (resp) {
                        if (resp.ERROR == false) {
                            for (var i = 0; i < resp.RESULTADO.length; i++) {
                                self.ref_siae.push({ Matricula: resp.RESULTADO[i].MATRICULA, Dependencia: resp.RESULTADO[i].DEPENDENCIA, Fecha_Pago: resp.RESULTADO[i].FECHA_FACTURA, FolioBanco: resp.RESULTADO[i].BANCO_FOLIO, Nombre: resp.RESULTADO[i].RECEPTOR_NOMBRE, Referencia: resp.RESULTADO[i].REFERENCIA, Nombre: resp.RESULTADO[i].RECEPTOR_NOMBRE });
                            }
                            if (callBackResult != undefined) {
                                callBackResult({ ressult: 'tgp', message: null });
                            }
                        }
                        else {
                            callBackResult({ ressult: "notgp", message: resp.MENSAJE_ERROR });
                        }
                    },
                    error: function (ex) {
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ListarEscuelas." });
                        }
                    }
                });
        },


        AgregarSIAE: function (Matricula, Ciclo, Semestre, Tipo, Referencia, callBackResult) {
            var self = this;
            self.ref_sysweb.length = 0;
            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'SIAE/AgregarPagoSIAE',
                    data: { Matricula, Ciclo, Semestre, Tipo, Referencia },
                    success: function (resp) {
                        if (resp.ERROR == false) {
                            
                            if (callBackResult != undefined) {
                                callBackResult({ ressult: 'tgp', message: null });
                            }
                        }
                        else {
                            callBackResult({ ressult: "notgp", message: resp.MENSAJE_ERROR });
                        }
                    },
                    error: function (ex) {
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ListarEscuelas." });
                        }
                    }
                });
        },

    }