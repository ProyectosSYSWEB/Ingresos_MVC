/// <reference path="../Models/PagosSYSWEBModel.js"/>
/// <reference path="../global.js"/>


(function () {
    var app = angular.module('PagosSYSWEB', []);

    app.controller('PagosSYSWEBController', ['$scope', function ($scope) {
        var self = this;

      
        this.Inicio = function () {
            //ObtenerTipoUsu();
            ObtenerEscuelas();
            ObtenerCiclos();
        };


        var ObtenerEscuelas = function () {
            self.dependencias = "";
            pagosContext.Escuelas(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.dependencias = pagosContext.escuelas;
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


var ObtenerCiclos = function () {
            self.ciclos = "";
            pagosContext.Ciclos(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.ciclos_escolares = pagosContext.ciclos;
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


        this.ObtenerReferencias = function () {
            ObtenerReferenciasSYSWEB();
            ObtenerReferenciasSIAE();
        };

        var ObtenerReferenciasSYSWEB = function () {
            self.referencias_sysweb = "";
            pagosContext.ReferenciasSYSWEB(self.cve_busca_ref_sysweb, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.referencias_sysweb = pagosContext.ref_sysweb;
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

        var ObtenerReferenciasSIAE = function () {
            self.referencias_siae = "";
            pagosContext.ReferenciasSIAE(self.cve_busca_ref_sysweb, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.referencias_siae = pagosContext.ref_siae;
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

        this.AgregarSIAE = function () {
            pagosContext.AgregarSIAE(self.cve_matricula, self.cve_ciclo, self.cve_semestre, self.cve_tipo, self.cve_referencia, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.mensaje_gral = "Registrado en SIAE";
                        break;
                    case "notgp":
                        self.mensaje_gral = resp.message;
                        document.getElementById("divError").className = "alert alert-danger";
                        break;
                    default:
                        break;
                }
                $scope.$apply();
                ObtenerReferenciasSIAE();
            });
        };

        this.DatosRefSYSWEB = function (Referencia) {
            self.cve_referencia = Referencia;
        };
    }]);
})();

