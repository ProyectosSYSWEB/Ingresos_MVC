using Sys_Ingresos.Data.Facturas;
using Sys_Ingresos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Sys_Ingresos.Controllers
{
    public class AdministracionController : Controller
    {
        // GET: Administracion
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult EditarDispersadoFecha()
        {
            return View();
        }

        // GET: Administracion/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Administracion/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Administracion/Create
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

        // GET: Administracion/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Administracion/Edit/5
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

        // GET: Administracion/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }


        public JsonResult ListarReferencias(string Fecha_Dispersado)
        {
            RESULTADOFACTURA objResultado = new RESULTADOFACTURA();

            try
            {
                string Verificador = string.Empty;
                var Lista = CursorDataContext.ObtenerReferencias(Fecha_Dispersado);
                if (Lista.Count>=1)
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
        public JsonResult ModificarFechaDispersado(string Fecha_Dispersado_Old, string Fecha_Dispersado_New)
        {
            RESULTADOFACTURA objResultado = new RESULTADOFACTURA();
            FEL_FACTURA objFactura = new FEL_FACTURA();
            try
            {
                string Verificador = string.Empty;
                objFactura.FECHA_DISPERSADO = Fecha_Dispersado_Old;
                objFactura.FECHA_DISPERSADO_NEW = Fecha_Dispersado_New;
                DataContext.ModificarDispersado(objFactura, ref Verificador);
                if (Verificador=="0")
                {
                    objResultado.ERROR = false;
                    objResultado.MENSAJE_ERROR = "";
                    objResultado.RESULTADO =null;
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


        // POST: Administracion/Delete/5
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
