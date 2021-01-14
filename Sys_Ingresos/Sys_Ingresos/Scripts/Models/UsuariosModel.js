/// <reference path="../global.js"/>

var usuarioContext =

{
    usuarios: [],
    mensaje: [],
    depenDisp: [],
    depenAsig: [],
    mnuAsig: [],
    grupos: [],
    Opcionesgrupos: [],
    listaDependenciasTodas: [],
    usuario: [],
    tot_sel: 0,
    UsuariosIngresos: function (callBackResult) {
        var self = this;
        self.usuarios.length = 0;
        $.ajax(
            {
                type: "GET",
                cache: false,
                url: urlServer + "Usuarios/ListarUsuarios",
                data: {},
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (resp) {
                    for (var i = 0; i < resp.length; i++) {
                        self.usuarios.push({
                            UsuarioIng: resp[i].USUARIO, NombreIng: resp[i].NOMBRE, Contrasenia: resp[i].PASSWORD, Telefono: resp[i].TELEFONOS, EMail: resp[i].CORREO,
                            Status: resp[i].STATUS
                        });
                    }
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "tgp", message: null });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                    }
                }
            });
    },
    DatosUsuario: function (callBackResult) {
        var self = this;
        self.usuarios.length = 0;
        $.ajax(
            {
                type: "GET",
                cache: false,
                url: urlServer + "Usuarios/ObtUsuario",
                success: function (resp) {
                    if (resp.ERROR === false) {
                        for (var i = 0; i < resp.RESULTADO.length; i++) {
                            self.usuarios.push({
                                UsuarioIng: resp.RESULTADO[i].USUARIO, NombreIng: resp.RESULTADO[i].NOMBRE, Contrasenia: resp.RESULTADO[i].PASSWORD, Telefono: resp.RESULTADO[i].TELEFONOS, EMail: resp.RESULTADO[i].CORREO,
                                Dependencia: resp.RESULTADO[i].DIRECCION_DEPE, Status: resp.RESULTADO[i].STATUS
                            });
                        }
                    }
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "tgp", message: null });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                    }
                }
            });
    },
    AgregarOpcion: function (idOpcion, callBackResult) {
        var self = this;
        self.usuarios.length = 0;
        $.ajax(
            {
                type: "GET",
                cache: false,
                url: urlServer + "Usuarios/AgregarOpcion",
                data: { idOpcion },
                async: false,
                success: function (resp) {
                    if (resp.ERROR === false) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: "tgp", message: resp.MENSAJE_ERROR });
                        }
                    }
                    else {
                        callBackResult({ ressult: "notgp", message: resp.MENSAJE_ERROR });
                    }
                    //if (callBackResult !== undefined) {
                    //    callBackResult({ ressult: "tgp", message: null });
                    //}
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                    }
                }
            });
    },
    EliminarOpcion: function (idOpcion, callBackResult) {
        var self = this;
        self.usuarios.length = 0;
        $.ajax(
            {
                type: "GET",
                cache: false,
                url: urlServer + "Usuarios/EliminarOpcion",
                data: { idOpcion },
                async: false,
                success: function (resp) {
                    if (resp.ERROR === false) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: "tgp", message: resp.MENSAJE_ERROR });
                        }
                    }
                    else {
                        callBackResult({ ressult: "notgp", message: resp.MENSAJE_ERROR });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                    }
                }
            });
    },

    UsuariosAdmin: function (callBackResult) {
        var self = this;
        self.usuarios.length = 0;
        $.ajax(
            {
                type: "GET",
                cache: false,
                url: urlServer + "Usuarios/ListarUsuariosAdmin",
                success: function (resp) {
                    for (var i = 0; i < resp.length; i++) {
                        self.usuarios.push({
                            UsuarioIng: resp[i].USUARIO, NombreIng: resp[i].NOMBRE, Contrasenia: resp[i].PASSWORD, Telefono: resp[i].TELEFONOS, EMail: resp[i].CORREO,
                            Status: resp[i].STATUS
                        });
                    }
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "tgp", message: null });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                    }
                }
            });
    },
    DependenciasDisp: function (callBackResult) {
        var self = this;
        self.depenDisp.length = 0;
        $.ajax(
            {
                type: "GET",
                cache: false,
                url: urlServer + "Usuarios/ListarDepenDisp",
                success: function (resp) {
                    for (var i = 0; i < resp.length; i++) {
                        self.depenDisp.push({ ClaveUr: resp[i].ID_UR, Descripcion: resp[i].DESCRIPCION, Id: resp[i].ID });
                    }
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "tgp", message: null });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                    }
                }
            });
    },
    DependenciasAsig: function (callBackResult) {
        var self = this;
        self.depenAsig.length = 0;
        $.ajax(
            {
                type: "GET",
                cache: false,
                url: urlServer + "Usuarios/ListarDepenAsig",
                success: function (resp) {
                    for (var i = 0; i < resp.length; i++) {
                        self.depenAsig.push({ ClaveUr: resp[i].ID_UR, Descripcion: resp[i].DESCRIPCION, Id: resp[i].ID });
                    }
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "tgp", message: null });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                    }
                }
            });
    },
    ObtenerMenuUsuario: function (callBackResult) {
        var self = this;
        var tituloMnuNvl = "";
        var elementoMnuNvl = "";
        var elementoMnuNvl4 = "";
        var elementoMnuNvl5 = "";
        var idSeccionTitulo = "";
        var idSeccionMnuNvl = "";
        var idSeccionMnuNvl4 = "";
        var idOl = "";
        var idOl2 = "";
        var idSeccionMnuNvl4Ckb = "";
        var idSeccionTituloCkb = "";
        var valido = false;
        self.mnuAsig.length = 0;
        $.ajax(
            {
                type: "GET",
                cache: false,
                url: urlServer + "Usuarios/ListarMenuUsuario",
                success: function (resp) {
                    for (var i = 0; i < resp.length; i++) {
                        if (resp[i].NIVEL === 2) {
                            tituloMnuNvl = true;
                            elementoMnuNvl = false;
                            idSeccionTitulo = resp[i].ID;
                            idSeccionMnuNvl = "";
                            valido = resp[i].VALIDO;
                            Estilo = "hidden";
                            idPadrePrin = resp[i].ID;
                        }
                        else if (resp[i].NIVEL === 3) {
                            tituloMnuNvl = false;
                            elementoMnuNvl = resp[i].DESCRIPCION;
                            idSeccionMnuNvl = resp[i].ID;
                            elementoMnuNvl4 = "";
                            valido = resp[i].VALIDO;
                            Estilo = "";
                            //if (valido === true)
                            //    tot_sel = tot_sel + 1;
                        }
                        else if (resp[i].NIVEL === 4) {
                            tituloMnuNvl = false;
                            elementoMnuNvl = false;
                            elementoMnuNvl4 = resp[i].DESCRIPCION;
                            idSeccionMnuNvl4 = resp[i].ID;
                            valido = resp[i].VALIDO;
                            Estilo = "";
                            //if (valido === true)
                            //    tot_sel = tot_sel + 1;
                        }
                        else if (resp[i].NIVEL === 5) {
                            tituloMnuNvl = false;
                            elementoMnuNvl = false;
                            elementoMnuNvl4 = false;
                            elementoMnuNvl5 = resp[i].DESCRIPCION;
                            valido = resp[i].VALIDO;
                            Estilo = "";
                            //if (valido === true)
                            //    tot_sel = tot_sel + 1;
                        }
                        if (valido === true)
                            self.tot_sel = self.tot_sel + 1;

                        self.mnuAsig.push({
                            tituloMnuNvl, elementoMnuNvl4, elementoMnuNvl5, elementoMnuNvl, idSeccionTitulo,
                            idSeccionMnuNvl, idSeccionMnuNvl4, idOl, asignado: resp[i].ASIGNADO, idSeccionTituloCkb,
                            idSeccionMnuNvl4Ckb, valido, Descripcion: resp[i].DESCRIPCION, Id: resp[i].ID, Nivel: resp[i].NIVEL, Estilo,
                            Id_Padre: resp[i].ID_PADRE, Padre: resp[i].PADRE, TotNivel: resp[i].TOT_NIVEL, idPadrePrin: idPadrePrin
                        });
                        
                    }




                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "tgp", message: null });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                    }
                }
            });
    },
    ObtenerMenuGpo: function (callBackResult) {
        var self = this;
        var tituloMnuNvl = "";
        var elementoMnuNvl = "";
        var elementoMnuNvl4 = "";
        var elementoMnuNvl5 = "";
        var idSeccionTitulo = "";
        var idSeccionMnuNvl = "";
        var idSeccionMnuNvl4 = "";
        var idOl = "";
        var idOl2 = "";
        var idSeccionMnuNvl4Ckb = "";
        var idSeccionTituloCkb = "";
        var valido = false;
        self.mnuAsig.length = 0;
        $.ajax(
            {
                type: "GET",
                cache: false,
                url: urlServer + "Usuarios/ListarMenuUsuario",
                success: function (resp) {
                    for (var i = 0; i < resp.length; i++) {
                        if (resp[i].NIVEL === 2) {
                            tituloMnuNvl = true;
                            elementoMnuNvl = false;
                            idSeccionTitulo = resp[i].ID;
                            idSeccionMnuNvl = "";
                            valido = resp[i].VALIDO;
                            Estilo = "hidden";
                            idPadrePrin = resp[i].ID;
                        }
                        else if (resp[i].NIVEL === 3) {
                            tituloMnuNvl = false;
                            elementoMnuNvl = resp[i].DESCRIPCION;
                            idSeccionMnuNvl = resp[i].ID;
                            elementoMnuNvl4 = "";
                            valido = resp[i].VALIDO;
                            Estilo = "";
                        }
                        else if (resp[i].NIVEL === 4) {
                            tituloMnuNvl = false;
                            elementoMnuNvl = false;
                            elementoMnuNvl4 = resp[i].DESCRIPCION;
                            idSeccionMnuNvl4 = resp[i].ID;
                            valido = resp[i].VALIDO;
                            Estilo = "";
                            //if (valido === true)
                            //    tot_sel = tot_sel + 1;
                        }
                        else if (resp[i].NIVEL === 5) {
                            tituloMnuNvl = false;
                            elementoMnuNvl = false;
                            elementoMnuNvl4 = false;
                            elementoMnuNvl5 = resp[i].DESCRIPCION;
                            valido = resp[i].VALIDO;
                            Estilo = "";
                            //if (valido === true)
                            //    tot_sel = tot_sel + 1;
                        }
                        if (valido === true)
                            self.tot_sel = self.tot_sel + 1;

                        self.mnuAsig.push({
                            tituloMnuNvl, elementoMnuNvl4, elementoMnuNvl5, elementoMnuNvl, idSeccionTitulo,
                            idSeccionMnuNvl, idSeccionMnuNvl4, idOl, asignado: resp[i].ASIGNADO, idSeccionTituloCkb,
                            idSeccionMnuNvl4Ckb, valido, Descripcion: resp[i].DESCRIPCION, Id: resp[i].ID, Nivel: resp[i].NIVEL, Estilo,
                            Id_Padre: resp[i].ID_PADRE, Padre: resp[i].PADRE, TotNivel: resp[i].TOT_NIVEL, idPadrePrin: idPadrePrin
                        });

                    }




                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "tgp", message: null });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                    }
                }
            });
    },
    ObtDatos: function (Usuario, callBackResult) {
        var self = this;
        $.ajax(
            {
                type: "POST",
                cache: false,
                url: urlServer + "Usuarios/Datos",
                data: { Usuario },
                success: function (resp) {
                    if (resp === true) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: "tgp", message: null });
                        }
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                    }
                }
            });
    },
    EliminarDepUsu: function (Dependencia, callBackResult) {
        var self = this;
        //self.depenAsig.length = 0;
        //var pos = self.depenAsig[De];
        $.ajax(
            {
                type: "GET",
                cache: false,
                url: urlServer + "Usuarios/EliminarDepenAsig",
                data: { Dependencia },
                success: function (resp) {
                    if (resp === true) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: "tgp", message: null });
                        }
                    }
                    else {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al eliminar la dependencia." });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                    }
                }
            });
    },
    AsignarDepUsu2: function (Dependencia, callBackResult) {
        var self = this;
        //self.depenAsig.length = 0;
        $.ajax(
            {
                type: "GET",
                cache: false,
                url: urlServer + "Usuarios/AsignarDepen",
                data: { Dependencia },
                success: function (resp) {
                    if (resp === true) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: "tgp", message: null });
                        }
                    }
                    else {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al eliminar la dependencia." });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                    }
                }
            });
    },
    AsignarDepUsu: function (DependenciasAsignadas, callBackResult) {
        var self = this;
        //self.depenAsig.length = 0;
        $.ajax(
            {
                type: "GET",
                cache: false,
                url: urlServer + "Usuarios/AsignarDepen",
                data: { Dependencia },
                success: function (resp) {
                    if (resp === true) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: "tgp", message: null });
                        }
                    }
                    else {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al eliminar la dependencia." });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                    }
                }
            });
    },
    AsignarDependencias2: function (depciasDisponibles, callBackResult) {
        var self = this;
        //self.depenAsig.length = 0;
        $.ajax(
            {
                type: "GET",
                cache: false,
                url: urlServer + "Usuarios/AsignarDepen",
                data: { Dependencia },
                success: function (resp) {
                    if (resp === true) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: "tgp", message: null });
                        }
                    }
                    else {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al eliminar la dependencia." });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                    }
                }
            });
    },
    AsignarDependencias: function (depciasAsignadas, callBackResult) {
        var self = this;
        var dataToPost = JSON.stringify(depciasAsignadas);

        //self.depenAsig.length = 0;
        var Depcias = JSON.stringify(depciasAsignadas);

        //for (var i = 0; i < depciasAsignadas.length; i++) {
        //    //var ClaveUr = depciasDisponibles[i].ID_UR;
        //    //var DescUr = depciasDisponibles[i].DESCRIPCION;
        //    var Id = depciasDisponibles[i].ID;

        $.ajax(
            {
                type: "GET",
                cache: false,
                url: urlServer + "Usuarios/AsignarDependencias",
                data: { lstDepsAsig: Depcias },
                success: function (resp) {
                    if (resp.ERROR === false) {
                        callBackResult({ ressult: 'tgp' });
                    }
                    else {
                        callBackResult({ ressult: 'notgp', message: resp.MENSAJE_ERROR });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: 'notgp', message: ex.statusText });
                    }
                }
            });
        //}
    },
    AsignarDependenciasTodas: function (callBackResult) {
        var self = this;
        $.ajax(
            {
                type: "GET",
                cache: false,
                url: urlServer + "Usuarios/AsignarDependenciasTodas",
                success: function (resp) {
                    if (resp.ERROR === false) {
                        callBackResult({ ressult: 'tgp' });
                    }
                    else {
                        callBackResult({ ressult: 'notgp', message: resp.MENSAJE_ERROR });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: 'notgp', message: ex.statusText });
                    }
                }
            });
        //}
    },
    EliminarDependencias: function (depciasEliminadas, callBackResult) {
        var self = this;
        var dataToPost = JSON.stringify(depciasEliminadas);

        //self.depenAsig.length = 0;
        var Depcias = JSON.stringify(depciasEliminadas);

        //for (var i = 0; i < depciasAsignadas.length; i++) {
        //    //var ClaveUr = depciasDisponibles[i].ID_UR;
        //    //var DescUr = depciasDisponibles[i].DESCRIPCION;
        //    var Id = depciasDisponibles[i].ID;

        $.ajax(
            {
                type: "GET",
                cache: false,
                url: urlServer + "Usuarios/EliminarDependencias",
                data: { lstDepsEliminadas: Depcias },
                success: function (resp) {
                    if (resp.ERROR === false) {
                        callBackResult({ ressult: 'tgp' });
                    }
                    else {
                        callBackResult({ ressult: 'notgp', message: resp.MENSAJE_ERROR });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: 'notgp', message: ex.statusText });
                    }
                }
            });
        //}
    },


    OpcionesMenuSelect2: function (opciones, callBackResult) {
        var array = JSON.stringify(opciones);
        var self = this;
        //self.depenAsig.length = 0;
        $.ajax(
            {
                type: "GET",
                cache: false,
                url: urlServer + "Usuarios/EliminarDatosMenu",
                data: { Opciones: array },
                success: function (resp) {
                    if (resp === "0") {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: "tgp", message: null });
                        }
                    }
                    else {
                        callBackResult({ ressult: "notgp", message: resp });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                    }
                }
            });
    },
    OpcionesMenuSelect: function (callBackResult) {
        var self = this;
        //self.depenAsig.length = 0;
        $.ajax(
            {
                type: "GET",
                cache: false,
                url: urlServer + "Usuarios/InsOpcionesMenu",
                success: function (resp) {
                    if (resp === true) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: "tgp", message: null });
                        }
                    }
                    else {
                        callBackResult({ ressult: "notgp", message: resp });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                    }
                }
            });
    },
    OpcionesGrupo: function (callBackResult) {
        var self = this;
        //self.depenAsig.length = 0;
        $.ajax(
            {
                type: "GET",
                cache: false,
                url: urlServer + "Usuarios/ObtenerOpcionesGrupo",
                success: function (resp) {
                    if (resp.ERROR === false) {
                        for (var i = 0; i < resp.RESULTADO.length; i++) {
                            if (resp.RESULTADO[i].NIVEL === 2) {
                                tituloMnuNvl = true;
                                elementoMnuNvl = false;
                                idSeccionTitulo = resp.RESULTADO[i].ID;
                                idSeccionMnuNvl = "";
                                valido = resp[i].VALIDO;
                                Estilo = "hidden";
                                idPadrePrin = resp.RESULTADO[i].ID;
                            }
                            else if (resp.RESULTADO[i].NIVEL === 3) {
                                tituloMnuNvl = false;
                                elementoMnuNvl = resp.RESULTADO[i].DESCRIPCION;
                                idSeccionMnuNvl = resp.RESULTADO[i].ID;
                                elementoMnuNvl4 = "";
                                valido = resp.RESULTADO[i].VALIDO;
                                Estilo = "";
                            }
                            else if (resp.RESULTADO[i].NIVEL === 4) {
                                tituloMnuNvl = false;
                                elementoMnuNvl = false;
                                elementoMnuNvl4 = resp.RESULTADO[i].DESCRIPCION;
                                idSeccionMnuNvl4 = resp.RESULTADO[i].ID;
                                valido = resp.RESULTADO[i].VALIDO;
                                Estilo = "";
                            }
                            else if (resp.RESULTADO[i].NIVEL === 5) {
                                tituloMnuNvl = false;
                                elementoMnuNvl = false;
                                elementoMnuNvl4 = false;
                                elementoMnuNvl5 = resp.RESULTADO[i].DESCRIPCION;
                                valido = resp.RESULTADO[i].VALIDO;
                                Estilo = "";
                                //if (valido === true)
                                //    tot_sel = tot_sel + 1;
                            }
                            if (valido === true)
                                self.tot_sel = self.tot_sel + 1;

                            self.mnuAsig.push({
                                tituloMnuNvl, elementoMnuNvl4, elementoMnuNvl5, elementoMnuNvl, idSeccionTitulo,
                                idSeccionMnuNvl, idSeccionMnuNvl4, idOl, asignado: resp.RESULTADO[i].ASIGNADO, idSeccionTituloCkb,
                                idSeccionMnuNvl4Ckb, valido, Descripcion: resp.RESULTADO[i].DESCRIPCION, Id: resp.RESULTADO[i].ID,
                                Nivel: resp.RESULTADO[i].NIVEL, Estilo,
                                Id_Padre: resp.RESULTADO[i].ID_PADRE, Padre: resp.RESULTADO[i].PADRE,
                                TotNivel: resp.RESULTADO[i].TOT_NIVEL, idPadrePrin: idPadrePrin
                            });
                        }


                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: "tgp", message: null });
                        }
                    }
                    else {
                        callBackResult({ ressult: "notgp", message: resp.MENSAJE_ERROR });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                    }
                }
            });
    },

    obtenerDependenciasTodas: function (callBackResult) {
        var self = this;
        self.listaDependenciasTodas.length = 0;
        $.ajax({
            type: "GET",
            cache: false,
            url: urlServer + "Usuarios/ObtenerDependenciasTodas",
            data: {
            },
            success: function (resp) {
                if (resp !== null && Array.isArray(resp)) {
                    $("#loading").show();
                    for (var i = 0; i < resp.length; i++) {
                        self.listaDependenciasTodas.push({
                            Id: resp[i].ID_GRUPO, Descripcion: resp[i].DESCRIPCION
                        });
                    }
                    $("#loading").hide();
                    callBackResult({ ressult: 'tgp' });
                }
                else {
                    $("#loading").hide();
                    callBackResult({ ressult: 'notgp', message: resp });
                }
            },
            error: function (ex) {
                if (callBackResult !== undefined) {
                    callBackResult({ ressult: 'notgp', message: ex.statusText });
                }
            }
        });
    },

    GuardarUsuario: function (usuario, nombre, contraseña, correo, telefono, dependencia, status, callBackResult) {
        var self = this;
        $.ajax({
            type: "GET",
            cache: false,
            url: urlServer + "Usuarios/GuardarUsuario",
            data: {
                Usuario: usuario, Nombre: nombre, Contraseña: contraseña, Correo: correo, Telefono: telefono, Dependencia: dependencia,
                Status: status
            },
            success: function (resp) {
                if (resp.ERROR === false) {
                    callBackResult({ ressult: 'tgp' });
                }
                else {
                    $("#loading").hide();
                    callBackResult({ ressult: 'notgp', message: resp.MENSAJE_ERROR });
                }
            },
            error: function (ex) {
                if (callBackResult !== undefined) {
                    callBackResult({ ressult: 'notgp', message: ex.statusText });
                }
            }
        });
    },

    EditarUsuario: function (nombre, contraseña, correo, telefono, dependencia, status, callBackResult) {
        var self = this;
        $.ajax({
            type: "GET",
            cache: false,
            url: urlServer + "Usuarios/EditarUsuario",
            data: {
                Nombre: nombre, Contraseña: contraseña, Correo: correo, Telefono: telefono, Dependencia: dependencia,
                Status: status
            },
            success: function (resp) {
                if (resp === true) {
                    callBackResult({ ressult: 'tgp' });
                }
                else {
                    $("#loading").hide();
                    callBackResult({ ressult: 'notgp', message: resp });
                }
            },
            error: function (ex) {
                if (callBackResult !== undefined) {
                    callBackResult({ ressult: 'notgp', message: ex.statusText });
                }
            }
        });
    },
    Salir: function (opciones, callBackResult) {
        var self = this;
        //self.depenAsig.length = 0;
        $.ajax(
            {
                type: "GET",
                cache: false,
                url: urlServer + "Usuarios/Salir",
                data: {},
                success: function (resp) {
                    if (resp === true) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: "tgp", message: null });
                        }
                    }
                    else {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error." });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error." });
                    }
                }
            });
    },

    GuardarGrupoUsuario: function (grupo, callBackResult) {
        var self = this;
        $.ajax({
            type: "GET",
            cache: false,
            url: urlServer + "Usuarios/GuardarGrupoUsuario",
            data: {
                Grupo: grupo
            },
            success: function (resp) {
                if (resp.ERROR === false) {
                    callBackResult({ ressult: 'tgp' });
                }
                else {
                    
                    callBackResult({ ressult: 'notgp', message: resp.MENSAJE_ERROR });
                }
            },
            error: function (ex) {
                if (callBackResult !== undefined) {
                    callBackResult({ ressult: 'notgp', message: ex.statusText });
                }
            }
        });
    },

    ObtenerGrupos: function (callBackResult) {
        var self = this;
        self.grupos.length = 0;
        $.ajax({
            type: "GET",
            cache: false,
            url: urlServer + "Usuarios/ObtenerGrupos",
            data: {
            },
            success: function (resp) {
                if (resp !== null && Array.isArray(resp)) {
                    $("#loading").show();
                    for (var i = 0; i < resp.length; i++) {
                        self.grupos.push({
                            Id: resp[i].ID, Descripcion: resp[i].DESCRIPCION
                        });
                    }
                    $("#loading").hide();
                    callBackResult({ ressult: 'tgp' });
                }
                else {
                    $("#loading").hide();
                    callBackResult({ ressult: 'notgp', message: resp });
                }
            },
            error: function (ex) {
                if (callBackResult !== undefined) {
                    callBackResult({ ressult: 'notgp', message: ex.statusText });
                }
            }
        });
    },

    IniciarUsuario: function (callBackResult) {
        var self = this;
        self.usuario.length = 0;
        $.ajax({
            type: "GET",
            cache: false,
            url: urlServer + "Usuarios/IniciarUsuario",
            data: {
            },
            success: function (resp) {
                if (resp !== null) {
                    self.usuario.push({
                        Usuario: resp.USUARIO, Sistema: resp.NOMBRE_SISTEMA
                    });
                    $("#loading").hide();
                    callBackResult({ ressult: 'tgp' });
                }
                else {
                    $("#loading").hide();
                    callBackResult({ ressult: 'notgp', message: resp });
                }
            },
            error: function (ex) {
                if (callBackResult !== undefined) {
                    callBackResult({ ressult: 'notgp', message: ex.statusText });
                }
            }
        });
    },

    ObtenerGrupoOpciones: function (grupo, callBackResult) {
        var self = this;
        var tituloMnuNvl = "";
        var elementoMnuNvl = "";
        var elementoMnuNvl4 = "";
        var elementoMnuNvl5 = "";
        var idSeccionTitulo = "";
        var idSeccionMnuNvl = "";
        var idSeccionMnuNvl4 = "";
        var idOl = "";
        var idOl2 = "";
        var idSeccionMnuNvl4Ckb = "";
        var idSeccionTituloCkb = "";
        self.Opcionesgrupos.length = 0;
        $.ajax({
            type: "GET",
            cache: false,
            url: urlServer + "Usuarios/ObtenerMenuOpciones",
            data: {
                Grupo: grupo
            },
            success: function (resp) {
                for (var i = 0; i < resp.length; i++) {
                    if (resp[i].NIVEL === 2) {
                        tituloMnuNvl = resp[i].DESCRIPCION;
                        elementoMnuNvl = false;
                        idSeccionTitulo = resp[i].ID;
                        idSeccionMnuNvl = "";
                    }
                    else if (resp[i].NIVEL === 3) {
                        tituloMnuNvl = false;
                        elementoMnuNvl = resp[i].DESCRIPCION;
                        idSeccionMnuNvl = resp[i].ID;
                        elementoMnuNvl4 = "";
                    }
                    else if (resp[i].NIVEL === 4) {
                        tituloMnuNvl = false;
                        elementoMnuNvl = false;
                        elementoMnuNvl4 = resp[i].DESCRIPCION;
                        idSeccionMnuNvl4 = resp[i].ID;
                    }
                    else if (resp[i].NIVEL === 5) {
                        tituloMnuNvl = false;
                        elementoMnuNvl = false;
                        elementoMnuNvl4 = false;
                        elementoMnuNvl5 = resp[i].DESCRIPCION;
                    }

                    self.Opcionesgrupos.push({
                        tituloMnuNvl, elementoMnuNvl4, elementoMnuNvl5, elementoMnuNvl, idSeccionTitulo,
                        idSeccionMnuNvl, idSeccionMnuNvl4, idOl, asignado: resp[i].ASIGNADO, idSeccionTituloCkb,
                        idSeccionMnuNvl4Ckb
                    });
                }
                if (callBackResult !== undefined) {
                    callBackResult({ ressult: "tgp", message: null });
                }
                else {
                    $("#loading").hide();
                    callBackResult({ ressult: 'notgp', message: resp });
                }
            },
            error: function (ex) {
                if (callBackResult !== undefined) {
                    callBackResult({ ressult: 'notgp', message: ex.statusText });
                }
            }
        });
    },

    OpcionesGrupoSelect: function (opciones, grupo, callBackResult) {
        var array = JSON.stringify(opciones);
        var self = this;
        //self.depenAsig.length = 0;
        $.ajax(
            {
                type: "GET",
                cache: false,
                url: urlServer + "Usuarios/EliminarDatosGrupoMenu",
                data: { Opciones: array, Grupo: grupo },
                success: function (resp) {
                    if (resp === "0") {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: "tgp", message: null });
                        }
                    }
                    else {
                        callBackResult({ ressult: "notgp", message: resp });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos." });
                    }
                }
            });
    }

};