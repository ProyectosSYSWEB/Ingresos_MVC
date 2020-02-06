/// <reference path="../Models/CuotasLenguasModel.js"/>
/// <reference path="../global.js"/>


(function () {
    var app = angular.module('LenguasWeb', []);

    app.controller('CuotasLenguasController', ['$scope', '$compile', function ($scope, $compile) {
        var self = this;
         self.cuotas = null;

        this.Inicio = function () {

            ObtenerEscuelas();


        };

        var ObtenerEscuelas = function () {
            self.dependencias = "";
            $("#precarga").show();
            lenguasContext.Escuelas(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.dependencias = lenguasContext.escuelas;
                        //self.cve_escuela = lenguasContext.escuelas[0].Id;
                        break;
                    case "notgp":
                        self.mensaje_gral = resp.message;
                        document.getElementById("divError").className = "alert alert-danger";
                        break;
                    default:
                        break;
                }
                $scope.$apply();
                $("#precarga").hide();

            });
        };

        this.ObtCuotasLeng = function () {
            ObtenerCuotasLenguas();
        };

        var ObtenerCuotasLenguas = function () {
            self.cuotas_sabatinos = "";
            $("#precarga").show();
            lenguasContext.ObtenerCuotasLenguas(self.cve_escuela, self.cve_tipo,function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.cuotas_sabatinos = lenguasContext.cuotas;
                        break;
                    case "notgp":
                        self.mensaje_gral = resp.message;
                        document.getElementById("divError").className = "alert alert-danger";
                        break;
                    default:
                        break;
                }
                $scope.$apply();
                $("#precarga").hide();

            });
        };

        this.IrCuotaLenguas = function (Id ) {
            document.getElementById("bttnNuevo").className = "btn btn-success hidden";
            document.getElementById("bttnModificar").className = "btn btn-primary";
            self.cve_desc_escuela = $("#cmbDependencia option:selected").html();
            self.cve_desc_tipo = $("#cmbStatus option:selected").html();
            lenguasContext.DatosCuota(Id, function (resp) {
                switch (resp.ressult) {
                    case "tgp":          
                        self.NombreModal = "EDITAR CUOTAS";
                        self.cve_id = Id;
                        self.cve_nivel = lenguasContext.consulta_cuota[0].Nivel;
                        self.cve_status = lenguasContext.consulta_cuota[0].Status;
                        self.cve_importe_ingles = lenguasContext.consulta_cuota[0].Ingles;
                        self.cve_importe_italiano = lenguasContext.consulta_cuota[0].Italiano;
                        self.cve_importe_frances = lenguasContext.consulta_cuota[0].Frances;
                        self.cve_importe_aleman = lenguasContext.consulta_cuota[0].Aleman;
                        self.cve_importe_chino = lenguasContext.consulta_cuota[0].Chino;
                        self.cve_importe_tzotzil = lenguasContext.consulta_cuota[0].Tzotzil;
                        self.cve_importe_tzental = lenguasContext.consulta_cuota[0].Tzental;
                        self.cve_importe_espaniol = lenguasContext.consulta_cuota[0].Espaniol;


                        break;
                    case "notgp":
                        self.mensaje = resp.message;
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };
       
        this.AgregarCuotaLenguas = function () {
            self.NombreModal = "AGREGAR CUOTAS";
            self.cve_nivel = "";
            self.cve_status = "";
            self.cve_importe_ingles = "0";
            self.cve_importe_italiano = "0";
            self.cve_importe_frances = "0";
            self.cve_importe_aleman = "0";
            self.cve_importe_chino = "0";
            self.cve_importe_tzotzil = "0";
            self.cve_importe_tzental = "0";
            self.cve_importe_espaniol = "0";
            self.cve_desc_escuela = $("#cmbDependencia option:selected").html();
            self.cve_desc_tipo = $("#cmbStatus option:selected").html();
            //$("#bttnModificar").toggle();
            //$("bttnModificar").prop("btn btn-primary hidden");
            document.getElementById("bttnNuevo").className = "btn btn-success";
            document.getElementById("bttnModificar").className = "btn btn-primary hidden";



        };

        this.ModificarCuotaLenguas = function () {
            $("#precarga").show();
            lenguasContext.ModificarCuotaLenguas(self.cve_id, self.cve_nivel, self.cve_status, self.cve_importe_ingles, self.cve_importe_italiano, self.cve_importe_frances, self.cve_importe_aleman, self.cve_importe_chino, self.cve_importe_tzotzil, self.cve_importe_tzental, self.cve_importe_espaniol, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.mensaje_gral = "Los datos se han modificado correctamente.";
                        break;
                    case "notgp":
                        self.mensaje_gral = resp.message;
                        document.getElementById("divError").className = "alert alert-danger";
                        break;
                    default:
                        break;
                }
                $scope.$apply();
                ObtenerCuotasLenguas();
                $("#precarga").hide();
            });
        };

        this.NuevoCuotaLenguas = function () {
            $("#precarga").show();
            lenguasContext.NuevoCuotaLenguas(self.cve_escuela, self.cve_tipo, self.cve_nivel, self.cve_status, self.cve_importe_ingles, self.cve_importe_italiano, self.cve_importe_frances, self.cve_importe_aleman, self.cve_importe_chino, self.cve_importe_tzotzil, self.cve_importe_tzental, self.cve_importe_espaniol, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.mensaje_gral = "Los datos se han agregado correctamente.";
                        break;
                    case "notgp":
                        self.mensaje_gral = resp.message;
                        document.getElementById("divError").className = "alert alert-danger";
                        break;
                    default:
                        break;
                }
                $scope.$apply();
                ObtenerCuotasLenguas();
                $("#precarga").hide();
            });
        };

        this.BorrarCuota = function (Id) {            
            if (confirm("¿Estas seguro de borrar el registro?")) {
                lenguasContext.EliminarCuotaLenguas(Id, function (resp) {
                    switch (resp.ressult) {
                        case "tgp":
                            ObtenerCuotasLenguas();
                            break;
                        case "notgp":
                            self.mensaje_gral = resp.message;
                            break;
                        default:
                            break;
                    }
                    $scope.$apply();
                });
            }
        };

    }]);



})();

