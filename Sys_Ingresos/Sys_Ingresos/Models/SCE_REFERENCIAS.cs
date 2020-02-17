using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sys_Ingresos.Models
{
    public class SCE_REFERENCIAS
    {
        public string BANCO { get; set; }
        public string CICLO_ACTUAL { get; set; }
        public double COSTO { get; set; }
        public string CONCEPTO { get; set; }
        public string DEPENDENCIA { get; set; }
        public int DESCUENTO { get; set; }
        public string FECHA_ANTERIOR { get; set; }
        public string FECHA_GENERACION { get; set; }
        public string FECHA_LIMITE { get; set; }
        public string FECHA_PAGO { get; set; }
        public string FOLIO_BANCO { get; set; }
        public int ID { get; set; }
        public int ID_CARRERA { get; set; }
        public int DIAS_VIGENCIA { get; set; }
        public string MATRICULA { get; set; }
        public string MOVIMIENTO { get; set; }
        public string MUNICIPIO_SEDE { get; set; }
        public string NOMBRE { get; set; }
        public string NOTAS { get; set; }
        public string PAGO_CONFIRMADO { get; set; }
        public string PROMEDIO { get; set; }
        public string REFERENCIA { get; set; }
        public string SEMESTRE { get; set; }
        public double TOTAL { get; set; }
        public string ES_EXTEMPORANEO { get; set; }

    }
    public class RESULTADO_SCE_REFERENCIAS
    {
        public bool ERROR { get; set; }
        public string MENSAJE_ERROR { get; set; }
        public List<SCE_REFERENCIAS> RESULTADO { get; set; }

    }
}