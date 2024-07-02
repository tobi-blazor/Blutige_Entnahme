using System.ComponentModel.DataAnnotations;

namespace BlutentnahmeAPI.Models
{
    public class Personal
    {
        [Key]
        public string PersonID { get; set; }
        public string Vorname { get; set; }
        public string Nachname { get; set; }
        public DateTime Geburtsdatum { get; set; }
        public IEnumerable<Blutprobe> Blutentnahmen { get; set; }

    }
}
