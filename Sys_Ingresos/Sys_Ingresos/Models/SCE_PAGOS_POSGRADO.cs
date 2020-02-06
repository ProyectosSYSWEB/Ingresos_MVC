using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sys_Ingresos.Models
{
    public class SCE_PAGOS_POSGRADO
    {
        public string CONCEPTO { get; set; }
        public string MATRICULA { get; set; }
        public int NO_PAGO { get; set; }
        public double IMPORTE { get; set; }
        public string REFERENCIA { get; set; }
        public string FECHA_PAGO { get; set; }
        public string SEMESTRE { get; set; }

    }
}