using BlutentnahmeAPI.Data;
using BlutentnahmeAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace BlutentnahmeAPI.Repository
{
    public class AufträgeRepository : IAufträgeRepository
    {
        private readonly BlutentnahmeDBContext _dbContext;

        public AufträgeRepository(BlutentnahmeDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Auftrag>> GetAufträgeAsync()
        {
            return await _dbContext.Aufträge.ToListAsync();
        }

        public async Task<IEnumerable<Auftrag>> GetAktiveAufträgeAsync()
        {
            return await _dbContext.Aufträge
                    .Include(auftrag => auftrag.Blutproben)
                    .Include(auftrag => auftrag.Patient)
                    .Where(auftrag => auftrag.Blutproben.Any(probe => probe.EntnahmeZeitpunkt == null))
                    .ToListAsync();
        }

        public async Task<Auftrag?> GetAuftragAsync(string id)
        {
            var auftrag = await _dbContext.Aufträge
                    .Include(auftrag => auftrag.Blutproben)
                    .Include(auftrag => auftrag.Patient)
                    .FirstOrDefaultAsync(auftrag => auftrag.AuftragsID.Equals(id));
            return auftrag;
        }

        public async Task<Auftrag?> GetAktivenAuftragWithNichtEntnommeneBlutprobenAsync(string id)
        {
            return await _dbContext.Aufträge
                    .Include(auftrag => auftrag.Blutproben.Where(blutprobe => blutprobe.EntnahmeZeitpunkt == null))
                    .Include(auftrag => auftrag.Patient)
                    .FirstOrDefaultAsync(auftrag => auftrag.AuftragsID.Equals(id));
        }
    }
}