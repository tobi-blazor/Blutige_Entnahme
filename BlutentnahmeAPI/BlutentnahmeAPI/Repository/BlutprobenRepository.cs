using BlutentnahmeAPI.Data;
using BlutentnahmeAPI.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BlutentnahmeAPI.Repository
{
    public class BlutprobenRepository : IBlutprobenRepository
    {
        private readonly BlutentnahmeDBContext _dbContext;

        public BlutprobenRepository(BlutentnahmeDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Blutprobe?> GetBlutprobeAsync(int id)
        {
            return await _dbContext.Blutproben.FindAsync(id);
        }

        public async Task<IEnumerable<Blutprobe>> GetBlutprobenAsync()
        {
            return await _dbContext.Blutproben.ToListAsync();
        }

        public async Task<IEnumerable<Blutprobe>> GetZuTransportierendeBlutprobenAsync()
        {
            return await _dbContext.Blutproben.Where(x => x.LaborEingang == null).Where(x => x.EntnahmeZeitpunkt != null).ToListAsync();
        }

        public async Task PutBlutprobeInLaborTransportiertAsync(string id)
        {
            var blutprobe = await _dbContext.Blutproben
                .Where(x => x.LaborEingang == null)
                .Where(x => x.EntnahmeZeitpunkt != null)
                .FirstAsync(b => b.RohrID.Equals(id));
            if (blutprobe == null)
            {
                throw new KeyNotFoundException();
            }

            blutprobe.LaborEingang = DateTime.Now;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_dbContext.Blutproben.Any(e => e.RohrID.Equals(id)))
                {
                    throw new KeyNotFoundException();
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task PutEntnommeneBlutprobeAsync(int id, string rohrID, string personalID)
        {
            var blutprobe = await _dbContext.Blutproben.FindAsync(id);
            if (blutprobe == null)
            {
                throw new KeyNotFoundException();
            }

            var personal = await _dbContext.Personal.FindAsync(personalID);

            if (personal == null)
            {
                throw new KeyNotFoundException();
            }

            blutprobe.EntnahmeZeitpunkt = DateTime.Now;
            blutprobe.RohrID = rohrID;
            blutprobe.Personal = personal;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BlutprobeExists(id))
                {
                    throw new KeyNotFoundException();
                }
                else
                {
                    throw;
                }
            }
        }

        private bool BlutprobeExists(int id)
        {
            return _dbContext.Blutproben.Any(e => e.ProbeNr == id);
        }
    }
}
