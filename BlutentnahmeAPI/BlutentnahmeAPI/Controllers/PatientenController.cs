using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlutentnahmeAPI.Data;
using BlutentnahmeAPI.Models;
using BlutentnahmeAPI.Repository;

namespace BlutentnahmeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientenController : ControllerBase
    {
        private readonly IPatientenRepository _patientenRepository;

        public PatientenController(IPatientenRepository patientenRepository)
        {
            _patientenRepository = patientenRepository;
        }

        // GET: api/Patienten
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatienten()
        {
            var patienten = _patientenRepository.GetPatientenAsync();
            return Ok(patienten);
        }

        // GET: api/Patienten/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> GetPatient(string id)
        {
            var patient = _patientenRepository.GetPatientAsync(id);

            if (patient == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(patient);
            }
        }
    }
}
