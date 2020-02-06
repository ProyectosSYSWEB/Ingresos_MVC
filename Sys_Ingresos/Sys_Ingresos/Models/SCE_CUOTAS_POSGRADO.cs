using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sys_Ingresos.Models
{
    public class SCE_CUOTAS_POSGRADO
    {
        public SCE_CUOTAS_POSGRADO()
        {
            GRUPO = new HashSet<SCE_CUOTAS_POSGRADO_GRUPO>();
        }
        public ICollection<SCE_CUOTAS_POSGRADO_GRUPO> GRUPO { get; private set; }
    }

    public class SCE_CUOTAS_POSGRADO_DATOS
    {
        public int ID { get; set; }
        public string ESCUELA { get; set; }
        public string CARRERA { get; set; }
        public string GENERACION { get; set; }
        public string DESC_GENERACION { get; set; }
        public int NO_PAGO { get; set; }
        public string STATUS { get; set; }
        public string DISPONIBLE { get; set; }
        public string NIVEL { get; set; }
        public string MATERIA { get; set; }
        public string MATERIA_DESCRIPCION { get; set; }
        public string SEMESTRE { get; set; }
        public string CONCEPTO { get; set; }
        public string CONCEPTO_DESCRIPCION { get; set; }
        public double CUOTA_NORMAL { get; set; }
        public double CUOTA_PAQUETE { get; set; }
        public int NO_PAQUETE { get; set; }
        public string FECHA_LIMITE { get; set; }
        public string TIPO { get; set; }
        public int VALOR { get; set; }
        public int DIAS { get; set; }
        public double CUOTA { get; set; }
        public double CUOTA_MENSUALIDAD { get; set; }
        public double CUOTA_MENSUAL_PAQ { get; set; }
        public int MENSUAL_NO_PAQUETE { get; set; }
        public string TIPO_PROGRAMA { get; set; }
        public string NUM_OFICIO { get; set; }
        public string FECHA_OFICIO { get; set; }
        public string RUTA_ADJUNTO { get; set; }
    }



    public class SCE_CUOTAS_POSGRADO_GRUPO
    {
        //public SCE_CUOTAS_POSGRADO_GRUPO()
        //{
        //    this.GENERACION = "";
        //}
        public SCE_CUOTAS_POSGRADO_GRUPO(string PGeneracion, string PDescGeneracion, string PRutaAdj)
        {
            this.GENERACION = PGeneracion;
            this.DESC_GENERACION = PDescGeneracion;
            this.RUTA_ADJUNTO = PRutaAdj;
        }
        public SCE_CUOTAS_POSGRADO_GRUPO(string PGeneracion, string PDescGeneracion, string PRutaAdj, IEnumerable<SCE_CUOTAS_POSGRADO_DATOS> PCuotas)
        {
            this.GENERACION = PGeneracion;
            this.DESC_GENERACION = PDescGeneracion;
            this.CUOTAS = PCuotas;
            this.RUTA_ADJUNTO = PRutaAdj;
        }

        public string GENERACION { get; set; }
        public string DESC_GENERACION { get; set; }
        public string SEMESTRE { get; set; }
        public string RUTA_ADJUNTO { get; set; }
        public IEnumerable<SCE_CUOTAS_POSGRADO_DATOS> CUOTAS { get; private set; }
    }
}