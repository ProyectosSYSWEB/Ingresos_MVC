using Sys_Ingresos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sys_Ingresos.Data.Usuarios
{
    public class ComboDataContext
    {
        public static List<ADQ_COMUN> ObtenerDependenciasTodas()
        {
            string[] Parametros = { };
            object[] Valores = { };
            var Lista = ExeProcedimiento.GenerarOracleCommandCursor_Combo("SIGA09.PKG_ADMINISTRACION.Obt_Combo_DependenciaTodas");
            return Lista;
        }

        public static List<ADQ_COMUN> ObtenerGrupos()
        {
            string[] Parametros = { "p_id_sistema" };
            object[] Valores = { "14" };
            var Lista = ExeProcedimiento.GenerarOracleCommandCursor_Combo("SIGA09.PKG_ADMINISTRACION.Obt_Combo_Grupos",Parametros, Valores);
            return Lista;
        }
    }
}