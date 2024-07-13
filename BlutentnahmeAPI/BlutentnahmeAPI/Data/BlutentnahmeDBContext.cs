using BlutentnahmeAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BlutentnahmeAPI.Data
{
    public class BlutentnahmeDBContext : DbContext
    {
        public BlutentnahmeDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        { }
        public DbSet<Personal> Personal { get; set; }
        public DbSet<Auftrag> Aufträge { get; set; }
        public DbSet<Blutprobe> Blutproben { get; set; }
        public DbSet<Patient> Patienten { get; set; }
    }
}
