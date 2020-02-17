using Oracle.ManagedDataAccess.Client;
using Sys_Ingresos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sys_Ingresos.Data.Cuotas
{
    public class GridDataContext
    {
        //public static List<SCE_CUOTAS_POSGRADO> ObtenerCuotasPosgrado(string Dependencia)
        //{
        //    OracleCommand cmd = null;
        //    ExeProcedimiento exeProc = new ExeProcedimiento();

        //    try
        //    {
        //        string[] Parametros = { "P_Dependencia" };
        //        object[] Valores = { Dependencia };
        //        OracleDataReader dr = null;                
        //        cmd = exeProc.GenerarOracleCommandCursor("PKG_POSGRADO.Obt_Grid_Cuotas", ref dr, Parametros, Valores);
        //        List<SCE_CUOTAS_POSGRADO> listarCuotas = new List<SCE_CUOTAS_POSGRADO>();
        //        while (dr.Read())
        //        {
        //            SCE_CUOTAS_POSGRADO objCuotas = new SCE_CUOTAS_POSGRADO();
        //            objCuotas.ID = Convert.ToInt32(dr[0]);
        //            objCuotas.ESCUELA = Convert.ToString(dr[1]);
        //            objCuotas.CARRERA = Convert.ToString(dr[2]);
        //            objCuotas.GENERACION = Convert.ToString(dr[3]);
        //            objCuotas.NO_PAGO = Convert.ToInt32(dr[4]);
        //            objCuotas.NIVEL = Convert.ToString(dr[6]);
        //            objCuotas.MATERIA = Convert.ToString(dr[7]);
        //            objCuotas.MATERIA_DESCRIPCION = Convert.ToString(dr[8]);
        //            objCuotas.SEMESTRE = Convert.ToString(dr[9]);
        //            objCuotas.CONCEPTO = Convert.ToString(dr[10]);
        //            objCuotas.CONCEPTO_DESCRIPCION = Convert.ToString(dr[11]);
        //            objCuotas.CUOTA_NORMAL = Convert.ToDouble(dr[12]);
        //            //objCuotas.CUOTA_PAQUETE = Convert.ToString(dr[12]);
        //            //objCuotas.NO_PAQUETE = Convert.ToString(dr[13]);
        //            //objCuotas.FECHA_LIMITE = Convert.ToString(dr[14]);
        //            //objCuotas.TIPO = Convert.ToString(dr[15]);
        //            //objCombo.DESCRIPCION = Convert.ToString(dr["Descripcion"]);
        //            listarCuotas.Add(objCuotas);
        //        }
        //        return listarCuotas;

        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(ex.Message);
        //    }
        //    finally
        //    {
        //        exeProc.LimpiarOracleCommand(ref cmd);
        //    }

        //}
        public static SCE_CUOTAS_POSGRADO ObtenerCuotasPosgrado(string Dependencia, string Carrera)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                string[] Parametros = { "P_Dependencia", "P_Carrera" };
                object[] Valores = { Dependencia, Carrera };
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_POSGRADO.Obt_Grid_Cuotas", ref dr, Parametros, Valores);
                List<SCE_CUOTAS_POSGRADO_GRUPO> listarCuotasGrupo = new List<SCE_CUOTAS_POSGRADO_GRUPO>();
                List<SCE_CUOTAS_POSGRADO_DATOS> listarCuotas = new List<SCE_CUOTAS_POSGRADO_DATOS>();
                
                SCE_CUOTAS_POSGRADO objCuotas = new SCE_CUOTAS_POSGRADO();
                //SCE_CUOTAS_POSGRADO_GRUPO objCuotasGrupo = new SCE_CUOTAS_POSGRADO_GRUPO();
                while (dr.Read())
                {
                    SCE_CUOTAS_POSGRADO_DATOS objCuotasDatos = new SCE_CUOTAS_POSGRADO_DATOS();

                    objCuotasDatos.ID = Convert.ToInt32(dr[0]);
                    objCuotasDatos.ESCUELA = Convert.ToString(dr[1]);
                    objCuotasDatos.CARRERA = Convert.ToString(dr[2]);
                    objCuotasDatos.DESC_GENERACION = Convert.ToString(dr[3]);
                    objCuotasDatos.GENERACION = Convert.ToString(dr[27]);
                    objCuotasDatos.NO_PAGO = Convert.ToInt32(dr[4]);
                    objCuotasDatos.NIVEL = Convert.ToString(dr[6]);
                    objCuotasDatos.MATERIA = Convert.ToString(dr[7]);
                    objCuotasDatos.MATERIA_DESCRIPCION = Convert.ToString(dr[8]);
                    objCuotasDatos.SEMESTRE = Convert.ToString(dr[9]);
                    objCuotasDatos.CONCEPTO = Convert.ToString(dr[10]);
                    objCuotasDatos.CONCEPTO_DESCRIPCION = Convert.ToString(dr[11]);
                    objCuotasDatos.CUOTA_NORMAL = Convert.ToDouble(dr[12]);
                    objCuotasDatos.CUOTA = Convert.ToDouble(dr[28]);
                    objCuotasDatos.VALOR = Convert.ToInt32(dr[22]);
                    objCuotasDatos.FECHA_LIMITE = Convert.ToString(dr[14]);
                    objCuotasDatos.NO_PAQUETE = Convert.ToInt32(dr[13]);
                    objCuotasDatos.RUTA_ADJUNTO = Convert.ToString(dr[29]);
                    objCuotasDatos.TIPO_PROGRAMA = Convert.ToString(dr[30]);
                    listarCuotas.Add(objCuotasDatos);
                }


                //var listGrupo = listarCuotas.GroupBy(x => x.GENERACION).Select(x=>x);
                var listGrupo = from cuotas in listarCuotas
                                where (cuotas.NO_PAGO == 1)
                                select cuotas;

                            
                foreach(SCE_CUOTAS_POSGRADO_DATOS cuotasGrupo in listGrupo)
                {
                    var list = from c in listarCuotas
                               where (c.GENERACION == cuotasGrupo.GENERACION)
                               select c;

                    objCuotas.GRUPO.Add(new SCE_CUOTAS_POSGRADO_GRUPO(cuotasGrupo.GENERACION, cuotasGrupo.DESC_GENERACION, cuotasGrupo.RUTA_ADJUNTO, list));


                }

                return objCuotas;
                //return listarCuotas;

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

        //public static List<SCE_CUOTAS_POSGRADO_GRUPO> GrupoGeneracion(List<SCE_CUOTAS_POSGRADO_DATOS> ListDatos, string Generacion)
        //{
        //    try
        //    {
        //        List<SCE_CUOTAS_POSGRADO_GRUPO> listarCuotas = new List<SCE_CUOTAS_POSGRADO_GRUPO>();
        //        var list = from c in ListDatos
        //                   where (c.GENERACION == Generacion)
        //                   select c;

        //        foreach(SCE_CUOTAS_POSGRADO_DATOS cuotas in list)
        //        {
        //            listarCuotas.Add(new SCE_CUOTAS_POSGRADO_GRUPO(cuotas.GENERACION, list));
        //        }
        //    }
        //    catch (Exception ex)
        //    {

        //    }
        //}

        public static List<ADQ_COMUN> ObtenerEscuelas(string Usuario)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                string[] Parametros = { "p_usuario" };
                object[] Valores = { Usuario };
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_POSGRADO.Obt_Combo_Escuelas", ref dr, Parametros, Valores);
                List<ADQ_COMUN> listarComun = new List<ADQ_COMUN>();
                while (dr.Read())
                {
                    ADQ_COMUN objComun = new ADQ_COMUN();
                    objComun.ID = Convert.ToString(dr[0]);
                    objComun.DESCRIPCION = Convert.ToString(dr[1]);
                    listarComun.Add(objComun);
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
        public static List<ADQ_COMUN> ObtenerEscuelasLenguas(string Usuario)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                string[] Parametros = { "p_usuario" };
                object[] Valores = { Usuario };
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_POSGRADO.Obt_Combo_Escuelas_Lenguas", ref dr, Parametros, Valores);
                List<ADQ_COMUN> listarComun = new List<ADQ_COMUN>();
                while (dr.Read())
                {
                    ADQ_COMUN objComun = new ADQ_COMUN();
                    objComun.ID = Convert.ToString(dr[0]);
                    objComun.DESCRIPCION = Convert.ToString(dr[1]);
                    listarComun.Add(objComun);
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

        public static List<SCE_CUOTAS_SABATINOS> ObtenerCuotasLenguasSabatinos(string Escuela, string Tipo)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                string[] Parametros = { "P_Escuela", "P_Tipo" };
                object[] Valores = { Escuela, Tipo };
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("pkg_configuracion.Obt_Grid_Cuotas_Lenguas", ref dr, Parametros, Valores);
                List<SCE_CUOTAS_SABATINOS> listarComun = new List<SCE_CUOTAS_SABATINOS>();
                while (dr.Read())
                {
                    SCE_CUOTAS_SABATINOS objCuotas = new SCE_CUOTAS_SABATINOS();
                    objCuotas.ID = Convert.ToInt32(dr[0]);
                    objCuotas.ESCUELA = Convert.ToString(dr[1]);
                    objCuotas.STATUS = Convert.ToString(dr[2]);
                    objCuotas.NIVEL = Convert.ToString(dr[3]);
                    objCuotas.IMPORTE_INGLES = Convert.ToDouble(dr[4]);
                    objCuotas.IMPORTE_ITALIANO = Convert.ToDouble(dr[5]);
                    objCuotas.IMPORTE_FRANCES = Convert.ToDouble(dr[6]);
                    objCuotas.IMPORTE_ALEMAN = Convert.ToDouble(dr[7]);
                    objCuotas.IMPORTE_CHINO = Convert.ToDouble(dr[8]);
                    objCuotas.IMPORTE_TZOTZIL = Convert.ToDouble(dr[9]);
                    objCuotas.IMPORTE_TZENTAL = Convert.ToDouble(dr[10]);
                    objCuotas.IMPORTE_ESPANIOL = Convert.ToDouble(dr[11]);
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

        public static List<ADQ_COMUN> ObtenerEscuelasPagos(string Usuario)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                string[] Parametros = { "p_usuario" };
                object[] Valores = { Usuario };
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_POSGRADO.Obt_Combo_Escuelas_Pagos", ref dr, Parametros, Valores);
                List<ADQ_COMUN> listarComun = new List<ADQ_COMUN>();
                while (dr.Read())
                {
                    ADQ_COMUN objComun = new ADQ_COMUN();
                    objComun.ID = Convert.ToString(dr[0]);
                    objComun.DESCRIPCION = Convert.ToString(dr[1]);
                    listarComun.Add(objComun);
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


        public static List<ADQ_COMUN> ObtenerCarreras(string Dependencia)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                string[] Parametros = { "P_Dependencia" };
                object[] Valores = { Dependencia };
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_POSGRADO.Obt_Combo_Carreras", ref dr, Parametros, Valores);
                List<ADQ_COMUN> listarComun = new List<ADQ_COMUN>();
                while (dr.Read())
                {
                    ADQ_COMUN objComun = new ADQ_COMUN();
                    objComun.ID = Convert.ToString(dr[0]);
                    objComun.DESCRIPCION = Convert.ToString(dr[1]);
                    listarComun.Add(objComun);
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

        public static List<ADQ_COMUN> ObtenerCarrerasTodas()
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {              
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_POSGRADO.Obt_Combo_CarrerasTodas", ref dr);
                List<ADQ_COMUN> listarComun = new List<ADQ_COMUN>();
                while (dr.Read())
                {
                    ADQ_COMUN objComun = new ADQ_COMUN();
                    objComun.ID = Convert.ToString(dr[0]);
                    objComun.DESCRIPCION = Convert.ToString(dr[1]);
                    listarComun.Add(objComun);
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


        public static List<ADQ_COMUN> ObtenerCiclos()
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {                
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_POSGRADO.Obt_Combo_Ciclos", ref dr);
                List<ADQ_COMUN> listarComun = new List<ADQ_COMUN>();
                while (dr.Read())
                {
                    ADQ_COMUN objComun = new ADQ_COMUN();
                    objComun.ID = Convert.ToString(dr[0]);
                    objComun.DESCRIPCION = Convert.ToString(dr[1]);
                    objComun.GRUPO = Convert.ToString(dr[3]);
                    listarComun.Add(objComun);
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
        public static List<ADQ_COMUN> ObtenerCiclosLicenciatura()
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("pkg_configuracion.Obt_Ciclos_Escolares", ref dr);
                List<ADQ_COMUN> listarComun = new List<ADQ_COMUN>();
                while (dr.Read())
                {
                    ADQ_COMUN objComun = new ADQ_COMUN();
                    objComun.ID = Convert.ToString(dr[0]);
                    objComun.DESCRIPCION = Convert.ToString(dr[1]);
                    objComun.GRUPO = Convert.ToString(dr[3]);
                    listarComun.Add(objComun);
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
        public static List<ADQ_COMUN> ObtenerConceptos(string Nivel, string Tipo_Programa)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                string[] Parametros = { "P_Nivel", "P_Tipo_Programa" };
                object[] Valores = { Nivel, Tipo_Programa };

                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_POSGRADO.Obt_Combo_Conceptos", ref dr, Parametros, Valores);
                List<ADQ_COMUN> listarComun = new List<ADQ_COMUN>();
                while (dr.Read())
                {
                    ADQ_COMUN objComun = new ADQ_COMUN();
                    objComun.ID = Convert.ToString(dr[0]);
                    objComun.DESCRIPCION = Convert.ToString(dr[1]);
                    listarComun.Add(objComun);
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
        public static List<SCE_PAGOS_POSGRADO> ObtenerPagos(string Matricula, string Escuela)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                string[] Parametros = { "P_Matricula", "P_Escuela" };
                object[] Valores = { Matricula, Escuela };

                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_POSGRADO.Obt_Grid_Pagos", ref dr, Parametros, Valores);
                List<SCE_PAGOS_POSGRADO> listarPagos = new List<SCE_PAGOS_POSGRADO>();
                while (dr.Read())
                {
                    SCE_PAGOS_POSGRADO objPagos = new SCE_PAGOS_POSGRADO();
                    objPagos.CONCEPTO = Convert.ToString(dr[5]);
                    objPagos.NO_PAGO = Convert.ToInt32(dr[1]);
                    objPagos.IMPORTE = Convert.ToDouble(dr[2]);
                    objPagos.REFERENCIA = Convert.ToString(dr[3]);
                    objPagos.FECHA_PAGO = Convert.ToString(dr[4]);
                    objPagos.SEMESTRE = Convert.ToString(dr[6]);
                    listarPagos.Add(objPagos);
                }
                return listarPagos;

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
        public static List<FEL_FACTURA> ObtenerReferenciasSYSWEB(string Referencia)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                string[] Parametros = { "P_Referencia" };
                object[] Valores = { Referencia };

                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("pkg_configuracion.Obt_Grid_Referencias_SYSWEB", ref dr, Parametros, Valores);
                List<FEL_FACTURA> listarComun = new List<FEL_FACTURA>();
                while (dr.Read())
                {
                    FEL_FACTURA objPago = new FEL_FACTURA();
                    objPago.MATRICULA = Convert.ToString(dr[1]);
                    objPago.REFERENCIA = Convert.ToString(dr[2]);
                    objPago.DEPENDENCIA = Convert.ToString(dr[3]);
                    objPago.IMPORTE = Convert.ToDouble(dr[4]);
                    objPago.BANCO_FOLIO = Convert.ToString(dr[5]);
                    objPago.RECEPTOR_NOMBRE = Convert.ToString(dr[15]);
                    objPago.FECHA_FACTURA = Convert.ToString(dr[6]);
                    objPago.REFERENCIA = Convert.ToString(dr[2]);
                    listarComun.Add(objPago);
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
        public static List<FEL_FACTURA> ObtenerReferenciasSIAE(string Referencia)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                string[] Parametros = { "P_Referencia" };
                object[] Valores = { Referencia };

                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("pkg_configuracion.Obt_Grid_Referencias_SIAE", ref dr, Parametros, Valores);
                List<FEL_FACTURA> listarComun = new List<FEL_FACTURA>();
                while (dr.Read())
                {
                    FEL_FACTURA objPago = new FEL_FACTURA();
                    objPago.MATRICULA = Convert.ToString(dr[1]);
                    objPago.REFERENCIA = Convert.ToString(dr[2]);
                    objPago.DEPENDENCIA = Convert.ToString(dr[3]);
                    objPago.IMPORTE = Convert.ToDouble(dr[4]);
                    objPago.BANCO_FOLIO = Convert.ToString(dr[5]);
                    objPago.RECEPTOR_NOMBRE = Convert.ToString(dr[15]);
                    objPago.FECHA_FACTURA = Convert.ToString(dr[6]);
                    objPago.REFERENCIA = Convert.ToString(dr[2]);
                    objPago.TIPO = Convert.ToString(dr[21]);
                    listarComun.Add(objPago);
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

        #region <Referencias Generadas en SYSWEB>
        public static List<SCE_ALUMNOS_UNACH> ObtenerAlumnos(string Matricula)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                string[] Parametros = { "P_Matricula" };
                object[] Valores = { Matricula };
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("pkg_configuracion.Obt_Grid_Cat_Alumnos", ref dr, Parametros, Valores);
                List<SCE_ALUMNOS_UNACH> listarAlumnos = new List<SCE_ALUMNOS_UNACH>();
                while (dr.Read())
                {
                    SCE_ALUMNOS_UNACH objAlumnos = new SCE_ALUMNOS_UNACH();
                    objAlumnos.DEPENDENCIA = Convert.ToString(dr[0]);
                    objAlumnos.MATRICULA = Convert.ToString(dr[1]);
                    objAlumnos.NOMBRE_COMPLETO = Convert.ToString(dr[2]);
                    objAlumnos.SEMESTRE = Convert.ToString(dr[3]);
                    objAlumnos.CARRERA = Convert.ToString(dr[4]);
                    objAlumnos.EMAIL = Convert.ToString(dr[5]);
                    objAlumnos.CICLO_ESCOLAR = Convert.ToString(dr[6]);
                    objAlumnos.TIPO = Convert.ToString(dr[7]);
                    listarAlumnos.Add(objAlumnos);
                }
                return listarAlumnos;

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
        #endregion

    }
}
