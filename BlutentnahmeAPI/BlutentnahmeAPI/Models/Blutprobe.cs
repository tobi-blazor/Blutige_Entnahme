using System.ComponentModel.DataAnnotations;

namespace BlutentnahmeAPI.Models
{
    public class Blutprobe
    {
        [Key]
        public string ProbeID { get; set; }
        public TimeSpan MaximaleVerweildauer { get; set; }
        public string Grund { get; set; }
        public string Hinweise { get; set; }
        public DateTime? EntnahmeZeitpunkt { get; set; }
        public Personal Personal { get; set; }
        public Auftrag Auftrag { get; set; }
        public DateTime? LaborEingang { get; set; }
        public Labor? Labor { get; set; }
    }
}
