using System.ComponentModel.DataAnnotations;

namespace BlutentnahmeAPI.Models
{
    public class Patient : Person
    {
        public string Hinweise { get; set; }
        public ICollection<Auftrag> Aufträge { get; } = new List<Auftrag>();
    }
}
