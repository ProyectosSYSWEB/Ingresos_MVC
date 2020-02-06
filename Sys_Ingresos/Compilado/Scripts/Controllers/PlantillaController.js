/// <reference path="../Models/PlantillaModel.js"/>
/// <reference path="../global.js"/>


(function () {
    var app = angular.module('IngresosWeb', ["checklist-model"]);
    app.controller('PlantillaController', ['$scope', function ($scope) {
        var self = this;

        this.Inicio = function () {
            plantillaContext.Inicio(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        if (plantillaContext.datosUsuIng[0].Formulario=="CuotasPos")
                            var Formulario = "/SIAE/CuotasPosgrado";
                        //else
                        //    var Formulario = "Home/Index";

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

        this.ObtUsuario = function () {
            this.ObtenerUsuarioIng();

        };

        this.ObtenerUsuarioIng = function () {
            plantillaContext.Usuario(function (resp) {
                switch (resp.ressult) {                  
                    case "tgp":
                        if (inicioContext.datosUsuIng[0].Tipo != "SA") {
                            //if (inicioContext.datosUsuIng[0].Tipo != "A")
                            // window.location.href = "http://siae.unach.mx/principal/";
                        }

                        //document.getElementById("formMnuPosgrado").className = "hidden";
                        //$("#formMnuPosgrado").hide;

                        document.getElementById("precarga").className = "hidden";
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
    }]);
})();

