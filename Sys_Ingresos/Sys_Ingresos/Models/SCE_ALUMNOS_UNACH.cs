using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sys_Ingresos.Models
{
    public class SCE_ALUMNOS_UNACH
    {
        public string DEPENDENCIA { get; set; }
        public string MATRICULA { get; set; }
        public string NOMBRE_COMPLETO { get; set; }
        public string SEMESTRE { get; set; }
        public int IDCARRERA { get; set; }
        public string CARRERA { get; set; }
        public string EMAIL { get; set; }
        public string CICLO_ESCOLAR { get; set; }
        public string TIPO { get; set; }

    }

    public class RESULTADO_ALUMNOS_UNACH
    {
        public bool ERROR { get; set; }
        public string MENSAJE_ERROR { get; set; }
        public List<SCE_ALUMNOS_UNACH> RESULTADO { get; set; }
    }
}