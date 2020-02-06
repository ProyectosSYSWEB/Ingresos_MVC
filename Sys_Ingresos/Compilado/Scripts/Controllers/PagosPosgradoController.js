/// <reference path="../Models/CuotasPosgradoModel.js"/>
/// <reference path="../global.js"/>



(function () {
    var app = angular.module('PosgradoWeb', []);
    app.controller('PagosController', ['$scope', function ($scope) {
        var self = this;
        this.InicioCuotas = function () {
            //ObtenerTipoUsu();
            ObtenerEscuelas();
        };

        var ObtenerTipoUsu = function () {
            this.tipoUsu = "";
            posgradoContext.TipoUsuario(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        if (resp.tipoUsuarioPosg != "SA") {
                            if (resp.tipoUsuarioPosg != "A") 
                                $("#PagosPosgrado").hide();
                        }
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
            this.escuelas = "";
            this.dependencias = "";
            //var self = this;
            document.getElementById("precarga").className = "show";

            posgradoContext.EscuelasPagos(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.dependencias = posgradoContext.escuelas;                        
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

        this.BuscarPagos = function () {
            self.pagos_Posgrado = "";
            document.getElementById("precarga").className = "show";

            posgradoPagosContext.PagosPosgrado(self.cve_matricula, self.cve_dependencia, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.pagos_Posgrado = posgradoPagosContext.pagos;
                        if (posgradoContext.escuelas.length<=1)
                            self.msjGrid = "No existen cuotas con esta matricula, favor de verificar.";

                        document.getElementById("precarga").className = "hidden";

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
        
        this.PdfReciboOficial = function (vReferencia) {
            var xhr = new XMLHttpRequest();
            var ruta = urlServer + 'SIAE/ReporteReciboOficialPdf';
            xhr.responseType = 'blob';
            xhr.open("POST", ruta, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {//Call a function when the state changes.
                if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                    var blob = new Blob([this.response], { type: 'application/pdf' });
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    window.open(link, "", "width=600,height=800");
                }
            }
            xhr.send("Referencia=" + vReferencia);
        };  

        this.PdfPagosPosgrado = function () {
            $("#precarga").show();
            var indice = $("#cmbIEscuela").prop('selectedIndex');
            var Escuela= posgradoContext.escuelas[indice].EtiqDos;

            var xhr = new XMLHttpRequest();
            var ruta = urlServer + 'SIAE/ReportePagosPdf';
            xhr.responseType = 'blob';
            xhr.open("POST", ruta, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {//Call a function when the state changes.
                if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                    var blob = new Blob([this.response], { type: 'application/pdf' });
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    window.open(link, "", "width=600,height=800");
                }
            }
            xhr.send("Dependencia=" + self.cve_dependencia + "&Matricula=" + self.cve_matricula);
            $("#precarga").hide();
        };  
    }]);

})();