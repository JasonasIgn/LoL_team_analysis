using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Analysis.Application.main;
using Analysis.Application.main.match;
using Analysis.EF.entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;


namespace Analysis.Web.Controllers
{
    [Route("/[controller]")]
    public class MatchController : Controller
    {
        protected readonly IMatchService _matchService;
        public MatchController(IMatchService matchService)
        {
             _matchService = matchService;
        }


        [HttpGet("{id}/{api}")]
        public Match Get(long id, string api)
        {
            return _matchService.SaveRiotMatchById(id, api);
        }
    }
}