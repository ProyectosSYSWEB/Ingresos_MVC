using Sys_Ingresos.Data.Graficas;
using Sys_Ingresos.Models;
using System;
using System.Collections.Generic;
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


        public JsonResult ObtenerDatosInscripcion()
        {
            RESULTADO_GRAFICAS objResultado = new RESULTADO_GRAFICAS();
            try
            {
                var Lista = CursorDataContext.ObtenerDatosInscripciones(Referencia);
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
    }
}
