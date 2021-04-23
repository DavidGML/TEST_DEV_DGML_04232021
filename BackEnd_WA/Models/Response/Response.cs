using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd_WA.Models.Response
{
    public class Response
    {
        public Boolean Success { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }

        public Response()
        {
            this.Success = false;
        }
    }
}
