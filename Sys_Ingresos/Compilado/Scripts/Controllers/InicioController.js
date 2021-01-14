/// <reference path="../Models/InicioModel.js"/>
/// <reference path="../global.js"/>


(function () {
    var app = angular.module('MenuWeb', []);
    app.controller('InicioController', ['$scope', function ($scope) {
        var self = this;
        var Formulario;
        this.Inicio = function () {
            this.ObtenerUsuario();

        };

        this.ObtenerUsuario = function () {
            document.getElementById("precarga").className = "show";

            inicioContext.Usuario(function (resp) {
               switch (resp.ressult) {
                    case "tgp":
                        if (inicioContext.datosUsuIng[0].Formulario==="CuotasPos")
                            Formulario = "SIAE/CuotasPosgrado";
                        else if (inicioContext.datosUsuIng[0].Formulario==="PagosPos")
                            Formulario = "SIAE/PagosPosgrado";
                        else if (inicioContext.datosUsuIng[0].Formulario === "CuotasLeng")
                            Formulario = "SIAE/CuotasLenguas";
                        else if (inicioContext.datosUsuIng[0].Formulario === "PagosSYSWEB")
                            Formulario = "SIAE/PagosSYSWEB_a_SIAE";
                        else if (inicioContext.datosUsuIng[0].Formulario === "ReferenciasSYS")
                            Formulario = "SIAE/Referencias";
                        else if (inicioContext.datosUsuIng[0].Formulario === "UsuariosFinanzas")
                            Formulario = "Usuarios/Index";
                        else if (inicioContext.datosUsuIng[0].Formulario === "Graficas")
                            Formulario = "Graficas/Index";
                        else
                            Formulario = "Home/Index";

                        window.location.href = urlServer + Formulario;
                       
                        break;
                    case "notgp":
                        self.mensaje_gral = resp.message;
                        document.getElementById("divError").className = "alert alert-danger";
                        break;
                    default:
                        break;

                }
                $scope.$apply();
            });

        };

        this.VerCuotas = function () {
            window.location.href = urlServer + "SIAE/CuotasPosgrado";
        };

        this.VerPagos = function () {
            window.location.href = urlServer + "SIAE/PagosPosgrado";
        };
    }]);
})();

