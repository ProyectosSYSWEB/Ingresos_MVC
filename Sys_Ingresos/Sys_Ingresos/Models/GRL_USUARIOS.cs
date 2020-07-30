using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sys_Ingresos.Models
{
    public class GRL_USUARIOS
    {
        public string USUARIO { get; set; }
        public string PASSWORD { get; set; }
        public string NOMBRE { get; set; }
        public string TELEFONOS { get; set; }
        public string CORREO { get; set; }
        public string TIPO { get; set; }
        public string DIRECCION_DEPE { get; set; }
        public string STATUS { get; set; }

    }

    public class RESULTADO_GRL_USUARIOS
    {
        public bool ERROR { get; set; }
        public string MENSAJE_ERROR { get; set; }
        public List<GRL_USUARIOS> RESULTADO { get; set; }

    }
}