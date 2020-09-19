using Sys_Ingresos.Models.JWT.Managers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sys_Ingresos.Models.JWT
{
    public class JWTService//: IAuthService
    {
        public string SecretKey { get; set; }
        #region Constructor
        public JWTService(string secretKey)
        {
            SecretKey = secretKey;
        }
        #endregion

    }
}