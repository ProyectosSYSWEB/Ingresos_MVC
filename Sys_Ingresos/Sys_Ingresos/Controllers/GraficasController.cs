using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using Newtonsoft.Json;
using Sys_Ingresos.Data.Graficas;
using Sys_Ingresos.Models;
using Sys_Ingresos.Models.JWT;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Sys_Ingresos.Controllers
{
    public class GraficasController : Controller
    {
        // GET: Graficas
        public ActionResult Index()
        {
            return View();
        }

        // GET: Graficas/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Graficas/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Graficas/Create
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

        // GET: Graficas/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Graficas/Edit/5
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

        // GET: Graficas/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Graficas/Delete/5
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


        //public JsonResult ObtenerDatosInscripcion()
        //{
        //    RESULTADO_GRAFICAS objResultado = new RESULTADO_GRAFICAS();
        //    try
        //    {
        //        var Lista = CursorDataContext.ObtenerDatosInscripciones(Referencia);
        //        objResultado.ERROR = false;
        //        objResultado.MENSAJE_ERROR = string.Empty;
        //        objResultado.RESULTADO = Lista;
        //        return Json(objResultado, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception ex)
        //    {
        //        objResultado.ERROR = true;
        //        objResultado.MENSAJE_ERROR = ex.Message;
        //        objResultado.RESULTADO = null;
        //        return Json(objResultado, JsonRequestBehavior.AllowGet);
        //    }
        //}


        public JsonResult ObtenerDatosGraficaPagados(string Dependencia, string Ciclo_Escolar, string Tipo)
        {
            RESULTADO_GRAFICAS objResultado = new RESULTADO_GRAFICAS();
            try
            {
                objResultado.RESULTADO = CursorDataContext.ObtenerDatosGraficaPagados(Dependencia, Ciclo_Escolar, Tipo);
                objResultado.ERROR = false;
                objResultado.MENSAJE_ERROR = "";
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                objResultado.RESULTADO = null;
                objResultado.ERROR = true;
                objResultado.MENSAJE_ERROR = ex.Message;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult ObtFaltanporPagarPdf(string ciclo, string tipo, string dependencia)
        {

            ConnectionInfo connectionInfo = new ConnectionInfo();
            System.Web.UI.Page p = new System.Web.UI.Page();
            ReportDocument rd = new ReportDocument();
            string Ruta = Path.Combine(Server.MapPath("~/Reports"), "REP067.rpt");
            rd.Load(Path.Combine(Server.MapPath("~/Reports"), "REP067.rpt"));
            rd.SetParameterValue(0, ciclo);
            rd.SetParameterValue(1, tipo);
            rd.SetParameterValue(2, dependencia);
            rd.PrintOptions.PaperSize = CrystalDecisions.Shared.PaperSize.PaperLetter;
            connectionInfo.ServerName = "DSIA";
            connectionInfo.UserID = "FELECTRONICA";
            connectionInfo.Password = "unach09";
            SetDBLogonForReport(connectionInfo, rd);

            Response.Buffer = false;
            Response.ClearContent();
            Response.ClearHeaders();


            Stream stream = rd.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
            stream.Seek(0, SeekOrigin.Begin);
            //fs.Read(imgbyte, 0, imgbyte.Length);
            //fs.Close();
            return File(stream, "application/pdf", "faltan_por_pagar.pdf");
        }

        public ActionResult ObtFaltanporPagarExcel(string ciclo, string tipo, string dependencia)
        {

            ConnectionInfo connectionInfo = new ConnectionInfo();
            System.Web.UI.Page p = new System.Web.UI.Page();
            ReportDocument rd = new ReportDocument();
            string Ruta = Path.Combine(Server.MapPath("~/Reports"), "REP067.rpt");
            rd.Load(Path.Combine(Server.MapPath("~/Reports"), "REP067.rpt"));
            rd.SetParameterValue(0, ciclo);
            rd.SetParameterValue(1, tipo);
            rd.SetParameterValue(2, dependencia);
            rd.PrintOptions.PaperSize = CrystalDecisions.Shared.PaperSize.PaperLetter;
            connectionInfo.ServerName = "DSIA";
            connectionInfo.UserID = "FELECTRONICA";
            connectionInfo.Password = "unach09";
            SetDBLogonForReport(connectionInfo, rd);

            Response.Buffer = false;
            Response.ClearContent();
            Response.ClearHeaders();


            Stream stream = rd.ExportToStream(CrystalDecisions.Shared.ExportFormatType.Excel);            
            stream.Seek(0, SeekOrigin.Begin);
            //fs.Read(imgbyte, 0, imgbyte.Length);
            //fs.Close();
            return File(stream, "application/vnd.ms-excel", "faltan_por_pagar.xls");
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
        //public JsonResult ObtenerDatosInscripcion()
        //{
        //    RESULTADO_GRAFICAS objResultado = new RESULTADO_GRAFICAS();
        //    try
        //    {
        //        var Lista = CursorDataContext.ObtenerDatosInscripciones(Referencia);
        //        objResultado.ERROR = false;
        //        objResultado.MENSAJE_ERROR = string.Empty;
        //        objResultado.RESULTADO = Lista;
        //        return Json(objResultado, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception ex)
        //    {
        //        objResultado.ERROR = true;
        //        objResultado.MENSAJE_ERROR = ex.Message;
        //        objResultado.RESULTADO = null;
        //        return Json(objResultado, JsonRequestBehavior.AllowGet);
        //    }
        //}

    }
}
