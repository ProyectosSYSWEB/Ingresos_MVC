using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sys_Ingresos.Models
{
    public class FEL_FACTURA
    {
        public int ID { get; set; }
        public string FOLIO { get; set; }
        public string FECHA_FACTURA { get; set; }

        public string FECHA_DISPERSADO { get; set; }

        public string FECHA_DISPERSADO_NEW { get; set; }

        public double TOTAL { get; set; }
        public double IMPORTE { get; set; }
        public string DEPENDENCIA { get; set; }
        public string MATRICULA { get; set; }
        public string CARRERA { get; set; }
        public string BANCO { get; set; }
        public string ORIGEN { get; set; }
        public string BANCO_FOLIO { get; set; }
        public string USUARIO { get; set; }
        public string RECEPTOR_NOMBRE { get; set; }
        public string REFERENCIA { get; set; }
        public string CICLO { get; set; }
        public int SEMESTRE { get; set; }
        public string TIPO { get; set; }



    }

    public class RESULTADOFACTURA
    {
        public bool ERROR { get; set; }
        public string MENSAJE_ERROR { get; set; }
        public List<FEL_FACTURA> RESULTADO { get; set; }

    }
}