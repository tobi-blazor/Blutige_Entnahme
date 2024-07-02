using System.ComponentModel.DataAnnotations;

namespace BlutentnahmeAPI.Models
{
    public class Patient
    {
        [Key]
        public string PersonID { get; set; }
        public string Vorname { get; set; }
        public string Nachname { get; set; }
        public DateTime Geburtsdatum { get; set; }
        public string Hinweise { get; set; }
        public IEnumerable<Auftrag> Aufträge { get; set; }
    }
}
