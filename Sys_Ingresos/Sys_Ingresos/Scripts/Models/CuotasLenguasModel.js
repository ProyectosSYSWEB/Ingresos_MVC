
/// <reference path="../global.js"/>

var lenguasContext =
    {
        escuelas: [],
        cuotas: [],
        consulta_cuota: [],
        Escuelas: function (callBackResult) {
            var self = this;
            self.escuelas.length = 0;
            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'SIAE/ListarEscuelasLenguas',
                    success: function (resp) {
                        if (resp.ERROR === false) {
                            for (var i = 0; i < resp.RESULTADO.length; i++) {

                                self.escuelas.push({ Id: resp.RESULTADO[i].ID, Descripcion: resp.RESULTADO[i].DESCRIPCION });
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

        ObtenerCuotasLenguas: function (escuela_lenguas, tipo_cuota, callBackResult) {
            var self = this;
            self.cuotas.length = 0;
            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'SIAE/ListarCuotasSabatinosLenguas',
                    data: { Escuela: escuela_lenguas, Tipo: tipo_cuota},
                    success: function (resp) {
                        if(resp.ERROR===false)
                        {
                            for (var i = 0; i < resp.RESULTADO.length; i++) {

                                self.cuotas.push({ Id: resp.RESULTADO[i].ID, Escuela: resp.RESULTADO[i].ESCUELA, Status: resp.RESULTADO[i].STATUS, Nivel: resp.RESULTADO[i].NIVEL, Ingles: resp.RESULTADO[i].IMPORTE_INGLES, Italiano: resp.RESULTADO[i].IMPORTE_ITALIANO, Frances: resp.RESULTADO[i].IMPORTE_FRANCES, Aleman: resp.RESULTADO[i].IMPORTE_ALEMAN, Chino: resp.RESULTADO[i].IMPORTE_CHINO, Tzotzil: resp.RESULTADO[i].IMPORTE_TZOTZIL, Tzental: resp.RESULTADO[i].IMPORTE_TZENTAL, Espaniol: resp.RESULTADO[i].IMPORTE_ESPANIOL });
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

        DatosCuota: function (Id, callBackResult) {
            var self = this;
            self.consulta_cuota.length = 0;
            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'SIAE/ObtCuotaLenguas',
                    data: { Id },
                    success: function (resp) {
                        if (resp.ERROR === false) {
                            for (var i = 0; i < resp.RESULTADO.length; i++) {
                                self.consulta_cuota.push({ Nivel: resp.RESULTADO[i].NIVEL, Status: resp.RESULTADO[i].STATUS, Ingles: resp.RESULTADO[i].IMPORTE_INGLES, Italiano: resp.RESULTADO[i].IMPORTE_ITALIANO, Frances: resp.RESULTADO[i].IMPORTE_FRANCES, Aleman: resp.RESULTADO[i].IMPORTE_ALEMAN, Chino: resp.RESULTADO[i].IMPORTE_CHINO, Tzotzil: resp.RESULTADO[i].IMPORTE_TZOTZIL, Tzental: resp.RESULTADO[i].IMPORTE_TZENTAL, Espaniol: resp.RESULTADO[i].IMPORTE_ESPANIOL });
                            }
                        }
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: resp.MENSAJE_ERROR });
                        }
                    },
                    error: function (ex) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                        }
                    }
                });
        },

        ModificarCuotaLenguas: function (IdLng, SNivel, Status, ImpIngles, ImpItaliano, ImpFrances, ImpAleman, ImpChino, ImpTzotzil, ImpTzental, ImpEspaniol, callBackResult) {
            var self = this;
            self.cuotas.length = 0;
            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'SIAE/ModificarCuotasSabatinosLenguas',
                    data: { Id: IdLng, Nivel: SNivel, Status: Status, Ingles: ImpIngles, Italiano: ImpItaliano, Frances: ImpFrances, Aleman: ImpAleman, Chino: ImpChino, Tzotzil: ImpTzotzil, Tzental: ImpTzental, Espaniol: ImpEspaniol },
                    success: function (resp) {
                        if (resp.ERROR === false) {                            
                            if (callBackResult !== undefined) {
                                callBackResult({ ressult: 'tgp', message: null });
                            }
                        }
                        else
                            callBackResult({ ressult: "notgp", message: resp.MENSAJE_ERROR });

                    },
                    error: function (ex) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al modificar los importes." });
                        }
                    }
                });
        },

        NuevoCuotaLenguas: function (Dependencia, Tipo, SNivel, Status, ImpIngles, ImpItaliano, ImpFrances, ImpAleman, ImpChino, ImpTzotzil, ImpTzental, ImpEspaniol, callBackResult) {
            var self = this;
            self.cuotas.length = 0;
            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'SIAE/AgregarCuotasSabatinosLenguas',
                    data: { Escuela: Dependencia, Tipo:Tipo, Nivel: SNivel, Status: Status, Ingles: ImpIngles, Italiano: ImpItaliano, Frances: ImpFrances, Aleman: ImpAleman, Chino: ImpChino, Tzotzil: ImpTzotzil, Tzental: ImpTzental, Espaniol: ImpEspaniol },
                    success: function (resp) {
                        if (resp.ERROR === false) {
                            if (callBackResult !== undefined) {
                                callBackResult({ ressult: 'tgp', message: null });
                            }
                        }
                        else
                            callBackResult({ ressult: "notgp", message: resp.MENSAJE_ERROR });

                    },
                    error: function (ex) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al modificar los importes." });
                        }
                    }
                });
        },

        EliminarCuotaLenguas: function (Identificador, callBackResult) {
            var self = this;
            self.cuotas.length = 0;
            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'SIAE/EliminarCuotaLenguas',
                    data: { Id: Identificador },
                    success: function (resp) {
                        if (resp.ERROR === false) {
                            if (callBackResult !== undefined) {
                                callBackResult({ ressult: 'tgp', message: null });
                            }
                        }
                        else
                            callBackResult({ ressult: "notgp", message: resp.MENSAJE_ERROR });

                    },
                    error: function (ex) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al modificar los importes." });
                        }
                    }
                });
        },

    }
    