(function () {
    var app = angular.module('ReferenciasWeb', ['ngPagination']);
    app.controller('ReferenciasSYSWEBController', ['$scope', '$compile', function ($scope, $compile) {
        var self = this;

        this.Inicio = function () {
            ObtenerEscuelas();
            ObtenerAlumnos();
            ObtenerCiclos();
            self.cve_dias_vigencia = "1";
            self.style = "NOT";
        };
        this.BuscarAlumno = function () {
            ObtenerAlumnos();
        };
        var ObtenerAlumnos = function () {
            document.getElementById("precarga").className = "show";
            referenciasContext.CatalogoAlumnos(self.cve_busca, function (resp) {
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
        this.Agregar = function (Matricula, Semestre, Escuela, Nombre) {
            var SemestreActual = Semestre;
            self.cve_semestre = parseInt(Semestre) + 1;
            self.cve_escuela = Escuela;
            self.cve_nombre = Nombre;
            self.cve_matricula = Matricula;
            self.style = "NOT";
            switch (self.cve_semestre) {
                case 1:
                    self.cve_tipo = "I";
                    break;
                case 0:
                    self.cve_tipo = "F";
                    break;
                default:
                    self.cve_tipo = "R";
                    break;
            }
        };
        this.GenerarReferencia = function (Semestre, Escuela, Nombre) {
            document.getElementById("precarga").className = "show";
            referenciasContext.GenerarReferencia(self.cve_matricula, self.cve_escuela, self.cve_semestre, self.cve_ciclo, self.cve_tipo, self.cve_nombre, self.cve_dias_vigencia, self.cve_cuota_extemporanea, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.Referencia = referenciasContext.referencia[0].Referencia;
                        self.cve_id_referencia = referenciasContext.referencia[0].IdReferencia;
                        self.style = "OK";
                        document.getElementById("precarga").className = "hidden";
                        break;
                    case "notgp":
                        //self.mensaje_gral = resp.message;
                        //document.getElementById("divError").className = "alert alert-danger";
                        self.Referencia = resp.message;
                        self.style = "ERROR";
                        document.getElementById("precarga").className = "hidden";
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };
        var ObtenerEscuelas = function () {
            this.dependencias = "";
            document.getElementById("precarga").className = "show";
            referenciasContext.EscuelasPagos(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.dependencias = referenciasContext.escuelas;
                        self.cve_dependencia = referenciasContext.escuelas[0].Id;
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

        this.ObtReferencia = function () {            
            var xhr = new XMLHttpRequest();
            var ruta = urlServer + 'SIAE/ObtReferenciaPdf';            
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
            xhr.send("IdReferencia=" + self.cve_id_referencia);
            //$("#modalCargandoDoc").modal("hide");
        };  


        this.DatosFolio = () => {        
            let fechaOfc = self.ofc_fecha.toString();
            var d = new Date(fechaOfc);
            month = '' + (d.getMonth() + 1);
            day = '' + d.getDate();
            year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            fechaOfc = day + '/' + month + '/' + year;

            let asunto = self.ofc_asunto.toUpperCase();
            let numOfc = self.ofc_numOfc.toUpperCase();                                    
            var requestURL = 'https://sysweb.unach.mx/SUNVA/Folios/InsertarDatosCorrespondenciaFinanzas?Dependencia=42401&Emite=Prueba&Puesto=Prueba&Destinatario=72401&Asunto=' + asunto + '&Folio=' + numOfc + '&Fecha=' + fechaOfc + '&Ruta=ruta&Ejercicio='+ year+'&Usuario=ROSALES';
            var request = new XMLHttpRequest();
            request.open('POST', requestURL);
            request.responseType = 'json';
            request.send();


            request.onload = function () {
                let resultado = request.response.Error;
                if (resultado === false)
                    alert("Oficio agregado");
                else
                    alert(request.response.MensajeError);

            };


        };



    }]);
})();
