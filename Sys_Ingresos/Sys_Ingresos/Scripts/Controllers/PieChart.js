/// <reference path="../models/graficasmodel.js" />
/// <reference path="../global.js" />
(function () {
    var app = angular.module('PieCharWeb', []);

    app.controller('PieChartController', ['$scope', function ($scope) {
        self = this;
        var listDatosPagados = "";

        this.ObtenerDatosGraficaPagados = () => {
            graficasContext.ObtenerDatosGraficaPagados("", "",function (resp) {
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
                                    'Descripcion': 'Excentos',
                                    'total': self.listDatosPagados[x].Dato2
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
    }]);
})();