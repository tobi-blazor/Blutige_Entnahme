using System.ComponentModel.DataAnnotations;

namespace BlutentnahmeAPI.Models
{
    public abstract class Person
    {
        [Key]
        public string PersonID { get; set; } = string.Empty;
        public string Vorname { get; set; } = string.Empty;
        public string Nachname { get; set; } = string.Empty;
        public DateTime Geburtsdatum { get; set; }
    }
}
