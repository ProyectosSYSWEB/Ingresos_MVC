using Oracle.ManagedDataAccess.Client;
using Sys_Ingresos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sys_Ingresos.Data.Cuotas
{
    public class ObtenerDataContext
    {
        public static List<SCE_CUOTAS_POSGRADO_DATOS> ObtenerDatosCuotas(int IdCuota, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            List<SCE_CUOTAS_POSGRADO_DATOS> list = new List<SCE_CUOTAS_POSGRADO_DATOS>();
            SCE_CUOTAS_POSGRADO_DATOS objCuotas = new SCE_CUOTAS_POSGRADO_DATOS();
            try
            {

                OracleDataReader dr = null;
                string[] Parametros = { "P_ID" };
                object[] Valores = { IdCuota };
                string[] ParametrosOut = { "P_NO_PAGO", "P_NIVEL", "P_SEMESTRE", "P_CONCEPTO_DESC", "P_CUOTA", "P_CUOTA_PAQUETE", "P_NO_PAQUETE", "P_FECHA_LIMITE", "P_VALOR", "P_CONCEPTO", "P_GENERACION", "P_TIPO_PROG", "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("OBT_CUOTAS_POSGRADO", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
                objCuotas.NO_PAGO = Convert.ToInt32(cmd.Parameters["P_NO_PAGO"].Value.ToString());
                objCuotas.NIVEL = Convert.ToString(cmd.Parameters["P_NIVEL"].Value);
                objCuotas.SEMESTRE = Convert.ToString(cmd.Parameters["P_SEMESTRE"].Value);
                objCuotas.TIPO = Convert.ToString(cmd.Parameters["P_CONCEPTO_DESC"].Value);
                objCuotas.CUOTA = Convert.ToDouble(cmd.Parameters["P_CUOTA"].Value.ToString());
                objCuotas.CUOTA_PAQUETE = Convert.ToDouble(cmd.Parameters["P_CUOTA_PAQUETE"].Value.ToString());
                objCuotas.NO_PAQUETE = Convert.ToInt32(cmd.Parameters["P_NO_PAQUETE"].Value.ToString());
                objCuotas.FECHA_LIMITE = Convert.ToString(cmd.Parameters["P_FECHA_LIMITE"].Value);
                objCuotas.VALOR = Convert.ToInt32(cmd.Parameters["P_VALOR"].Value.ToString());
                objCuotas.CONCEPTO = Convert.ToString(cmd.Parameters["P_CONCEPTO"].Value);
                objCuotas.GENERACION = Convert.ToString(cmd.Parameters["P_GENERACION"].Value);
                objCuotas.TIPO_PROGRAMA = Convert.ToString(cmd.Parameters["P_TIPO_PROG"].Value);
                list.Add(objCuotas);

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
        public static List<SCE_CUOTAS_SABATINOS> ObtenerDatosCuotaLenguas(int IdCuota, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            List<SCE_CUOTAS_SABATINOS> list = new List<SCE_CUOTAS_SABATINOS>();
            SCE_CUOTAS_SABATINOS objCuotas = new SCE_CUOTAS_SABATINOS();
            try
            {

                OracleDataReader dr = null;
                string[] Parametros = { "P_ID" };
                object[] Valores = { IdCuota };
                string[] ParametrosOut = { "P_NIVEL", "P_STATUS", "P_IMPORTE_INGLES", "P_IMPORTE_ITALIANO", "P_IMPORTE_FRANCES", "P_IMPORTE_ALEMAN", "P_IMPORTE_CHINO", "P_IMPORTE_TZOTZIL", "P_IMPORTE_TZENTAL", "P_IMPORTE_ESPANIOL", "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("OBT_CUOTAS_LENGUAS", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
                objCuotas.NIVEL = Convert.ToString(cmd.Parameters["P_NIVEL"].Value.ToString());
                objCuotas.STATUS = Convert.ToString(cmd.Parameters["P_STATUS"].Value.ToString());
                objCuotas.IMPORTE_INGLES = Convert.ToInt32(cmd.Parameters["P_IMPORTE_INGLES"].Value.ToString());
                objCuotas.IMPORTE_ITALIANO = Convert.ToInt32(cmd.Parameters["P_IMPORTE_ITALIANO"].Value.ToString());
                objCuotas.IMPORTE_FRANCES = Convert.ToInt32(cmd.Parameters["P_IMPORTE_FRANCES"].Value.ToString());
                objCuotas.IMPORTE_ALEMAN = Convert.ToInt32(cmd.Parameters["P_IMPORTE_ALEMAN"].Value.ToString());
                objCuotas.IMPORTE_CHINO = Convert.ToInt32(cmd.Parameters["P_IMPORTE_CHINO"].Value.ToString());
                objCuotas.IMPORTE_TZOTZIL = Convert.ToInt32(cmd.Parameters["P_IMPORTE_TZOTZIL"].Value.ToString());
                objCuotas.IMPORTE_TZENTAL = Convert.ToInt32(cmd.Parameters["P_IMPORTE_TZENTAL"].Value.ToString());
                objCuotas.IMPORTE_ESPANIOL = Convert.ToInt32(cmd.Parameters["P_IMPORTE_ESPANIOL"].Value.ToString());
                list.Add(objCuotas);

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

        public static List<GRL_USUARIOS> ObtenerUsuario(string WXI, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento("INGRESOS");
            List<GRL_USUARIOS> list = new List<GRL_USUARIOS>();
            GRL_USUARIOS objUsuario = new GRL_USUARIOS();
            try
            {

                OracleDataReader dr = null;
                string[] Parametros = { "P_WXI" };
                object[] Valores = { WXI };
                string[] ParametrosOut = { "P_USUARIO", "P_TIPO", "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("OBT_USUARIO_ENCRIPTA_Y_TIPO", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
                objUsuario.USUARIO = Convert.ToString(cmd.Parameters["P_USUARIO"].Value);
                objUsuario.TIPO = Convert.ToString(cmd.Parameters["P_TIPO"].Value);
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
        public static List<SCE_CUOTAS_POSGRADO_DATOS> ObtenerAdjunto(SCE_CUOTAS_POSGRADO_DATOS objCuotasAdj, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            List<SCE_CUOTAS_POSGRADO_DATOS> list = new List<SCE_CUOTAS_POSGRADO_DATOS>();
            SCE_CUOTAS_POSGRADO_DATOS objCuotas = new SCE_CUOTAS_POSGRADO_DATOS();
            try
            {

                OracleDataReader dr = null;
                string[] Parametros = { "P_ESCUELA", "P_CARRERA", "P_GENERACION" };
                object[] Valores = { objCuotasAdj.ESCUELA, objCuotasAdj.CARRERA, objCuotasAdj.GENERACION };
                string[] ParametrosOut = { "P_NUM_OFICIO", "P_FECHA_OFICIO", "P_RUTA", "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("OBT_RUTA_ADJUNTO_POSGRADO", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
                objCuotas.NUM_OFICIO = Convert.ToString(cmd.Parameters["P_NUM_OFICIO"].Value);
                objCuotas.FECHA_OFICIO = Convert.ToString(cmd.Parameters["P_FECHA_OFICIO"].Value);
                objCuotas.RUTA_ADJUNTO = Convert.ToString(cmd.Parameters["P_RUTA"].Value);
                list.Add(objCuotas);



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

    }
}