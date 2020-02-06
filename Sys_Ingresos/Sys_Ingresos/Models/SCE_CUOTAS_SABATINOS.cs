using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sys_Ingresos.Models
{
    public class SCE_CUOTAS_SABATINOS
    {
        public string ESCUELA { get; set; }
        public string PERIODO { get; set; }
        public string ACTIVIDAD { get; set; }
        public string STATUS { get; set; }
        public string FECHA_INICIO { get; set; }
        public string FECHA_FIN { get; set; }
        public string TIPO_PARTICIPANTE { get; set; }
        public int ID { get; set; }
        public string NIVEL { get; set; }
        public string ID_IDIOMA { get; set; }
        public string TIPO { get; set; }
        public double IMPORTE_INGLES { get; set; }
        public double IMPORTE_ITALIANO { get; set; }
        public double IMPORTE_CHINO { get; set; }
        public double IMPORTE_FRANCES { get; set; }
        public double IMPORTE_ALEMAN { get; set; }
        public double IMPORTE_TZOTZIL { get; set; }
        public double IMPORTE_TZENTAL { get; set; }
        public double IMPORTE_ESPANIOL { get; set; }
    }

    public class RESULTADO_CUOTAS_SABATINOS
    {
        public bool ERROR { get; set; }
        public string MENSAJE_ERROR { get; set; }
        public List<SCE_CUOTAS_SABATINOS> RESULTADO { get; set; }

    }
}