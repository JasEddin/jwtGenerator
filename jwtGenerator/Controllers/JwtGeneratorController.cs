using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace jwtGenerator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JwtGeneratorController : ControllerBase
    {
        private readonly TokenService _tokenService;

        public JwtGeneratorController(TokenService tokenService)    
        {
            _tokenService = tokenService;
        }
        // GET: api/<JwtGeneratorController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<JwtGeneratorController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<JwtGeneratorController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TokenRequest request)
        {
            var result = await _tokenService.GenerateToken(request);

            return Ok(result);

        }

        // PUT api/<JwtGeneratorController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<JwtGeneratorController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
