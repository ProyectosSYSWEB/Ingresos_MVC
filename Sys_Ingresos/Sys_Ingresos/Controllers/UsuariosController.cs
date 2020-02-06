using Newtonsoft.Json;
using Oracle.ManagedDataAccess.Client;
using Sys_Ingresos.Data.Usuarios;
using Sys_Ingresos.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Xml;

namespace Sys_Ingresos.Controllers
{
    public class UsuariosController : Controller
    {
        // GET: Usuarios
        GRL_USUARIOS objUsuario = new GRL_USUARIOS();
        List<GRL_USUARIOS> listUsuario =new List<GRL_USUARIOS>();
        string Verificador = string.Empty;
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Admin()
        {
            //if (Session["DatosUsuario"] != null)
            //{
            //    listUsuario = (List<GRL_USUARIOS>)Session["DatosUsuario"];

            //}
            return View();


        }


        public JsonResult Datos(string Usuario)
        {
            Session["DatosUsuario"] = null;
            objUsuario.USUARIO = Usuario;
            listUsuario.Add(objUsuario);
            Session["DatosUsuario"] = listUsuario;
            return Json(true, JsonRequestBehavior.AllowGet);           

        }

        public JsonResult ObtUsuario()
        {

            if (Session["DatosUsuario"] != null)
            {
                listUsuario = (List<GRL_USUARIOS>)Session["DatosUsuario"];
                var Lista = ObtenerDataContext.ObtenerDatosUsuario(listUsuario[0].USUARIO, ref Verificador);
                if(Verificador=="0")
                    return Json(Lista, JsonRequestBehavior.AllowGet);
                else
                    return Json(false, JsonRequestBehavior.AllowGet);

            }
            else
                return Json(false, JsonRequestBehavior.AllowGet);

        }

        public JsonResult ListarUsuarios(int Sistema)
        {
            var Lista = GridDataContext.ObtenerUsuarios(Sistema);
            return Json(Lista, JsonRequestBehavior.AllowGet);

        }

        public JsonResult ListarUsuariosAdmin()
        {
            var Lista = GridDataContext.ObtenerUsuariosAdmin();
            return Json(Lista, JsonRequestBehavior.AllowGet);

        }

        public JsonResult ListarDepenDisp()
        {
            if (Session["DatosUsuario"] != null)
            {
                listUsuario = (List<GRL_USUARIOS>)Session["DatosUsuario"];
                var Lista = GridDataContext.ObtenerDepenDisp(listUsuario[0].USUARIO);
                return Json(Lista, JsonRequestBehavior.AllowGet);
            }
            else
                return Json(false, JsonRequestBehavior.AllowGet);


        }

        public JsonResult ListarDepenAsig()
        {
            if (Session["DatosUsuario"] != null)
            {
                listUsuario = (List<GRL_USUARIOS>)Session["DatosUsuario"];
                var Lista = GridDataContext.ObtenerDepenAsig(listUsuario[0].USUARIO);
                return Json(Lista, JsonRequestBehavior.AllowGet);
            }
            else
                return Json(false, JsonRequestBehavior.AllowGet);

        }

        public JsonResult ObtenerDatos(string Usuario)
        {
            var Lista = GridDataContext.ObtenerDepenAsig(Usuario);
            return Json(Lista, JsonRequestBehavior.AllowGet);

        }

        public JsonResult ListarMenuUsuario()
        {
            if (Session["DatosUsuario"] != null)
            {
                listUsuario = (List<GRL_USUARIOS>)Session["DatosUsuario"];
                var Lista = GridDataContext.ObtenerMnuUsuario(listUsuario[0].USUARIO);
                return Json(Lista, JsonRequestBehavior.AllowGet);
            }
            else
                return Json(false, JsonRequestBehavior.AllowGet);

        }

