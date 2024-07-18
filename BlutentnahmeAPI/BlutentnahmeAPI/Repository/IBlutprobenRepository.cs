using BlutentnahmeAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace BlutentnahmeAPI.Repository
{
    public interface IBlutprobenRepository
    {
        Task<IEnumerable<Blutprobe>> GetBlutprobenAsync();
        Task<Blutprobe?> GetBlutprobeAsync(int id);
        Task<IEnumerable<Blutprobe>> GetZuTransportierendeBlutprobenAsync();
        Task PutEntnommeneBlutprobeAsync(int id, string rohrID, string personalID);
        Task PutBlutprobeInLaborTransportiertAsync(string id);
    }
}
