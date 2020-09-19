/// <reference path="../global.js"/>

var usuarioContext =

{
    usuarios: [],
    mensaje: [],
    depenDisp: [],
    depenAsig: [],
    mnuAsig: [],
    grupos: [],
    listaDependenciasTodas: [],
    UsuariosIngresos: function (Sistema, callBackResult) {
        var self = this;
        self.usuarios.length = 0;
        $.ajax(
            {
                type: "GET",
                cache: false,
                url: urlServer + "Usuarios/ListarUsuarios",
                data: { Sistema },
                headers: {
                    'Content-Type': 'application/json',
                },
                success: function (resp) {
                    for (var i = 0; i < resp.length; i++) {
                        self.usuarios.push({ UsuarioIng: resp[i].USUARIO, NombreIng: resp[i].NOMBRE, Contrasenia: resp[i].PASSWORD, Telefono: resp[i].TELEFONOS, EMail: resp[i].CORREO });
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
                    for (var i = 0; i < resp.length; i++) {
                        self.usuarios.push({
                            UsuarioIng: resp[i].USUARIO, NombreIng: resp[i].NOMBRE, Contrasenia: resp[i].PASSWORD, Telefono: resp[i].TELEFONOS, EMail: resp[i].CORREO,
                            Dependencia: resp[i].DIRECCION_DEPE
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
                        self.usuarios.push({ UsuarioIng: resp[i].USUARIO, NombreIng: resp[i].NOMBRE, Contrasenia: resp[i].PASSWORD, Telefono: resp[i].TELEFONOS, EMail: resp[i].CORREO });
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
        self.mnuAsig.length = 0;
        $.ajax(
            {
                type: "GET",
                cache: false,
                url: urlServer + "Usuarios/ListarMenuUsuario",
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

                        self.mnuAsig.push({
                            tituloMnuNvl, elementoMnuNvl4, elementoMnuNvl5, elementoMnuNvl, idSeccionTitulo,
                            idSeccionMnuNvl, idSeccionMnuNvl4, idOl, asignado: resp[i].ASIGNADO, idSeccionTituloCkb,
                            idSeccionMnuNvl4Ckb
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
                    if (resp == true) {
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
                    if (resp == true) {
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
    AsignarDepUsu: function (Dependencia, callBackResult) {
        var self = this;
        //self.depenAsig.length = 0;
        $.ajax(
            {
                type: "GET",
                cache: false,
                url: urlServer + "Usuarios/AsignarDepen",
                data: { Dependencia },
                success: function (resp) {
                    if (resp == true) {
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
    OpcionesMenuSelect: function (opciones, callBackResult) {
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

    GuardarUsuario: function (usuario, nombre, contraseña, correo, telefono, dependencia,  callBackResult) {
        var self = this;        
        $.ajax({
            type: "GET",
            cache: false,
            url: urlServer + "Usuarios/GuardarUsuario",
            data: {
                Usuario: usuario, Nombre: nombre, Contraseña: contraseña, Correo: correo, Telefono: telefono, Dependencia: dependencia
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

    EditarUsuario: function (nombre, contraseña, correo, telefono, dependencia, callBackResult) {
        var self = this;
        $.ajax({
            type: "GET",
            cache: false,
            url: urlServer + "Usuarios/EditarUsuario",
            data: {
                Nombre: nombre, Contraseña: contraseña, Correo: correo, Telefono: telefono, Dependencia: dependencia
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
                Grupo : grupo
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
    }

};