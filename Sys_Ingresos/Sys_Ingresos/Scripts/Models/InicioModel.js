
/// <reference path="../global.js"/>

var inicioContext =
    {
        datosUsuIng: [],
        Usuario: function (callBackResult) {
            var self = this;
            self.datosUsuIng.length = 0;
            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'Home/ObtDatosUsuario',
                    success: function (resp) {

                        if (callBackResult !== undefined) {
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

                                        self.datosUsuIng.push({ Nombre: resp[i].Usu_Nombre, Tipo: resp[i].Tipo, Formulario: resp[i].Form });
                                    }
                                    callBackResult({ ressult: 'tgp', message: null, valor: resp[0].Nombre });
                                }

                            }
                        }
                    },
                    error: function (ex) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ListarEscuelas." });
                        }
                    }
                });
        }
    }