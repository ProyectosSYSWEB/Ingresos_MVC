using Sys_Ingresos.Data.Cuotas;
using Sys_Ingresos.Models;
using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;

namespace Sys_Ingresos.Controllers
{
    public class SIAEController : Controller
    {
        // GET: SIAE
        SESION SesionUsu = new SESION();
        SCE_CUOTAS_POSGRADO_DATOS SesionCuota = new SCE_CUOTAS_POSGRADO_DATOS();
       
        public ActionResult CuotasPosgrado()
        {
            return View();
        }

        public ActionResult PagosPosgrado()
        {
            return View();
        }

        public ActionResult CuotasLenguas()
        {
            return View();
        }

        public ActionResult CuotasPosgradoRegistro()
        {
            return View();
        }

        public ActionResult PagosSYSWEB_a_SIAE()
        {
            return View();
        }

        public ActionResult Referencias()
        {
            return View();
        }


        public JsonResult ObtCuotaPosgrado(int Id)
        {
            string Verificador = string.Empty;
            var Lista = ObtenerDataContext.ObtenerDatosCuotas(Id, ref Verificador);
            if(Verificador=="0")
                return Json(Lista, JsonRequestBehavior.AllowGet);
            else
                return Json(false, JsonRequestBehavior.AllowGet);


        }



