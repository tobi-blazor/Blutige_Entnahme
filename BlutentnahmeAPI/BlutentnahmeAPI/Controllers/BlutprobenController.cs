using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlutentnahmeAPI.Data;
using BlutentnahmeAPI.Models;

namespace BlutentnahmeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlutprobenController : ControllerBase
    {
        private readonly BlutentnahmeDBContext _context;

        public BlutprobenController(BlutentnahmeDBContext context)
        {
            _context = context;
        }

        // GET: api/Blutproben
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Blutprobe>>> GetBlutproben()
        {
            return await _context.Blutproben.ToListAsync();
        }

        // GET: api/Blutproben/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Blutprobe>> GetBlutprobe(string id)
        {
            var blutprobe = await _context.Blutproben.FindAsync(id);

            if (blutprobe == null)
            {
                return NotFound();
            }

            return blutprobe;
        }


        // PUT: api/Blutproben/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBlutprobe(string id, Blutprobe blutprobe)
        {
            if (id != blutprobe.ProbeID)
            {
                return BadRequest();
            }

            _context.Entry(blutprobe).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BlutprobeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Blutproben
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Blutprobe>> PostBlutprobe(Blutprobe blutprobe)
        {
            _context.Blutproben.Add(blutprobe);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BlutprobeExists(blutprobe.ProbeID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetBlutprobe", new { id = blutprobe.ProbeID }, blutprobe);
        }

        // DELETE: api/Blutproben/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlutprobe(string id)
        {
            var blutprobe = await _context.Blutproben.FindAsync(id);
            if (blutprobe == null)
            {
                return NotFound();
            }

            _context.Blutproben.Remove(blutprobe);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Blutproben/transport
        [HttpGet("transport")]
        public async Task<ActionResult<IEnumerable<Blutprobe>>> GetZuTransportierendeBlutproben()
        {
            return await _context.Blutproben.Where(x => x.LaborEingang == null).Where(x => x.EntnahmeZeitpunkt != null).ToListAsync();  // wo noch nicht im Labor, aber schon entnommen
        }


        private bool BlutprobeExists(string id)
        {
            return _context.Blutproben.Any(e => e.ProbeID == id);
        }
    }
}
