using BlutentnahmeAPI.Data;
using BlutentnahmeAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BlutentnahmeAPI.Repository
{
    public class PersonalRepository : IPersonalRepository
    {
        private readonly BlutentnahmeDBContext _dbContext;

        public PersonalRepository(BlutentnahmeDBContext context)
        {
            _dbContext = context;
        }

        public async Task<IEnumerable<Personal>> GetAllPersonalAsync()
        {
            return await _dbContext.Personal.ToListAsync();
        }

        public async Task<Personal?> GetPersonal(string id)
        {
            return await _dbContext.Personal.FindAsync(id);
        }
    }
}
