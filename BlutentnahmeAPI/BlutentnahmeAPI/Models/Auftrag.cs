using System.ComponentModel.DataAnnotations;

namespace BlutentnahmeAPI.Models
{
    public class Auftrag
    {
        [Key]
        public string AuftragsID  { get; set; } = Guid.NewGuid().ToString();
        public DateTime GeplanterZeitpunkt { get; set; }
        public Patient Patient { get; set; } = null!;
        public ICollection<Blutprobe> Blutproben { get; } = new List<Blutprobe>();
    }
}
