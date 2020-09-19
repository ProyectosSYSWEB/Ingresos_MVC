using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using Microsoft.IdentityModel.Tokens;

namespace Sys_Ingresos.Models.JWT.Models
{
    public class JWTContainerModel:IAuthContainerModel
    {
        public int ExpireMinutes { get; set; } = 10880;
        public string SecretKey { get; set; } = "";
        public string SecurityAlgorithm { get; set; } = SecurityAlgorithms.HmacSha256Signature;
        public Claim[] Claims { get; set; }
    }
}