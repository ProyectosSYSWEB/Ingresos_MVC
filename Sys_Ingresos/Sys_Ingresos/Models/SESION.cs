using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sys_Ingresos.Models
{
    public class SESION
    {
        public string Status { get; set; }
        public string Dependencia { get; set; }
        public int IdSolicitud { get; set; }
        public string Usu_Nombre { get; set; }
        public string Password { get; set; }
        public string Correo { get; set; }
        public int Ejercicio { get; set; }
        public string Nombre { get; set; }
        public string Tipo { get; set; }
        public string UsuWXI { get; set; }
        public string CambioUsu { get; set; }
        public string Form { get; set; }



    }
}