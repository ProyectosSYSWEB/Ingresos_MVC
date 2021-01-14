/// <reference path="../models/graficasmodel.js" />
/// <reference path="../global.js" />
(function () {
    var app = angular.module('PieCharWeb', []);

    app.controller('PieChartController', ['$scope', function ($scope) {
        self = this;
        this.Inicio = function () {
            ObtenerEscuelas();
            ObtenerCiclos();
            self.cve_tipo = "R";
            //self.ciclos_escolares = "20200";
            //ObtenerDatosGraficaPagados();
        };
        this.ObtenerGrafica = function () {
            ObtenerDatosGraficaPagados();
        };
        var ObtenerDatosGraficaPagados = () => {
            self.listDatosPagados = "";

            graficasContext.ObtenerDatosGraficaPagados(self.cve_dependencia, self.cve_ciclo, self.cve_tipo, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.listDatosPagados = graficasContext.listDatosPagados;
                        am4core.useTheme(am4themes_animated);
                        // Themes end

                        let chart = am4core.create("chartdiv", am4charts.PieChart3D);
                        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

                        chart.legend = new am4charts.Legend();

                        for (var x = 0; x < self.listDatosPagados.length; x++) {
                            chart.data.push(
                                {
                                    "Descripcion": 'Pagados',
                                    "total": self.listDatosPagados[x].Dato1
                                },
                                {
                                    'Descripcion': 'Exentos',
                                    'total': self.listDatosPagados[x].Dato2
                                },
                                {
                                    "Descripcion": 'Faltan por Pagar',
                                    "total": self.listDatosPagados[x].Dato3
                                }
                            );
                        }

                        var series = chart.series.push(new am4charts.PieSeries3D());
                        series.dataFields.value = "total";
                        series.dataFields.category = "Descripcion";

                        break;
                    case "notgp":
                        alert(resp.MENSAJE_ERROR);
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };
        var ObtenerCiclos = function () {
            self.ciclos = "";
            graficasContext.Ciclos(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.ciclos_escolares = graficasContext.ciclos;
                        self.cve_ciclo = graficasContext.ciclos[0].Id;

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
        var ObtenerEscuelas = function () {
            self.escuelas = "";
            graficasContext.Escuelas(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.dependencias = graficasContext.escuelas;
                        self.cve_dependencia = graficasContext.escuelas[0].Id;

                        break;
                    case "notgp":
                        self.mensaje_gral = resp.message;
                        document.getElementById("divError").className = "alert alert-danger";
                        break;
                    default:
                        break;
                }
                $scope.$apply();
                //$scope.dependencias = "00000";

            });

        };
        this.ObtenerPDF2 = function (ciclo, tipo, dependencia) {
            //alert(ciclo + "-" + tipo + "-" + dependencia);
            window.location.href = "http://sysweb.unach.mx/Ingresos/Reportes/VisualizadorCrystal.aspx?Tipo=REP067&ciclo=" + ciclo + "&TipoDesc=" + tipo + "&dependencia=" + dependencia;
        };
        this.ObtenerPDF = function (ciclo, tipo, dependencia) {
            var xhr = new XMLHttpRequest();
            var ruta = urlServer + 'Graficas/ObtFaltanporPagarPdf';
            xhr.responseType = 'blob';
            xhr.open("POST", ruta, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {//Call a function when the state changes.
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    var blob = new Blob([this.response], { type: 'application/pdf' });
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    window.open(link, "", "width=600,height=800");
                }
                $("#modalGenerandoRpt").modal("hide");
            };
            xhr.send("ciclo=" + ciclo + "&tipo=" + tipo + "&dependencia=" + dependencia);
            //$("#modalCargandoDoc").modal("hide");
        };
        this.ObtenerExcel = function (ciclo, tipo, dependencia) {
            var xhr = new XMLHttpRequest();
            var ruta = urlServer + 'Graficas/ObtFaltanporPagarExcel';
            xhr.responseType = 'blob';
            xhr.open("POST", ruta, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {//Call a function when the state changes.
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    var blob = new Blob([this.response], { type: 'application/vnd.ms-excel' });
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    window.open(link, "", "width=600,height=800");
                }
                $("#modalGenerandoRpt").modal("hide");
            };
            xhr.send("ciclo=" + ciclo + "&tipo=" + tipo + "&dependencia=" + dependencia);
            //$("#modalCargandoDoc").modal("hide");
        };
    }]);
})();