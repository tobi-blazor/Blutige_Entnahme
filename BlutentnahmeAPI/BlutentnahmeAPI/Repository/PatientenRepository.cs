using BlutentnahmeAPI.Data;
using BlutentnahmeAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BlutentnahmeAPI.Repository
{
    public class PatientenRepository : IPatientenRepository
    {
        private readonly BlutentnahmeDBContext _dbContext;

        public PatientenRepository(BlutentnahmeDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Patient?> GetPatientAsync(string id)
        {
            return await _dbContext.Patienten.FindAsync(id);
        }

        public async Task<IEnumerable<Patient>> GetPatientenAsync()
        {
            return await _dbContext.Patienten.ToListAsync();
        }
    }
}
