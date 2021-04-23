using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackEnd_WA.Models;
using BackEnd_WA.Models.Request;
using BackEnd_WA.Models.Response;

namespace BackEnd_WA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonaController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            Response oResponse = new Response();

            try
            {
                using (develop_dbContext db = new develop_dbContext())
                {
                    var list = db.TbPersonasFisicas.ToList();
                    oResponse.Data = list;
                    oResponse.Success = true;
                }
            }
            catch (Exception ex)
            {
                oResponse.Message = ex.Message;
            }
            return Ok(oResponse);
        }

        [HttpPost]
        public IActionResult Add(PersonaRequest oPersonaRequest)
        {
            Response oResponse = new Response();

            try
            {
                using (develop_dbContext db = new develop_dbContext())
                {
                    TbPersonasFisica oTbPersonasFisica = new TbPersonasFisica();
                    oTbPersonasFisica.Nombre = oPersonaRequest.Nombre;
                    oTbPersonasFisica.ApellidoPaterno = oPersonaRequest.ApellidoPaterno;
                    oTbPersonasFisica.ApellidoMaterno = oPersonaRequest.ApellidoMaterno;
                    oTbPersonasFisica.Rfc = oPersonaRequest.Rfc;
                    //Datos opcionales
                    oTbPersonasFisica.FechaRegistro = oPersonaRequest.FechaRegistro;
                    oTbPersonasFisica.FechaActualizacion = DateTime.Today;
                    oTbPersonasFisica.FechaNacimiento = oPersonaRequest.FechaNacimiento;
                    oTbPersonasFisica.UsuarioAgrega = oPersonaRequest.UsuarioAgrega;
                    oTbPersonasFisica.Activo = true;

                    db.Add(oTbPersonasFisica);
                    db.SaveChanges();
                    oResponse.Success = true;
                }
            }
            catch (Exception ex)
            {
                oResponse.Message = ex.Message;
            }
            return Ok(oResponse);
        }

        [HttpPut]
        public IActionResult Edit(PersonaRequest oPersonaRequest)
        {
            Response oResponse = new Response();

            try
            {
                using (develop_dbContext db = new develop_dbContext())
                {
                    TbPersonasFisica oTbPersonasFisica = db.TbPersonasFisicas.Find(oPersonaRequest.IdPersonaFisica);
                    oTbPersonasFisica.Nombre = oPersonaRequest.Nombre;
                    oTbPersonasFisica.ApellidoPaterno = oPersonaRequest.ApellidoPaterno;
                    oTbPersonasFisica.ApellidoMaterno = oPersonaRequest.ApellidoMaterno;
                    oTbPersonasFisica.Rfc = oPersonaRequest.Rfc;
                    oTbPersonasFisica.FechaNacimiento = oPersonaRequest.FechaNacimiento;
                    oTbPersonasFisica.FechaActualizacion = DateTime.Today;

                    db.Entry(oTbPersonasFisica).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    db.SaveChanges();
                    oResponse.Success = true;
                }
            }
            catch (Exception ex)
            {
                oResponse.Message = ex.Message;
            }
            return Ok(oResponse);
        }

        [HttpDelete("{IdPersonaFisica}")]
        public IActionResult Delete(int IdPersonaFisica)
        {
            Response oResponse = new Response();

            try
            {
                using (develop_dbContext db = new develop_dbContext())
                {
                    TbPersonasFisica oTbPersonasFisica = db.TbPersonasFisicas.Find(IdPersonaFisica);
                    db.Remove(oTbPersonasFisica);
                    db.SaveChanges();
                    oResponse.Success = true;
                }
            }
            catch (Exception ex)
            {
                oResponse.Message = ex.Message;
            }
            return Ok(oResponse);
        }
    }
}
