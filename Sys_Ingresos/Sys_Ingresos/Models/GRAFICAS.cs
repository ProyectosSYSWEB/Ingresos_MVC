using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sys_Ingresos.Models
{
    public class GRAFICAS
    {
        public string DATO1 { get; set; }
        public string DATO2 { get; set; }
        public string DATO3 { get; set; }

    }

    public class RESULTADO_GRAFICAS
    {
        public bool ERROR { get; set; }
        public string MENSAJE_ERROR { get; set; }
        public List<GRAFICAS> RESULTADO { get; set; }

    }
}