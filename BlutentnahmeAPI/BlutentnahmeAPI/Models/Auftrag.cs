﻿using System.ComponentModel.DataAnnotations;

namespace BlutentnahmeAPI.Models
{
    public class Auftrag
    {
        [Key]
        public string AuftragsID  { get; set; }
        public DateTime GeplanterZeitpunkt { get; set; }
        public Patient Patient { get; set; }
        public IEnumerable<Blutprobe> Blutproben { get; set; }
    }
}