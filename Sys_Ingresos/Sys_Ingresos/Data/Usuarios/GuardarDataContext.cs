using Oracle.ManagedDataAccess.Client;
using Sys_Ingresos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sys_Ingresos.Data.Usuarios
{
    public class GuardarDataContext
    {
        public static void GuardarUsuario(GRL_USUARIOS objUsuario, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento("CONEXION_INGRESOS");            
            //bool registroAgregado = false;
            try
            {
                OracleDataReader dr = null;
                string[] Parametros = {"P_USUARIO", "P_NOMBRE", "P_PASSWORD", "P_CORREO", "P_TELEFONOS", "P_DEPENDENCIA", "P_STATUS", "P_ID_SISTEMA" };
                object[] Valores = { objUsuario.USUARIO, objUsuario.NOMBRE, objUsuario.PASSWORD, objUsuario.CORREO, objUsuario.TELEFONOS, objUsuario.DIRECCION_DEPE, objUsuario.STATUS, "14" };
                string[] ParametrosOut = { "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("SIGA09.INS_USUARIOS_MNU", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
                
                //list.Add(objCorresp);
                //registroAgregado = true;

            }
            catch (Exception ex)
            {
                Verificador = ex.Message;
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }
            //return list;
            //return registroAgregado;
        }

        public static void GuardarGrupoUsuario(string Usuario,  string Grupo, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento("CONEXION_INGRESOS");
            //bool registroAgregado = false;
            try
            {
                OracleDataReader dr = null;
                string[] Parametros = { "P_USUARIO", "P_SISTEMA", "P_ID_GRUPO"};
                object[] Valores = { Usuario, "14", Grupo };
                string[] ParametrosOut = { "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("SIGA09.INS_GRUPO_USUARIO", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);

                //list.Add(objCorresp);
                //registroAgregado = true;

            }
            catch (Exception ex)
            {
                Verificador = ex.Message;
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }
            //return list;
            //return registroAgregado;
        }

        public static void EditarUsuario (GRL_USUARIOS objUsuario, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento("CONEXION_INGRESOS");
            try
            {
                OracleDataReader dr = null;
                string[] Parametros = { "P_USUARIO", "P_NOMBRE", "P_PASSWORD", "P_CORREO", "P_TELEFONOS", "P_DEPENDENCIA", "P_STATUS" };
                object[] Valores = { objUsuario.USUARIO,  objUsuario.NOMBRE, objUsuario.PASSWORD, objUsuario.CORREO, objUsuario.TELEFONOS, objUsuario.DIRECCION_DEPE, "A" };
                string[] ParametrosOut = { "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("SIGA09.UPD_USUARIOS_MNU", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);                
            }
            catch (Exception ex)
            {
                Verificador = ex.Message;
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }
        }
    }
}