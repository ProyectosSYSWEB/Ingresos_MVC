/// <reference path="../Models/CuotasPosgradoModel.js"/>
/// <reference path="../global.js"/>


(function () {
    var app = angular.module('PosgradoWeb', []);

    app.controller('CuotasController', ['$scope', function ($scope) {
        var self = this;

        this.Inicio = function () {
            ObtenerUsuario();            
        };

        this.InicioCuotas = function () {   
            ObtenerTipoUsu();
            ObtenerEscuelas();
        };

        this.ObtenerCuotas = function () {
            CargarCuotas();
        };

        var ObtenerUsuario = function () {
            document.getElementById("precarga").className = "show";

            posgradoContext.Usuario(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        if (posgradoContext.datosUsuIng[0].Tipo != "SA") {
                            //if (inicioContext.datosUsuIng[0].Tipo != "A")
                            // window.location.href = "http://siae.unach.mx/principal/";
                        }                       
                        ObtenerEscuelas();
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

        var CargarCuotas = function () {
            self.cuotas_Posgrado = "";
            posgradoContext.CuotasPosgrado(self.cve_dependencia, self.cve_carrera, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.cuotas_Posgrado = posgradoContext.cuotas;
                        self.detalle = "hidden";                       
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

        var CargarCuotasModificadas = function () {
            self.cuotas_Posgrado = "";
            posgradoContext.CuotasPosgrado(self.cve_dependencia, self.cve_carrera, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.cuotas_Posgrado = posgradoContext.cuotas;
                        self.detalle = "hidden";
                    case "notgp":
                        self.mensaje = resp.message;
                        break;
                    default:
                        break;
                }
                $scope.$apply();
                document.getElementById(self.cve_ciclo).className = "show";
            });
        };

        this.VerDetalle = function (Id) {
            Detalle(Id);

        };

        var Detalle = function (Id) {
            var self = this;
            var btn = "1" + Id;
            var btn2 = "2" + Id;
            document.getElementById(Id).className = "show";
            //var divC = "#" + Id;
            //$(Id).show();
            document.getElementById(btn).className = "btn btn-dark hidden";
            document.getElementById(btn2).className = "btn btn-dark show";

        };

        this.OcultarDetalle = function (Id) {
            var self = this;
            var btn = "1" + Id;
            var btn2 = "2" + Id;
            document.getElementById(Id).className = "hidden";
            document.getElementById(btn).className = "btn btn-dark show";
            document.getElementById(btn2).className = "btn btn-dark hidden";
        };

        this.ModalEliminar = function (Id) {
            self.valor_id = Id;
        };

        this.ObtDatos = function (Id, Indice) {
            self.cve_numPago = "";
            self.valor_id = Id;
            self.indice = Indice;
            self.mensaje = "";
            self.mensaje_gral = "";
            self.conceptos = "";
            document.getElementById("divError").className = "alert alert-danger hidden";
            posgradoContext.InfCuotas(Id, function (resp) {
                switch (resp.ressult) {
                    case "tgp":                        
                        self.cve_tipoProg = posgradoContext.consulta_cuotas[0].TipoProg;
                        document.getElementById("btnGuardarC").className = "btn btn-primary hidden";
                        document.getElementById("btnGuardar").className = "btn btn-success hidden";
                        document.getElementById("btnModificar").className = "btn btn-primary";
                        self.cve_ciclo = posgradoContext.consulta_cuotas[0].Ciclo;
                        self.cve_nivel = posgradoContext.consulta_cuotas[0].Nivel;
                        ObtenerConceptos(posgradoContext.consulta_cuotas[0].Nivel);
                        self.cve_semestre = posgradoContext.consulta_cuotas[0].Semestre;
                        self.cve_numPago = posgradoContext.consulta_cuotas[0].NumPago;
                        self.cve_concepto = posgradoContext.consulta_cuotas[0].Concepto;
                        self.valor_importe = posgradoContext.consulta_cuotas[0].Importe;
                        self.valor_importe_Paquete = posgradoContext.consulta_cuotas[0].ImportePaquete;
                        self.valor_num_Paquete = posgradoContext.consulta_cuotas[0] .NumPaquete;
                        self.cve_fecha_limite = posgradoContext.consulta_cuotas[0].FechaLimite;
                        if (posgradoContext.consulta_cuotas[0].Porcentaje > 0) {
                            document.getElementById("chkAplicaRecargo").setAttribute("aria-expanded", "true");
                            document.getElementById("chkAplicaRecargo").checked = true;
                            document.getElementById("collapseR").className = "collapse in";

                        }
                        else {
                            document.getElementById("chkAplicaRecargo").setAttribute("aria-expanded", "false");
                            document.getElementById("chkAplicaRecargo").checked = false;
                            document.getElementById("collapseR").className = "collapse";

                        }

                        if (posgradoContext.consulta_cuotas[0].ImportePaquete > 0) {
                            document.getElementById("chkAplicaDescuento").setAttribute("aria-expanded", "true");
                            document.getElementById("chkAplicaDescuento").checked = true;
                            document.getElementById("collapseDescuento").className = "collapse in";

                        }
                        else {
                            document.getElementById("chkAplicaDescuento").setAttribute("aria-expanded", "false");
                            document.getElementById("chkAplicaDescuento").checked = false;
                            document.getElementById("collapseDescuento").className = "collapse";

                        }



                        self.cve_porcentaje = posgradoContext.consulta_cuotas[0].Porcentaje;
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

        var ObtenerEscuelas = function () {           
            self.dependencias = "";           
            posgradoContext.Escuelas(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.dependencias = posgradoContext.escuelas;
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

        var ObtenerTipoUsu = function () {
            this.tipoUsu = "";
            posgradoContext.TipoUsuario(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.TipoUsuario="show";
                        if (resp.tipoUsuarioPosg != "SA") {
                            if (resp.tipoUsuarioPosg != "A") 
                                self.TipoUsuario="hidden";
                        }
                        else {
                            document.getElementById("bttnNewGen").className = "btn btn-primary";
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

        this.ObtenerCarreras = function () {
            this.carreras = "";
            //var self = this;
            document.getElementById("precarga").className = "show";

            posgradoContext.Carreras(self.cve_dependencia, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.carreras = posgradoContext.carreras;
                        //self.cve_carrera = posgradoContext.carreras[0].Id;
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

        this.AgregarCuota = function (Ciclo) {
            self.mensaje = "";
            self.mensaje_gral = "";
            self.cve_tipoProg = "";
            self.cve_ciclo = Ciclo;

            self.cve_nivel = "";
            self.cve_semestre = "";
            self.cve_numPago = "";
            self.cve_concepto = "";
            self.valor_importe = "";
            self.valor_importe_Paquete = "";
            self.valor_num_Paquete = "";
            self.recargo = "false";
            self.cve_porcentaje = "";
            self.cve_fecha_limite = "";
            document.getElementById("btnGuardarC").className = "btn btn-primary";
            document.getElementById("btnGuardar").className = "btn btn-success";
            document.getElementById("btnModificar").className = "btn btn-primary hidden";
            document.getElementById("divError").className = "alert alert-danger hidden";

            document.getElementById("chkAplicaRecargo").setAttribute("aria-expanded", "false");
            document.getElementById("chkAplicaRecargo").checked = false;
            document.getElementById("collapseR").className = "collapse";


            document.getElementById("chkAplicaDescuento").setAttribute("aria-expanded", "false");
            document.getElementById("chkAplicaDescuento").checked = false;
            document.getElementById("collapseDescuento").className = "collapse";



        };

        this.GuardarCuota = function () {
            this.mensaje = "";
            var e = document.getElementById("cmbConcepto");
            var descConc = e.options[e.selectedIndex].text;

            
            posgradoContext.Guardar(self.cve_dependencia, self.cve_carrera, self.cve_ciclo, self.cve_numPago, self.cve_nivel, self.cve_semestre, self.cve_concepto, descConc, self.valor_importe, self.valor_importe_Paquete, self.valor_num_Paquete, self.cve_fecha_limite, self.cve_porcentaje, 30, self.cve_tipoProg, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.mensaje = "La cuota ha sido guardada correctamente.";
                        CargarCuotas();
                        //this.AgregarCuota(self.cve_ciclo);
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

        this.ModificarCuota = function () {
            self.mensaje = "";
            self.mensaje_gral = "";
            var tipo=self.cve_tipoProg;
            var e = document.getElementById("cmbConcepto");
            var descConc = e.options[e.selectedIndex].text;

            //document.getElementById("precarga").className = "show";
            posgradoContext.Modificar(self.valor_id, self.cve_numPago, self.cve_nivel, self.cve_semestre, self.cve_concepto, descConc, self.valor_importe, self.valor_importe_Paquete, self.valor_num_Paquete, self.cve_fecha_limite, self.cve_porcentaje, 30, self.cve_tipoProg, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        document.getElementById("divError").className = "alert alert-danger";
                        self.mensaje_gral = "La cuota ha sido modificada correctamente.";                           
                        CargarCuotasModificadas();                     
                        break;
                    case "notgp":
                        document.getElementById("divError").className = "alert alert-danger";
                        self.mensaje_gral = resp.message;
                        break;
                    default:
                        break;
                }
                $scope.$apply();
                

            });
           

        };

        this.EliminarCuota = function () {
            self.mensaje = "";
            self.mensaje_gral = "";
            document.getElementById("divError").className = "alert alert-danger hidden";

            posgradoContext.Eliminar(self.valor_id, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.mensaje_gral = "La cuota ha sido eliminada correctamente.";
                        document.getElementById("divError").className = "alert alert-danger";
                        CargarCuotas();
                        break;
                    case "notgp":
                        self.mensaje_gral = resp.message;
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };

        this.EliminarCuotasSeleccionadas = function () {
            //alert(vCiclo);
            self.mensaje = "";
            self.mensaje_gral = "";
            document.getElementById("divError").className = "alert alert-danger hidden";
            var vCiclo=document.getElementById("hddnGeneracion").value;
            posgradoContext.EliminarCuotasSeleccionadas(vCiclo, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.mensaje_gral = "La(s) cuota(s) ha sido eliminada correctamente.";
                        document.getElementById("divError").className = "alert alert-danger";
                        //CargarCuotas();
                        break;
                    case "notgp":
                        self.mensaje_gral = resp.message;
                        document.getElementById("divError").className = "alert alert-danger";
                        break;
                    default:
                        break;
                }
                $scope.$apply();
                CargarCuotas();
            });
        };


        this.ObtenerCiclos = function () {
            this.ciclos = "";
            posgradoContext.Ciclos(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.ciclos = posgradoContext.ciclos_posg;
                        break;
                    case "notgp":
                        self.mensaje = resp.message;
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
            document.getElementById("precarga").className = "hidden";

        };

        this.ObtenerConceptosNew = function () {
            ObtenerConceptos();
        };

        var ObtenerConceptos = function () {
            self.conceptos = "";
            posgradoContext.Conceptos(self.cve_nivel, self.cve_tipoProg, function(resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.conceptos = posgradoContext.conceptos;
                        break;
                    case "notgp":
                        self.mensaje = resp.message;
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
            document.getElementById("precarga").className = "hidden";

        };

        this.ObtClase = function () {
            self.clase = "";
            posgradoContext.Conceptos(self.cve_nivel, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.conceptos = posgradoContext.conceptos;
                        break;
                    case "notgp":
                        self.mensaje = resp.message;
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
            document.getElementById("precarga").className = "hidden";

        };

        this.CuotaSel = function (vId, vCiclo) {
            //e.options[e.selectedIndex].text;
            //alert(vCiclo + "--" + vId + "---->" + self.cuotaselec[vId]);            
            posgradoContext.CuotaSeleccionada(vId, vCiclo, self.cuotaselec[vId], function (resp) {
                switch (resp.ressult) {                    
                    case "notgp":
                        self.mensaje = resp.message;
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
            document.getElementById("precarga").className = "hidden";

        };


        this.ExcelReport = function () {
            $window.open("SIAE/ExportExcel", "_blank");
        };

        this.VerCuotas = function () {            
            window.location.href = urlServer + "SIAE/CuotasPosgrado";
        };


        this.PdfReport = function (vCarrera, vDependencia, vCiclo) {
            $("#modalCargandoDoc").modal("show");
            var xhr = new XMLHttpRequest();
            var ruta = urlServer + 'SIAE/ReporteCuotasPdf';
            //var ruta = urlServer + 'SIAE/ReporteCuotasPdf';
            xhr.responseType = 'blob';
            xhr.open("POST", ruta, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {//Call a function when the state changes.
                if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                    var blob = new Blob([this.response], { type: 'application/pdf' });
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    //link.download = "report.pdf";
                    //window.open(link);
                    window.open(link, "", "width=600,height=800");
                    //link.click();
                }
            }
            xhr.send("Carrera=" + vCarrera + "&Dependencia=" + vDependencia + "&Generacion=" + vCiclo);
            $("#modalCargandoDoc").modal("hide");
        };  
        
        this.PdfReportGral = function (vCarrera, vDependencia) {
            var xhr = new XMLHttpRequest();
            var ruta = urlServer + 'SIAE/ReporteGralCuotasPdf';
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
            xhr.send("Carrera=" + vCarrera + "&Dependencia=" + vDependencia);
        };


        this.VerOficio = function (vAdjunto) {
            if (vAdjunto == "") {
                alert("No hay oficios para este ciclo.");
            }
            else {
                window.open(urlServer + "/ArchivosAdj/OficiosPosgrado/" + vAdjunto, "_newtab", true);
            }
        };

        
        this.CicloSelec = function (vCiclo) {
            //alert(vCiclo);
            document.getElementById("hddnGeneracion").value = vCiclo;
        };



        this.ObtOficio = function (vCarrera, vDependencia, vCiclo) {
             //$("#cmbCveGeneracion").val();
            document.getElementById("hddnGeneracion").value = vCiclo;
            document.getElementById("divError").className = "alert alert-danger hidden";
            document.getElementById("precargaOficio").className = "show";
            posgradoContext.Oficios(vCarrera, vDependencia, vCiclo, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.num_ofic = posgradoContext.oficios[0].NumOfi;
                        self.fecha_ofic = posgradoContext.oficios[0].FechOfi;
                        self.link_ofic = "../ArchivosAdj/OficiosPosgrado/"+posgradoContext.oficios[0].RutaOfi;
                        self.nombre_ofic = posgradoContext.oficios[0].RutaOfi;                        
                        document.getElementById("precargaOficio").className = "hidden";

                        //document.getElementById("alertOficio").className = "alert alert-primary";  
                        document.getElementById("divError").className = "alert alert-danger";                        
                        break;
                    case "notgp":
                        self.mensaje_gral = resp.message;
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };  


    }]);

  

})();


