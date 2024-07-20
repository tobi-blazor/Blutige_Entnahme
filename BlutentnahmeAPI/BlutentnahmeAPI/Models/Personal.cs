using System.ComponentModel.DataAnnotations;

namespace BlutentnahmeAPI.Models
{
    public class Personal : Person
    {
        public ICollection<Blutprobe> Blutentnahmen { get; } = new List<Blutprobe>();

    }
}