        public JsonResult ObtCuotaLenguas(int Id)
        {
            RESULTADO_CUOTAS_SABATINOS objResultado = new RESULTADO_CUOTAS_SABATINOS();

            try
            {
                string Verificador = string.Empty;
                var Lista = ObtenerDataContext.ObtenerDatosCuotaLenguas(Id, ref Verificador);
                if (Verificador == "0")
                {
                    objResultado.ERROR = false;
                    objResultado.MENSAJE_ERROR = "";
                    objResultado.RESULTADO = Lista;
                    return Json(objResultado, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    objResultado.ERROR = true;
                    objResultado.MENSAJE_ERROR = Verificador;
                    objResultado.RESULTADO = null;
                    return Json(objResultado, JsonRequestBehavior.AllowGet);

                }
            }
            catch (Exception ex)
            {
                objResultado.ERROR = true;
                objResultado.MENSAJE_ERROR = ex.Message;
                objResultado.RESULTADO = null;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
    }

    //public JsonResult ObtUsuario()
    //{
    //    string Verificador = string.Empty;
    //    //if (Request.QueryString["WXI"] != null)
    //    //    SesionUsu.UsuWXI = Request.QueryString["WXI"];
    //    //else
    //    //    SesionUsu.UsuWXI = "0";

    //    if (Session["UsuarioIng"] != null)
    //        SesionUsu = (SESION)System.Web.HttpContext.Current.Session["UsuarioIng"];


    //    var Lista=ObtenerDataContext.ObtenerUsuario(SesionUsu.UsuWXI, ref Verificador);
    //    if (Verificador == "0")
    //    {
    //        SesionUsu.Usu_Nombre = Lista[0].USUARIO;
    //        System.Web.HttpContext.Current.Session["UsuarioIng"] = SesionUsu;
    //        return Json(Lista, JsonRequestBehavior.AllowGet);
    //    }
    //    else
    //        return Json("RERROR"+ Request.QueryString["WXI"] + Verificador, JsonRequestBehavior.AllowGet);
    //}

        public JsonResult ObtUsuario()
        {
            string Verificador = string.Empty;
            List<GRL_USUARIOS> Lista = new List<GRL_USUARIOS>();
            GRL_USUARIOS objUsuario = new GRL_USUARIOS();
            if (Session["UsuarioIng"] != null)
            {
                SesionUsu = (SESION)System.Web.HttpContext.Current.Session["UsuarioIng"];
                objUsuario.NOMBRE = SesionUsu.Usu_Nombre;
                objUsuario.TIPO = SesionUsu.Tipo;
                Lista.Add(objUsuario);
                return Json(Lista, JsonRequestBehavior.AllowGet);
            }
            else
                return Json("Usuario Incorrecto.", JsonRequestBehavior.AllowGet);
        }

        public JsonResult GuardarCuotaSel(int Cve, string Generacion, int Selec)
        {
            string ClaseTipoUsu = string.Empty;
            SCE_CUOTAS_POSGRADO_DATOS objCuotas = new SCE_CUOTAS_POSGRADO_DATOS();
            List<SCE_CUOTAS_POSGRADO_DATOS> ListCuotas;
            try
            {
                objCuotas.ID = Cve;
                objCuotas.GENERACION = Generacion;

                if (Session["CuotasSel"] == null)
                {
                    ListCuotas = new List<SCE_CUOTAS_POSGRADO_DATOS>();
                    ListCuotas.Add(objCuotas);
                }
                else
                {
                    ListCuotas = (List<SCE_CUOTAS_POSGRADO_DATOS>)Session["CuotasSel"];
                    if (Selec == 1)
                        ListCuotas.Add(objCuotas);
                    else 
                        ListCuotas.RemoveAll(x => x.ID == Cve && x.GENERACION == Generacion);
                    
                }

                Session["CuotasSel"] = ListCuotas;
                return Json("S", JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json("N", JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult EliminarCuotasSel(string Generacion)
        {
            string Verificador = string.Empty;
            List<SCE_CUOTAS_POSGRADO_DATOS> ListCuotas;

            if (Session["CuotasSel"] == null)
            {
                return Json("Seleccionar al menos una cuota.", JsonRequestBehavior.AllowGet);
            }
            else
            {
                ListCuotas = (List<SCE_CUOTAS_POSGRADO_DATOS>)Session["CuotasSel"];
                GuardarDataContext.EliminarCuotasSel(Generacion, ListCuotas, ref Verificador);
                if (Verificador == "0")
                {
                    Session["CuotasSel"] = null;
                    return Json("0", JsonRequestBehavior.AllowGet);
                }
                else
                    return Json(Verificador, JsonRequestBehavior.AllowGet);
            }


            //return Json("S", JsonRequestBehavior.AllowGet);

        }

        public JsonResult ListarTipoUsu()
        {
            string ClaseTipoUsu = string.Empty;

            if (Session["UsuarioIng"] != null)
            {
                SesionUsu = (SESION)System.Web.HttpContext.Current.Session["UsuarioIng"];
                return Json(SesionUsu.Tipo, JsonRequestBehavior.AllowGet);
            }
            else
                return Json("N", JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarCuotasPosgrado(string Dependencia, string Carrera)
        {
            string ClaseTipoUsu = string.Empty;

            if (Session["UsuarioIng"] != null)
                SesionUsu = (SESION)System.Web.HttpContext.Current.Session["UsuarioIng"];

            if (SesionUsu.Tipo == "SA")
                ClaseTipoUsu = "";
            else
                ClaseTipoUsu = "hidden";

            var Lista = GridDataContext.ObtenerCuotasPosgrado(Dependencia, Carrera);
            List<SCE_CUOTAS_POSGRADO> list = new List<SCE_CUOTAS_POSGRADO>();
            if (Lista.GRUPO.Count > 0)
            {
                
                SCE_CUOTAS_POSGRADO dc = new SCE_CUOTAS_POSGRADO();
                {
                    var generacion = Lista.GRUPO.Select(c => new
                    {
                        c.GENERACION,
                        c.DESC_GENERACION,
                        ClaseTipoUsu,
                        c.RUTA_ADJUNTO,
                        Datos = c.CUOTAS.Select(s => new
                        {
                            s.ID,
                            s.NO_PAGO,
                            s.SEMESTRE,
                            s.CONCEPTO_DESCRIPCION,
                            s.CUOTA,
                            s.VALOR,
                            s.FECHA_LIMITE,
                            s.CUOTA_PAQUETE,
                            s.NO_PAQUETE,
                            s.TIPO_PROGRAMA,
                            ClaseTipoUsu
                        })
                    });
                    return new JsonResult
                    {
                        Data = generacion,
                        JsonRequestBehavior = JsonRequestBehavior.AllowGet
                    };
                }
            }

            return Json(Lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarCuotasSabatinosLenguas(string Escuela, string Tipo)
        {
            RESULTADO_CUOTAS_SABATINOS objResultado = new RESULTADO_CUOTAS_SABATINOS();

            try
            {
                var Lista = GridDataContext.ObtenerCuotasLenguasSabatinos(Escuela, Tipo);
                objResultado.ERROR = false;
                objResultado.MENSAJE_ERROR = "";
                objResultado.RESULTADO = Lista;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                objResultado.ERROR = true;
                objResultado.MENSAJE_ERROR = ex.Message;
                objResultado.RESULTADO = null;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
        }



        public JsonResult ListarEscuelas()
        {

            if (Session["UsuarioIng"] != null)
                SesionUsu = (SESION)System.Web.HttpContext.Current.Session["UsuarioIng"];


            //SesionUsu = System.Web.HttpContext.Current.Session["UsuarioIng"] as SESION;

            var Lista = GridDataContext.ObtenerEscuelas(SesionUsu.Usu_Nombre);
            return Json(Lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarEscuelasSYSWEB()
        {
            RESULTADOCOMUN objResultado = new RESULTADOCOMUN();

            if (Session["UsuarioIng"] != null)
                SesionUsu = (SESION)System.Web.HttpContext.Current.Session["UsuarioIng"];

            try
            {
                var Lista = GridDataContext.ObtenerEscuelas(SesionUsu.Usu_Nombre);
                objResultado.ERROR = false;
                objResultado.MENSAJE_ERROR = string.Empty;
                objResultado.RESULTADO = Lista;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                objResultado.ERROR = true;
                objResultado.MENSAJE_ERROR = ex.Message;
                objResultado.RESULTADO = null;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
        }



        public JsonResult ListarReferenciasSYSWEB(string Referencia)
        {
            RESULTADOFACTURA objResultado = new RESULTADOFACTURA();
            try
            {
                var Lista = GridDataContext.ObtenerReferenciasSYSWEB(Referencia);
                objResultado.ERROR = false;
                objResultado.MENSAJE_ERROR = string.Empty;
                objResultado.RESULTADO = Lista;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                objResultado.ERROR = true;
                objResultado.MENSAJE_ERROR = ex.Message;
                objResultado.RESULTADO = null;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult ListarReferenciasSIAE(string Referencia)
        {
            RESULTADOFACTURA objResultado = new RESULTADOFACTURA();
            try
            {
                var Lista = GridDataContext.ObtenerReferenciasSIAE(Referencia);
                objResultado.ERROR = false;
                objResultado.MENSAJE_ERROR = string.Empty;
                objResultado.RESULTADO = Lista;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                objResultado.ERROR = true;
                objResultado.MENSAJE_ERROR = ex.Message;
                objResultado.RESULTADO = null;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
        }



        public JsonResult ListarEscuelasLenguas()
        {
            RESULTADOCOMUN objResultado = new RESULTADOCOMUN();
            if (Session["UsuarioIng"] != null)
                SesionUsu = (SESION)System.Web.HttpContext.Current.Session["UsuarioIng"];
            try
            {
                var Lista = GridDataContext.ObtenerEscuelasLenguas(SesionUsu.Usu_Nombre);
                objResultado.ERROR = false;
                objResultado.MENSAJE_ERROR = string.Empty;
                objResultado.RESULTADO = Lista;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                objResultado.ERROR = true;
                objResultado.MENSAJE_ERROR =ex.Message;
                objResultado.RESULTADO = null;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }

        }


        public JsonResult ListarEscuelasPagos()
        {

            if (Session["UsuarioIng"] != null)
                SesionUsu = (SESION)System.Web.HttpContext.Current.Session["UsuarioIng"];


            //SesionUsu = System.Web.HttpContext.Current.Session["UsuarioIng"] as SESION;

            var Lista = GridDataContext.ObtenerEscuelasPagos(SesionUsu.Usu_Nombre);
            return Json(Lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarCiclos()
        {
            var Lista = GridDataContext.ObtenerCiclos();
            return Json(Lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarConceptos(string Nivel, string Tipo_Programa)
        {
            var Lista = GridDataContext.ObtenerConceptos(Nivel, Tipo_Programa);
            return Json(Lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarCarreras(string Dependencia)
        {
            var Lista = GridDataContext.ObtenerCarreras(Dependencia);
            return Json(Lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarCarrerasTodas()
        {
            var Lista = GridDataContext.ObtenerCarrerasTodas();
            return Json(Lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GuardarCuotasPosgrado(string Dependencia, string Carrera, string Ciclo, int NumPago, string Nivel, string Semestre, string Concepto, string ConceptoDesc, double Cuota, double CuotaPaq=0, int NumPaq = 0, string FechaLimite="", int Valor=0, int Dias=0, string TipoProg="")
        {
            string Verificador = string.Empty;
            SCE_CUOTAS_POSGRADO_DATOS objDatosCuotas =new SCE_CUOTAS_POSGRADO_DATOS();
            objDatosCuotas.ESCUELA = Dependencia;
            objDatosCuotas.CARRERA = Carrera;
            objDatosCuotas.GENERACION = Ciclo;
            objDatosCuotas.NO_PAGO = NumPago;
            objDatosCuotas.NIVEL = Nivel;
            objDatosCuotas.SEMESTRE = Semestre;
            objDatosCuotas.CONCEPTO = Concepto;
            objDatosCuotas.CONCEPTO_DESCRIPCION = ConceptoDesc;
            objDatosCuotas.CUOTA = Cuota;
            objDatosCuotas.CUOTA_PAQUETE = CuotaPaq;
            objDatosCuotas.NO_PAQUETE = NumPaq;
            objDatosCuotas.FECHA_LIMITE = FechaLimite;
            //objDatosCuotas.TIPO = Tipo;
            objDatosCuotas.VALOR = Valor;
            objDatosCuotas.TIPO_PROGRAMA = TipoProg;
            GuardarDataContext.InsertarCuota(objDatosCuotas, ref Verificador);
            if (Verificador == "0")
                return Json("0", JsonRequestBehavior.AllowGet);
            else
                return Json(Verificador, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ModificarCuotasPosgrado(int Id, int NumPago, string Nivel, string Semestre, string Concepto, string ConceptoDesc, double Cuota, double CuotaPaq = 0, int NumPaq = 0, string FechaLimite = "", int Valor = 0, int Dias = 0, string TipoProg = "")
        {
            string Verificador = string.Empty;
            SCE_CUOTAS_POSGRADO_DATOS objDatosCuotas = new SCE_CUOTAS_POSGRADO_DATOS();
            objDatosCuotas.ID = Id;
            objDatosCuotas.NO_PAGO = NumPago;
            objDatosCuotas.NIVEL = Nivel;
            objDatosCuotas.SEMESTRE = Semestre;
            objDatosCuotas.CONCEPTO = Concepto;
            objDatosCuotas.CONCEPTO_DESCRIPCION = ConceptoDesc;
            objDatosCuotas.CUOTA = Cuota;
            objDatosCuotas.CUOTA_PAQUETE = CuotaPaq;
            objDatosCuotas.NO_PAQUETE = NumPaq;
            objDatosCuotas.FECHA_LIMITE = FechaLimite;
            objDatosCuotas.VALOR = Valor;
            objDatosCuotas.TIPO_PROGRAMA = TipoProg;
            GuardarDataContext.ModificarCuota(objDatosCuotas, ref Verificador);
            if (Verificador == "0")
                return Json("0", JsonRequestBehavior.AllowGet);
            else
                return Json(Verificador, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ModificarCuotasSabatinosLenguas(int Id, string Nivel, string Status, double Ingles, double Italiano, double Frances, double Aleman, double Chino, double Tzotzil, double Tzental, double Espaniol)
        {
            string Verificador = string.Empty;
            SCE_CUOTAS_SABATINOS objDatosCuotas = new SCE_CUOTAS_SABATINOS();
            RESULTADOCOMUN objResultado = new RESULTADOCOMUN();            
            objDatosCuotas.ID = Id;
            objDatosCuotas.NIVEL = Nivel;
            objDatosCuotas.STATUS = Status;
            objDatosCuotas.IMPORTE_INGLES = Ingles;
            objDatosCuotas.IMPORTE_ITALIANO = Italiano;
            objDatosCuotas.IMPORTE_FRANCES = Frances;
            objDatosCuotas.IMPORTE_ALEMAN = Aleman;
            objDatosCuotas.IMPORTE_CHINO = Chino;
            objDatosCuotas.IMPORTE_TZOTZIL = Tzotzil;
            objDatosCuotas.IMPORTE_TZENTAL = Tzental;
            objDatosCuotas.IMPORTE_ESPANIOL = Espaniol;
            try
            {
                GuardarDataContext.ModificarCuotasSabatinosLenguas(objDatosCuotas, ref Verificador);
                if (Verificador == "0")
                {
                    objResultado.ERROR = false;
                    objResultado.MENSAJE_ERROR = string.Empty;
                    objResultado.RESULTADO = null;
                    return Json(objResultado, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    objResultado.ERROR = true;
                    objResultado.MENSAJE_ERROR = Verificador;
                    objResultado.RESULTADO = null;
                    return Json(objResultado, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                objResultado.ERROR = true;
                objResultado.MENSAJE_ERROR = ex.Message;
                objResultado.RESULTADO = null;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult AgregarCuotasSabatinosLenguas(string Escuela, string Tipo, string Nivel, string Status, double Ingles, double Italiano, double Frances, double Aleman, double Chino, double Tzotzil, double Tzental, double Espaniol)
        {
            string Verificador = string.Empty;
            SCE_CUOTAS_SABATINOS objDatosCuotas = new SCE_CUOTAS_SABATINOS();
            RESULTADOCOMUN objResultado = new RESULTADOCOMUN();
            objDatosCuotas.ESCUELA = Escuela;
            objDatosCuotas.TIPO = Tipo;
            objDatosCuotas.NIVEL = Nivel;
            objDatosCuotas.STATUS = Status;
            objDatosCuotas.IMPORTE_INGLES = Ingles;
            objDatosCuotas.IMPORTE_ITALIANO = Italiano;
            objDatosCuotas.IMPORTE_FRANCES = Frances;
            objDatosCuotas.IMPORTE_ALEMAN = Aleman;
            objDatosCuotas.IMPORTE_CHINO = Chino;
            objDatosCuotas.IMPORTE_TZOTZIL = Tzotzil;
            objDatosCuotas.IMPORTE_TZENTAL = Tzental;
            objDatosCuotas.IMPORTE_ESPANIOL = Espaniol;
            try
            {
                GuardarDataContext.AgregarCuotasSabatinosLenguas(objDatosCuotas, ref Verificador);
                if (Verificador == "0")
                {
                    objResultado.ERROR = false;
                    objResultado.MENSAJE_ERROR = string.Empty;
                    objResultado.RESULTADO = null;
                    return Json(objResultado, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    objResultado.ERROR = true;
                    objResultado.MENSAJE_ERROR = Verificador;
                    objResultado.RESULTADO = null;
                    return Json(objResultado, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                objResultado.ERROR = true;
                objResultado.MENSAJE_ERROR = ex.Message;
                objResultado.RESULTADO = null;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult AgregarPagoSIAE(string Matricula, string Ciclo, string Semestre, string Tipo, string Referencia)
        {
            string Verificador = string.Empty;
            FEL_FACTURA objDatosSYSWEB = new FEL_FACTURA();
            RESULTADOFACTURA objResultado = new RESULTADOFACTURA();

            if (Session["UsuarioIng"] != null)
                SesionUsu = (SESION)System.Web.HttpContext.Current.Session["UsuarioIng"];


            objDatosSYSWEB.MATRICULA = Matricula;
            objDatosSYSWEB.CICLO = Ciclo;
            objDatosSYSWEB.SEMESTRE = Convert.ToInt32(Semestre);
            objDatosSYSWEB.TIPO = Tipo;
            objDatosSYSWEB.REFERENCIA = Referencia;
            objDatosSYSWEB.USUARIO = SesionUsu.Usu_Nombre;
            try
            {
                GuardarDataContext.AgregarPagoSIAE(objDatosSYSWEB, ref Verificador);
                if (Verificador == "0")
                {
                    objResultado.ERROR = false;
                    objResultado.MENSAJE_ERROR = string.Empty;
                    objResultado.RESULTADO = null;
                    return Json(objResultado, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    objResultado.ERROR = true;
                    objResultado.MENSAJE_ERROR = Verificador;
                    objResultado.RESULTADO = null;
                    return Json(objResultado, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                objResultado.ERROR = true;
                objResultado.MENSAJE_ERROR = ex.Message;
                objResultado.RESULTADO = null;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
        }



        public JsonResult EliminarCuotaLenguas(int Id)
        {
            string Verificador = string.Empty;
            SCE_CUOTAS_SABATINOS objDatosCuotas = new SCE_CUOTAS_SABATINOS();
            RESULTADOCOMUN objResultado = new RESULTADOCOMUN();            
            objDatosCuotas.ID = Id;
            try
            {
                GuardarDataContext.EliminarCuotaLenguas(objDatosCuotas, ref Verificador);
                if (Verificador == "0")
                {
                    objResultado.ERROR = false;
                    objResultado.MENSAJE_ERROR = string.Empty;
                    objResultado.RESULTADO = null;
                    return Json(objResultado, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    objResultado.ERROR = true;
                    objResultado.MENSAJE_ERROR = Verificador;
                    objResultado.RESULTADO = null;
                    return Json(objResultado, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                objResultado.ERROR = true;
                objResultado.MENSAJE_ERROR = ex.Message;
                objResultado.RESULTADO = null;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult EliminarCuotasPosgrado(int Id)
        {
            string Verificador = string.Empty;
            SCE_CUOTAS_POSGRADO_DATOS objDatosCuotas = new SCE_CUOTAS_POSGRADO_DATOS();
            objDatosCuotas.ID = Id;
           GuardarDataContext.EliminarCuota(objDatosCuotas, ref Verificador);
            if (Verificador == "0")
                return Json("0", JsonRequestBehavior.AllowGet);
            else
                return Json(Verificador, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ReporteCuotasPdf(string Carrera, string Dependencia, string Generacion)
        {

            ConnectionInfo connectionInfo = new ConnectionInfo();
            System.Web.UI.Page p = new System.Web.UI.Page();

            ReportDocument rd = new ReportDocument();
            //FileStream fs = new FileStream(AppDomain.CurrentDomain.BaseDirectory + "imgfooter2018.png", FileMode.Open);
            //byte[] imgbyte = new byte[fs.Length + 1];


            string Ruta = Path.Combine(Server.MapPath("~/Reports"), "rpt_CuotasPosgrado.rpt");
            rd.Load(Path.Combine(Server.MapPath("~/Reports"), "rpt_CuotasPosgrado.rpt"));
            rd.SetParameterValue(0, Carrera);
            rd.SetParameterValue(1, Dependencia);
            rd.SetParameterValue(2, Generacion);
            //rd.SetParameterValue(3, imgbyte);
            //rd.ReportDefinition.ReportObjects["Picture2"] as PictureObject;

            rd.PrintOptions.PaperSize = CrystalDecisions.Shared.PaperSize.PaperLetter;
            connectionInfo.ServerName = "DSIA";
            connectionInfo.UserID = "secadmin";
            connectionInfo.Password = "secadmin34";
            SetDBLogonForReport(connectionInfo, rd);

            Response.Buffer = false;
            Response.ClearContent();
            Response.ClearHeaders();


            Stream stream = rd.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
            stream.Seek(0, SeekOrigin.Begin);
            //fs.Read(imgbyte, 0, imgbyte.Length);
            //fs.Close();
            return File(stream, "application/pdf", "CuotasPosgrado.pdf");
        }

        public ActionResult ReportePagosPdf(string Dependencia, string Matricula)
        {
            ConnectionInfo connectionInfo = new ConnectionInfo();
            System.Web.UI.Page p = new System.Web.UI.Page();

            ReportDocument rd = new ReportDocument();
            
            string Ruta = Path.Combine(Server.MapPath("~/Reports"), "rpt_PagosPosgrado.rpt");
            rd.Load(Path.Combine(Server.MapPath("~/Reports"), "rpt_PagosPosgrado.rpt"));
            rd.SetParameterValue(0, Dependencia);
            rd.SetParameterValue(1, Matricula);
            rd.PrintOptions.PaperSize = CrystalDecisions.Shared.PaperSize.PaperLetter;
            connectionInfo.ServerName = "DSIA";
            connectionInfo.UserID = "secadmin";
            connectionInfo.Password = "secadmin34";
            SetDBLogonForReport(connectionInfo, rd);

            Response.Buffer = false;
            Response.ClearContent();
            Response.ClearHeaders();


            Stream stream = rd.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
            stream.Seek(0, SeekOrigin.Begin);
            return File(stream, "application/pdf", "PagosPosgrado.pdf");
        }


        public ActionResult ReporteGralCuotasPdf(string Carrera, string Dependencia)
        {
            ConnectionInfo connectionInfo = new ConnectionInfo();
            System.Web.UI.Page p = new System.Web.UI.Page();

            ReportDocument rd = new ReportDocument();
            string Ruta = Path.Combine(Server.MapPath("~/Reports"), "rpt_CuotasPosgradoGral.rpt");
            rd.Load(Path.Combine(Server.MapPath("~/Reports"), "rpt_CuotasPosgradoGral.rpt"));
            rd.SetParameterValue(0, Carrera);
            rd.SetParameterValue(1, Dependencia);
            rd.PrintOptions.PaperSize = CrystalDecisions.Shared.PaperSize.PaperLetter;
            connectionInfo.ServerName = "DSIA";
            connectionInfo.UserID = "secadmin";
            connectionInfo.Password = "secadmin34";
            SetDBLogonForReport(connectionInfo, rd);
            Response.Buffer = false;
            Response.ClearContent();
            Response.ClearHeaders();
            Stream stream = rd.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
            stream.Seek(0, SeekOrigin.Begin);
            return File(stream, "application/pdf", "CuotasPosgrado_General.pdf");
        }

        public ActionResult ReporteReciboOficialPdf(string Referencia)
        {
            ConnectionInfo connectionInfo = new ConnectionInfo();
            System.Web.UI.Page p = new System.Web.UI.Page();

            ReportDocument rd = new ReportDocument();
            string Ruta = Path.Combine(Server.MapPath("~/Reports"), "RepComprobanteFiscal_Posgrado.rpt");
            rd.Load(Path.Combine(Server.MapPath("~/Reports"), "RepComprobanteFiscal_Posgrado.rpt"));
            rd.SetParameterValue(0, Referencia);
            rd.PrintOptions.PaperSize = CrystalDecisions.Shared.PaperSize.PaperLetter;
            connectionInfo.ServerName = "DSIA";
            connectionInfo.UserID = "felectronica";
            connectionInfo.Password = "unach09";
            SetDBLogonForReport(connectionInfo, rd);

            Response.Buffer = false;
            Response.ClearContent();
            Response.ClearHeaders();


            Stream stream = rd.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
            stream.Seek(0, SeekOrigin.Begin);
            return File(stream, "application/pdf", "CuotasPosgrado.pdf");
        }
        //METODOS PARA PAGOS
        public JsonResult ListarPagos(string Matricula, string Escuela)
        {
            var Lista = GridDataContext.ObtenerPagos(Matricula, Escuela);
            return Json(Lista, JsonRequestBehavior.AllowGet);
        }





        private void SetDBLogonForReport(ConnectionInfo connectionInfo, ReportDocument reportDocument)
        {
            try
            {
                Tables tables = reportDocument.Database.Tables;

                foreach (CrystalDecisions.CrystalReports.Engine.Table table in tables)
                {
                    TableLogOnInfo tableLogonInfo = table.LogOnInfo;
                    tableLogonInfo.ConnectionInfo = connectionInfo;
                    table.ApplyLogOnInfo(tableLogonInfo);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public JsonResult GuardarDatosOficio(string escuela, string carrera, string generacion, string numOficio, string fechOficio, string nombreDocto)
        {
            string Verificador = string.Empty;
            SCE_CUOTAS_POSGRADO_DATOS objCuotasAdj = new SCE_CUOTAS_POSGRADO_DATOS();
            objCuotasAdj.ESCUELA = escuela;
            objCuotasAdj.CARRERA = carrera;
            objCuotasAdj.GENERACION = generacion;
            objCuotasAdj.NUM_OFICIO = numOficio;
            objCuotasAdj.FECHA_OFICIO = fechOficio;
            objCuotasAdj.RUTA_ADJUNTO = nombreDocto;
            GuardarDataContext.AgregarAdjunto(objCuotasAdj, ref Verificador);
            if (Verificador == "0")
            {
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            else
                return Json(Verificador, JsonRequestBehavior.AllowGet);

        }

        public JsonResult ObtOficios(string Carrera, string Dependencia, string Ciclo)
        {
            string Verificador = string.Empty;
            SCE_CUOTAS_POSGRADO_DATOS objCuotasAdj = new SCE_CUOTAS_POSGRADO_DATOS();
            objCuotasAdj.ESCUELA = Dependencia;
            objCuotasAdj.CARRERA = Carrera;
            objCuotasAdj.GENERACION = Ciclo;
            List<SCE_CUOTAS_POSGRADO_DATOS>list=ObtenerDataContext.ObtenerAdjunto(objCuotasAdj, ref Verificador);          
            return Json(list, JsonRequestBehavior.AllowGet);

        }



        #region <Referencias Generadas en SYSWEB>
        public JsonResult ListarAlumnos(string Matricula)
        {
            RESULTADO_ALUMNOS_UNACH objResultado = new RESULTADO_ALUMNOS_UNACH();

            try
            {
                string Verificador = string.Empty;
                var Lista = GridDataContext.ObtenerAlumnos(Matricula);
                objResultado.ERROR = false;
                objResultado.MENSAJE_ERROR = "";
                objResultado.RESULTADO = Lista;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                objResultado.ERROR = true;
                objResultado.MENSAJE_ERROR = ex.Message;
                objResultado.RESULTADO = null;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult ListarReferenciasGeneradas(string Matricula, string Escuela)
        {
            RESULTADO_SCE_REFERENCIAS objResultado = new RESULTADO_SCE_REFERENCIAS();

            try
            {
                string Verificador = string.Empty;
                var Lista = GridDataContext.ObtenerReferenciasGeneradas(Matricula, Escuela);
                objResultado.ERROR = false;
                objResultado.MENSAJE_ERROR = "";
                objResultado.RESULTADO = Lista;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                objResultado.ERROR = true;
                objResultado.MENSAJE_ERROR = ex.Message;
                objResultado.RESULTADO = null;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult ListarCiclosLicenciatura()
        {
            RESULTADOCOMUN objResultado = new RESULTADOCOMUN();
            try
            {
                var Lista = GridDataContext.ObtenerCiclosLicenciatura();
                objResultado.ERROR = false;
                objResultado.MENSAJE_ERROR = string.Empty;
                objResultado.RESULTADO = Lista;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                objResultado.ERROR = true;
                objResultado.MENSAJE_ERROR = ex.Message;
                objResultado.RESULTADO = null;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GenerarReferencia(string Matricula, string Escuela, string Semestre, string Ciclo, string Movimiento, string Nombre, int DiasVigencia = 1, string Extemporaneo = "S")
        {
            string Verificador = string.Empty;
            SCE_REFERENCIAS objDatosAlumno = new SCE_REFERENCIAS();
            RESULTADO_SCE_REFERENCIAS objResultado = new RESULTADO_SCE_REFERENCIAS();
            List<SCE_REFERENCIAS> list = new List<SCE_REFERENCIAS>(); 
            objDatosAlumno.MATRICULA = Matricula;
            objDatosAlumno.DEPENDENCIA = Escuela;
            objDatosAlumno.SEMESTRE = Semestre;
            objDatosAlumno.CICLO_ACTUAL = Ciclo;
            objDatosAlumno.MOVIMIENTO = Movimiento;
            objDatosAlumno.DIAS_VIGENCIA = DiasVigencia;
            objDatosAlumno.NOMBRE = Nombre;
            objDatosAlumno.ES_EXTEMPORANEO = Extemporaneo;
            objDatosAlumno.MUNICIPIO_SEDE = "0";
            if (Session["UsuarioIng"] != null)
                SesionUsu = (SESION)System.Web.HttpContext.Current.Session["UsuarioIng"];

            try
            {
                list=GuardarDataContext.Obt_Referencia_SYSWEB(objDatosAlumno, SesionUsu.Usu_Nombre, ref Verificador);
                if (Verificador == "0")
                {
                    objResultado.ERROR = false;
                    objResultado.MENSAJE_ERROR = string.Empty;
                    objResultado.RESULTADO = list;
                    return Json(objResultado, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    objResultado.ERROR = true;
                    objResultado.MENSAJE_ERROR = Verificador;
                    objResultado.RESULTADO = null;
                    return Json(objResultado, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                objResultado.ERROR = true;
                objResultado.MENSAJE_ERROR = ex.Message;
                objResultado.RESULTADO = null;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult ObtReferenciaPdf(int IdReferencia)
        {

            ConnectionInfo connectionInfo = new ConnectionInfo();
            System.Web.UI.Page p = new System.Web.UI.Page();
            ReportDocument rd = new ReportDocument();
            string Ruta = Path.Combine(Server.MapPath("~/Reports"), "Ficha_Referenciada_SIAE.rpt");
            rd.Load(Path.Combine(Server.MapPath("~/Reports"), "Ficha_Referenciada_SIAE.rpt"));
            rd.SetParameterValue(0, IdReferencia);
            rd.PrintOptions.PaperSize = CrystalDecisions.Shared.PaperSize.PaperLetter;
            connectionInfo.ServerName = "DSIA";
            connectionInfo.UserID = "secadmin";
            connectionInfo.Password = "secadmin34";
            SetDBLogonForReport(connectionInfo, rd);

            Response.Buffer = false;
            Response.ClearContent();
            Response.ClearHeaders();


            Stream stream = rd.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
            stream.Seek(0, SeekOrigin.Begin);
            //fs.Read(imgbyte, 0, imgbyte.Length);
            //fs.Close();
            return File(stream, "application/pdf", "Ficha_Referenciada.pdf");
        }

        #endregion


        [HttpPost]
        public ActionResult UploadFiles()
            //(string Escuela, string Carrera, string Genereacion, string NumOficio, string FechaOficio, string Archivo)
        {
            // Checking no of files injected in Request object  
            if (Request.Files.Count > 0)
            {
                try
                {
                    //  Get all files from Request object  
                    HttpFileCollectionBase files = Request.Files;
                    string fnameDoc=string.Empty;
                    for (int i = 0; i < files.Count; i++)
                    {
                        //string path = AppDomain.CurrentDomain.BaseDirectory + "Uploads/";  
                        //string filename = Path.GetFileName(Request.Files[i].FileName);  

                        HttpPostedFileBase file = files[i];
                        string fname;

                        // Checking for Internet Explorer  
                        if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                        {
                            string[] testfiles = file.FileName.Split(new char[] { '\\' });
                            fname = testfiles[testfiles.Length - 1];
                        }
                        else
                        {
                            fname = file.FileName;
                        }

                        // Get the complete folder path and store the file inside it.
                        fnameDoc = "~/ArchivosAdj/OficiosPosgrado/" + fname;
                        fname = Server.MapPath(fnameDoc);
                        file.SaveAs(fname);

                    }
                    //string Verificador = string.Empty;
                    //SCE_CUOTAS_POSGRADO_DATOS objCuotasAdj = new SCE_CUOTAS_POSGRADO_DATOS();
                    //objCuotasAdj.ESCUELA = Escuela;
                    //objCuotasAdj.CARRERA = Carrera;
                    //objCuotasAdj.GENERACION = Genereacion;
                    //objCuotasAdj.NUM_OFICIO = NumOficio;
                    //objCuotasAdj.FECHA_OFICIO = FechaOficio;
                    //objCuotasAdj.RUTA_ADJUNTO = fnameDoc;
                    //GuardarDataContext.AgregarAdjunto(objCuotasAdj, ref Verificador);
                    //if (Verificador == "0")
                    //{
                    //    return Json("File Uploaded Successfully!");
                    //}
                    //else
                    //    return Json(Verificador);

                    // Returns message that successfully uploaded  
                    return Json(true);
                }
                catch (Exception ex)
                {
                    return Json("Error occurred. Error details: " + ex.Message);
                }
            }
            else
            {
                return Json("No files selected.");
            }
        }

        



        [HttpPost]
        public ActionResult OficiosAdjuntos()
        {
            SCE_REFERENCIAS objReferencia = new SCE_REFERENCIAS();
            string Respuesta = "";            
            //Variables para indicar el orgien y el destino del archivo a copiar
            string sourceDir = "C:/inetpub/wwwroot/IngresosMVC/OficiosAdjuntos";
            string backupDir = "C:/inetpub/wwwroot/SUNVA/DocsFolios";
            
            // Checking no of files injected in Request object  
            if (Request.Files.Count > 0)
            {
                try
                {
                    objReferencia = (SCE_REFERENCIAS)System.Web.HttpContext.Current.Session["NombreOficio"];
                    //  Get all files from Request object  
                    HttpFileCollectionBase files = Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {
                        //string path = AppDomain.CurrentDomain.BaseDirectory + "Uploads/";  
                        //string filename = Path.GetFileName(Request.Files[i].FileName);  

                        HttpPostedFileBase file = files[i];
                        string fname;
                        string extencion;
                        string archivoNombre;
                        //string fnameCondicion;
                        //char separador = '.';

                        // Checking for Internet Explorer  
                        if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                        {
                            string[] testfiles = file.FileName.Split(new char[] { '\\' });
                            fname = testfiles[testfiles.Length - 1];
                            archivoNombre = fname;
                        }
                        else
                        {
                            extencion = Path.GetExtension(file.FileName);
                            //fnameCondicion = file.FileName;
                            fname = objReferencia.DEPENDENCIA + "-" + objReferencia.REFERENCIA + extencion;
                            archivoNombre = fname;
                            //fname = file.FileName;
                        }

                        

                        // Get the complete folder path and store the file inside it.
                        string fnameDoc = "../OficiosAdjuntos/" + fname;
                        
                        fname = Server.MapPath(fnameDoc);
                        file.SaveAs(fname);
                        Respuesta = "1";
                        System.IO.File.Copy(Path.Combine(sourceDir, archivoNombre), Path.Combine(backupDir, archivoNombre), true);
                    }
                    // Returns message that successfully uploaded  
                    return Json(Respuesta);
                }
                catch (Exception ex)
                {
                    return Json("Un error ha ocurrido. Error: " + ex.Message);
                }
            }
            else
            {
                return Json("No hay archivos seleccionados.");
            }
        }

        public JsonResult GuardarNombreOficioAdjunto(string Dependencia, string NoOficio)
        {
            SCE_REFERENCIAS objReferencias = new SCE_REFERENCIAS();
            RESULTADO_SCE_REFERENCIAS objResultado = new RESULTADO_SCE_REFERENCIAS();
            try
            {
                objReferencias.DEPENDENCIA = Dependencia;
                objReferencias.REFERENCIA = NoOficio;
                System.Web.HttpContext.Current.Session["NombreOficio"] = objReferencias;
                objResultado.ERROR = false;
                objResultado.MENSAJE_ERROR = "";
                objResultado.RESULTADO = null;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                objResultado.ERROR = true;
                objResultado.MENSAJE_ERROR = ex.Message;
                objResultado.RESULTADO = null;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
        }

        // GET: SIAE/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: SIAE/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: SIAE/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: SIAE/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: SIAE/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: SIAE/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: SIAE/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