        public JsonResult EliminarDepenAsig(string Dependencia)
        {
            Verificador = string.Empty;
            if(Session["DatosUsuario"] !=null)
            {
                listUsuario = (List<GRL_USUARIOS>)Session["DatosUsuario"];
                ObtenerDataContext.EliminarDepUsu(listUsuario[0].USUARIO, Dependencia, ref Verificador);
                if (Verificador == "0")
                    return Json(true, JsonRequestBehavior.AllowGet);
                else
                    return Json(false, JsonRequestBehavior.AllowGet);
            }
            else
                return Json(false, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AsignarDepen(string Dependencia)
        {
            Verificador = string.Empty;
            if (Session["DatosUsuario"] != null)
            {
                listUsuario = (List<GRL_USUARIOS>)Session["DatosUsuario"];
                ObtenerDataContext.AsignarDepen(listUsuario[0].USUARIO, Dependencia, ref Verificador);
                if (Verificador == "0")
                    return Json(true, JsonRequestBehavior.AllowGet);
                else
                    return Json(false, JsonRequestBehavior.AllowGet);
            }
            else
                return Json(false, JsonRequestBehavior.AllowGet);
        }


        public void EliminarDatosMenu(string Opciones)
        {
            char[] charsToTrim = { '[', ']'};            
            string result = Opciones.Trim(charsToTrim);

            string[] IdInfoReq = result.Split(',');

            int[] IdMnu = new int[IdInfoReq.Length];

            for(int i = 0; i < IdInfoReq.Length; i ++)
            {
                IdMnu[i] = Convert.ToInt32(IdInfoReq[i]);
            }

            Verificador = string.Empty;
            if (Session["DatosUsuario"] != null)
            {
                listUsuario = (List<GRL_USUARIOS>)Session["DatosUsuario"];
                ObtenerDataContext.EliminarDatosMenu(listUsuario[0].USUARIO, ref Verificador);
                if (Verificador == "0")
                    InsOpcionesMenu(IdMnu);
            }          
        }

        public JsonResult InsOpcionesMenu(int [] Opciones)
        {
            Verificador = string.Empty;
            if (Session["DatosUsuario"] != null)
            {
                listUsuario = (List<GRL_USUARIOS>)Session["DatosUsuario"];       
                for(int i = 0; i < Opciones.Length; i++)
                {
                    ObtenerDataContext.InsOpcionesMenu(listUsuario[0].USUARIO, Opciones[i], ref Verificador);
                    if (Verificador != "0" )
                        return Json(Verificador + "id: " + Opciones[i], JsonRequestBehavior.AllowGet);
                }                
                if (Verificador == "0")
                {
                    GenerateXMLFile();
                    return Json(true, JsonRequestBehavior.AllowGet);
                }                    
                else
                    return Json(Verificador, JsonRequestBehavior.AllowGet);
            }
            else
                return Json(false, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ObtenerDependenciasTodas()
        {
            try
            {
                var Lista = ComboDataContext.ObtenerDependenciasTodas();
                return Json(Lista, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GuardarUsuario(string Usuario, string Nombre, string Contraseña, string Correo, string Telefono, string Dependencia)
        {
            string Verificador = string.Empty;
            GRL_USUARIOS objUsuario = new GRL_USUARIOS();
            objUsuario.USUARIO = Usuario.ToUpper();
            objUsuario.NOMBRE = Nombre.ToUpper();
            objUsuario.PASSWORD = Contraseña.ToUpper();
            objUsuario.CORREO = Correo;
            objUsuario.TELEFONOS = Telefono;
            objUsuario.DIRECCION_DEPE = Dependencia;            
            try
            {
                GuardarDataContext.GuardarUsuario(objUsuario, ref Verificador);
                if(Verificador == "0")
                    return Json(true, JsonRequestBehavior.AllowGet);
                else
                    return Json(false, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult EditarUsuario(string Nombre, string Contraseña, string Correo, string Telefono, string Dependencia)
        {
            GRL_USUARIOS USUARIO = new GRL_USUARIOS();
            listUsuario = (List<GRL_USUARIOS>)Session["DatosUsuario"];
            string Verificador = string.Empty;
            GRL_USUARIOS objUsuario = new GRL_USUARIOS();
            //objUsuario.USUARIO = listUsuario;
            objUsuario.USUARIO = listUsuario[0].USUARIO;
            objUsuario.NOMBRE = Nombre.ToUpper();
            objUsuario.PASSWORD = Contraseña.ToUpper();
            objUsuario.CORREO = Correo;
            objUsuario.TELEFONOS = Telefono;
            objUsuario.DIRECCION_DEPE = Dependencia;
            try
            {
                GuardarDataContext.EditarUsuario(objUsuario, ref Verificador);
                if (Verificador == "0")
                    return Json(true, JsonRequestBehavior.AllowGet);
                else
                    return Json(false, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GuardarGrupoUsuario(string Grupo)
        {
            string Verificador = string.Empty;
            listUsuario = (List<GRL_USUARIOS>)Session["DatosUsuario"];
            string usuario = listUsuario[0].USUARIO;
            try
            {                
                ObtenerDataContext.EliminarDatosMenu(usuario, ref Verificador);
                if(Verificador == "0")
                    GuardarDataContext.GuardarGrupoUsuario(usuario, Grupo, ref Verificador);
                if(Verificador == "0")
                {
                    GenerateXMLFile();
                    return Json(true, JsonRequestBehavior.AllowGet);
                }                    
                else
                    return Json(false, JsonRequestBehavior.AllowGet);
            }            
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult ObtenerGrupos()
        {
            try
            {
                var Lista = ComboDataContext.ObtenerGrupos();
                return Json(Lista, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult Salir()
        {
            Session["DatosUsuario"] = null;
            return Json(true, JsonRequestBehavior.AllowGet);                   
        }


        public void GenerateXMLFile()
        {
            Menus menu = new Menus();
            menu.NombreMenu = "MenuTop";
            menu.UsuarioNombre = listUsuario[0].USUARIO;
            menu.Grupo = 14;
            string ruta = @"C:\inetpub\wwwroot\Ingresos\ArchivosMenu";
            listUsuario = (List<GRL_USUARIOS>)Session["DatosUsuario"];            
            string siteMap = listUsuario[0].USUARIO + ".sitemap";
            string fullPath = Path.Combine(ruta, siteMap);
            bool existe = System.IO.File.Exists(fullPath);
            if(existe == true)
                System.IO.File.Delete(fullPath);

            ExeProcedimiento CDDatos = new ExeProcedimiento();
            OracleCommand Cmd = null;
            //Create XML
            Encoding enc = Encoding.UTF8;
            XmlTextWriter objXMLTW = new XmlTextWriter(fullPath, enc);
            try
            {
                OracleDataReader dr = null;
                string[] Parametros = { "p_usuario", "p_grupo" };
                object[] Valores = { menu.UsuarioNombre, 14 };
                Cmd = CDDatos.GenerarOracleCommandCursor("Pkg_Contratos.Obt_Sistemas", ref dr, Parametros, Valores);
                if (dr.HasRows)
                {

                    objXMLTW.WriteStartDocument();//xml document open
                    //'Top level (Parent element)
                    //root node open
                    objXMLTW.WriteStartElement("siteMap");
                    //first Node of the Menu open
                    objXMLTW.WriteStartElement("siteMapNode");
                    //Title attribute set
                    objXMLTW.WriteAttributeString("title", "INICIO");
                    objXMLTW.WriteAttributeString("description", "INICIO");//Description attribute set
                    objXMLTW.WriteAttributeString("url", "Default.aspx");//URL attribu

                    while (dr.Read())
                    {
                        if (dr["padre"].ToString() == string.Empty)
                        {
                            int MasterID = Convert.ToInt32(dr["id"].ToString());
                            objXMLTW.WriteStartElement("siteMapNode");
                            objXMLTW.WriteAttributeString("title", dr["descripcion"].ToString().ToUpper());
                            objXMLTW.WriteAttributeString("description", dr["descripcion"].ToString().ToUpper());
                            if (dr["clave"].ToString().Contains(".aspx"))
                                objXMLTW.WriteAttributeString("url", dr["clave"].ToString());
                            else
                                objXMLTW.WriteAttributeString("url", "Default.aspx?cve=" + dr["id"].ToString());



                            //objXMLTW.WriteAttributeString("url", dr["clave"].ToString());
                            ChildMaster(objXMLTW, menu, MasterID);
                            objXMLTW.WriteEndElement();
                        }
                    }
                    dr.Close();


                    objXMLTW.WriteStartElement("siteMapNode");
                    objXMLTW.WriteAttributeString("title", "PASSWORD");
                    objXMLTW.WriteAttributeString("description", "PASSWORD");
                    objXMLTW.WriteAttributeString("url", "http://www.sysweb.unach.mx/administrator/");
                    objXMLTW.WriteEndElement();

                    objXMLTW.WriteStartElement("siteMapNode");
                    objXMLTW.WriteAttributeString("title", "SALIR");
                    objXMLTW.WriteAttributeString("description", "SALIR");
                    objXMLTW.WriteAttributeString("url", "Acceso.aspx");
                    objXMLTW.WriteEndElement();

                    objXMLTW.WriteEndElement();
                    objXMLTW.WriteEndDocument();
                }

                //Close the siteMapNode        
                //objXMLTW.WriteEndElement();//Close the first siteMapNode
                //objXMLTW.WriteEndDocument();//xml document closed
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                objXMLTW.Flush();
                objXMLTW.Close();
                CDDatos.LimpiarOracleCommand(ref Cmd);
            }
        }
        protected void ChildMaster(XmlTextWriter objXMLTW, Menus mnu, Int32 Id)
        {
            ExeProcedimiento CDDatos = new ExeProcedimiento();
            OracleCommand Cmd = null;
            try
            {
                OracleDataReader reader = null;
                string[] Parametros = { "p_usuario", "p_grupo" };
                object[] Valores = { mnu.UsuarioNombre, mnu.Grupo };
                Cmd = CDDatos.GenerarOracleCommandCursor("Pkg_Contratos.Obt_Sistemas", ref reader, Parametros, Valores);
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        int ChildMasterID = Convert.ToInt32(reader["id"].ToString());
                        if (Convert.ToInt32(reader["id_padre"].ToString()) == Id)
                        {
                            objXMLTW.WriteStartElement("siteMapNode");
                            objXMLTW.WriteAttributeString("title", reader["descripcion"].ToString());
                            objXMLTW.WriteAttributeString("description", reader["descripcion"].ToString());
                            if (reader["clave"].ToString().Contains(".aspx"))
                                objXMLTW.WriteAttributeString("url", reader["clave"].ToString());
                            else
                                objXMLTW.WriteAttributeString("url", "Default.aspx?cve=" + reader["id"].ToString());

                            //if (reader["clave"].ToString().Contains("Monitor"))
                            //    objXMLTW.WriteAttributeString("url", reader["clave"].ToString()+"?mnt=001");

                            //ddMenuItem(mnuNewMenuItem, ref mnu);
                            ChildMaster(objXMLTW, mnu, ChildMasterID);
                            objXMLTW.WriteEndElement();
                        }
                    }
                    reader.Close();
                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                CDDatos.LimpiarOracleCommand(ref Cmd);
            }
        }



        // GET: Usuarios/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Usuarios/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Usuarios/Create
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

        // GET: Usuarios/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Usuarios/Edit/5
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

        // GET: Usuarios/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Usuarios/Delete/5
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
