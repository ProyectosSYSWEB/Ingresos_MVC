/// <reference path="../Models/UsuariosModel.js"/>
/// <reference path="../global.js"/>

(function () {
    var app = angular.module('UsuariosIngresosWeb', ['ngPagination']);
    app.controller('UsuariosController', ['$scope', '$compile', function ($scope, $compile) {
        var self = this;
        var lista = [];
        //var lstDepsSel = [];
        var ListaDependenciasTodas = "";
        var grupos = "";
        var grupoSeleccionado = "";
        var opcionesGrupo = "";
        $("#inf_adicional").hide();
        this.UsuariosNormales = function () {
            console.log("entrando");
            this.ObtenerUsuarios();
            document.getElementById("form-usuarios").className = "form-inline show";
            document.getElementById("bttn-usuarios").className = "form-inline hidden";
        };

        this.Grupo = function () {
            window.location.href = urlServer + "Usuarios/OpcionesGrupo";
        };

        this.IniciarUsuario = function () {
            $("#error").hide();
            usuarioContext.IniciarUsuario(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.Usuario = usuarioContext.usuario[0].Usuario;
                        self.Sistema = usuarioContext.usuario[0].Sistema;
                        break;
                    case "notgp":
                        $("#error").show();
                        self.mensaje = resp.message;
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
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

        this.InicioOpcionesGrupos = function () {
            ObtenerGrupos();
        };

        $scope.getdetails = function () {
            if ($scope.chkselct === true)
                alert("S");
            else
                alert("N");
        };

        this.seleccionado_pruebas = function (chk, idOpcion) {
            alert(chk);

        };
        this.seleccionado = function (chk, idOpcion) {
            if (chk===true) {
                usuarioContext.AgregarOpcion(idOpcion, function (resp) {
                    switch (resp.ressult) {
                        case "tgp":
                            self.tot_seleccionados = resp.message;
                            break;
                        default:
                            break;
                    }
                });
            }
            else {
                usuarioContext.EliminarOpcion(idOpcion, function (resp) {
                    switch (resp.ressult) {
                        case "tgp":
                            self.tot_seleccionados = resp.message;
                            break;
                        default:
                            break;
                    }
                });
            }            
        };



        //this.seleccionado = function () {
        //    if (this.valido === true)
        //        alert("S");
        //    else
        //        alert("n");
        //};
    

        this.InicioAdmin = function () {
            $("#error").hide();
            ObtenerTodasDependencias();
            this.DatosUsuario();
            ObtenerDependenciasDisponibles();
            ObtenerDependenciasAsignadas();
            ObtenerMenuUsuario();
            ObtenerGrupos();
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
                            self.status = usuarioContext.usuarios[0].Status;
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
                        //alert("Error al obtener los datos");
                        $("#error").show();
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
            $("#error").hide();
            document.getElementById("precarga").className = "show";
            usuarioContext.UsuariosIngresos(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.usuarios = usuarioContext.usuarios;
                        document.getElementById("precarga").className = "hidden";
                        //$('#tablaDatos').DataTable({
                        //    language: {
                        //        "decimal": "",
                        //        "emptyTable": "No hay información",
                        //        "info": "Mostrando START a END de TOTAL Entradas",
                        //        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                        //        "infoFiltered": "(Filtrado de MAX total entradas)",
                        //        "infoPostFix": "",
                        //        "thousands": ",",
                        //        "loadingRecords": "Cargando...",
                        //        "processing": "Procesando...",
                        //        "search": "Buscar:",
                        //        "zeroRecords": "Sin resultados encontrados",
                        //        "paginate": {
                        //            "first": "Primero",
                        //            "last": "Ultimo",
                        //            "next": "Siguiente",
                        //            "previous": "Anterior"
                        //        }
                        //    },
                        //    data: self.usuarios,
                        //    pageLength: 5,
                        //    columns: [
                        //        { data: "UsuarioIng" },
                        //        { data: "NombreIng" },
                        //        { data: "Contrasenia" },
                        //        { data: "Telefono" },
                        //        { data: "EMail" },
                        //        { data: "Status" },
                        //        {
                        //            "data": "UsuarioIng",
                        //            render: function (data, type, row, meta) {
                        //                return '<button type="button" class="btn btn - secondary" ng-click="ctrl.ObtDatos(&quot;' + data + '&quot;)">Editar</button>';
                        //            }
                        //        }
                        //    ]
                        //    ,
                        //    rowCallback: function (row) {
                        //        if (!row.compiled) {
                        //            $compile(angular.element(row))($scope);
                        //            row.compiled = true;
                        //        }
                        //    }
                        //});
                        break;
                    case "notgp":
                        $("#error").show();
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
            $("#error").hide();
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
                                { data: "Status" },
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
                        $("#error").show();
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
            $("#error").hide();
            document.getElementById("precarga").className = "show";
            usuarioContext.DependenciasDisp(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.depenciasDisponibles = usuarioContext.depenDisp;
                        document.getElementById("precarga").className = "hidden";

                        break;
                    case "notgp":
                        $("#error").show();
                        self.mensaje = resp.message;
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });

        };

        //var AgregarDependenciasAsignadas = function () {
        //    this.depenciasAsignadas = "";
        //    document.getElementById("precarga").className = "show";
        //    usuarioContext.DependenciasAsig(function (resp) {
        //        switch (resp.ressult) {
        //            case "tgp":
        //                self.depenciasAsignadas = usuarioContext.depenAsig;
        //                document.getElementById("precarga").className = "hidden";
        //                break;
        //            case "notgp":
        //                self.mensaje = resp.message;
        //                break;
        //            default:
        //                break;
        //        }
        //        $scope.$apply();
        //    });
        //};

        var ObtenerDependenciasAsignadas = function () {
            this.depenciasAsignadas = "";
            $("#error").hide();
            document.getElementById("precarga").className = "show";
            usuarioContext.DependenciasAsig(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.depenciasAsignadas = usuarioContext.depenAsig;
                        document.getElementById("precarga").className = "hidden";
                        break;
                    case "notgp":
                        $("#error").show();
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

        this.DepDisp = function (chk, id, DepsDisp, DepsAsig) {
            if (chk === true) {
                var Id = DepsDisp.Id;
                var Descripcion = DepsDisp.Descripcion;
                var ClaveUr = DepsDisp.ClaveUr; //identificador
                $scope.depenAsig = [];
                for (var i = 0; i < DepsAsig.length; i++) {
                    $scope.depenAsig.push({ ClaveUr: DepsAsig[i].ClaveUr, Descripcion: DepsAsig[i].Descripcion, Id: DepsAsig[i].Id });
                }


                $scope.depenAsig.push({ Id: Id, Descripcion: Descripcion, ClaveUr: ClaveUr });
                //self.depenciasAsignadas = $scope.depenAsig;


            }
            else
                alert("NO");

        };

        this.ObtDatos = function (Usuario) {
            $("#error").hide();
            usuarioContext.ObtDatos(Usuario, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        window.location.href = urlServer + "Usuarios/Admin";
                        break;
                    case "notgp":
                        $("#error").show();
                        self.mensaje = resp.message;
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };

        this.EliminarDepUsu2 = function (Dependencia) {
            $("#error").hide();
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
                        $("#error").show();
                        self.mensaje = resp.message;
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });

        };

        this.AsignarDepUsu2 = function (Dependencia) {
            $("#error").hide();
            usuarioContext.AsignarDepUsu(Dependencia, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        ObtenerDependenciasDisponibles();
                        ObtenerDependenciasAsignadas();
                        break;
                    case "notgp":
                        $("#error").show();
                        self.mensaje = resp.message;
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });

        };

        //this.AsignarDepUsu = function () {
        //    usuarioContext.AsignarDepUsu(this.cve_dep_disp, function (resp) {
        //        switch (resp.ressult) {
        //            case "tgp":
        //                ObtenerDependenciasDisponibles();
        //                ObtenerDependenciasAsignadas();
        //                break;
        //            case "notgp":
        //                self.mensaje = resp.message;
        //                break;
        //            default:
        //                break;
        //        }
        //        $scope.$apply();
        //    });

        //};
        //self.depenDisp.push({ ClaveUr: resp[i].ID_UR, Descripcion: resp[i].DESCRIPCION, Id: resp[i].ID });


        this.AsignarDepUsu = function (depciasDisponibles) {
            $("#error").hide();
            if (self.depDisp === true) {
                usuarioContext.AsignarDependenciasTodas(function (resp) {
                    switch (resp.ressult) {
                        case "tgp":
                            self.buscar_dep_disp = "";
                            self.depDisp = false;
                            ObtenerDependenciasDisponibles();
                            ObtenerDependenciasAsignadas();
                            break;
                        case "notgp":
                            $("#error").show();
                            self.mensaje = resp.message;
                            break;
                        default:
                            break;
                    }
                    $scope.$apply();
                });
            }

            else {
                $scope.lstDepsSel = [];
                for (var i = 0; i < depciasDisponibles.length; i++) {
                    if (depciasDisponibles[i].cve_dep_disp === true) {
                        $scope.lstDepsSel.push(depciasDisponibles[i].Id);
                    }
                }
                if ($scope.lstDepsSel.length > 0) {
                    usuarioContext.AsignarDependencias($scope.lstDepsSel, function (resp) {
                        switch (resp.ressult) {
                            case "tgp":
                                self.buscar_dep_disp = "";
                                ObtenerDependenciasDisponibles();
                                ObtenerDependenciasAsignadas();
                                break;
                            case "notgp":
                                $("#error").show();
                                self.mensaje = resp.message;
                                break;
                            default:
                                break;
                        }
                        $scope.$apply();
                    });
                }
            }
        };
        this.EliminarDepUsu = function (depciasAsignadas) {
            $scope.lstDepsAsigSel = [];
            //for (var i = 0; i < DepsAsig.length; i++) {
            //    $scope.depenAsig.push({ ClaveUr: DepsAsig[i].ClaveUr, Descripcion: DepsAsig[i].Descripcion, Id: DepsAsig[i].Id });
            //}

            for (var i = 0; i < depciasAsignadas.length; i++) {
                if (depciasAsignadas[i].cve_dep_asig === true) {
                    $scope.lstDepsAsigSel.push(depciasAsignadas[i].Id);
                }
            }
            if ($scope.lstDepsAsigSel.length > 0) {
                usuarioContext.EliminarDependencias($scope.lstDepsAsigSel, function (resp) {
                    switch (resp.ressult) {
                        case "tgp":
                            ObtenerDependenciasDisponibles();
                            ObtenerDependenciasAsignadas();
                            break;
                        case "notgp":
                            $("#error").show();
                            self.mensaje = resp.message;
                            break;
                        default:
                            break;
                    }
                    $scope.$apply();
                });
            }
        };
        this.Sel_Todos_Disp = function (depciasDisponibles) {
            depciasDisponibles.cve_dep_disp = true;
        };

        var ObtenerMenuUsuario2 = function () {
            this.menu_Usuario = "";
            $("#error").hide();
            document.getElementById("precarga").className = "show";
            usuarioContext.ObtenerMenuUsuario(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.menu_Usuario = usuarioContext.mnuAsig;
                        //for (var i = 0; i < self.menu_Usuario.length; i++) {
                        //    if (self.menu_Usuario[i].elementoMnuNvl !== false) {
                        //        if (self.menu_Usuario[i].asignado === "1") {
                        //            lista.push(self.menu_Usuario[i].idSeccionMnuNvl);
                        //        }

                        //    }
                        //    else if (self.menu_Usuario[i].elementoMnuNvl4 !== false && self.menu_Usuario[i].elementoMnuNvl4 !== "") {
                        //        if (self.menu_Usuario[i].asignado === "1") {
                        //            lista.push(self.menu_Usuario[i].idSeccionMnuNvl4);
                        //        }
                        //    }
                        //}
                        document.getElementById("precarga").className = "hidden";
                        break;
                    case "notgp":
                        $("#error").show();
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
            $("#error").hide();
            document.getElementById("precarga").className = "show";
            usuarioContext.ObtenerMenuUsuario(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.menu_Usuario = usuarioContext.mnuAsig;
                        self.tot_seleccionados = usuarioContext.tot_sel;
                        document.getElementById("precarga").className = "hidden";
                        break;
                    case "notgp":
                        $("#error").show();
                        self.mensaje = resp.message;
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };



        this.Salir = function () {
            $("#error").hide();
            window.location.href = urlServer + "Usuarios/Index";
            usuarioContext.Salir(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        break;
                    case "notgp":
                        $("#error").show();
                        self.mensaje = resp.message;
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });

        };

        this.agregarMnu = function (valor, valor2) {
            var id = "#" + valor;//Obtenemos el id del padre o del hijo

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
            document.getElementById("precarga").className = "show";
            $("#error").hide();
            $("#inf_adicional").hide();
            usuarioContext.OpcionesMenuSelect(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        $("#inf_adicional").show();
                        self.cve_inf_adicional = "Menú generado correctamente";
                        break;
                    case "notgp":
                        $("#error").show();
                        self.mensaje = resp.message;
                        break;
                    default:
                        break;
                }
                $scope.$apply();
                document.getElementById("precarga").className = "hidden";
            });
        };


        this.AgregarOpcionesGrupo = function () {
            document.getElementById("precarga").className = "show";
            $("#error").hide();
            $("#inf_adicional").hide();
            self.cve_inf_adicional = "";
            usuarioContext.GuardarGrupoUsuario(self.cve_grupo, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.mensaje = "";
                        $("#inf_adicional").show();
                        self.cve_inf_adicional = "El menú ya fue generado, click en MENÚ (opción izquierda).";
                        //ObtenerMenuGpo();
                        ObtenerMenuUsuario();
                        //self.menu_Usuario = usuarioContext.mnuAsig;
                        //self.tot_seleccionados = usuarioContext.tot_sel;
                        document.getElementById("precarga").className = "hidden";


                        break;
                    case "notgp":
                        $("#error").show();
                        self.mensaje = resp.message;
                        document.getElementById("precarga").className = "hidden";
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };


        this.guardarElementosGrupoSeleccionado = function (grupo) {
            $("#error").hide();
            $("#inf_adicional").hide();
            console.log(grupo);
            usuarioContext.OpcionesGrupoSelect(lista, grupo, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        $("#inf_adicional").show();
                        self.cve_inf_adicional = "Menú generado correctamente.";
                        break;
                    case "notgp":
                        $("#error").show();
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
            $("#error").hide();
            var statusUsuario = $("#cmbStatus option:selected").val();
            if (self.cve_password !== self.cve_password_confirm)
                alert("Las contraseñas deben de coincidir");
            else {
                usuarioContext.GuardarUsuario(self.cve_usuario, self.cve_nombre, self.cve_password,
                    self.cve_correo, self.cve_telefono, self.cve_dep_ads, statusUsuario, function (resp) {
                        switch (resp.ressult) { 

                            case "tgp":
                                alert("Usuario registrado.");
                                ObtenerMenuUsuario();
                                ObtenerDependenciasDisponibles();
                                ObtenerDependenciasAsignadas();
                                break;
                            case "notgp":
                                $("#error").show();
                                //alert("Error al guardar los datos: " + resp.message);
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
            $("#error").hide();
            usuarioContext.GuardarGrupoUsuario(self.cve_grupo, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        alert("Cambios realizados.");
                        ObtenerMenuUsuario();
                        //window.location.href = urlServer + "Usuarios/Admin";
                        break;
                    case "notgp":
                        $("#error").show();
                        self.mensaje = resp.message;
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };

        this.ModificarUsuario = function () {
            $("#error").hide();

            var statusUsuario = $("#cmbStatus option:selected").val();
            if (self.cve_password !== self.cve_password_confirm)
                alert("Las contraseñas deben de coincidir");
            else {
                usuarioContext.EditarUsuario(self.cve_nombre, self.cve_password,
                    self.cve_correo, self.cve_telefono, self.cve_dep_ads, statusUsuario, function (resp) {
                        switch (resp.ressult) {
                            case "tgp":
                                $("#inf_adicional").show();
                                self.cve_inf_adicional = "Modificaciones realizadas correctamente.";
                                break;
                            case "notgp":
                                //alert("Error al guardar los datos");
                                $("#error").show();
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

        this.ObtenerGrupoOpciones = (Grupo) => {
            marcarMenu(2);
            usuarioContext.ObtenerGrupoOpciones(Grupo, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.opcionesGrupo = usuarioContext.Opcionesgrupos;
                        for (var i = 0; i < self.opcionesGrupo.length; i++) {
                            if (self.opcionesGrupo[i].elementoMnuNvl !== false) {
                                if (self.opcionesGrupo[i].asignado === "1") {
                                    lista.push(self.opcionesGrupo[i].idSeccionMnuNvl);
                                }
                            }
                            else if (self.opcionesGrupo[i].elementoMnuNvl4 !== false && self.opcionesGrupo[i].elementoMnuNvl4 !== "") {
                                if (self.opcionesGrupo[i].asignado === "1") {
                                    lista.push(self.opcionesGrupo[i].idSeccionMnuNvl4);
                                }
                            }
                        }
                        break;
                    case "notgp":
                        alert("ERROR-0016:\nContacte con el administrador del sitio" + resp.message);
                        break;
                    default:
                        break;
                }
                $scope.$apply();
                marcarMenu(1);

            });
        };

        var marcarMenu = function (opcion) {
            var id = "";
            if (opcion === 1) {
                for (var x = 0; x < lista.length; x++) {
                    id = "#" + lista[x];
                    $(id).attr("checked", true);
                }
            }
            else if (opcion === 2) {
                for (var c = 0; c < lista.length; c++) {
                    id = "#" + lista[c];
                    $(id).attr("checked", false);
                    lista = [];
                }
            }
        };

    }]);
})();