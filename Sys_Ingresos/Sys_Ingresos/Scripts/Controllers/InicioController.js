/// <reference path="../Models/InicioModel.js"/>
/// <reference path="../global.js"/>


(function () {
    var app = angular.module('MenuWeb', []);
    app.controller('InicioController', ['$scope', function ($scope) {
        var self = this;

        this.Inicio = function () {
            this.ObtenerUsuario();

        };

        this.ObtenerUsuario = function () {
            document.getElementById("precarga").className = "show";

            inicioContext.Usuario(function (resp) {
               switch (resp.ressult) {
                    case "tgp":
                        if (inicioContext.datosUsuIng[0].Formulario=="CuotasPos")
                            var Formulario = "SIAE/CuotasPosgrado";
                        else if (inicioContext.datosUsuIng[0].Formulario=="PagosPos")
                            var Formulario = "SIAE/PagosPosgrado";
                        else if (inicioContext.datosUsuIng[0].Formulario == "CuotasLeng")
                            var Formulario = "SIAE/CuotasLenguas";
                        else if (inicioContext.datosUsuIng[0].Formulario == "PagosSYSWEB")
                            var Formulario = "SIAE/PagosSYSWEB_a_SIAE";
                        else if (inicioContext.datosUsuIng[0].Formulario == "ReferenciasSYS")
                            var Formulario = "SIAE/Referencias";
                        else
                            var Formulario = "Home/Index";

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

