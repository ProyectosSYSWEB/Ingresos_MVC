using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sys_Ingresos.Models.JWT.Managers
{
    public interface IAuthService
    {
        string SECRETKEY { get; set; }
    }
}