using Oracle.ManagedDataAccess.Client;
using Sys_Ingresos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sys_Ingresos.Data.Facturas
{
    public class CursorDataContext
    {
        public static List<FEL_FACTURA> ObtenerReferencias(string Fecha_Dispersado)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento("CONEXION_RECIBOS");

            try
            {
                string[] Parametros = { "p_fecha_dispersado" };
                object[] Valores = { Fecha_Dispersado };
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_FELECTRONICA_2016.Obt_Grid_Dispersado", ref dr, Parametros, Valores);
                List<FEL_FACTURA> listarComun = new List<FEL_FACTURA>();
                while (dr.Read())
                {
                    FEL_FACTURA objCuotas = new FEL_FACTURA();
                    objCuotas.ID = Convert.ToInt32(dr[0]);
                    objCuotas.FECHA_FACTURA = Convert.ToString(dr[1]);
                    objCuotas.FECHA_DISPERSADO = Convert.ToString(dr[2]);
                    objCuotas.DEPENDENCIA = Convert.ToString(dr[3]);
                    objCuotas.RECEPTOR_NOMBRE = Convert.ToString(dr[4]);
                    objCuotas.BANCO = Convert.ToString(dr[5]);
                    objCuotas.IMPORTE = Convert.ToDouble(dr[6]);
                    objCuotas.REFERENCIA = Convert.ToString(dr[7]);
                    listarComun.Add(objCuotas);
                }
                return listarComun;

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