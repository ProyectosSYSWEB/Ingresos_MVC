using Sys_Ingresos.Data.Cuotas;
using Sys_Ingresos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Sys_Ingresos.Controllers
{
    public class HomeController : Controller
    {
        //public ActionResult Index()
        //{
        //    return View();
        //}
        SESION SesionUsu = new SESION();
        //public ActionResult Index(string WXI)
        //{

        //    if (Session["UsuarioIng"] != null)
        //    {
        //        SesionUsu = (SESION)System.Web.HttpContext.Current.Session["UsuarioIng"];
        //        if (SesionUsu.UsuWXI == null)
        //        {
        //            SesionUsu.UsuWXI = WXI;
        //            Session["UsuarioIng"] = SesionUsu;
        //            Session.Timeout = 120;
        //        }
        //        else
        //        {
        //            if (WXI != null)
        //            {
        //                if (SesionUsu.UsuWXI != WXI)
        //                {
        //                    SesionUsu.UsuWXI = WXI;
        //                    Session["UsuarioIng"] = SesionUsu;
        //                }
        //            }     
        //            //else
        //            //{

        //            //}
        //        }
        //    }
        //    else
        //    {
        //        SesionUsu.UsuWXI = WXI;
        //        Session["UsuarioIng"] = SesionUsu;
        //        Session.Timeout = 120;
        //    }
        //    //SesionUsu.UsuWXI = WXI;
        //    //Session["UsuarioIng"] = SesionUsu;
        //    //Session.Timeout = 120;

        //    return View();
        //}
        public ActionResult Index(string WXI, string Formulario)
        {

            if (Session["UsuarioIng"] != null)
            {
                SesionUsu = (SESION)System.Web.HttpContext.Current.Session["UsuarioIng"];
                if (SesionUsu.UsuWXI == null)
                {
                    SesionUsu.UsuWXI = WXI;
                    Session["UsuarioIng"] = SesionUsu;
                    Session.Timeout = 120;
                }
                else
                {
                    if (WXI != null)
                    {
                        if (SesionUsu.UsuWXI != WXI)
                        {
                            string Verificador = string.Empty;
                            SesionUsu.UsuWXI = WXI;
                            var Lista = ObtenerDataContext.ObtenerUsuario(SesionUsu.UsuWXI, ref Verificador);
                            if (Verificador == "0")
                            {
                                SesionUsu.Usu_Nombre = Lista[0].USUARIO;
                                SesionUsu.Tipo = Lista[0].TIPO;
                                SesionUsu.Form = Formulario;
                                System.Web.HttpContext.Current.Session["UsuarioIng"] = SesionUsu;
                            }
                            System.Web.HttpContext.Current.Session["UsuarioIng"] = SesionUsu;
                        }
                        else
                        {
                            SesionUsu.Form = Formulario;
                            System.Web.HttpContext.Current.Session["UsuarioIng"] = SesionUsu;
                        }
                        //else
                        //{
                        //    string Verificador = string.Empty;
                        //    var Lista = ObtenerDataContext.ObtenerUsuario(SesionUsu.UsuWXI, ref Verificador);
                        //    if (Verificador == "0")
                        //    {
                        //        SesionUsu.UsuWXI = WXI;
                        //        SesionUsu.Usu_Nombre = Lista[0].USUARIO;
                        //        SesionUsu.Tipo = Lista[0].TIPO;
                        //        SesionUsu.Form = Formulario;
                        //        System.Web.HttpContext.Current.Session["UsuarioIng"] = SesionUsu;

                        //    }
                        //    else
                        //    {
                        //        SesionUsu.UsuWXI = WXI;
                        //        SesionUsu.Form = Formulario;
                        //        System.Web.HttpContext.Current.Session["UsuarioIng"] = SesionUsu;
                        //    }
                        //}
                    }
                  
                }
            }
            else
            {
                if (WXI != null && Formulario != null)
                {
                    Session["UsuarioIng"] = null;
                    string Verificador = string.Empty;
                    SesionUsu.UsuWXI = WXI;
                    var Lista = ObtenerDataContext.ObtenerUsuario(SesionUsu.UsuWXI, ref Verificador);
                    if (Verificador == "0")
                    {
                        SesionUsu.UsuWXI = WXI;
                        SesionUsu.Usu_Nombre = Lista[0].USUARIO;
                        SesionUsu.Tipo = Lista[0].TIPO;
                        SesionUsu.Form = Formulario;
                        System.Web.HttpContext.Current.Session["UsuarioIng"] = SesionUsu;
                        Session.Timeout = 120;

                    }
                }
                else
                    Session["UsuarioIng"] = null;

                //string Verificador = string.Empty;
                //var Lista = ObtenerDataContext.ObtenerUsuario(SesionUsu.UsuWXI, ref Verificador);
                //if (Verificador == "0")
                //{
                //    SesionUsu.UsuWXI = WXI;
                //    SesionUsu.Usu_Nombre = Lista[0].USUARIO;
                //    SesionUsu.Tipo = Lista[0].TIPO;
                //    SesionUsu.Form = Formulario;
                //    System.Web.HttpContext.Current.Session["UsuarioIng"] = SesionUsu;
                //    Session.Timeout = 120;

                    //}
                    //else
                    //{
                    //    SesionUsu.UsuWXI = WXI;
                    //    SesionUsu.Form = Formulario;
                    //    System.Web.HttpContext.Current.Session["UsuarioIng"] = SesionUsu;
                    //    Session.Timeout = 120;
                    //}


            }

            return View();
        }

        public JsonResult ObtUsuario()
        {
            string Verificador = string.Empty;          

            if (Session["UsuarioIng"] != null)
                SesionUsu = (SESION)System.Web.HttpContext.Current.Session["UsuarioIng"];


            var Lista = ObtenerDataContext.ObtenerUsuario(SesionUsu.UsuWXI, ref Verificador);
            if (Verificador == "0")
            {
                SesionUsu.Usu_Nombre = Lista[0].USUARIO;
                SesionUsu.Tipo = Lista[0].TIPO;
                System.Web.HttpContext.Current.Session["UsuarioIng"] = SesionUsu;
                return Json(Lista, JsonRequestBehavior.AllowGet);
            }
            else
                return Json("RERROR" + Request.QueryString["WXI"] + Verificador, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ObtDatosUsuario()
        {
            if (Session["UsuarioIng"] != null)
            {
                SesionUsu = (SESION)System.Web.HttpContext.Current.Session["UsuarioIng"];
                List<SESION> listUsu = new List<SESION>();
                listUsu.Add(SesionUsu);
                return Json(listUsu, JsonRequestBehavior.AllowGet);
            }
            else
                return Json("RERROR" , JsonRequestBehavior.AllowGet);
        }

        public JsonResult RedirectForm()
        {
            if (Session["UsuarioIng"] != null)
            {
                SesionUsu = (SESION)System.Web.HttpContext.Current.Session["UsuarioIng"];
                List<SESION> listUsu = new List<SESION>();
                listUsu.Add(SesionUsu);
                return Json(listUsu, JsonRequestBehavior.AllowGet);
            }
            else
                return Json("RERROR", JsonRequestBehavior.AllowGet);
        }


        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}