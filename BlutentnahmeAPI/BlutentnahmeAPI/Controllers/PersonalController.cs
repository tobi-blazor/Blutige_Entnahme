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
    public class PersonalController : ControllerBase
    {
        private readonly IPersonalRepository _personalRepository;

        public PersonalController(IPersonalRepository personalRepository)
        {
            _personalRepository = personalRepository;
        }

        // GET: api/Personal
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Personal>>> GetAllPersonal()
        {
            var personal = await _personalRepository.GetAllPersonalAsync();
            return Ok(personal);
        }

        // GET: api/Personal/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Personal>> GetPersonal(string id)
        {
            var personal = _personalRepository.GetPersonal(id);

            if (personal == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(personal);
            }
        }
    }
}
