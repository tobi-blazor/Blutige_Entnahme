using BlutentnahmeAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System;

namespace BlutentnahmeAPI.Repository
{
    public interface IAufträgeRepository
    {
        Task<IEnumerable<Auftrag>> GetAufträgeAsync();
        Task<Auftrag> GetAuftragAsync(string id);
        Task<IEnumerable<Auftrag>> GetAktiveAufträgeAsync();
        Task<Auftrag?> GetAktivenAuftragWithNichtEntnommeneBlutprobenAsync(string id);
    }
}