﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlutentnahmeAPI.Data;
using BlutentnahmeAPI.Models;
using NuGet.Protocol;
using BlutentnahmeAPI.Repository;


namespace BlutentnahmeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuftraegeController : ControllerBase
    {
        private readonly IAufträgeRepository _aufträgeRepository;

        public AuftraegeController(IAufträgeRepository aufträgeRepository)
        {
            _aufträgeRepository = aufträgeRepository;
        }

        // GET: api/Auftraege
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Auftrag>>> GetAufträge()
        {
            var aufträge = await _aufträgeRepository.GetAufträgeAsync();
            return Ok(aufträge);
        }

        // GET: api/Auftraege/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Auftrag>> GetAuftrag(string id)
        {
            var auftrag = await _aufträgeRepository.GetAuftragAsync(id);

            if (auftrag == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(auftrag);
            }
        }

        // GET: api/Auftraege/aktiv
        [HttpGet("aktiv")]
        public async Task<ActionResult<IEnumerable<Auftrag>>> GetAktiveAufträge()
        {
            var aktiveAufträge = await _aufträgeRepository.GetAktiveAufträgeAsync();
            return Ok(aktiveAufträge);
        }

        // GET: api/Auftraege/aktiv/5
        [HttpGet("aktiv/{id}")]
        public async Task<ActionResult<Auftrag>> GetAktivenAuftragWithNichtEntnommeneBlutproben(string id)
        {
            var auftrag = await _aufträgeRepository.GetAktivenAuftragWithNichtEntnommeneBlutprobenAsync(id);

            if (auftrag == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(auftrag);
            }
        }
    }
}
