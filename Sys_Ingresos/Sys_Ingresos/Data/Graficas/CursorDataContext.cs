using Oracle.ManagedDataAccess.Client;
using Sys_Ingresos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sys_Ingresos.Data.Graficas
{
    public class CursorDataContext
    {
        public static List<GRAFICAS> ObtenerDatosInscripciones()
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                //string[] Parametros = { "P_Referencia" };
                //object[] Valores = { Referencia };

                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("pkg_configuracion.Obt_Grid_Referencias_SIAE", ref dr);
                List<GRAFICAS> list = new List<GRAFICAS>();
                while (dr.Read())
                {
                    GRAFICAS objGrafica = new GRAFICAS();
                    objGrafica.DATO1 = Convert.ToString(dr[1]);
                    objGrafica.DATO2 = Convert.ToString(dr[2]);
                    list.Add(objGrafica);
                }
                return list;

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

        public static List<GRAFICAS> ObtenerDatosGraficaPagados(string Dependencia, string Ciclo_Escolar, string Tipo)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento("CONEXION_INGRESOS");

            try
            {
                string[] Parametros = { "P_Dependencia", "P_Ciclo_Escolar", "P_Tipo" };
                object[] Valores = { Dependencia, Ciclo_Escolar, Tipo };

                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PAGOS_2016.Obt_Grafica_Pagados", ref dr, Parametros, Valores);
                List<GRAFICAS> list = new List<GRAFICAS>();
                while (dr.Read())
                {
                    GRAFICAS objGrafica = new GRAFICAS();
                    objGrafica.DATO1 = Convert.ToString(dr[0]);
                    objGrafica.DATO2 = Convert.ToString(dr[1]);
                    objGrafica.DATO3 = Convert.ToString(dr[2]);
                    list.Add(objGrafica);
                }
                return list;

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