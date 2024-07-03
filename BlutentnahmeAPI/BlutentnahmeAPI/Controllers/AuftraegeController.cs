using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlutentnahmeAPI.Data;
using BlutentnahmeAPI.Models;
using NuGet.Protocol;

namespace BlutentnahmeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuftraegeController : ControllerBase
    {
        private readonly BlutentnahmeDBContext _context;

        public AuftraegeController(BlutentnahmeDBContext context)
        {
            _context = context;
        }

        // GET: api/Auftraege
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Auftrag>>> GetAufträge()
        {
            return await _context.Aufträge.ToListAsync();
        }

        // GET: api/Auftraege/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Auftrag>> GetAuftrag(string id)
        {
            var auftrag = await _context.Aufträge.FindAsync(id);

            if (auftrag == null)
            {
                return NotFound();
            }

            return auftrag;
        }

        // PUT: api/Auftraege/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAuftrag(string id, Auftrag auftrag)
        {
            if (id != auftrag.AuftragsID)
            {
                return BadRequest();
            }

            _context.Entry(auftrag).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AuftragExists(id))
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

        // POST: api/Auftraege
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Auftrag>> PostAuftrag(Auftrag auftrag)
        {
            _context.Aufträge.Add(auftrag);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AuftragExists(auftrag.AuftragsID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAuftrag", new { id = auftrag.AuftragsID }, auftrag);
        }

        // DELETE: api/Auftraege/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuftrag(string id)
        {
            var auftrag = await _context.Aufträge.FindAsync(id);
            if (auftrag == null)
            {
                return NotFound();
            }

            _context.Aufträge.Remove(auftrag);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Auftraege/aktiv
        [HttpGet("aktiv")]
        public async Task<ActionResult<IEnumerable<Auftrag>>> GetAktiveAufträge()
        {
            return await _context.Aufträge
                .Include(auftrag => auftrag.Blutproben)
                .Include(auftrag => auftrag.Patient)
                .Where(auftrag => auftrag.Blutproben.Any(probe =>probe.EntnahmeZeitpunkt == null))
                .ToListAsync();
        }



        private bool AuftragExists(string id)
        {
            return _context.Aufträge.Any(e => e.AuftragsID == id);
        }
    }
}
