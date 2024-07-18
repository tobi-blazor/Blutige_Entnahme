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
    public class BlutprobenController : ControllerBase
    {
        private readonly IBlutprobenRepository _blutprobenRepository;

        public BlutprobenController(IBlutprobenRepository blutprobenRepository)
        {
            _blutprobenRepository = blutprobenRepository;
        }

        // GET: api/Blutproben
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Blutprobe>>> GetBlutproben()
        {
            var blutproben = await _blutprobenRepository.GetBlutprobenAsync();
            return Ok(blutproben);
        }

        // GET: api/Blutproben/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Blutprobe>> GetBlutprobe(int id)
        {
            var blutprobe = await _blutprobenRepository.GetBlutprobeAsync(id);

            if (blutprobe == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(blutprobe);
            }

        }

        // GET: api/Blutproben/transport
        [HttpGet("transport")]
        public async Task<ActionResult<IEnumerable<Blutprobe>>> GetZuTransportierendeBlutproben()
        {
            var blutproben = await _blutprobenRepository.GetZuTransportierendeBlutprobenAsync();
            return Ok(blutproben);
        }

        // PUT: api/Blutproben/entnommen/5
        [HttpPut("entnommen/{id}")]
        public async Task<IActionResult> PutEntnommeneBlutprobe(int id, string rohrID, string personalID)
        {
            try
            {
                await _blutprobenRepository.PutEntnommeneBlutprobeAsync(id, rohrID, personalID);
            }
            catch (Exception ex)
            {
                return NotFound();
            }
            return Ok();

        }

        // PUT: api/Blutproben/transport/5
        [HttpPut("transport/{id}")]
        public async Task<IActionResult> PutBlutprobeInLaborTransportiert(string id)
        {
            try
            {
                await _blutprobenRepository.PutBlutprobeInLaborTransportiertAsync(id);
            }
            catch (Exception ex)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}
