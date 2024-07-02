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
    public class PatientenController : ControllerBase
    {
        private readonly BlutentnahmeDBContext _context;

        public PatientenController(BlutentnahmeDBContext context)
        {
            _context = context;
        }

        // GET: api/Patienten
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatienten()
        {
            return await _context.Patienten.ToListAsync();
        }

        // GET: api/Patienten/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> GetPatient(string id)
        {
            var patient = await _context.Patienten.FindAsync(id);

            if (patient == null)
            {
                return NotFound();
            }

            return patient;
        }

        // PUT: api/Patienten/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPatient(string id, Patient patient)
        {
            if (id != patient.PersonID)
            {
                return BadRequest();
            }

            _context.Entry(patient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PatientExists(id))
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

        // POST: api/Patienten
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Patient>> PostPatient(Patient patient)
        {
            _context.Patienten.Add(patient);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PatientExists(patient.PersonID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPatient", new { id = patient.PersonID }, patient);
        }

        // DELETE: api/Patienten/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(string id)
        {
            var patient = await _context.Patienten.FindAsync(id);
            if (patient == null)
            {
                return NotFound();
            }

            _context.Patienten.Remove(patient);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PatientExists(string id)
        {
            return _context.Patienten.Any(e => e.PersonID == id);
        }
    }
}
