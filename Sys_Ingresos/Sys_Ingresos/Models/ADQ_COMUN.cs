using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sys_Ingresos.Models
{
    public class ADQ_COMUN
    {
        public string ID { get; set; }
        public string DESCRIPCION { get; set; }
        public string VALOR3 { get; set; }
        public string GRUPO { get; set; }
        public string ID_GRUPO { get; set; }

    }

    public class RESULTADOCOMUN
    {
        public bool ERROR { get; set; }
        public string MENSAJE_ERROR { get; set; }
        public List<ADQ_COMUN> RESULTADO { get; set; }

    }
}