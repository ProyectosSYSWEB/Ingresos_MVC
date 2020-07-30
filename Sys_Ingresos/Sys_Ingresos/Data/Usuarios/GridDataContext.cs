using Oracle.ManagedDataAccess.Client;
using Sys_Ingresos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sys_Ingresos.Data.Usuarios
{
    public class GridDataContext
    {
        public static List<GRL_USUARIOS> ObtenerUsuarios(int Sistema)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento("INGRESOS");

            try
            {
                string[] Parametros = { "P_Sistema" };
                object[] Valores = { 14 };
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_ADMINISTRACION.Obt_Grid_Usuarios_por_Sistema", ref dr, Parametros, Valores);
                List<GRL_USUARIOS> listarUsuarios = new List<GRL_USUARIOS>();

                while (dr.Read())
                {
                    GRL_USUARIOS objUsuarios = new GRL_USUARIOS();

                    objUsuarios.USUARIO = Convert.ToString(dr[0]);
                    objUsuarios.NOMBRE = Convert.ToString(dr[2]);
                    objUsuarios.PASSWORD = Convert.ToString(dr[1]);
                    objUsuarios.TELEFONOS = Convert.ToString(dr[9]);
                    objUsuarios.CORREO = Convert.ToString(dr[11]);
                    listarUsuarios.Add(objUsuarios);
                }               

                return listarUsuarios;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }

        }
        public static List<GRL_USUARIOS> ObtenerUsuariosAdmin()
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento("INGRESOS");

            try
            {
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PAGOS_2016.Obt_Grid_Usuarios_Admin", ref dr);
                List<GRL_USUARIOS> listarUsuarios = new List<GRL_USUARIOS>();

                while (dr.Read())
                {
                    GRL_USUARIOS objUsuarios = new GRL_USUARIOS();

                    objUsuarios.USUARIO = Convert.ToString(dr[0]);
                    objUsuarios.NOMBRE = Convert.ToString(dr[2]);
                    objUsuarios.PASSWORD = Convert.ToString(dr[1]);
                    objUsuarios.TELEFONOS = Convert.ToString(dr[9]);
                    objUsuarios.CORREO = Convert.ToString(dr[11]);
                    listarUsuarios.Add(objUsuarios);
                }

                return listarUsuarios;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }

        }
        public static List<PRES_UR> ObtenerDepenDisp(string Usuario)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento("INGRESOS");

            try
            {
                string[] Parametros = { "p_usuario", "p_id_sistema" };
                object[] Valores = { Usuario, 14 };
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_ADMINISTRACION.Obt_Grid_Urs_por_Sistema_Disp", ref dr, Parametros, Valores);
                List<PRES_UR> listarDepenDisp = new List<PRES_UR>();

                while (dr.Read())
                {
                    PRES_UR objDepDisp = new PRES_UR();
                    objDepDisp.ID_UR = Convert.ToString(dr[0]);
                    objDepDisp.DESCRIPCION = Convert.ToString(dr[1]);
                    objDepDisp.ID = Convert.ToInt32(dr[2]);
                    listarDepenDisp.Add(objDepDisp);

                }

                return listarDepenDisp;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }

        }
        public static List<PRES_UR> ObtenerDepenAsig(string Usuario)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento("INGRESOS");

            try
            {
                string[] Parametros = { "p_usuario", "p_id_sistema" };
                object[] Valores = { Usuario, 14 };
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_ADMINISTRACION.Obt_Grid_Urs_por_Sistema_Asig", ref dr, Parametros, Valores);
                List<PRES_UR> listarDepenDisp = new List<PRES_UR>();

                while (dr.Read())
                {
                    PRES_UR objDepDisp = new PRES_UR();
                    objDepDisp.ID_UR = Convert.ToString(dr[0]);
                    objDepDisp.DESCRIPCION = Convert.ToString(dr[1]);
                    objDepDisp.ID = Convert.ToInt32(dr[2]);
                    listarDepenDisp.Add(objDepDisp);

                }

                return listarDepenDisp;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }

        }

        public static List<GRL_SISTEMAS> ObtenerMnuUsuario(string Usuario)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento("INGRESOS");

            try
            {
                string[] Parametros = { "p_id_sistema", "p_usuario" };
                object[] Valores = { 14, Usuario };
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PAGOS_2016.Obt_Tree_Sistemas", ref dr, Parametros, Valores);
                List<GRL_SISTEMAS> listarMenu = new List<GRL_SISTEMAS>();

                while (dr.Read())
                {
                    GRL_SISTEMAS objOpciones = new GRL_SISTEMAS();
                    objOpciones.DESCRIPCION = Convert.ToString(dr[1]);
                    objOpciones.NIVEL = Convert.ToInt32(dr[0]);
                    objOpciones.ID = Convert.ToInt16(dr[4]);
                    objOpciones.ASIGNADO = Convert.ToString(dr[6]);
                    //objOpciones.IMG2 = (Convert.ToInt32(dr[5]) == 3 || Convert.ToInt32(dr[5]) == 4) ? "../Images/nivel3.png" : "";
                    //objOpciones.IMG = (Convert.ToInt32(dr[5]) == 0) ? "../Images/folder.png" : "../Images/file.png";
                    listarMenu.Add(objOpciones);

                    //GRL_SISTEMAS objOpciones = new GRL_SISTEMAS();
                    //objOpciones.DESCRIPCION = Convert.ToString(dr[1]);
                    //objOpciones.NIVEL = Convert.ToInt32(dr[5]);
                    //objOpciones.IMG2 = (Convert.ToInt32(dr[5]) == 3 || Convert.ToInt32(dr[5]) == 4) ? "../Images/nivel3.png" : "";
                    //objOpciones.IMG=(Convert.ToInt32(dr[5])==0)?"../Images/folder.png":"../Images/file.png";
                    //listarMenu.Add(objOpciones);

                }

                return listarMenu;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }

        }


    }
}