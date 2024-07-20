using BlutentnahmeAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace BlutentnahmeAPI.Repository
{
    public interface IPatientenRepository
    {
        Task<IEnumerable<Patient>> GetPatientenAsync();
        Task<Patient?> GetPatientAsync(string id);
    }
}
