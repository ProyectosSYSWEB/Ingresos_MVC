(function () {
    var app = angular.module('ReferenciasWeb', ['ngPagination']);
    app.controller('ReferenciasSYSWEBController', ['$scope', '$compile', function ($scope, $compile) {
        var self = this;

        this.Inicio = function () {
            ObtenerAlumnos();
            ObtenerCiclos();
            self.cve_dias_vigencia = "1";
        };
        this.BuscarAlumno = function () {
            ObtenerAlumnos();
        };
        var ObtenerAlumnos = function () {
            document.getElementById("precarga").className = "show";
            referenciasContext.CatalogoAlumnos(self.cve_matricula, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.catAlumnos = referenciasContext.alumnos;
                        //console.log(self.catAlumnos);
                        if (referenciasContext.alumnos.length>0)
                            self.NoActv = "";
                        else
                            self.NoActv = "No se encontraron datos.";

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
        var ObtenerCiclos = function () {
            self.ciclos = "";
            referenciasContext.Ciclos(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.ciclos_escolares = referenciasContext.ciclos;
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
        this.Agregar = function (Semestre, Escuela, Nombre) {
            var SemestreActual = Semestre;
            self.cve_semestre = parseInt(Semestre) + 1;
            self.cve_escuela = Escuela;
            self.cve_nombre = Nombre;
        };

    }]);
})();
