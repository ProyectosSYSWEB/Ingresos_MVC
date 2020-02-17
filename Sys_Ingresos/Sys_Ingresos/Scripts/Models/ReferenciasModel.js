
/// <reference path="../global.js"/>

var referenciasContext =
{
    alumnos: [],
    ciclos: [],
    referencia: [],
    escuelas: [],
    CatalogoAlumnos: function (Matricula, callBackResult) {
        var self = this;
        self.alumnos.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'SIAE/ListarAlumnos',
                data: { Matricula },
                success: function (resp) {
                    if (resp.ERROR == false) {
                        for (var i = 0; i < resp.RESULTADO.length; i++) {
                            self.alumnos.push({ Matricula: resp.RESULTADO[i].MATRICULA, Dependencia: resp.RESULTADO[i].DEPENDENCIA, Nombre: resp.RESULTADO[i].NOMBRE_COMPLETO, Semestre: resp.RESULTADO[i].SEMESTRE, Carrera: resp.RESULTADO[i].CARRERA, Correo: resp.RESULTADO[i].EMAIL, Ciclo: resp.RESULTADO[i].CICLO_ESCOLAR, TipoAlumno: resp.RESULTADO[i].TIPO });
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
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener el catálogo de Alumnos." });
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
    GenerarReferencia: function (Matricula, Escuela, Semestre, Ciclo, Movimiento, Nombre, DiasVigencia, Extemporaneo, callBackResult) {
        var self = this;
        self.referencia.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'SIAE/GenerarReferencia',
                data: { Matricula, Escuela, Semestre, Ciclo, Movimiento, Nombre, DiasVigencia, Extemporaneo },
                success: function (resp) {
                    if (resp.ERROR == false) {
                        for (var i = 0; i < resp.RESULTADO.length; i++) {
                            self.referencia.push({ IdReferencia: resp.RESULTADO[i].ID, Referencia: resp.RESULTADO[i].REFERENCIA });
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
}