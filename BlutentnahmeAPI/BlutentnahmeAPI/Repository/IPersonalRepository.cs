using BlutentnahmeAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace BlutentnahmeAPI.Repository
{
    public interface IPersonalRepository
    {
        Task<IEnumerable<Personal>> GetAllPersonalAsync();
        Task<Personal?> GetPersonal(string id);
    }
}
