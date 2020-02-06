
/// <reference path="../global.js"/>

var posgradoContext =
    {
        cuotas: [],
        consulta_cuotas: [],
        escuelas: [],
        carreras: [],
        ciclos_posg: [],
        conceptos: [],
        mensaje: [],
        tipoUsu: [],
        oficios: [],
        tipoUsuarioPosg : "",
                datosUsuIng: [],

        CuotasPosgrado: function (Dependencia, Carrera, callBackResult) {
            var self = this;
            self.cuotas.length = 0;
            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'SIAE/ListarCuotasPosgrado',
                    data: { Dependencia, Carrera },
                    success: function (resp) {
                        $("#precarga").show();
                        for (var i = 0; i < resp.length; i++) {
                            if (resp[i].ClaseTipoUsu == "hidden") {
                                self.cuotas.push({ Ciclo: resp[i].GENERACION, CicloDesc: resp[i].DESC_GENERACION, ClaseTipoUsu: resp[i].ClaseTipoUsu, NClaseTipoUsu: "", RutaAdj: resp[i].RUTA_ADJUNTO, DatosCiclo: resp[i].Datos });
                            }
                            else {
                                self.cuotas.push({ Ciclo: resp[i].GENERACION, CicloDesc: resp[i].DESC_GENERACION, ClaseTipoUsu: resp[i].ClaseTipoUsu, NClaseTipoUsu: "hidden", RutaAdj: resp[i].RUTA_ADJUNTO, DatosCiclo: resp[i].Datos });
                            }
                        }
                        $("#precarga").hide();
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    },
                    error: function (ex) {
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                        }
                    }
                });
        },

        Usuario: function (callBackResult) {
            var self = this;
            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'SIAE/ObtUsuario',
                    //data: { WXI },
                    success: function (resp) {

                        if (callBackResult != undefined) {
                            if (resp.length > 0) {
                                if (typeof (resp) == "string") {
                                    var dato = resp.substring(0, 6);
                                    if (resp.substring(0, 6) == "RERROR") {
                                        callBackResult({ ressult: "notgp", message: resp });
                                    }
                                    else
                                        callBackResult({ ressult: 'tgp', bandera: resp, message: null });
                                }
                                else {
                                    for (var i = 0; i < resp.length; i++) {

                                        self.datosUsuIng.push({ Nombre: resp[i].NOMBRE, Tipo: resp[i].TIPO });
                                    }
                                    callBackResult({ ressult: 'tgp', message: null, valor: resp[0].NOMBRE });
                                }

                            }
                        }
                    },
                    error: function (ex) {
                        if (callBackResult != undefined) {
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
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    },
                    error: function (ex) {
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ListarEscuelas." });
                        }
                    }
                });
        },

        EscuelasPagos: function (callBackResult) {
            var self = this;
            self.escuelas.length = 0;
            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'SIAE/ListarEscuelasPagos',
                    success: function (resp) {
                        $("#precarga").show();
                        for (var i = 0; i < resp.length; i++) {

                            self.escuelas.push({ Id: resp[i].ID, Descripcion: resp[i].DESCRIPCION });
                        }
                        $("#precarga").hide();
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    },
                    error: function (ex) {
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ListarEscuelas." });
                        }
                    }
                });
        },

        TipoUsuario: function (callBackResult) {
            var self = this;
            self.tipoUsuarioPosg = "";
            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'SIAE/ListarTipoUsu',
                    success: function (resp) {                        
                        //tipoUsuarioPosg=resp;                        

                        if (callBackResult != undefined) {
                            callBackResult({ ressult: 'tgp', message: null, tipoUsuarioPosg:resp });
                        }
                    },
                    error: function (ex) {
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ListarEscuelas." });
                        }
                    }
                });
        },
        InfCuotas: function (Id, callBackResult) {
            var self = this;
            self.consulta_cuotas.length = 0;
            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'SIAE/ObtCuotaPosgrado',
                    data: { Id },
                    success: function (resp) {
                        if (resp != null) {
                            for (var i = 0; i < resp.length; i++) {
                                self.consulta_cuotas.push({ Nivel: resp[i].NIVEL, NumPago: resp[i].NO_PAGO, Semestre: resp[i].SEMESTRE, Tipo: resp[i].TIPO, Importe: resp[i].CUOTA, ImportePaquete: resp[i].CUOTA_PAQUETE, NumPaquete: resp[i].NO_PAQUETE, FechaLimite: resp[i].FECHA_LIMITE, Porcentaje: resp[i].VALOR, Concepto: resp[i].CONCEPTO, Ciclo: resp[i].GENERACION, TipoProg: resp[i].TIPO_PROGRAMA });
                            }
                        }
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: 'tgp', message: null, TipoProg: null });
                        }
                    },
                    error: function (ex) {
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                        }
                    }
                });
        },
        Carreras: function (Dependencia, callBackResult) {
            var self = this;
            self.carreras.length = 0;
            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'SIAE/ListarCarreras',
                    data: { Dependencia },
                    success: function (resp) {
                        for (var i = 0; i < resp.length; i++) {

                            self.carreras.push({ Id: resp[i].ID, Descripcion: resp[i].DESCRIPCION });
                        }
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    },
                    error: function (ex) {
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                        }
                    }
                });
        },
        Guardar: function (Dependencia, Carrera, Ciclo, NumPago, Nivel, Semestre, Concepto, ConceptoDesc, Cuota, CuotaPaq, NumPaq, FechaLimite, Valor, Dias, TipoProg, callBackResult) {
            var self = this;
            self.mensaje.length = 0;
            if (CuotaPaq.length == 0) {
                CuotaPaq : 0;
            }
            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'SIAE/GuardarCuotasPosgrado',
                    data: { Dependencia, Carrera, Ciclo, NumPago, Nivel, Semestre, Concepto, ConceptoDesc, Cuota, CuotaPaq, NumPaq, FechaLimite, Valor, Dias, TipoProg },
                    success: function (resp) {
                        if (callBackResult != undefined) {
                            if (resp == "0") {

                                callBackResult({ ressult: 'tgp', message: null });
                            }
                            else {
                                callBackResult({ ressult: 'notgp', message: resp });
                            }
                        }
                    },
                    error: function (ex) {
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                        }
                    }
                });
        },
        Modificar: function (Id, NumPago, Nivel, Semestre, Concepto, ConceptoDesc, Cuota, CuotaPaq, NumPaq, FechaLimite, Valor, Dias, TipoProg, callBackResult) {
            var self = this;
            self.mensaje.length = 0;
            
            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'SIAE/ModificarCuotasPosgrado',
                    data: { Id, NumPago, Nivel, Semestre, Concepto, ConceptoDesc, Cuota, CuotaPaq, NumPaq, FechaLimite, Valor, Dias, TipoProg },
                    success: function (resp) {
                        if (callBackResult != undefined) {
                            if (resp == "0") {
                                callBackResult({ ressult: 'tgp', message: null });
                            }
                            else {
                                callBackResult({ ressult: 'notgp', message: resp });
                            }
                        }
                    },
                    error: function (ex) {
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                        }
                    }
                });
        },
        Eliminar: function (Id, callBackResult) {
            var self = this;
            self.mensaje.length = 0;

            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'SIAE/EliminarCuotasPosgrado',
                    data: { Id },
                    success: function (resp) {
                        if (callBackResult != undefined) {
                            if (resp == "0") {
                                callBackResult({ ressult: 'tgp', message: null });
                            }
                            else {
                                callBackResult({ ressult: 'notgp', message: resp });
                            }
                        }
                    },
                    error: function (ex) {
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                        }
                    }
                });
        },

        EliminarCuotasSeleccionadas: function (Generacion, callBackResult) {
            var self = this;
            self.mensaje.length = 0;

            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'SIAE/EliminarCuotasSel',
                    data: { Generacion },
                    success: function (resp) {
                        if (callBackResult != undefined) {
                            if (resp == "0") {
                                callBackResult({ ressult: 'tgp', message: null });
                            }
                            else {
                                callBackResult({ ressult: 'notgp', message: resp });
                            }
                        }
                    },
                    error: function (ex) {
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                        }
                    }
                });
        },

        Ciclos: function (callBackResult) {
            var self = this;
            self.ciclos_posg.length = 0;
            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'SIAE/ListarCiclos',
                    success: function (resp) {
                        for (var i = 0; i < resp.length; i++) {

                            self.ciclos_posg.push({ Id: resp[i].ID, Descripcion: resp[i].DESCRIPCION, Grupo: resp[i].GRUPO });
                        }
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    },
                    error: function (ex) {
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                        }
                    }
                });
        },
        Conceptos: function (Nivel, Tipo_Programa, callBackResult) {
            var self = this;
            self.conceptos.length = 0;
            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'SIAE/ListarConceptos',
                    data: { Nivel },
                    success: function (resp) {
                        for (var i = 0; i < resp.length; i++) {

                            self.conceptos.push({ Id: resp[i].ID, Descripcion: resp[i].DESCRIPCION });
                        }
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    },
                    error: function (ex) {
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                        }
                    }
                });
        },

        CuotaSeleccionada: function (Cve, Generacion, Selec, callBackResult) {
            var self = this;            
            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'SIAE/GuardarCuotaSel',
                    data: { Cve, Generacion, Selec },
                    success: function (resp) {                        
                        if (callBackResult != undefined) {
                            if(resp=="S")
                                callBackResult({ ressult: 'tgp', message: null });
                            else
                                callBackResult({ ressult: 'notgp', message: "Elemento no seleccionado." });
                        }
                    },
                    error: function (ex) {
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                        }
                    }
                });
        },

        Oficios: function (Carrera, Dependencia, Ciclo, callBackResult) {
            var self = this;
            self.oficios.length = 0;
            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'SIAE/ObtOficios',
                    data: { Carrera, Dependencia, Ciclo },
                    success: function (resp) {
                        //for (var i = 0; i < resp.length; i++) {
                        if (resp[0].NUM_OFICIO !== "null" && resp[0].FECHA_OFICIO !== "null" && resp[0].RUTA_ADJUNTO !== "null") {
                            self.oficios.push({ NumOfi: resp[0].NUM_OFICIO, FechOfi: resp[0].FECHA_OFICIO, RutaOfi: resp[0].RUTA_ADJUNTO });
                        }
                        else{                       
                            self.oficios.push({ NumOfi: "", FechOfi: "", RutaOfi: "" });
                        }

                        //}
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    },
                    error: function (ex) {
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                        }
                    }
                });
        }
    }