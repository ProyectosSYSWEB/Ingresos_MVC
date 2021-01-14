using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sys_Ingresos.Models
{
    public class GRL_SISTEMAS
    {
        public string CLAVE { get; set; }
        public string DESCRIPCION { get; set; }
        public int ID { get; set; }
        public int TOT_NIVEL { get; set; }
        public string PADRE { get; set; }
        public int GRUPO { get; set; }
        public int ID_PADRE { get; set; }
        public string TIPO { get; set; }
        public int NIVEL { get; set; }
        public string IMG { get; set; }
        public string IMG2 { get; set; }
        public string ASIGNADO { get; set; }

        public bool VALIDO { get; set; }

    }
    public class RESULTADO_GRL_SISTEMAS
    {
        public bool ERROR { get; set; }
        public string MENSAJE_ERROR { get; set; }
        public List<GRL_SISTEMAS> RESULTADO { get; set; }

    }
}