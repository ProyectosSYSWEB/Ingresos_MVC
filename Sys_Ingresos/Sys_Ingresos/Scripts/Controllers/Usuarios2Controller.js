/// <reference path="../Models/UsuariosModel.js"/>
/// <reference path="../global.js"/>





(function () {
    var app = angular.module('UsuariosIngresosWeb', []);
    app.controller('UsuariosController', ['$scope', '$compile', function ($scope, $compile) {
        var self = this;
        var lista = [];
        var ListaDependenciasTodas = "";
        var grupos = "";
        var grupoSeleccionado = "";
        this.UsuariosNormales = function () {

            this.ObtenerUsuarios();
            document.getElementById("form-usuarios").className = "form-inline show";
            document.getElementById("bttn-usuarios").className = "form-inline hidden";

        };

        this.UsuariosAdministradores = function () {

            ObtenerUsuariosAdmin();
            document.getElementById("form-usuarios").className = "form-inline show";
            document.getElementById("bttn-usuarios").className = "form-inline hidden";

        };

        this.Regresar = function () {

            this.ObtenerUsuarios();
            document.getElementById("form-usuarios").className = "form-inline hidden";
            document.getElementById("bttn-usuarios").className = "form-inline show";

        };

        this.InicioAdmin = function () {
            ObtenerTodasDependencias();
            this.DatosUsuario();
            ObtenerDependenciasDisponibles();
            ObtenerDependenciasAsignadas();
            ObtenerMenuUsuario();            
        };

        this.DatosUsuario = function () {
            this.usuarios = "";
            document.getElementById("precarga").className = "show";
            usuarioContext.DatosUsuario(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        if (usuarioContext.usuarios.length !== 0) {
                            $("#btnGuardar").hide();                            
                            self.cve_usuario = usuarioContext.usuarios[0].UsuarioIng;
                            self.cve_nombre = usuarioContext.usuarios[0].NombreIng;
                            self.cve_password = usuarioContext.usuarios[0].Contrasenia;
                            self.cve_correo = usuarioContext.usuarios[0].EMail;
                            self.cve_telefono = usuarioContext.usuarios[0].Telefono;
                            self.cve_dep_ads = usuarioContext.usuarios[0].Dependencia;
                            document.getElementById("txtUsuario").setAttribute("disabled", "false");
                            document.getElementById("precarga").className = "hidden";
                        }
                        else {
                            $("#mnu").prop("disabled", true);
                            $("#dependencias").prop("disabled", true);
                            $("#btnGuardar").show();
                            $("#btnModificar").hide();
                        }
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

        this.ObtenerUsuarios = function () {
            this.usuarios = "";
            document.getElementById("precarga").className = "show";
            usuarioContext.UsuariosIngresos(14, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.usuarios = usuarioContext.usuarios;
                        document.getElementById("precarga").className = "hidden";
                        $("#tablaDatos").dataTable().fnDestroy();
                        $('#tablaDatos').DataTable({
                            language: {
                                "decimal": "",
                                "emptyTable": "No hay información",
                                "info": "Mostrando START a END de TOTAL Entradas",
                                "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                                "infoFiltered": "(Filtrado de MAX total entradas)",
                                "infoPostFix": "",
                                "thousands": ",",
                                "loadingRecords": "Cargando...",
                                "processing": "Procesando...",
                                "search": "Buscar:",
                                "zeroRecords": "Sin resultados encontrados",
                                "paginate": {
                                    "first": "Primero",
                                    "last": "Ultimo",
                                    "next": "Siguiente",
                                    "previous": "Anterior"
                                }
                            },
                            data: self.usuarios,
                            pageLength: 5,
                            columns: [
                                { data: "UsuarioIng" },
                                { data: "NombreIng" },
                                { data: "Contrasenia" },
                                { data: "Telefono" },
                                { data: "EMail" },
                                {
                                    "data": "UsuarioIng",
                                    render: function (data, type, row, meta) {
                                        return '<button type="button" class="btn btn - secondary" ng-click="ctrl.ObtDatos(&quot;' + data + '&quot;)">Editar</button>';
                                    }
                                }
                            ]
                            ,
                            rowCallback: function (row) {
                                if (!row.compiled) {
                                    $compile(angular.element(row))($scope);
                                    row.compiled = true;
                                }
                            }
                        });
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

        var ObtenerUsuariosAdmin = function () {
            this.usuarios = "";
            document.getElementById("precarga").className = "show";
            usuarioContext.UsuariosAdmin(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.usuarios = usuarioContext.usuarios;
                        document.getElementById("precarga").className = "hidden";
                        $("#tablaDatos").dataTable().fnDestroy();
                        $('#tablaDatos').DataTable({
                            language: {
                                "decimal": "",
                                "emptyTable": "No hay información",
                                "info": "Mostrando START a END de TOTAL Entradas",
                                "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                                "infoFiltered": "(Filtrado de MAX total entradas)",
                                "infoPostFix": "",
                                "thousands": ",",
                                "loadingRecords": "Cargando...",
                                "processing": "Procesando...",
                                "search": "Buscar:",
                                "zeroRecords": "Sin resultados encontrados",
                                "paginate": {
                                    "first": "Primero",
                                    "last": "Ultimo",
                                    "next": "Siguiente",
                                    "previous": "Anterior"
                                }
                            },
                            data: self.usuarios,
                            pageLength: 5,
                            columns: [
                                { data: "UsuarioIng" },
                                { data: "NombreIng" },
                                { data: "Contrasenia" },
                                { data: "Telefono" },
                                { data: "EMail" },
                                {
                                    "data": "UsuarioIng",
                                    render: function (data, type, row, meta) {
                                        return '<button type="button" class="btn btn - secondary" ng-click="ctrl.ObtDatos(&quot;' + data + '&quot;)">Editar</button>';
                                    }
                                }
                            ]
                            ,
                            rowCallback: function (row) {
                                if (!row.compiled) {
                                    $compile(angular.element(row))($scope);
                                    row.compiled = true;
                                }
                            }
                        });

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




        var ObtenerDependenciasDisponibles = function () {
            this.dependenciasDisp = "";
            document.getElementById("precarga").className = "show";
            usuarioContext.DependenciasDisp(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.depenciasDisponibles = usuarioContext.depenDisp;
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

        var ObtenerDependenciasAsignadas = function () {
            this.depenciasAsignadas = "";
            document.getElementById("precarga").className = "show";
            usuarioContext.DependenciasAsig(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.depenciasAsignadas = usuarioContext.depenAsig;
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

        this.AgregarUsuario = function () {
            window.location.href = urlServer + "Usuarios/Admin";

        };

        this.ObtDatos = function (Usuario) {
            usuarioContext.ObtDatos(Usuario, function (resp) {
                switch (resp.ressult) {
                    case "tgp":                        
                        window.location.href = urlServer + "Usuarios/Admin";
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

        this.EliminarDepUsu = function (Dependencia) {
            //this.usuarios = "";
            //document.getElementById("precarga").className = "show";
            usuarioContext.EliminarDepUsu(Dependencia, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        ObtenerDependenciasDisponibles();
                        ObtenerDependenciasAsignadas();
                        //document.getElementById("precarga").className = "hidden";

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

        this.AsignarDepUsu = function (Dependencia) {
            //this.usuarios = "";
            //document.getElementById("precarga").className = "show";
            usuarioContext.AsignarDepUsu(Dependencia, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        ObtenerDependenciasDisponibles();
                        ObtenerDependenciasAsignadas();
                        //document.getElementById("precarga").className = "hidden";

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

        var ObtenerMenuUsuario = function () {
            this.menu_Usuario = "";
            document.getElementById("precarga").className = "show";
            usuarioContext.ObtenerMenuUsuario(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.menu_Usuario = usuarioContext.mnuAsig;
                        for (var i = 0; i < self.menu_Usuario.length; i++) {
                            if (self.menu_Usuario[i].elementoMnuNvl !== false) {
                                if (self.menu_Usuario[i].asignado === "1") {
                                    lista.push(self.menu_Usuario[i].idSeccionMnuNvl);
                                }
                            }
                            else if (self.menu_Usuario[i].elementoMnuNvl4 !== false && self.menu_Usuario[i].elementoMnuNvl4 !== "") {
                                if (self.menu_Usuario[i].asignado === "1") {
                                    lista.push(self.menu_Usuario[i].idSeccionMnuNvl4);
                                }
                            }
                        }                                                
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
                              
        this.Salir = function () {
            window.location.href = urlServer + "Usuarios/Index";
            usuarioContext.Salir(function (resp) {
                switch (resp.ressult) {
                    case "tgp":                        
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

        this.agregarMnu = function (valor) {            
            var id = "#" + valor;            
            if ($(id).prop('checked') === true) {
                lista.push(valor);
                console.log(lista);
            }
            else {                
                var elementoDelete = lista.indexOf(valor);
                lista.splice(elementoDelete, 1);
                console.log(lista);
            }
        };
        this.dependencias = function () {            
            for (var i = 0; i < lista.length; i++) {
                var id = "#" + lista[i];
                $(id).attr("checked", true);                
            }
            ObtenerGrupos();
        };

       

        this.guardarElementosSeleccionados = function () {            
            usuarioContext.OpcionesMenuSelect(lista, function ( resp) {
                switch (resp.ressult) {
                    case "tgp":
                        alert("cambios realizados");
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

        this.ObtenerValoresMnu = function (mnu) {
            console.log(mnu);
        };

        this.GuardarUsuario = function () {
            if (self.cve_password !== self.cve_password_confirm)
                alert("Las contraseñas deben de coincidir");
            else {
                usuarioContext.GuardarUsuario(self.cve_usuario, self.cve_nombre, self.cve_password, 
                    self.cve_correo, self.cve_telefono, self.cve_dep_ads, function (resp) {
                        switch (resp.ressult) {
                            case "tgp":
                                alert("cambios realizados");
                                break;
                            case "notgp":
                                self.mensaje = resp.message;
                                break;
                            default:
                                break;
                        }
                        $scope.$apply();
                    });
            }                
        };


        this.GuardarGrupoUsuario = function () {
            usuarioContext.GuardarGrupoUsuario(self.cve_grupo, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        alert("cambios realizados");
                        window.location.href = urlServer + "Usuarios/Admin";
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
            if (self.cve_password !== self.cve_password_confirm)
                alert("Las contraseñas deben de coincidir");
            else {
                usuarioContext.EditarUsuario( self.cve_nombre, self.cve_password,
                    self.cve_correo, self.cve_telefono, self.cve_dep_ads, function (resp) {
                        switch (resp.ressult) {
                            case "tgp":
                                alert("cambios realizados");
                                break;
                            case "notgp":
                                self.mensaje = resp.message;
                                break;
                            default:
                                break;
                        }
                        $scope.$apply();
                    });
            }
        };

        var ObtenerTodasDependencias = () => {
            usuarioContext.obtenerDependenciasTodas(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.ListaDependenciasTodas = usuarioContext.listaDependenciasTodas;
                        self.cve_dep_ads = self.ListaDependenciasTodas[0].Id;
                        break;
                    case "notgp":
                        alert("ERROR-0016:\nContacte con el administrador del sitio" + resp.message);
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };

        var ObtenerGrupos = () => {
            usuarioContext.ObtenerGrupos(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.grupos = usuarioContext.grupos;
                        self.cve_grupo = self.grupos[0].Id;
                        break;
                    case "notgp":
                        alert("ERROR-0016:\nContacte con el administrador del sitio" + resp.message);
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };
        
    }]);
})();