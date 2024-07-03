﻿using System.ComponentModel.DataAnnotations;

namespace BlutentnahmeAPI.Models
{
    public class Labor
    {
        [Key]
        public string LaborID { get; set; }
        public string Name { get; set; }
        public ICollection<Blutprobe> Blutproben { get; } = new List<Blutprobe>();
    }
}
