using Oracle.ManagedDataAccess.Client;
using Sys_Ingresos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sys_Ingresos.Data.Cuotas
{
    public class GuardarDataContext
    {
        public static List<SCE_CUOTAS_POSGRADO_DATOS> InsertarCuota(SCE_CUOTAS_POSGRADO_DATOS objCuotasNew, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            List<SCE_CUOTAS_POSGRADO_DATOS> list = new List<SCE_CUOTAS_POSGRADO_DATOS>();
            //SCE_CUOTAS_POSGRADO_DATOS objCuotasNew = new SCE_CUOTAS_POSGRADO_DATOS();
            //bool registroAgregado = false;
            try
            {

                OracleDataReader dr = null;
                string[] Parametros = { "P_DEPENDENCIA", "P_CARRERA", "P_CICLO", "P_NUM_PAGO", "P_NIVEL", "P_SEMESTRE", "P_CONCEPTO", "P_DESC_CONCEPTO",
                    "P_CUOTA", "P_CUOTA_PAQUETE", "P_NO_PAQUETE", "P_FECHA_LIMITE", "P_VALOR", "P_DIAS", "P_TIPO_PROGRAMA" };
                object[] Valores = { objCuotasNew.ESCUELA, objCuotasNew.CARRERA, objCuotasNew.GENERACION, objCuotasNew.NO_PAGO, objCuotasNew.NIVEL, objCuotasNew.SEMESTRE, objCuotasNew.CONCEPTO, objCuotasNew.CONCEPTO_DESCRIPCION,
                    objCuotasNew.CUOTA, objCuotasNew.CUOTA_PAQUETE, objCuotasNew.NO_PAQUETE, objCuotasNew.FECHA_LIMITE, objCuotasNew.VALOR, objCuotasNew.DIAS, objCuotasNew.TIPO_PROGRAMA};
                string[] ParametrosOut = { "P_Bandera" };
                cmd = exeProc.GenerarOracleCommand("INS_CUOTAS_POSGRADO", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);

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
        public static List<SCE_CUOTAS_POSGRADO_DATOS> ModificarCuota(SCE_CUOTAS_POSGRADO_DATOS objCuotasNew, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            List<SCE_CUOTAS_POSGRADO_DATOS> list = new List<SCE_CUOTAS_POSGRADO_DATOS>();
            try
            {

                OracleDataReader dr = null;
                string[] Parametros = { "P_ID", "P_NUM_PAGO", "P_NIVEL", "P_SEMESTRE", "P_CONCEPTO", "P_DESC_CONCEPTO",
                    "P_CUOTA", "P_CUOTA_PAQUETE", "P_NO_PAQUETE", "P_FECHA_LIMITE", "P_VALOR", "P_DIAS", "P_TIPO_PROGRAMA" };
                object[] Valores = {objCuotasNew.ID, objCuotasNew.NO_PAGO, objCuotasNew.NIVEL, objCuotasNew.SEMESTRE, objCuotasNew.CONCEPTO, objCuotasNew.CONCEPTO_DESCRIPCION,
                    objCuotasNew.CUOTA, objCuotasNew.CUOTA_PAQUETE, objCuotasNew.NO_PAQUETE, objCuotasNew.FECHA_LIMITE, objCuotasNew.VALOR, objCuotasNew.DIAS, objCuotasNew.TIPO_PROGRAMA};
                string[] ParametrosOut = { "P_Bandera" };
                cmd = exeProc.GenerarOracleCommand("UPD_CUOTAS_POSGRADO", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);

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
        public static List<SCE_CUOTAS_POSGRADO_DATOS> EliminarCuota(SCE_CUOTAS_POSGRADO_DATOS objCuotasNew, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            List<SCE_CUOTAS_POSGRADO_DATOS> list = new List<SCE_CUOTAS_POSGRADO_DATOS>();
            try
            {

                OracleDataReader dr = null;
                string[] Parametros = { "P_ID" };
                object[] Valores = {objCuotasNew.ID };
                string[] ParametrosOut = { "P_Bandera" };
                cmd = exeProc.GenerarOracleCommand("DEL_CUOTAS_POSGRADO", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);

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
        public static void EliminarCuotasSel(string Generacion, List<SCE_CUOTAS_POSGRADO_DATOS> lstCuotas, ref string Verificador)
        {

            var orderCuotas = from c in lstCuotas
                              orderby c.NO_PAGO descending
                              select c;

            lstCuotas = orderCuotas.ToList<SCE_CUOTAS_POSGRADO_DATOS>();

            for (int i = 0; i < lstCuotas.Count; i++)
            {
                OracleCommand cmd = null;
                ExeProcedimiento exeProc = new ExeProcedimiento();
                try
                {

                    OracleDataReader dr = null;

                    string[] Parametros = { "P_GENERACION", "P_ID" };
                    object[] Valores = { Generacion, lstCuotas[i].ID };
                    string[] ParametrosOut = { "P_Bandera" };
                    cmd = exeProc.GenerarOracleCommand("DEL_CUOTAS_POSGRADO_GEN", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);

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
            //return list;
            //return registroAgregado;
        }
        public static void EliminarCuotasSel2(List<SCE_CUOTAS_POSGRADO_DATOS> lstCuotasSel, string Ciclo, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            List<SCE_CUOTAS_POSGRADO_DATOS> list = new List<SCE_CUOTAS_POSGRADO_DATOS>();
            for (int i = 0; i < lstCuotasSel.Count; i++)
            {
                try
                {

                    OracleDataReader dr = null;
                    string[] Parametros = { "P_ID" };
                    object[] Valores = { lstCuotasSel[i].ID, Ciclo };
                    string[] ParametrosOut = { "P_Bandera" };
                    cmd = exeProc.GenerarOracleCommand("DEL_CUOTAS_POSGRADO", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);

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
        public static List<SCE_CUOTAS_POSGRADO_DATOS> AgregarAdjunto(SCE_CUOTAS_POSGRADO_DATOS objCuotasAdj, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            List<SCE_CUOTAS_POSGRADO_DATOS> list = new List<SCE_CUOTAS_POSGRADO_DATOS>();
            try
            {

                OracleDataReader dr = null;
                string[] Parametros = { "P_ESCUELA", "P_CARRERA", "P_GENERACION", "P_NUM_OFICIO", "P_FECHA_OFICIO", "P_RUTA_ADJUNTO" };
                object[] Valores = { objCuotasAdj.ESCUELA, objCuotasAdj.CARRERA, objCuotasAdj.GENERACION, objCuotasAdj.NUM_OFICIO, objCuotasAdj.FECHA_OFICIO, objCuotasAdj.RUTA_ADJUNTO };
                string[] ParametrosOut = { "P_Bandera" };
                cmd = exeProc.GenerarOracleCommand("INS_CUOTAS_POSGRADO_SOLICITUD", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);

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
        public static List<SCE_CUOTAS_SABATINOS> ModificarCuotasSabatinosLenguas(SCE_CUOTAS_SABATINOS objCuotas, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            List<SCE_CUOTAS_SABATINOS> list = new List<SCE_CUOTAS_SABATINOS>();
            try
            {

                OracleDataReader dr = null;
                string[] Parametros = { "P_ID", "P_NIVEL", "P_STATUS", "P_IMPORTE_INGLES", "P_IMPORTE_ITALIANO", "P_IMPORTE_FRANCES", "P_IMPORTE_ALEMAN", "P_IMPORTE_CHINO",
                    "P_IMPORTE_TZOTZIL", "P_IMPORTE_TZENTAL", "P_IMPORTE_ESPANIOL" };
                object[] Valores = {objCuotas.ID, objCuotas.NIVEL, objCuotas.STATUS, objCuotas.IMPORTE_INGLES, objCuotas.IMPORTE_ITALIANO, objCuotas.IMPORTE_FRANCES,
                objCuotas.IMPORTE_ALEMAN, objCuotas.IMPORTE_CHINO, objCuotas.IMPORTE_TZOTZIL, objCuotas.IMPORTE_TZENTAL, objCuotas.IMPORTE_ESPANIOL};
                string[] ParametrosOut = { "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("UPD_CUOTA_LENGUAS", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);

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
        public static List<SCE_CUOTAS_SABATINOS> AgregarCuotasSabatinosLenguas(SCE_CUOTAS_SABATINOS objCuotas, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            List<SCE_CUOTAS_SABATINOS> list = new List<SCE_CUOTAS_SABATINOS>();
            try
            {

                OracleDataReader dr = null;
                string[] Parametros = { "P_DEPENDENCIA", "P_TIPO", "P_NIVEL", "P_STATUS", "P_IMPORTE_INGLES", "P_IMPORTE_ITALIANO", "P_IMPORTE_FRANCES", "P_IMPORTE_ALEMAN", "P_IMPORTE_CHINO",
                    "P_IMPORTE_TZOTZIL", "P_IMPORTE_TZENTAL", "P_IMPORTE_ESPANIOL" };
                object[] Valores = {objCuotas.ESCUELA, objCuotas.TIPO, objCuotas.NIVEL, objCuotas.STATUS, objCuotas.IMPORTE_INGLES, objCuotas.IMPORTE_ITALIANO, objCuotas.IMPORTE_FRANCES,
                objCuotas.IMPORTE_ALEMAN, objCuotas.IMPORTE_CHINO, objCuotas.IMPORTE_TZOTZIL, objCuotas.IMPORTE_TZENTAL, objCuotas.IMPORTE_ESPANIOL};
                string[] ParametrosOut = { "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("INS_CUOTA_LENGUAS", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);

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
        public static List<SCE_CUOTAS_SABATINOS> EliminarCuotaLenguas(SCE_CUOTAS_SABATINOS objCuotas, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            List<SCE_CUOTAS_SABATINOS> list = new List<SCE_CUOTAS_SABATINOS>();
            try
            {

                OracleDataReader dr = null;
                string[] Parametros = { "P_ID" };
                object[] Valores = {objCuotas.ID};
                string[] ParametrosOut = { "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("DEL_CUOTA_LENGUAS", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);

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
        public static List<FEL_FACTURA> AgregarPagoSIAE(FEL_FACTURA objDatosSYSWEB, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            List<FEL_FACTURA> list = new List<FEL_FACTURA>();
            try
            {

                OracleDataReader dr = null;
                string[] Parametros = { "P_MATRICULA", "P_CICLO", "P_SEMESTRE", "P_TIPO", "P_REFERENCIA", "P_USUARIO" };
                object[] Valores = { objDatosSYSWEB.MATRICULA, objDatosSYSWEB.CICLO, objDatosSYSWEB.SEMESTRE, objDatosSYSWEB.TIPO, objDatosSYSWEB.REFERENCIA, objDatosSYSWEB.USUARIO };
                string[] ParametrosOut = { "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("ins_pagos_sysweb_siae", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);

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


        #region <Referencias Generadas en SYSWEB>
        public static List<SCE_REFERENCIAS> Obt_Referencia_SYSWEB(SCE_REFERENCIAS objReferencia, string Usuario, ref string Verificador)
        {
            OracleCommand Cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            List<SCE_REFERENCIAS> list = new List<SCE_REFERENCIAS>();
            try
            {
                OracleDataReader dr = null;
                string[] Parametros = { "p_Matricula", "p_Escuela", "p_Semestre", "p_Ciclo_Escolar", "p_Movimiento", "p_DiasVigencia",
                "p_nombre","p_muni_sede","p_id_carrera", "p_extemporaneo", "p_usuario"};
                object[] Valores = { objReferencia.MATRICULA, objReferencia.DEPENDENCIA, objReferencia.SEMESTRE, objReferencia.CICLO_ACTUAL,
                    objReferencia.MOVIMIENTO, objReferencia.DIAS_VIGENCIA, objReferencia.NOMBRE, objReferencia.MUNICIPIO_SEDE, objReferencia.ID_CARRERA, objReferencia.ES_EXTEMPORANEO, Usuario
                };
                string[] ParametrosOut = { "p_Importe", "p_Vigencia", "p_descripcion", "p_Referencia", "p_id_referencia", "P_Bandera" };
                Cmd = exeProc.GenerarOracleCommand("OBT_REFERENCIA_SYSWEB", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
                objReferencia.TOTAL = Convert.ToDouble(Cmd.Parameters["p_Importe"].Value.ToString());
                objReferencia.FECHA_LIMITE = Convert.ToString(Cmd.Parameters["p_Vigencia"].Value);
                objReferencia.NOTAS = Convert.ToString(Cmd.Parameters["p_descripcion"].Value);
                objReferencia.REFERENCIA = Convert.ToString(Cmd.Parameters["p_Referencia"].Value);
                string valor=Convert.ToString(Cmd.Parameters["p_id_referencia"].Value);
                if (valor == "null")
                    Verificador = Convert.ToString(Cmd.Parameters["P_Bandera"].Value);  //"Ya fue confirmado el pago de esta referencia " + objReferencia.REFERENCIA+", favor de verificar.";
                else
                    objReferencia.ID = Convert.ToInt32(Cmd.Parameters["p_id_referencia"].Value.ToString());
                list.Add(objReferencia);
            }
            catch (Exception ex)
            {
                Verificador = ex.Message;
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref Cmd);
            }
            return list;
            //return registroAgregado;
        }

        #endregion

    }
}