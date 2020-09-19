using Oracle.ManagedDataAccess.Client;
using Sys_Ingresos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sys_Ingresos.Data.Facturas
{
    public class DataContext
    {
        public static void ModificarDispersado(FEL_FACTURA objFactura, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            try
            {

                OracleDataReader dr = null;
                string[] Parametros = { "P_FECHA_ANTERIOR", "P_FECHA_NUEVA" };
                object[] Valores = {objFactura.FECHA_DISPERSADO, objFactura.FECHA_DISPERSADO_NEW};
                string[] ParametrosOut = { "P_Bandera" };
                cmd = exeProc.GenerarOracleCommand("UPD_DISPERSADO_FECHA", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);

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

    }
}