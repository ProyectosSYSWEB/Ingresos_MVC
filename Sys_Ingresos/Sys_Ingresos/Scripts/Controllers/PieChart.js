/// <reference path="Models/FoliosModel.js"/>
/// <reference path="global.js"/>

(function () {
    var app = angular.module('PieCharWeb', []);

    app.controller('PieChartController', ['$scope', function ($scope) {
        self = this;
        var ListaFoliosTotales = "";

        this.obtNumFolios = function (tipoFolio) {
            folioContext.obtenerNumeroFolioEmitidos(tipoFolio,function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        var universo = 0;
                        self.ListaFoliosTotales = folioContext.listaNumFolios;
                        for (var i = 0; i < self.ListaFoliosTotales.length; i++) {                            
                            universo = universo + parseInt(self.ListaFoliosTotales[i].listaNumFolios);                            
                        }
                        self.universo = universo;

                        am4core.useTheme(am4themes_animated);
                        // Themes end

                        var chart = am4core.create("chartdiv", am4charts.PieChart3D);
                        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

                        chart.legend = new am4charts.Legend();

                        for (var x = 0; x < self.ListaFoliosTotales.length; x++) {
                            chart.data.push({
                                "Descripcion": self.ListaFoliosTotales[x].Descripcion,
                                "total": self.ListaFoliosTotales[x].listaNumFolios
                            });
                        }

                        var series = chart.series.push(new am4charts.PieSeries3D());
                        series.dataFields.value = "total";
                        series.dataFields.category = "Descripcion";                        

                        break;
                    case "notgp":
                        alert("ERROR-001:\nContacte con el administrador del sitio" + resp.message);
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };        

        this.irA = (irA, tipo) => {
            folioContext.opcionGrafica(irA, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        if (tipo === 1)
                            window.location.href = urlServer + "Folios/Folios";
                        else if (tipo === 2)
                            window.location.href = urlServer + "Folios/FoliosRecibidos";
                        break;
                    case "notgp":
                        alert("ERROR-002:\nContacte con el administrador del sitio" + resp.message);
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };


    }]);
})();








