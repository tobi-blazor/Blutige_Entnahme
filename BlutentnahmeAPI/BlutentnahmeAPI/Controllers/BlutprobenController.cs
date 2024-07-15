﻿using System;
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
        public async Task<ActionResult<Blutprobe>> GetBlutprobe(int id)
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
        public async Task<IActionResult> PutBlutprobe(int id, Blutprobe blutprobe)
        {
            if (id != blutprobe.ProbeNr)
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
                if (BlutprobeExists(blutprobe.ProbeNr))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetBlutprobe", new { id = blutprobe.ProbeNr }, blutprobe);
        }

        // DELETE: api/Blutproben/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlutprobe(int id)
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


        // PUT: api/Blutproben/entnommen/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("entnommen/{id}")]
        public async Task<IActionResult> PutEntnommeneBlutprobe(int id, string rohrID, string personalID)
        {

            var blutprobe = await _context.Blutproben.FindAsync(id);
            if (blutprobe == null)
            {
                return NotFound();
            }

            var personal = await _context.Personal.FindAsync(personalID);

            if (personal == null)
            {
                return NotFound();
            }

            blutprobe.EntnahmeZeitpunkt = DateTime.Now;
            blutprobe.RohrID = rohrID;
            blutprobe.Personal = personal;

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


        // PUT: api/Blutproben/transport/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("transport/{id}")]
        public async Task<IActionResult> PutBlutprobeInLaborTransportiert(string id)
        {

            var blutprobe = await _context.Blutproben.FirstOrDefaultAsync(b => b.RohrID == id);
            if (blutprobe == null)
            {
                return NotFound();
            }
                
            blutprobe.LaborEingang = DateTime.Now;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Blutproben.Any(e => e.RohrID == id))
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



        private bool BlutprobeExists(int id)
        {
            return _context.Blutproben.Any(e => e.ProbeNr == id);
        }
    }
}
