/// <reference path="../Models/DispersadoModel.js"/>
/// <reference path="../global.js"/>


(function () {
    var app = angular.module('AdminWeb', ['ngPagination']);

    app.controller('AdminController', ['$scope', '$compile', function ($scope, $compile) {
        var self = this;
        self.referencias = null;

   
        this.Inicio = function () {
            $("#precarga").hide();
            $("#divError").hide();
            $("#cve_fecha_dispersado").focus();
        };
        this.ObtenerReferencias = function () {
            CargarReferencias();
        };
        var CargarReferencias = function () {
            self.referencias = "";
            $("#precarga").show();
            $("#divError").hide();
            self.cve_error = "";
            adminContext.ObtenerReferencias(self.cve_fecha_dispersado, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.referencias = adminContext.referencias;
                        break;
                    case "notgp":
                        self.cve_error = resp.message;
                        $("#divError").show();
                        //self.mensaje_gral = resp.message;
                        //document.getElementById("divError").className = "alert alert-danger";
                        break;
                    default:
                        break;
                }
                $scope.$apply();
                $("#precarga").hide();

            });
        };

        this.CambiarFechaDispersado = function () {
            self.referencias = "";
            $("#precarga").show();
            $("#divError").hide();
            self.cve_error = "";            
            adminContext.CambiarFechaDispersado(self.cve_fecha_dispersado, self.cve_nueva_fecha_dispersado, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.cve_fecha_dispersado = self.cve_nueva_fecha_dispersado;
                        CargarReferencias();
                        break;
                    case "notgp":
                        self.cve_error = resp.message;
                        $("#divError").show();
                        //self.mensaje_gral = resp.message;
                        //document.getElementById("divError").className = "alert alert-danger";
                        break;
                    default:
                        break;
                }
                $scope.$apply();
                $("#precarga").hide();

            });
        };
        

    }]);
})();
