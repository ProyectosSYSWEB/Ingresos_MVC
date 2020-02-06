using Oracle.ManagedDataAccess.Client;
using Sys_Ingresos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sys_Ingresos.Data.Usuarios
{
    public class ObtenerDataContext
    {
        public static List<GRL_USUARIOS> ObtenerDatosUsuario(string Usuario, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento("INGRESOS");
            List<GRL_USUARIOS> list = new List<GRL_USUARIOS>();
            GRL_USUARIOS objUsuario = new GRL_USUARIOS();
            try
            {

                OracleDataReader dr = null;
                string[] ParametrosIn = { "P_USUARIO" };
                object[] Valores = { Usuario };
                string[] ParametrosOut = { "P_NOMBRE", "P_PASSWORD", "P_CORREO", "P_TELEFONOS", "P_DEPENDENCIA", "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("OBT_USUARIO", ref Verificador, ref dr, ParametrosIn, Valores, ParametrosOut);
                objUsuario.USUARIO = Usuario;
                objUsuario.NOMBRE = Convert.ToString(cmd.Parameters["P_NOMBRE"].Value);
                objUsuario.PASSWORD = Convert.ToString(cmd.Parameters["P_PASSWORD"].Value);
                objUsuario.CORREO = Convert.ToString(cmd.Parameters["P_CORREO"].Value);
                objUsuario.TELEFONOS = Convert.ToString(cmd.Parameters["P_TELEFONOS"].Value);
                objUsuario.DIRECCION_DEPE = Convert.ToString(cmd.Parameters["P_DEPENDENCIA"].Value);
                list.Add(objUsuario);

            }
            catch (Exception ex)
            {
                Verificador = ex.Message;
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }
            return list;
            //return registroAgregado;
        }
        public static void EliminarDepUsu(string Usuario, string Dependencia, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento("INGRESOS");
            List<GRL_USUARIOS> list = new List<GRL_USUARIOS>();
            GRL_USUARIOS objUsuario = new GRL_USUARIOS();
            try
            {

                OracleDataReader dr = null;
                string[] ParametrosIn = { "P_USUARIO", "P_ID_UR" };
                object[] Valores = { Usuario, Dependencia };
                string[] ParametrosOut = { "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("DEL_USUARIOS_URS", ref Verificador, ref dr, ParametrosIn, Valores, ParametrosOut);

            }
            catch (Exception ex)
            {
                Verificador = ex.Message;
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }
            //return registroAgregado;
        }
        public static void AsignarDepen(string Usuario, string Dependencia, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento("INGRESOS");
            List<GRL_USUARIOS> list = new List<GRL_USUARIOS>();
            GRL_USUARIOS objUsuario = new GRL_USUARIOS();
            try
            {

                OracleDataReader dr = null;
                string[] ParametrosIn = { "p_usuario", "p_id_ur" };
                object[] Valores = { Usuario, Dependencia };
                string[] ParametrosOut = { "p_bandera" };
                cmd = exeProc.GenerarOracleCommand("SIGA09.INS_USUARIOS_URS", ref Verificador, ref dr, ParametrosIn, Valores, ParametrosOut);

            }
            catch (Exception ex)
            {
                Verificador = ex.Message;
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }
            //return registroAgregado;
        }

        public static void EliminarDatosMenu(string Usuario, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento("INGRESOS");
            List<GRL_USUARIOS> list = new List<GRL_USUARIOS>();
            GRL_USUARIOS objUsuario = new GRL_USUARIOS();
            try
            {

                OracleDataReader dr = null;
                string[] ParametrosIn = { "P_USUARIO", "p_Id_Sistema" };
                object[] Valores = { Usuario, 14 };
                string[] ParametrosOut = { "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("SIGA09.DEL_ACCESOS_MENU", ref Verificador, ref dr, ParametrosIn, Valores, ParametrosOut);

            }
            catch (Exception ex)
            {
                Verificador = ex.Message;
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }
            //return registroAgregado;
        }

        public static void InsOpcionesMenu(string Usuario, int Opcion, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento("INGRESOS");
            List<GRL_USUARIOS> list = new List<GRL_USUARIOS>();
            GRL_USUARIOS objUsuario = new GRL_USUARIOS();
            try
            {
                OracleDataReader dr = null;
                string[] ParametrosIn = { "p_usuario", "p_Id_Sistema", "p_Id_Opcion" };
                object[] Valores = { Usuario, 14, Opcion };
                string[] ParametrosOut = { "p_bandera" };
                cmd = exeProc.GenerarOracleCommand("SIGA09.INS_ACCESOS", ref Verificador, ref dr, ParametrosIn, Valores, ParametrosOut);
               }            
            catch (Exception ex)
            {
                Verificador = ex.Message;
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }
            //return registroAgregado;
        }

    }
}