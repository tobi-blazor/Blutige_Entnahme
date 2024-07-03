using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlutentnahmeAPI.Models
{
    public class Blutprobe
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProbeNr { get; set; }
        public string? RohrID { get; set; }
        public DateTime spätesterEntnahmezeitpunkt { get; set; }
        public string? Grund { get; set; }
        public string? Hinweise { get; set; }
        public DateTime? EntnahmeZeitpunkt { get; set; }
        public Personal? Personal { get; set; }
        public Auftrag Auftrag { get; set; } = null!;
        public DateTime? LaborEingang { get; set; }
        public Labor? Labor { get; set; } = null!;
    }
}
