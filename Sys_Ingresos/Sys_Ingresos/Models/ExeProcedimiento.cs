using Oracle.ManagedDataAccess.Client;
using Oracle.ManagedDataAccess.Types;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace Sys_Ingresos.Models
{
    public class ExeProcedimiento
    {
        #region Variable
        private OracleConnection cn;
        private OracleTransaction trans=null;
        OracleCommand cmd = default(OracleCommand);
        Conexion objConexion = new Conexion();
        #endregion

        public ExeProcedimiento()
        {
            Conexion objConexion = new Conexion();
            cn = objConexion.getConexion();
        }

        public ExeProcedimiento(string Esquema)
        {
            Conexion objConexion = new Conexion();
            cn = objConexion.getConexion(Esquema);
        }


        public OracleCommand GenerarOracleCommandCursor(string SP, ref OracleDataReader dr, string[] Parametros, object[] Valores)
        {
            cn = objConexion.getConexion("CONEXION_INGRESOS");// Agregué el llamado a este metodo para poder realizar la conexion
            cmd = new OracleCommand(SP, cn);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            if (trans != null) cmd.Transaction = trans;
            if (trans == null) cn.Open();
            if (Parametros != null)
                for (int i = 0; i <= Parametros.Length - 1; i++)
                    cmd.Parameters.Add(Parametros[i], OracleDbType.Varchar2).Value = Valores[i];

            cmd.Parameters.Add("p_registros", OracleDbType.RefCursor).Direction = System.Data.ParameterDirection.Output;
            dr = cmd.ExecuteReader();
            return cmd;
        }
        public OracleCommand GenerarOracleCommandCursor(string SP, ref OracleDataReader dr)
        {            
            cmd = new OracleCommand(SP, cn);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            if (trans != null) cmd.Transaction = trans;
            if (trans == null) cn.Open();         
            cmd.Parameters.Add("p_registros", OracleDbType.RefCursor).Direction = System.Data.ParameterDirection.Output;
            dr = cmd.ExecuteReader();
            return cmd;
        }
        public OracleCommand GenerarOracleCommand(string SP, ref string Verificador, ref OracleDataReader dr, string[] ParametrosIn, object[] Valores, string[] ParametrosOut)
        {

            cmd = new OracleCommand(SP, cn);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            //string valor = "";
            for (int i = 0; i <= ParametrosIn.Length - 1; i++)
            {
                cmd.Parameters.Add(ParametrosIn[i], OracleDbType.Varchar2).Value = Valores[i];
            }
            for (int i = 0; i <= ParametrosOut.Length - 1; i++)
            {
                cmd.Parameters.Add(ParametrosOut[i], OracleDbType.Varchar2, 1024).Direction = ParameterDirection.Output;
            }
            try
            {

                if (trans != null) cmd.Transaction = trans;
                if (trans == null) cn.Open();
                cmd.ExecuteNonQuery();
                Verificador = cmd.Parameters["P_Bandera"].Value.ToString();
                return cmd;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
        public void LimpiarOracleCommand(ref OracleCommand cmd)
        {
            try
            {
                if (cmd != null)
                {
                    cn.Close();
                    cmd.Dispose();
                    cn.Dispose();
                    objConexion = null;
                }
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);

            }

        }

        public static List<ADQ_COMUN> GenerarOracleCommandCursor_Combo(string SP)
        {
            Conexion objConexion = new Conexion();
            OracleConnection cn = objConexion.getConexion("CONEXION_INGRESOS");
            cn.Open();
            OracleCommand cmd = cn.CreateCommand();
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.CommandText = SP;
            OracleParameter par1 = new OracleParameter();
            par1.OracleDbType = OracleDbType.RefCursor;
            par1.Direction = System.Data.ParameterDirection.Output;
            cmd.Parameters.Add(par1);
            cmd.ExecuteNonQuery();
            OracleRefCursor cursor = (OracleRefCursor)par1.Value;
            OracleDataReader dr = cursor.GetDataReader();


            List<ADQ_COMUN> listarCombo = new List<ADQ_COMUN>();
            while (dr.Read())
            {
                ADQ_COMUN objCombo = new ADQ_COMUN();
                objCombo.ID_GRUPO = Convert.ToString(dr["Id"]);
                objCombo.DESCRIPCION = Convert.ToString(dr["Descripcion"]);
                listarCombo.Add(objCombo);
            }
            cn.Close();
            par1.Dispose();
            cmd.Dispose();
            cn.Dispose();
            objConexion = null;
            return listarCombo;

        }

        public static List<ADQ_COMUN> GenerarOracleCommandCursor_Combo(string SP, string[] Parametros, object[] Valores)
        {
            Conexion objConexion = new Conexion();
            OracleConnection cn = objConexion.getConexion();
            cn.Open();
            OracleCommand cmd = cn.CreateCommand();
            cmd.CommandType = System.Data.CommandType.StoredProcedure;

            cmd.CommandText = SP;
            OracleParameter par1 = new OracleParameter();
            if (Parametros != null)
                for (int i = 0; i <= Parametros.Length - 1; i++)
                    cmd.Parameters.Add(Parametros[i], OracleDbType.Varchar2).Value = Valores[i];


            par1.OracleDbType = OracleDbType.RefCursor;
            par1.Direction = System.Data.ParameterDirection.Output;
            cmd.Parameters.Add(par1);


            cmd.ExecuteNonQuery();
            OracleRefCursor cursor = (OracleRefCursor)par1.Value;
            OracleDataReader dr = cursor.GetDataReader();


            List<ADQ_COMUN> listarCombo = new List<ADQ_COMUN>();
            while (dr.Read())
            {
                ADQ_COMUN objCombo = new ADQ_COMUN();
                objCombo.ID = Convert.ToString(dr[0]);
                objCombo.DESCRIPCION = Convert.ToString(dr[1]);
                listarCombo.Add(objCombo);
            }
            cn.Close();
            par1.Dispose();
            cmd.Dispose();
            cn.Dispose();
            objConexion = null;
            return listarCombo;

        }
    }
}